import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "",
    ClientId: ""
}

const Pool = new CognitoUserPool(poolData);

export default Pool;