import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider,createTheme} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
// import * as serviceWorker from './serviceWorker';
const root = ReactDOM.createRoot(document.getElementById('root'));
const theme =createTheme({
  palette:{
    mode: 'dark',
    primary: {
      main: '#7827e7',
    },
    secondary: {
      main: '#ea7ffc',
    },
    background: {
      default: '#14142b',
      paper: '#24263a',
    },
  },
  typography:{
    fontFamily: "'Poppins', sans-serif"
  },
})
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pa++++++++++ss a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// serviceWorker.register();