import { WorkflowDefinition } from '../types.d';

export class WorkflowService {

    private static db: Array<WorkflowDefinition> = new
        Array<WorkflowDefinition>();

    public static getWorkflow(workflow: string): WorkflowDefinition {
        return WorkflowService.db[parseInt(workflow)];
    }

    public static register(wfd: WorkflowDefinition): string {
        return (WorkflowService.db.push(wfd) - 1).toString();
    }
}