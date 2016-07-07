import { Directive, HostBinding, EventEmitter } from '@angular/core';
import { BaseWorkflowCommand } from './workflow-command-base';

@Directive({
    selector: '[workflow-next]',
    host: {
        '(click)': 'activate()'
    }
})
export class WorkflowNext extends BaseWorkflowCommand {
    constructor() {
        super();
    }
    public activate(): void {
        this.event$.emit(true);
    }
}