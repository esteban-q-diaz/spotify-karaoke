import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useLocation } from 'react-router';
import axios from 'axios';
import PlaylistItem from './PlaylistItem';
import AppContext from '../../context/AppContext';
import styled from '@emotion/styled';
import { CgScrollV } from "react-icons/cg"

const PlaylistContainer = styled.div((props) => ({
  backgroundColor: '#000',
  margin: 0,
  padding: '0.5rem',
  boxShadow: props.open ? 'rgba(0, 0, 0, 0.35) 0px 5px 15px' : 'none',
  color: '#fff',
  transition: '500ms ease-in',
  height: '100%',
  display: props.viewPlaylist ? '' : 'none',
  borderTop: "1px solid #696768",
  borderBottom: "1px solid #313031",
}));

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
        border: 0px solid black;
        background: 'red'
    };
    &::-webkit-scrollbar-thumb {
        width: 10px;
        border: 1px solid #696768;
        color: 'red';
        background: 'purple';
        background-color: 'red'
    }
`;

function Playlist({ viewPlaylist }) {
  const context = useContext(AppContext);
  const playlist = context.playlist;
  const [playlistOpen, setPlaylistOpen] = useState(true);

  const toggleOpenPlaylist = () => {
    setPlaylistOpen((prev) => !prev);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const songs = [...playlist];
    const [draggedItem] = songs.splice(result.source.index, 1);
    songs.splice(result.destination.index, 0, draggedItem);

    // If drag & drop affects position of playing song
    if (result.source.index === context.playlistIdx) {
      context.setPlaylistIdx(result.destination.index);
    } else if (
      result.source.index > context.playlistIdx &&
      result.destination.index <= context.playlistIdx
    ) {
      context.setPlaylistIdx((prev) => prev + 1);
    } else if (
      result.source.index < context.playlistIdx &&
      result.destination.index <= context.playlistIdx
    ) {
      context.setPlaylistIdx((prev) => prev - 1);
    }

    context.setPlaylist(songs);
  }

  return (
    <PlaylistContainer viewPlaylist={viewPlaylist} open={playlistOpen}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='songs'>
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {playlist.map((song, index) => (
                <Draggable key={song.uri} draggableId={song.uri} index={index}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <PlaylistItem song={song} index={index} />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </PlaylistContainer>
  );
}

export default Playlist;
