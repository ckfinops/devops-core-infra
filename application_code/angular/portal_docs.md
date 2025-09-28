#### Hr Portal 


```
Source Code : https://github.com/arun-jathari/login-demo.git

Branch : main

UI : Angular

Backend : Python

Database : NoSQL DynamoDB

DevOps : CI/CD Pipeline

1. Source Code : GitHub

2. Continuous Integration : CodeBuild & CodePipeline

3. Artifacts : S3

4. Code Deployed : S3 

5. IAM Roles :

6. SSL : ACM

7. Content Delivery Network : CloudFront

8. Domain Name System : Route53

9. Domain Registrar : Godaddy.com

10. 

```

####

```
table 1: ad_data

sample record: 
{
 "id": "2",
 "assignee": "arun_jathari",
 "comments": "comments on status",
 "full_name": "full name",
 "online_or_offline": "how_would_you_like_to_take_courses?",
 "phone_number": "phone_number",
 "state": "state"
}


```

####

```
table 2: app_users

records:
{
 "user_name": "arun_jathari",
 "first_name": "Arun",
 "last_name": "Jathari",
 "password": "pwd",
 "role": "admin"
},
{
 "user_name": "luffy_d",
 "first_name": "Luffy",
 "last_name": "D",
 "password": "luffy"
},
{
 "user_name": "test_user",
 "first_name": "First Name",
 "last_name": "Last Name",
 "password": "pwd"
}
```

#### lambda 1: logincheck

```
import boto3
import json
from boto3.dynamodb.conditions import Key

def attempt_login(input):
    dynamodb = boto3.resource('dynamodb',region_name='us-east-1')
    table_name = 'app_users'  
    table = dynamodb.Table(table_name)
    try:
        # raise Exception("Something went wrong");
        response = table.query(
            KeyConditionExpression=Key('user_name').eq(input['username'])
        )
        items = response['Items']
        if items:
            if(items[0].get('password')==input['password']):
                del items[0]['password']
                return {
                'statusCode': 200,
                'body': json.dumps(items[0])
            }
            else:
                return {
                    'statusCode': 401,
                    'body': 'Incorrect password'
                }
        else:
            return {
                'statusCode': 404,
                'body': 'User Not found, Please Register'
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error reading from DynamoDB {e}'
        }

def lambda_handler(event, context):
    print('event==>',event)
    return attempt_login(event)
```

#### lambda2: ad-data-operations
description: it will fetch the ad_data table data

```
import json
import boto3

dynamodb = boto3.resource('dynamodb',region_name='us-east-1')
def scan_data():
    table_name = 'ad_data'
    table = dynamodb.Table(table_name)
    
    try:
        response = table.scan()
        items = response.get('Items', [])
        
        # # Process the items as needed
        # for item in items:
        #     # Do something with the item
        #     print(item)

        return {
            'statusCode': 200,
            'body': items
        }
    except Exception as e:
        # Handle exceptions here
        error_message = str(e)
        return {
            'statusCode': 500,
            'body': f'Error retrieving data: {error_message}'
        }
        
def lambda_handler(event, context):
    # TODO implement
    return scan_data()

```

#### lambda 3: updateDataHR
description: it will be used to update both the assignee and comments fields

```
import boto3
import json

def lambda_handler(event, context):
    # create a DynamoDB client
    dynamodb = boto3.client('dynamodb')

    # get the data from the event
    data = event

    # update the record in the table
    response = dynamodb.update_item(
        TableName='ad_data',
        Key={
            'id': {'S': data['id']}
        },
        UpdateExpression='SET #attr1 = :val1, #attr2 = :val2',
        ExpressionAttributeNames={
            '#attr1': 'assignee',
            '#attr2': 'comments'
        },
        ExpressionAttributeValues={
            ':val1': {'S': data['assignee']},
            ':val2': {'S': data['comments']}
        }
    )

    # return the updated record
    return {
        'statusCode': 200,
        'body': json.dumps(response)
    }
```

####

```
these lambdas require dynamodb full access

currently passwords are encrypted at the browser level
need to encrypt them at the app_users table as well

next steps will be pushing the data into the ad_data and parallelly updating the records with respective assignees


```

#### API Gateway

```
Need to create 1 but it should have 3 sub-apis to fetch, get, update lambda

API Gateway Name: cloudbinary_hrportal

/
 /fetch_campaign_data
OPTIONS
POST

 /update_campaign_data
OPTIONS
POST

 /validate_user
OPTIONS
POST


Dev - POST - /fetch_campaign_data
Invoke URL: https://apon4tn9pd.execute-api.ap-south-1.amazonaws.com/Dev/fetch_campaign_data

Dev - POST - /update_campaign_data
Invoke URL: https://apon4tn9pd.execute-api.ap-south-1.amazonaws.com/Dev/update_campaign_data

Dev - POST - /validate_user
Invoke URL: https://apon4tn9pd.execute-api.ap-south-1.amazonaws.com/Dev/validate_user

```

#### Lambda

```
Lambda : cb_hr_fetch_campaign_data

Input: 

{
  "": ""
}

```

```
Lambda Name : cb_hr_get_user_data

Input: 

{
  "username": "arun_jathari",
  "password": "pwd"
}

```

```
Lambda Name : cb_hr_update_campaign_data

Input: 

{
  "id": "5",
  "assignee": "joel",
  "comments": "comments on status",
  "full_name": "full name",
  "online_or_offline": "how_would_you_like_to_take_courses?",
  "phone_number": "phone_number",
  "state": "state"
}


```

#### To Deploy the code:

Clone the Repository & Go to Repository Folder and Install npm module

$ git clone https://github.com/arun-jathari/login-demo.git

$ cd login-demo

$ cd hr-login

$ sudo npm install 

$ npm start 

$ sudo npm run build
