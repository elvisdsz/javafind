import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';

const useStyles = makeStyles({
  main: {
    height: "100vh",
    overflow: "hidden"
  },
});

function App() {
  const classes = useStyles();
  return (
    <Box /*className={classes.main}*/>
      {/*<NavBar searchPanel={true} showSearchPanel={()=>{}} />*/}
      <Home />
    </Box>
  );
}

export default App;
