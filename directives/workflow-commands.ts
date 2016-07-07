import { Component, EventEmitter, ContentChild, AfterContentInit } from '@angular/core';

import { WorkflowState } from '../types.d';
import { WorkflowDirective } from '../directives/workflow-host';
import { WorkflowNext } from './workflow-next';
import { WorkflowPrevious } from './workflow-previous';

@Component({
    selector: 'workflow-commands',
    template: '<ng-content></ng-content>'
})
export class WorkflowCommands {

    @ContentChild(WorkflowNext)
    public nextCommand: WorkflowNext;

    @ContentChild(WorkflowPrevious)
    public previousCommand: WorkflowPrevious;

    public next$: EventEmitter<Boolean>

    public previous$: EventEmitter<Boolean>

    private state: WorkflowState;

    public ngAfterContentInit(): void {
        this.next$ = this.nextCommand.event$;
        this.previous$ = this.previousCommand.event$;
    }

    public link(wfd: WorkflowDirective): void {
        wfd.stateChanged$.subscribe((state: WorkflowState) => {
            this.state = state;
            this.hookIntoStage();
            this.setState();
        })
    }

    private resetState(): void {
        this.previousCommand.disabled = false;
        this.nextCommand.disabled = false;
    }

    private hookIntoStage(): void {
        this.state.instance.valid$.subscribe((valid: boolean) => {
            this.nextCommand.disabled = !valid;
        });
    }

    private setState(): void {
        this.resetState();
        if (this.state.current === 0) {
            this.previousCommand.disabled = true;
        }
        if ((this.state.total - 1) === this.state.current) {
            this.nextCommand.disabled = true;
        }
    }
}