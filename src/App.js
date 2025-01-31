import React from "react";
import { Outlet } from "react-router-dom";

import styled from "styled-components";

import { useAuth } from "react-oidc-context";
import { Header } from "./Header";

import { AuthProvider } from "./AuthContext";
import lunchImage from "./lunch.jpg";

const App = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  return (
    <AuthProvider>
      <Background>
        <Header />
        <MainContent>
          <Outlet />
        </MainContent>
      </Background>
    </AuthProvider>
  );
};

export default App;

const Background = styled.div`
  align-items: center;
  background-image: url(${lunchImage});
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  position: relative;
  &::before {
    content: "";
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;
