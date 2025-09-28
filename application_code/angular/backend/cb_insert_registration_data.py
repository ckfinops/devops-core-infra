import json
import boto3
dynamodb = boto3.resource('dynamodb',region_name='us-east-1')

def lambda_handler(event, context):
    table_name = 'registrationData'
    table = dynamodb.Table(table_name)  # Get a reference to the DynamoDB table
    
    try:

        # Convert the record to the DynamoDB format
        dynamo_record = {k: v for k, v in event.items()}

        table.put_item(Item=dynamo_record)  # Use put_item on the DynamoDB table

        return {
            'statusCode': 200,
            'body': 'Record inserted successfully!'
        }

    except Exception as e:
        # Handle exceptions here
        error_message = str(e)
        return {
            'statusCode': 500,  # Use an appropriate HTTP status code
            'body': f'Error inserting record: {error_message}'
        }