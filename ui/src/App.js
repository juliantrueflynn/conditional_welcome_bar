import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppProvider, Toast } from '@shopify/polaris';
import { apiSetToken } from './util/apiUtil';
// import ShopifyLinkRouter from './components/ShopifyLinkRouter';
// import ShopifyAppRouter from './components/ShopifyAppRouter';
import AdminHome from './components/AdminHome';
import SingleBarView from './components/SingleBarView';
import withShopCookie from './hocs/withShopCookie';
import SingleBarDestroyModal from './components/SingleBarDestroyModal';

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
    const { shopOrigin } = this.props;
    apiSetToken(shopOrigin);
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
    const { shopOrigin } = this.props;
    const { shouldShowToast, toastContent, modalBarId } = this.state;
    const { REACT_APP_SHOPIFY_API_CLIENT_KEY } = process.env;

    console.log(shopOrigin);

    return (
      <AppProvider
        apiKey={REACT_APP_SHOPIFY_API_CLIENT_KEY}
        shopOrigin={shopOrigin}
        // linkComponent={(urlProps) => <ShopifyLinkRouter history={history} {...urlProps} />}
        forceRedirect
      >
        <BrowserRouter>
          {/* <ShopifyAppRouter location={location} /> */}          
          <Switch>
            <Route
              exact
              path="/"
              render={(route) => <AdminHome {...route} shopOrigin={shopOrigin} />}
            />
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
          {shouldShowToast && <Toast content={toastContent} onDismiss={this.handleToggleToast} />}
          <SingleBarDestroyModal
            barId={modalBarId}
            toggleModal={this.handleModalToggle}
            toggleToast={this.handleToggleToast}
          />
        </BrowserRouter>
      </AppProvider>
    );
  }
}

App.propTypes = {
  shopOrigin: PropTypes.string,
};

App.defaultProps = {
  shopOrigin: '',
};

export default withShopCookie(App);
