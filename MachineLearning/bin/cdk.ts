#!/usr/bin/env node
import { App, Tag, IAspect, IConstruct, Stack } from '@aws-cdk/core';
import { ConnectedDataProcessingStack, DisconnectedDataProcessingStack } from '../lib/data-processing-stack';
import { ModelBuildingStack } from '../lib/model-building-stack';
import { ModelInferenceStack } from '../lib/model-inference-stack';

const dataProcessingLambdaPath = '../1_DataProcessing/lambda-functions/'
const modelInferenceLambdaPath = '../3_Inference/lambda-functions/'

const app = new App();
const connectedDataProcessingStack = new ConnectedDataProcessingStack(app, 'ConnectedDataProcessingStack', {
  lambdaPath: dataProcessingLambdaPath
});
const disconnectedDataProcessingStack = new DisconnectedDataProcessingStack(app, 'DisconnectedDataProcessingStack', {
  lambdaPath: dataProcessingLambdaPath
});
const modelBuildingStack = new ModelBuildingStack(app, 'ModelBuildingStack');
const modelInferenceStack = new ModelInferenceStack(app, 'ModelInferenceStack', {
  lambdaPath: modelInferenceLambdaPath
});

class TagResources implements IAspect {
  public visit(node: IConstruct): void {
    if (node instanceof Stack) {
      Tag.add(node, 'Workshop', 'WildRydes');
    }
  }
}
app.node.applyAspect(new TagResources());
