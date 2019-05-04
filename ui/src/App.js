import React, { useState, useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { AppProvider, Toast } from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import { apiSetToken } from './util/apiUtil';
import ShopifyLinkRouter from './components/ShopifyLinkRouter';
import ShopifyAppRouter from './components/ShopifyAppRouter';
import AdminHome from './components/AdminHome';
import SingleBarView from './components/SingleBarView';
import SingleBarDestroyModal from './components/SingleBarDestroyModal';
import history from './util/historyUtil';
import { shopOrigin, isUserInAdmin } from './util/shopifyUtil';

const App = () => {
  const [shouldShowToast, setToast] = useState(false);
  const [toastContent, setToastContent] = useState('');
  const [modalBarId, setModalBarId] = useState(-1);

  useEffect(() => {
    if (shopOrigin() && isUserInAdmin()) {
      apiSetToken();
    }
  }, []);

  const handleToggleToast = (message) => {
    const toastContent = shouldShowToast ? '' : message;
    setToastContent(toastContent);
    setToast(!shouldShowToast);
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
      linkComponent={(urlProps) => <ShopifyLinkRouter history={history} {...urlProps} />}
      forceRedirect
    >
      <>
        <Router history={history}>
          <ShopifyAppRouter />
          <Switch>
            <Route exact path="/" component={AdminHome} />
            <Route
              path="/bars/:barId"
              render={(route) => (
                <SingleBarView
                  {...route}
                  toggleToast={handleToggleToast}
                  toggleModal={handleModalToggle}
                />
              )}
            />
          </Switch>
          <SingleBarDestroyModal
            barId={modalBarId}
            toggleModal={handleModalToggle}
            toggleToast={handleToggleToast}
          />
        </Router>
        {shouldShowToast && <Toast content={toastContent} onDismiss={handleToggleToast} />}
      </>
    </AppProvider>
  );
};

export default App;
