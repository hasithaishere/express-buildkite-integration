#!/bin/bash
SERVICE_NAME="sample-integration-service"
EXECUTION_STATUS=$(buildkite-agent meta-data get "cf-execution-state")
CS_ARN=$(buildkite-agent meta-data get "${SERVICE_NAME}-cs-arn")
#echo $EXECUTION_STATUS
#echo $CS_ARN

if [ "$EXECUTION_STATUS" = "yes" ]; then
  aws cloudformation execute-change-set --change-set-name $CS_ARN
else
  echo "User abort the chnages set execution"
  exit 0
fi
