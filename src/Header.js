import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";

import { userPool } from "./awsConfig";

export const Header = () => {
  const user = userPool.getCurrentUser();

  const navigate = useNavigate();

  const handleLogout = () => {
    if (user) {
      user.signOut();
      navigate("/");
    }
  };
  return (
    <HeaderStyle>
      <NavButton to="/">Home</NavButton>
      <ButtonContainer>
        {!user && <NavButton to="/auth">Auth</NavButton>}
        {user && <NavButton to="/lunch">Register for Lunch</NavButton>}
        {user && <LogoutButton onClick={handleLogout}>Logout</LogoutButton>}
      </ButtonContainer>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.nav`
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  left: 0;
  padding: 20px 40px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
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
  margin-right: 20px;
  padding: 10px 15px;
  text-decoration: none;
  transition: background 0.3s;

  &:hover {
    background: #455a64;
    color: white;
  }
`;

const LogoutButton = styled.button`
  background: rgba(96, 125, 139, 0.8);
  border-radius: 8px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-right: 20px;
  padding: 10px 15px;
  text-decoration: none;
  transition: background 0.3s;

  &:hover {
    background: #455a64;
    color: white;
  }
`;
