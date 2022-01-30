import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle, css } from 'styled-components';

import App from './App';
import reportWebVitals from './reportWebVitals';

const GlobalStyle = createGlobalStyle(
  () => css`
    html,
    body,
    #root {
      height: 100%;
      background-color: #eeeeee;
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
  `
);

ReactDOM.render(
  <React.StrictMode>
    <App />
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
