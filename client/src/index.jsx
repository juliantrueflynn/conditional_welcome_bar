import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import configureStore from './store'
import * as serviceWorker from './serviceWorker';
import App from './App';

ReactDOM.render(
  <Provider store={configureStore()}>
    <AppProvider>
      <App />
    </AppProvider>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
