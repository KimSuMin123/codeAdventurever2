import React from 'react';
import { StartContainer, Title, LoginButton, GlobalStyle } from '../style/startstyle';
import background from '../img/background.png';

function Start(props) {
  return (
    <>
      <GlobalStyle />
      <StartContainer style={{ backgroundImage: `url(${background})` }}>
        <Title>Code</Title>
        <Title>Adventure</Title>
        <LoginButton onClick={() => props.setMode("LOGIN")}>
          Login to Start
        </LoginButton>
      </StartContainer>
    </>
  );
}

export default Start;
