import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import AppContext from '../../context/AppContext';
import styled from '@emotion/styled';

const LyricsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: rgb(158,0,255);
  background: linear-gradient(114deg, rgba(158,0,255,1) 0%, rgba(244,1,138,1) 63%, rgba(250,167,91,1) 86%, rgba(254,61,20,1) 100%);
  color: ${(props) => props.theme.colors.lyricsText};
  min-height: 100vh;
  margin-left: 19rem;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 3.5vw;
`;

const SongLyrics = styled.p`
  text-align: center;
  line-height: 1.6;
  white-space: pre;
  font-size: 2vw;
`;

function Lyrics() {
  const context = useContext(AppContext);
  const [lyrics, setLyrics] = useState('');
  const [scrollInterval, setScrollInterval] = useState(null);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    clearInterval(scrollInterval);
    setScrollInterval(null);
    if (!level) return;

    setScrollInterval(
      setInterval(() => {
        window.scrollBy({
          top: 1,
          behavior: 'smooth',
        });
      }, 60 * level)
    );

    return () => clearInterval(scrollInterval);
  }, [level]);

  useEffect(() => {
    if (!context.currentSong) return;

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    window.scrollTo(0, 0);
    setLyrics('');

    axios
      .get('http://localhost:3000/lyrics', {
        cancelToken: source.token,
        params: {
          track: context.currentSong.title,
          artist: context.currentSong.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Request cancelled!');
        }
      });

    return () => source.cancel();
  }, [context.currentSong]);

  if (!lyrics) {
    return (
      <LyricsContainer>
        <h4>Loading...</h4>
      </LyricsContainer>
    );
  }

  if (!context.currentSong) return null;

  return (
    <LyricsContainer>
      <Title>
        {context.currentSong.title}
        <br />
        by {context.currentSong.artist}
      </Title>
      <SongLyrics>{lyrics}</SongLyrics>


      <div className='mouse_scroll'>
        <div
          className='mouse'
          onClick={() => {
            setLevel((prev) => {
              if (prev === 0) return 3;
              return prev - 1;
            });
          }}
        >
          <div className='wheel'></div>
        </div>
        <div>
          {level > 0 && level <= 3 && (
            <span className='m_scroll_arrows unu'></span>
          )}
          {level <= 2 && level >= 1 && (
            <span className='m_scroll_arrows doi'></span>
          )}
          {level === 1 && <span className='m_scroll_arrows trei'></span>}
        </div>
      </div>
    </LyricsContainer>
  );
}

export default Lyrics;
