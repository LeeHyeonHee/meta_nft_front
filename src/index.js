import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import App_Login from './App_login';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddlerware from 'redux-promise';
import { CookiesProvider } from 'react-cookie';
import reduxThunk from 'redux-thunk';
import login from './components/login/login';
import { getCookie } from './components/utils/useCookie';

const createStoreWidthMiddleware = applyMiddleware(
  promiseMiddlerware,
  reduxThunk
)(createStore);

const isLogined = getCookie('userId');

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
