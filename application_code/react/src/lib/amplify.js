import { Amplify } from "aws-amplify";

// Centralized Amplify configuration for the app. Modify values as needed.
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_oNkz8iV12",      // e.g. ap-south-1_ABC123
      userPoolClientId: "2ov88v081o7g6lgl0t1epq1gj2",
      region: "us-east-1",                    // e.g. ap-south-1
      loginWith: { email: true }              // username is email
    }
  }
});

export default Amplify;
