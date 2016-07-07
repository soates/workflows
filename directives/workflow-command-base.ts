import { HostBinding, EventEmitter, } from '@angular/core';

export class BaseWorkflowCommand {

    public event$: EventEmitter<Boolean>

    @HostBinding('disabled')
    public disabled: boolean;

    constructor() {
        this.event$ = new EventEmitter<Boolean>();
        this.disabled = false;
    }
}