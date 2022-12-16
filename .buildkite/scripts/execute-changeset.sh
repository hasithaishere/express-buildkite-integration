#!/bin/bash
SERVICE_NAME="sample-integration-service"
EXECUTION_STATUS=$(buildkite-agent meta-data get "cf-execution-state")
CS_ARN=$(buildkite-agent meta-data get "${SERVICE_NAME}-cs-arn")
echo $EXECUTION_STATUS
echo $CS_ARN
