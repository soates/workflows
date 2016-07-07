import { Directive, HostBinding, EventEmitter } from '@angular/core';
import { BaseWorkflowCommand } from './workflow-command-base';

@Directive({
    selector: '[workflow-previous]',
    host: {
        '(click)': 'activate()'
    }
})
export class WorkflowPrevious extends BaseWorkflowCommand {
    constructor() {
        super();
    }
    public activate(): void {
        this.event$.emit(true);
    }
}