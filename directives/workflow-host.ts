import {
    Type,
    Component,
    ViewContainerRef,
    ViewChild,
    ComponentFactory,
    ComponentResolver,
    Input,
    Output,
    EventEmitter,
    ComponentRef,
    Injector,
    ContentChild,
    AfterContentInit
} from '@angular/core';

import {
    WorkflowInstance,
    WorkflowState,
    WorkflowDefinition,
    WorkflowStageDefinition
} from '../types.d';

import { WorkflowCommands } from './workflow-commands';
import { WorkflowService } from '../services/workflow.service';

@Component({
    selector: 'workflow',
    template: `
              <div [class]="containerClass">
                  <div #host></div>
              </div>
              <ng-content></ng-content>
    `,
})

export class WorkflowDirective implements AfterContentInit {

    @ViewChild('host', { read: ViewContainerRef })
    public host: ViewContainerRef;

    @ContentChild(WorkflowCommands)
    public commands: WorkflowCommands;

    @Input()
    public containerClass: string;

    @Input()
    public set workflow(workflow: WorkflowInstance) {
        this.instance = workflow;
        this.workflowDef =
            WorkflowService.getWorkflow(this.instance.workflow);
    }

    @Output()
    public stateChanged$: EventEmitter<WorkflowState>;

    private workflowDef: WorkflowDefinition;

    private instance: WorkflowInstance;

    private provider: Type;

    private state: WorkflowState;

    constructor(private injector: Injector, private resolver: ComponentResolver) {
        this.stateChanged$ = new EventEmitter<WorkflowState>();
    }

    public ngAfterContentInit(): void {
        if (this.instance && this.workflowDef && this.commands) {
            this.init();
            this.setupCommands();
            this.updateComponent();
        }
    }

    public moveNext(): void {
        ++this.state.current;
        this.updateComponent(true);
    }

    public moveBack(): void {
        --this.state.current;
        this.updateComponent(true);
    }

    private init(): void {
        if (this.state === undefined) {
            this.state = {
                total: this.workflowDef.stages.length,
                current: 0
            };
        }

        if (this.workflowDef.provider) {
            this.provider = this.injector.get(this.workflowDef.provider);
        }
    }

    private setupCommands(): void {
        this.commands.next$.subscribe(() => {
            this.moveNext();
        });

        this.commands.previous$.subscribe(() => {
            this.moveBack();
        });

        this.commands.link(this);
    }

    private updateComponent(transition: boolean = false) {
        if (transition) {
            this.host.clear();
        }
        this.resolver
            .resolveComponent(this.getStage())
            .then((f) => this.initComponent(f));
    }

    private initComponent(factory: ComponentFactory<any>): void {
        let inst =
            this.host.createComponent(factory).instance;

        inst.provider = this.provider;

        this.state.instance = inst;

        this.stateChanged$.emit(this.state);
    };

    private getStage(): WorkflowStageDefinition {
        return this.workflowDef.stages[this.state.current]
    }
}
