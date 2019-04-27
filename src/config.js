import { CognitoUserPool  } from 'amazon-cognito-identity-js';
var poolData = {
    UserPoolId : 'us-east-2_fvyDels32', // your user pool id here
    ClientId : '69v50s8pmnktsg5a8h0sj3984c' // your app client id here
};
var userPool = new CognitoUserPool(poolData);

export default userPool;