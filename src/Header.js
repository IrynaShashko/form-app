import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";

import { useAuth } from "./AuthContext";

export const Header = () => {
  const { isAuthenticated, setIsAuthenticated, isRegistered, setIsRegistered } =
    useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false);
    setIsRegistered(false);
    navigate("/");
  };

  return (
    <HeaderStyle>
      <NavButton to="/">Home</NavButton>
      <ButtonContainer>
        {!isAuthenticated && !isRegistered && (
          <NavButton to="/auth">Sign In</NavButton>
        )}
        {isAuthenticated && (
          <NavButton to="/lunch">Register for Lunch</NavButton>
        )}
        {isAuthenticated && (
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        )}
      </ButtonContainer>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.nav`
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const NavButton = styled(Link)`
  background: rgba(96, 125, 139, 0.8);
  border-radius: 8px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 15px;
  text-decoration: none;
  transition: background 0.3s;

  &:hover,
  &:focus {
    background: #455a64;
  }
`;

const LogoutButton = styled.button`
  background: rgba(96, 125, 139, 0.8);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  outline: none;
  padding: 10px 15px;
  transition: background 0.3s;
  outline: none;

  &:hover,
  :focus {
    background: #455a64;
  }
`;
