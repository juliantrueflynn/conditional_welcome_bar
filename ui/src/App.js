import React, { useState, useEffect } from 'react';
import { AppProvider, Toast } from '@shopify/polaris';
import { Router, Switch, Route } from 'react-router-dom';
import { apiSetToken } from './util/apiUtil';
import { shopOrigin, isUserInAdmin } from './util/shopifyUtil';
import history from './util/historyUtil';
import ShopifyLinkRouter from './components/ShopifyLinkRouter';
import SingleBarDestroyModal from './components/SingleBarDestroyModal';
import AlertsContextProvider from './contexts/AlertsContextProvider';
import ShopifyAppRouter from './components/ShopifyAppRouter';
import AdminHome from './components/AdminHome';
import SingleBarView from './components/SingleBarView';

const App = () => {
  const [toastContent, setToastContent] = useState('');
  const [modalBarId, setModalBarId] = useState(-1);

  useEffect(() => {
    if (shopOrigin() && isUserInAdmin()) {
      apiSetToken();
    }
  }, []);

  const handleToggleToast = (content = '') => {
    const message = content.length ? content : ''; // Ensure string, fixes Shopify bug.
    setToastContent(message);
  }

  const handleModalToggle = (modalBarId = -1) => setModalBarId(modalBarId);

  const { REACT_APP_SHOPIFY_API_CLIENT_KEY } = process.env;

  if (!isUserInAdmin()) {
    return (
      <div>
        This is static front page!
      </div>
    );
  }

  return (
    <AppProvider
      apiKey={REACT_APP_SHOPIFY_API_CLIENT_KEY}
      shopOrigin={shopOrigin()}
      linkComponent={ShopifyLinkRouter}
      forceRedirect
    >
      <AlertsContextProvider toggleModal={handleModalToggle} toggleToast={handleToggleToast}>
        <Router history={history}>
          <ShopifyAppRouter />
          <SingleBarDestroyModal barId={modalBarId} />
          <Switch>
            <Route exact path="/" component={AdminHome} />
            <Route path="/bars/:barId" component={SingleBarView} />
          </Switch>
        </Router>
        {toastContent && <Toast content={toastContent} onDismiss={handleToggleToast} />}
      </AlertsContextProvider>
    </AppProvider>
  );
};

export default App;
