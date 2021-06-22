import { Box, createMuiTheme, makeStyles, Switch, ThemeProvider } from '@material-ui/core';
import { deepOrange, deepPurple, lightBlue, orange } from '@material-ui/core/colors';
import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
//import { darkTheme } from './theme/dark-theme';
//import { lightTheme } from './theme/light-theme';

const useStyles = makeStyles({
  main: {
    height: "100vh",
    overflow: "hidden"
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
      height: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      backgroundColor: '#1e1e24',
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(102,73,184,.7)',
    }
  }
});

function App() {
  const classes = useStyles();

  const [darkThemeOn, setDarkThemeOn] = useState(false);
  const palletType = darkThemeOn ? "dark" : "light";
  
  const mainPrimaryColor = darkThemeOn ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkThemeOn ? deepOrange[900] : deepPurple[500];
  const backgroundDefault = darkThemeOn ? '#303030' : '#f1f1f1';

  const currentTheme = createMuiTheme({
    palette: {
      /*
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      },
      background: {
        default: backgroundDefault
      }*/
      type: darkThemeOn?'dark':'light'
    }
  });

  const toggleTheme = () => {
    console.log("Changing theme from dark= "+darkThemeOn)
    setDarkThemeOn(!darkThemeOn);
  }

  return (
    <ThemeProvider theme={currentTheme}>
      {/*<Switch checked={darkThemeOn} onChange={toggleTheme} />*/}
      <Box /*className={classes.main}*/ bgcolor="background.default" >
        {/*<NavBar searchPanel={true} showSearchPanel={()=>{}} />*/}
        <Home theme={darkThemeOn} toggleTheme={toggleTheme} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
