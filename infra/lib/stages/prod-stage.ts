import { StackProps, Stage } from "aws-cdk-lib";
import { Construct } from "constructs";
import { StorageStack } from "../stacks/storage-stack";

export class WebSiteStage extends Stage {

    constructor(scope: Construct, stageName: string, props?: StackProps) {
        super(scope, stageName, props);
    
        const commonProps : StackProps = {
            tags: {
                'Project': 'Blog',
                'Stage': stageName,
            }
        };

        new StorageStack(this, 'blog-storage', stageName, commonProps);
    }
    
}