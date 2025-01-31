import React from "react";

import styled from "styled-components";

const Home = () => {
  return (
    <Content>
      <h1>Welcome to Our Event</h1>
    </Content>
  );
};

export default Home;

const Content = styled.div`
  color: white;
  font-size: 36px;
  position: relative;
  text-align: center;
`;
