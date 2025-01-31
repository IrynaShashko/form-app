import { CognitoUserPool } from "amazon-cognito-identity-js";

export const userPoolId = process.env.REACT_APP_USER_POOL_ID;
export const clientId = process.env.REACT_APP_CLIENT_ID;

const poolData = {
  UserPoolId: userPoolId,
  ClientId: clientId,
};

export const userPool = new CognitoUserPool(poolData);
