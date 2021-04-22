import React, { useState, useEffect, useRef, useContext } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import SongContext from '../../context/SongContext';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
`;

const Button = styled.button`
  width: 50%;
  height: 2.5rem;
  background-color: #fff;
  border: 1px solid black;
  transition: 500ms ease-out;
  &:hover {
    cursor: pointer;
    background-color: #e0dfdf;
  }
`;

function AudioPlayer({ accessToken }) {
  if (!accessToken) return null;

  const [play, setPlay] = useState(false);
  const context = useContext(SongContext);

  useEffect(() => {
    if (!context.currentSong) return setPlay(false);
    setPlay(true);
  }, [context.currentSong]);

  const playerCallback = (state) => {
    if (!state.isPlaying) {
      setPlay(false);
      if (state.type === 'player_update' && state.position === 0) {
        context.nextSong();
      }
    }
  };

  return (
    <Container>
      <Button onClick={context.prevSong}>Previous</Button>
      <Button onClick={context.nextSong}>Next</Button>
      <SpotifyPlayer
        play={play}
        token={accessToken}
        showSaveIcon
        uris={context.currentSong ? [context.currentSong.uri] : []}
        callback={playerCallback}
      />
    </Container>
  );
}

export default AudioPlayer;
