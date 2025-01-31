import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "./AuthContext";
import { userPool } from "./awsConfig";

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const navigate = useNavigate();
  const { setIsRegistered, setIsAuthenticated } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const attributeList = [
      new CognitoUserAttribute({ Name: "email", Value: credentials.email }),
    ];

    userPool.signUp(
      credentials.email,
      credentials.password,
      attributeList,
      null,
      (err, data) => {
        if (err) {
          setError("Registration failed: " + err.message);
          return;
        }

        alert("Registration successful! Please check your email for the confirmation code.");
        setIsConfirming(true);  
      }
    );
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: credentials.email,
      Pool: userPool,
    });

    user.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        setError("Confirmation failed: " + err.message);
        return;
      }

      alert("Registration confirmed! You can now log in.");

      const authDetails = new AuthenticationDetails({
        Username: credentials.email,
        Password: credentials.password, 
      });

      user.authenticateUser(authDetails, {
        onSuccess: (session) => {
          alert("Login successful!");
          localStorage.setItem("isAuthenticated", "true");
          setIsAuthenticated(true);  
          setIsRegistered(true); 
          navigate("/"); 
        },
        onFailure: (err) => {
          setError("Login failed: " + err.message);
        },
      });
    });
  };

  return (
    <StyledContainer>
      {isConfirming ? (
        <StyledForm onSubmit={handleConfirm}>
          <StyledLabel>
            Confirmation Code:
            <StyledInput
              type="text"
              name="confirmationCode"
              placeholder="Enter the code from your email"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              required
            />
          </StyledLabel>
          {error && <StyledError>{error}</StyledError>}
          <StyledButton type="submit">Confirm Registration</StyledButton>
        </StyledForm>
      ) : (
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel>
            Email:
            <StyledInput
              type="email"
              name="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </StyledLabel>
          <StyledLabel>
            Password:
            <StyledInput
              type="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </StyledLabel>
          <StyledLabel>
            Confirm Password:
            <StyledInput
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={credentials.confirmPassword}
              onChange={handleChange}
              required
            />
          </StyledLabel>
          {error && <StyledError>{error}</StyledError>}
          <StyledButton type="submit">Register</StyledButton>
        </StyledForm>
      )}
    </StyledContainer>
  );
};

export default Register;

const StyledContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  margin: auto;
  max-width: 400px;
  padding-top: 35px;
  padding: 40px 30px;
  position: relative;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledLabel = styled.label`
  color: #fff;
  font-size: 16px;
`;

const StyledInput = styled.input`
  border-color: #fff;
  border-radius: 16px;
  border-width: 1px;
  box-sizing: border-box;
  padding: 15px 20px;
  width: 100%;
`;

const StyledButton = styled.button`
  background-color: rgba(96, 125, 139, 0.7);
  border-radius: 16px;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  padding: 15px;
  transition: background-color 0.3s;
  width: 100%;

  &:hover {
    background-color: #455a64;
  }
`;

const StyledError = styled.div`
  color: red;
  font-size: 14px;
`;
