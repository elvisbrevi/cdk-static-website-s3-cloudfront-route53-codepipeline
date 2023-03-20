import { StackProps, Stage } from "aws-cdk-lib";
import { Construct } from "constructs";
import { WebAppStack } from "./webapp-stack";

export class PipelineStage extends Stage {

    constructor(scope: Construct, stageName: string, props?: StackProps) {
        super(scope, stageName, props);
    
        new WebAppStack(this, 'personal-website-stack', stageName);
    }
    
}