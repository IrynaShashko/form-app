import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { userPool } from "./awsConfig";
 // Імпортуємо User Pool

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Очистити помилки перед новою спробою

    const authDetails = new AuthenticationDetails({
      Username: credentials.email,
      Password: credentials.password,
    });

    const user = new CognitoUser({
      Username: credentials.email,
      Pool: userPool,
    });
    console.info("user login", user);
    user.authenticateUser(authDetails, {
      onSuccess: (session) => {
        console.log("Login successful!", session);
        alert("Login successful!");
        navigate("/"); 
      },
      onFailure: (err) => {
        console.error("Login failed:", err);
        setError(err.message || "Login failed!");
      },
    });
  };

  return (
    <StyledContainer>
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
        {error && <StyledError>{error}</StyledError>}
        <StyledButton type="submit">Sign In</StyledButton>
      </StyledForm>
    </StyledContainer>
  );
};

export default Login;

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
