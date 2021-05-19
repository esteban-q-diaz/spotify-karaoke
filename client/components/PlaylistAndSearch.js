import React, { useState } from 'react';
import Playlist from './Playlist';
import SearchDrawer from './SearchDrawer';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";
import { HiOutlineMusicNote } from "react-icons/hi";
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';


const Container = styled.div((props) => ({
  position: 'fixed',
  top: '0%',
  left: 0,
  height: '100vh',
  backgroundColor: "#000000",
  width: '24rem',
  boxShadow: props.open && 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  transform: props.open ? '' : 'translateX(-100%)',
  transition: '500ms ease-in',
  zIndex: '0',
  }));


const OpenTab = styled.div`
  position: absolute;
  height: 4rem;
  width: 2rem;
  border-radius: 0 5px 5px 0;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  right: 0;
  top: 50%;
  transform: translate(100%, -50%);
  color: #fff;
  background-color: ${(props) => props.theme.colors.switch};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 300ms ease-out;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.switchHover};
  }
`;

const List = styled.div`
  height: 28rem;
`;

const Tabs = styled.div`
  height: 34rem;
  width: 20%;
  margin-bottom: 50px;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 15%;
  color: #fff;
  padding-top: 60%;
`;

const Logo = styled.div`
  margin-bottom: 65%;
  margin-top: -188%;
  display: flex;
  &:hover {
    cursor: pointer;
  };
  justify-content: center;
  width: 12rem;
`

const Image = styled.div`
`

const Spotioke = styled.a`
  text-decoration: none;
  display: flex;
  width: 12rem;
  align-items: center;
  justify-content: space-evenly;
  color: #fff;
  font-weight: 700;
  margin-left: 4%;
`;

const PlaylistTab = styled.div`
  margin-bottom: 40px;
  display: flex;
  &:hover {
    cursor: pointer;
  };
`;

const NavList = styled.div`

`;

const PlaylistTabText = styled.h5`
  margin: 0;
  margin-left: 20px;
`;

const Logout = styled.h5`
  margin-bottom: 27px;
  display: flex;
  &:hover {
    cursor: pointer;
  };
  width: 200px;
  background: white;
  display: flex;
  justify-content: center;
  font-size: 15px;
  margin-left: 135px;
  margin-top: 59px;
  border-radius: 25px;
  width: 105px;
  height: 23px;
  padding-top: 6px;
`;

const LogoutText = styled.h5`
  margin: 0;
  margin-left: 10px;
`;

const SearchTab = styled.div`
  display: flex;
  margin-bottom: 40px;
  &:hover {
    cursor: pointer;
  };
`;

const SearchTabText = styled.h5`
  margin: 0;
  margin-left: 20px;
`;

const PlaylistAndSearch = ({ loggedOut, loggedIn, setCode }) => {
  const [viewPlaylist, setViewPlaylist] = useState(true);
  const [open, setOpen] = useState(true);

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
    <Container open={open}>
      {/* <OpenTab onClick={handleOpen}>
        {open ? <FaChevronLeft /> : <FaChevronRight />}
      </OpenTab> */}


      <Tabs>
        <Logo>
          <Image>
              <img
                className='logoIcon'
                src='https://ez-drum-kit.s3-us-west-1.amazonaws.com/chat.png'
                width='42px'
              />
          </Image>

          <div>
            <Spotioke>Spoti-oke</Spotioke>
          </div>
        </Logo>

        <Link to={{ pathname: '/' }}>
          <PlaylistTab>
            <NavList>
              <AiOutlineHome />
            </NavList>
            <PlaylistTabText>
              Home
            </PlaylistTabText>
          </PlaylistTab>
        </Link>

        <SearchTab onClick={showSearch} viewPlaylist={viewPlaylist}>
          <NavList>
            <AiOutlineSearch />
          </NavList>
          <SearchTabText>
            Search
          </SearchTabText>
        </SearchTab>

        <PlaylistTab onClick={showPlaylist} viewPlaylist={viewPlaylist}>
          <NavList>
            <HiOutlineMusicNote />
          </NavList>
          <PlaylistTabText>
            Playlist
          </PlaylistTabText>
        </PlaylistTab>

      </Tabs>
      <List>
        <Playlist viewPlaylist={viewPlaylist} />
        <SearchDrawer viewPlaylist={viewPlaylist} />
      </List>



      <Logout>
          <NavList>
            <RiLogoutCircleLine />
          </NavList>
          <LogoutText onClick={() => setCode(null)}>
            Log out
          </LogoutText>
        </Logout>
    </Container>
  );
};

export default PlaylistAndSearch;

/* SEARCH TAB
 /* width: 50%;
  height: ${(props) => (props.viewPlaylist ? '100%' : '110%')};
  border-radius: ${(props) =>
    props.viewPlaylist ? '0 5px 0 0' : '5px 5px 0 0'};
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.viewPlaylist ? '#b9b9b9' : '#fff')};
  /* &:hover {
    cursor: pointer;
  }; */

  /* PLAYLIST TAB
  /* width: 50%;
  height: ${(props) => (props.viewPlaylist ? '110%' : '100%')};
  border-radius: ${(props) =>
    props.viewPlaylist ? '5px 5px 0 0' : '5px 0 0 0'};
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: ${(props) => (props.viewPlaylist ? '#fff' : '#b9b9b9')}; */
  /* &:hover {
    cursor: pointer;
  }; */
