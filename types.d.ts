import { WorkflowStage } from './engine';

export interface WorkflowInstance extends Function {
    workflow: string;
}

export interface WorkflowDefinition {
    stages: WorkflowStageDefinition[];
    provider?: WorkflowProvider;
}

export interface WorkflowStageDefinition extends Function { }

export interface WorkflowState {
    instance: WorkflowStage;
    total: number;
    current: number;
}

export interface WorkflowProvider {
    name: string;
}

export interface WorkflowStage {
    valid(): boolean;
}