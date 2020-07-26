import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';
import '@shopify/polaris/dist/styles.css';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/app';

document.addEventListener('DOMContentLoaded', (): void => {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
  );
});
