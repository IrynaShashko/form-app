import React, { useState } from "react";

import styled from "styled-components";

import Login from "./Login";
import Register from "./Register";

const AuthToggle = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <StyledContainer>
      {isLogin ? <Login /> : <Register />}{" "}
      <StyledButton onClick={toggleForm}>
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </StyledButton>
    </StyledContainer>
  );
};

export default AuthToggle;

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
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
