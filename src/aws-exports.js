import Amplify from "aws-amplify";

import { clientId, userPoolId } from "./awsConfig";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: "us-east-1",
    userPoolId: userPoolId,
    userPoolWebClientId: clientId,
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
});
