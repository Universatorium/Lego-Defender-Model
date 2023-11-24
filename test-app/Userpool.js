import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "eu-central-1_1CKIopALO",
    ClientId: "vl7eomhvse5vu2sfu408nrofd",
};

const Pool = new CognitoUserPool(poolData);

export default Pool;
