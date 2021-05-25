import React, { useState, useEffect, useRef } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useLocation,
  withRouter,
} from 'react-router-dom';
import NavBar from './NavBar';
import NavLoggedIn from './NavLoggedIn';
import Header from './Header';
import HeaderLoggedIn from './HeaderLoggedIn';
import Dashboard from './Dashboard';
import Lyrics from './Lyrics';
import Playlist from './Playlist';
import { AppContextProvider } from '../../context/AppContext';
import SearchDrawer from './SearchDrawer';
import AudioPlayer from './AudioPlayer';
import { jsx, ThemeProvider } from '@emotion/react';
import PlaylistAndSearch from './PlaylistAndSearch';

const theme = {
  colors: {
    primary:
      'linear-gradient(114deg, rgba(0,102,255,1) 0%, rgba(189,1,255,1) 100%)',
    secondary: '#ee7a62',
    button: '#1BB954',
    buttonHover: '#00FFC2',
    switch: '#0066FF',
    switchHover: '#5C9DFF',
    textHover: '#FAA75B',
    lyricsBg: '#e9c46a',
    lyricsText: 'white',
  },
  fontSizes: {
    listTitleSize: '0.8rem',
    listArtistSize: '0.7rem',
  },
};

function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}
const ScrollToTop = withRouter(_ScrollToTop);

function App() {
  const [code, setCode] = useState(null);

  const dashboardRef = useRef();

  useEffect(() => {
    setCode(new URLSearchParams(window.location.search).get('code'));
  }, []);

  if (!code) {
    return (
      <ThemeProvider theme={theme}>
        <NavBar loggedOut />
        <Header />
      </ThemeProvider>
    );
  }

  return (
    <AppContextProvider code={code}>
      <ThemeProvider theme={theme}>
        <Router>
          <ScrollToTop>
            <Switch>
              <Route path='/' exact>
                <NavBar setCode={setCode} code={code} loggedIn />
                <HeaderLoggedIn dashboardRef={dashboardRef} />
                <Dashboard dashboardRef={dashboardRef} code={code} />
              </Route>

              <Route path='/playlist' exact>
                <PlaylistAndSearch setCode={setCode} code={code} loggedIn />
                <Lyrics />
              </Route>
            </Switch>
          </ScrollToTop>
        </Router>
        <AudioPlayer />
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default App;
