import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AuthProvider } from "react-oidc-context";

import App from "./App";
import AuthToggle from "./Auth";
import Home from "./Home";
import Lunch from "./Lunch";

import reportWebVitals from "./reportWebVitals";

import "./index.css";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_pRzdJQJc2",
  client_id: "2hntcvkvp1o4gs63iehammbb5m",
  redirect_uri: "https://d84l1y8p4kdic.cloudfront.net",
  response_type: "code",
  scope: "phone openid email",
};

const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<AuthToggle />} />
        <Route path="lunch" element={<Lunch />} />
        {/* <Route path="login" element={<Login />} /> */}
        {/* <Route path="register" element={<Register />}/> */}
      </Route>
    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <Root />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
