import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import Userpool from "./Accounts/Userpool";

const VerifyEmail = () => {
    const [verificationCode, setVerificationCode] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    const userData = {
      Username: email,
      Pool: Userpool,
    };

    console.log(userData);
  
    const onSubmit = (event) => {
        event.preventDefault();
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
            if (err) {
            console.error(err);
            } else {
            console.log(result);
            navigate('/login');
            }
        });
    }

    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={onSubmit}>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        id="verificationCode"
                        placeholder="Verification Code"
                        onChange={(event) => setVerificationCode(event.target.value)}
                    />
                    <label htmlFor="verificationCode">Verification Code</label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Verify Email</button>
            </form>
        </main>
    );
};

export default VerifyEmail;