import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { BiChevronDownCircle } from 'react-icons/bi';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: ${(props) => props.theme.colors.secondary};
  color: #fff;
`;

const Title = styled.h1`
  font-size: 5rem;
  margin-top: 0;
  text-align: center;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: -30px;
`;

const Button = styled.button`
  border: none;
  border-radius: 50px;
  height: 50px;
  width: 250px;
  background-color: ${(props) => props.theme.colors.button};
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  transition: 300ms ease-out;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.buttonHover};
  }
  &:active {
    background-color: ${(props) => props.theme.colors.button};
  }
`;

const bounce = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const IconContainer = styled.div`
  position: absolute;
  bottom: 130px;
  animation: ${bounce} 1.5s ease-out infinite;
  &:hover {
    cursor: pointer;
  }
`;

function HeaderLoggedIn({ dashboardRef }) {
  const handleIconClick = () => {
    dashboardRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container>
      <Title>Sing Aloud. Be Happy</Title>
      <ButtonContainer>
        <Link to='/playlist'>
          <Button>MY PLAYLIST</Button>
        </Link>
      </ButtonContainer>
      <br/>
      <div className='video'>
        <iframe src="https://www.youtube.com/embed/tc85Ajjor5M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <IconContainer onClick={handleIconClick}>
        <ChevronIcon />
      </IconContainer>
    </Container>
  );
}

export default HeaderLoggedIn;

function ChevronIcon() {
  return (
    <IconContext.Provider value={{ color: 'white' }}>
      <BiChevronDownCircle size='50px' />
    </IconContext.Provider>
  );
}
