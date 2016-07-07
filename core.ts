import { WorkflowDirective }  from './directives/workflow-host'
import { WorkflowCommands } from './directives/workflow-commands';
import { WorkflowNext } from './directives/workflow-next';
import { WorkflowPrevious } from './directives/workflow-previous';

export * from './types.d'
export * from './directives/workflow';
export { WorkflowStage } from './base/workflow-stage';
export { WorkflowDirective }  from './directives/workflow-host'

export let WORKFLOW_DIRECTIVES = [
    WorkflowDirective,
    WorkflowCommands,
    WorkflowNext,
    WorkflowPrevious
];

