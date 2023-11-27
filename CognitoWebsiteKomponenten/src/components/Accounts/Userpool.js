import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "",
    ClientId: ""
}

const UserPool = new CognitoUserPool(poolData);

export default UserPool;