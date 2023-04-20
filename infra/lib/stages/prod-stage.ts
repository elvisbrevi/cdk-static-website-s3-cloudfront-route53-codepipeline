import { StackProps, Stage } from "aws-cdk-lib";
import { Construct } from "constructs";
import { WebSiteStack } from "../stacks/website-stack";

export class WebSiteStage extends Stage {

    constructor(scope: Construct, stageName: string, props?: StackProps) {
        super(scope, stageName, props);
    
        const commonProps : StackProps = {
            tags: {
                'Project': 'Blog',
                'Stage': stageName,
            }
        };

        new WebSiteStack(this, 'blog-website', stageName,commonProps);
    }
}