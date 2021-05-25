import React, { useState } from 'react';
import Playlist from './Playlist';
import SearchDrawer from './SearchDrawer';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { HiOutlineMusicNote } from 'react-icons/hi';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Container = styled.div((props) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100%',
  width: '19rem',
  backgroundColor: '#000000',
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  transition: '500ms ease-in',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
}));

const List = styled.div`
  height: 42%;
`;

const Logo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem 0 1rem 2rem;
  &:hover {
    cursor: pointer;
  }
`;

const Spotioke = styled.h5`
  text-decoration: none;
  color: #fff;
  font-size: 25px;
  font-weight: 700;
  margin: 0;
  margin-left: 0.5rem;
`;

const Links = styled.div`
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #fff;
  padding: 1rem 2rem;
`;

const SidebarLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  &:hover {
    cursor: pointer;
  }
  color: ${(props) => props.selected && props.theme.colors.textHover};
`;

const SidebarLinkText = styled.h5`
  margin: 0;
  margin-left: 10px;
  font-size: 1rem;
  font-weight: 600;
`;

const Logout = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  font-size: 15px;
  margin-top: 3rem;
  border: none;
  border-radius: 25px;
  width: 105px;
  height: 23px;
  align-self: center;
  &:hover {
    cursor: pointer;
  }
`;

const LogoutText = styled.h5`
  margin: 0;
  margin-left: 10px;
`;

const PlaylistAndSearch = ({ loggedOut, loggedIn, setCode }) => {
  const [viewPlaylist, setViewPlaylist] = useState(true);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const showPlaylist = () => {
    setViewPlaylist(true);
  };

  const showSearch = () => {
    setViewPlaylist(false);
  };

  return (
    <Container>
      <Logo>
        <div style={{ marginRight: '0.5rem' }}>
          <img
            className='logoIcon'
            src='https://ez-drum-kit.s3-us-west-1.amazonaws.com/chat.png'
            width='42px'
          />
        </div>
        <Spotioke>Spoti-oke</Spotioke>
      </Logo>

      <Links>
        <SidebarLink>
          <Link to={{ pathname: '/' }}>
            <div style={{ display: 'flex' }}>
              <AiOutlineHome size={22} />
            </div>
          </Link>
          <SidebarLinkText>
            <Link to={{ pathname: '/' }}>Home</Link>
          </SidebarLinkText>
        </SidebarLink>

        <SidebarLink onClick={showSearch} selected={!viewPlaylist}>
          <div style={{ display: 'flex' }}>
            <AiOutlineSearch size={22} />
          </div>
          <SidebarLinkText>Search</SidebarLinkText>
        </SidebarLink>

        <SidebarLink onClick={showPlaylist} selected={viewPlaylist}>
          <div style={{ display: 'flex' }}>
            <HiOutlineMusicNote size={22} />
          </div>
          <SidebarLinkText>Playlist</SidebarLinkText>
        </SidebarLink>
      </Links>

      <List>
        <Playlist viewPlaylist={viewPlaylist} />
        <SearchDrawer viewPlaylist={viewPlaylist} />
      </List>

      <Logout>
        <div>
          <RiLogoutCircleLine />
        </div>
        <LogoutText onClick={() => setCode(null)}>Log out</LogoutText>
      </Logout>
    </Container>
  );
};

export default PlaylistAndSearch;
