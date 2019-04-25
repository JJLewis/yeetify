import React from 'react';
import logo from './logo.svg';
import AppBar from './AppBar';
import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
  typography: { useNextVariants: true },
});

const App: React.FC = () => {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <AppBar />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
