import { WorkflowDefinition, WorkflowInstance } from '../types.d';
import { Validation } from '../util/validate';
import { WorkflowService } from '../services/workflow.service';

export function Workflow(workflow: WorkflowDefinition) {
    return (target: Function) => {
        Validation
            .set(workflow)
            .stages();

        (<WorkflowInstance>target).workflow
            = WorkflowService.register(workflow);
    };
};
