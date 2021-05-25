import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import { AiOutlinePlus } from 'react-icons/ai';
import styled from '@emotion/styled';

const SongContainer = styled.li`
  display: flex;
  height: 3rem;
  position: relative;
  padding: 0.3rem;
  margin-right: 0.5rem;
  border-radius: 5px;
  transition: 200ms ease-out;
  border: 1px solid transparent;
  &:hover {
    color: ${(props) => props.theme.colors.textHover};
    cursor: pointer;
  }
  &:active {
    background-color: #b9b9b9;
  }
`;

const ImageAndText = styled.div`
  display: flex;
  height: 100%;
  max-width: 90%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 0.7rem;
  max-width: 70%;
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

const Plus = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 16px;
  right: 8px;
`;

const SearchDrawerItem = ({ track }) => {
  const [added, setAdded] = useState(false);
  const context = useContext(AppContext);

  return (
    <SongContainer
      onClick={() => {
        context.addToPlaylist(track);
        setAdded(true);
      }}
    >
      <ImageAndText>
        <Image src={track.albumUrl} />
        <TextContainer>
          <Title>{track.title}</Title>
          <Artist>{track.artist}</Artist>
        </TextContainer>
      </ImageAndText>

      {!added && (
        <Plus>
          <AiOutlinePlus size={25} />
        </Plus>
      )}
      {/* {added && <Plus>Added!</Plus>} */}
    </SongContainer>
  );
};

export default SearchDrawerItem;
