import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@shopify/polaris/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/app';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('root'));
});
