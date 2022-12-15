#!/bin/bash
TEMP_OUTPUT_FILE="/tmp/$RANDOM.txt"
sam deploy --stack-name staging--s3-access-log-processor --s3-bucket aws-sam-cli-managed-default-samclisourcebucket-18l5v97dw5eqb --s3-prefix staging--s3-access-log-processor --template template.yaml --capabilities CAPABILITY_IAM --no-execute-changeset --region ap-southeast-1 --parameter-overrides ParameterKey=Environment,ParameterValue=staging ParameterKey=LogBucketName,ParameterValue=respond-io-main-bucket-access-logs ParameterKey=LogPath,ParameterValue=access-logs | tee $TEMP_OUTPUT_FILE
CHANGE_SET_ARN=(`sed -n 's/^Changeset created successfully. \(.*\)/\1/p' < $TEMP_OUTPUT_FILE`)
echo $CHANGE_SET_ARN
rm -rf $TEMP_OUTPUT_FILE
