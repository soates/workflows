import { EventEmitter } from '@angular/core';

export class WorkflowStage {

    public valid$: EventEmitter<Boolean>;

    private previousState: boolean;

    constructor() {
        this.valid$ = new EventEmitter<boolean>();
    }

    public isValid(): boolean {
        return true;
    }

    public ngDoCheck(): void {
        let newVal = this.isValid();
        if (newVal !== this.previousState) {
            this.valid$.emit(newVal);
        }
    }
}