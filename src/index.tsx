import React from 'react';
import ReactDOM from 'react-dom';
import {
  Global,
  css,
  ThemeProvider as EmotionThemeProvider,
} from '@emotion/react';
import { createTheme } from '@mui/material';

import App from './App';
import reportWebVitals from './reportWebVitals';

const globalStyles = css`
  html,
  body,
  #root {
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  * {
    box-sizing: border-box;
  }
`;

// Pass the base MUI theme into Emotion so that it is accessible by Emotion's styled
ReactDOM.render(
  <React.StrictMode>
    <EmotionThemeProvider theme={createTheme()}>
      <App />
      <Global styles={globalStyles} />
    </EmotionThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
