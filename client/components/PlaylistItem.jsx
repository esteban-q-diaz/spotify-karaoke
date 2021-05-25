import axios from 'axios';
import React, { useContext } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import AppContext from '../../context/AppContext';
import styled from '@emotion/styled';

const SongContainer = styled.div((props) => ({
  display: 'flex',
  height: '3rem',
  position: 'relative',
  padding: '0.3rem',
  marginRight: '0.5rem',
  borderRadius: '5px',
  boxShadow: props.playing && 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  backgroundColor: props.playing && '#6B1171',
}));

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 0.7rem;
  max-width: 70%;
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.textHover};
  }
`;

const Title = styled.h4`
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes.listTitleSize};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
`;

const Artist = styled.p`
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes.listArtistSize};
`;

const Image = styled.img`
  object-fit: contain;
`;

const TrashCan = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 16px;
  right: 8px;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.textHover};
  }
`;

function PlaylistItem({ song, index }) {
  const context = useContext(AppContext);

  const selectPlaylistTrack = (i) => {
    context.setPlaylistIdx(i);
  };

  const isPlaying = () => {
    if (!context.currentSong) return;
    return context.currentSong.uri === song.uri;
  };

  return (
    <SongContainer playing={isPlaying()}>
      <div style={{ display: 'flex', height: '100%', width: '90%' }}>
        <Image
          src={song.albumUrl}
          onClick={() => {
            selectPlaylistTrack(index);
          }}
        />

        <TextContainer
          onClick={() => {
            selectPlaylistTrack(index);
          }}
        >
          <Title>{song.title}</Title>
          <Artist>{song.artist}</Artist>
        </TextContainer>
      </div>

      <TrashCan
        onClick={() => {
          context.deleteSong(index);
        }}
      >
        <AiOutlineDelete size={22} />
      </TrashCan>
    </SongContainer>
  );
}

export default PlaylistItem;
