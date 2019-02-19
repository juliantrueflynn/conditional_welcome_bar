import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route } from 'react-router-dom';
import { AppProvider, Toast } from '@shopify/polaris';
import { apiSetToken } from './util/apiUtil';
import ShopifyLinkRouter from './components/ShopifyLinkRouter';
import ShopifyAppRouter from './components/ShopifyAppRouter';
import AdminHome from './components/AdminHome';
import SingleBarView from './components/SingleBarView';
import withShopCookie from './hocs/withShopCookie';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shouldShowToast: false, toastContent: '' };
    this.handleToggleToast = this.handleToggleToast.bind(this);
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

  render() {
    const { shopOrigin, history, location } = this.props;
    const { shouldShowToast, toastContent } = this.state;
    const { SHOPIFY_API_CLIENT_KEY } = process.env;

    return (
      <AppProvider
        apiKey={SHOPIFY_API_CLIENT_KEY}
        shopOrigin={shopOrigin}
        linkComponent={(urlProps) => <ShopifyLinkRouter history={history} {...urlProps} />}
        forceRedirect
      >
        <Fragment>
          <ShopifyAppRouter location={location} />
          {shopOrigin && (
            <Switch>
              <Route
                exact
                path="/"
                render={(route) => <AdminHome {...route} shopOrigin={shopOrigin} />}
              />
              <Route
                path="/bars/:barId"
                render={(route) => (
                  <SingleBarView {...route} toggleToast={this.handleToggleToast} />
                )}
              />
            </Switch>
          )}
          {shouldShowToast && <Toast content={toastContent} onDismiss={this.handleToggleToast} />}
        </Fragment>
      </AppProvider>
    );
  }
}

App.propTypes = {
  shopOrigin: PropTypes.string,
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
};

App.defaultProps = {
  shopOrigin: '',
};

export default withRouter(withShopCookie(App));
