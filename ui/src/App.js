import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { AppProvider, Toast } from '@shopify/polaris';
import { apiSetToken } from './util/apiUtil';
import ShopifyLinkRouter from './components/ShopifyLinkRouter';
import ShopifyAppRouter from './components/ShopifyAppRouter';
import AdminHome from './components/AdminHome';
import SingleBarView from './components/SingleBarView';
import SingleBarDestroyModal from './components/SingleBarDestroyModal';
import history from './util/historyUtil';
import { getShopOrigin } from './util/shopifyUtil';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowToast: false,
      toastContent: '',
      modalBarId: -1,
    };
    this.handleToggleToast = this.handleToggleToast.bind(this);
    this.handleModalToggle = this.handleModalToggle.bind(this);
  }

  componentDidMount() {
    if (getShopOrigin) {
      apiSetToken();
    }
  }

  handleToggleToast(message) {
    const { shouldShowToast } = this.state;
    const toastContent = shouldShowToast ? '' : message;
    this.setState({ shouldShowToast: !shouldShowToast, toastContent });
  }

  handleModalToggle(modalBarId = -1) {
    this.setState({ modalBarId });
  }

  render() {
    const { shouldShowToast, toastContent, modalBarId } = this.state;
    const { REACT_APP_SHOPIFY_API_CLIENT_KEY } = process.env;

    console.log({ getShopOrigin });

    if (!getShopOrigin) {
      return (
        <div>
          This is static front page!
        </div>
      );
    }

    return (
      <AppProvider
        apiKey={REACT_APP_SHOPIFY_API_CLIENT_KEY}
        shopOrigin={getShopOrigin}
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
                    toggleToast={this.handleToggleToast}
                    toggleModal={this.handleModalToggle}
                  />
                )}
              />
            </Switch>
            <SingleBarDestroyModal
              barId={modalBarId}
              toggleModal={this.handleModalToggle}
              toggleToast={this.handleToggleToast}
            />
          </Router>
          {shouldShowToast && <Toast content={toastContent} onDismiss={this.handleToggleToast} />}
        </>
      </AppProvider>
    );
  }
}

export default App;
