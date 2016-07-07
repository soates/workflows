### Workflows
Workflows allows angular2 applications to be structured into multiple workflows

### Getting Started
    npm install workflows

### Usage
Create a workflow.

    import { Workflow } from 'workflows/engine';
    import { WelcomeComponent } from './welcome/welcome.component';
    import { AddressComponent } from './address/address.component';

    @Workflow({
        stages: [
            WelcomeComponent,
            AddressComponent
        ]
    })

    export class SignupWorkflow { }

Create a stage.

    import { Component } from '@angular/core';
    import { WorkflowStage } from 'workflows/engine';

    @Component({
        selector: '<signup-welcome></signup-welcome>',
        templateUrl: `signup.html`
    })
    export class SignupComponent extends WorkflowStage {

        public name: string;

        public type: string;

        constructor() { 
            super();
        }

        public isValid(): boolean {
            return this.name !== undefined && this.type !== undefined;
        }
    }

Use your workflow.

```html
    <workflow [workflow]="SignupWorkflow">
                <workflow-commands >
                    <button workflow-previous type="button">Back</button>
                    <button workflow-next type="button">Next</button>
                </workflow-commands>
        </workflow>
```

### TODO
+ Add Examples.
+ Allow more complex workflows.
