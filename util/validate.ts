import { WorkflowDefinition } from '../types.d';

class ValidatorService {
    private wfd: WorkflowDefinition;

    public set(wfd: WorkflowDefinition): this {
        this.wfd = wfd;
        return this;
    }
    public stages(): this {
        if (!this.wfd.stages || this.wfd.stages.length === 0) {
            throw Error('Stages required.');
        }
        this.wfd.stages.forEach(s => {
            if (!(s instanceof Function)) {
                throw Error('Stage needs to be a function');
            }
        })

        return this;
    }
}

export let Validation: ValidatorService = new ValidatorService();