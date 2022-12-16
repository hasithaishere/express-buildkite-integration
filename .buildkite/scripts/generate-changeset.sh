#!/bin/bash
SERVICE_NAME="sample-integration-service"
TEMP_OUTPUT_FILE="/tmp/$RANDOM.txt"
sam deploy --stack-name staging--s3-access-log-processor --s3-bucket aws-sam-cli-managed-metadata-bucket --s3-prefix staging--s3-access-log-processor --template template.yaml --capabilities CAPABILITY_IAM --no-execute-changeset --region us-west-2 --parameter-overrides ParameterKey=Environment,ParameterValue=staging ParameterKey=LogBucketName,ParameterValue=respond-io-main-bucket-access-logs ParameterKey=LogPath,ParameterValue=access-logs | tee $TEMP_OUTPUT_FILE
CHANGE_SET_ARN=(`sed -n 's/^Changeset created successfully. \(.*\)/\1/p' < $TEMP_OUTPUT_FILE`)
echo $CHANGE_SET_ARN
buildkite-agent meta-data set "${SERVICE_NAME}-cs-arn" $CHANGE_SET_ARN
rm -rf $TEMP_OUTPUT_FILE
