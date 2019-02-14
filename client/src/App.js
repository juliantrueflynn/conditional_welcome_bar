import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route } from 'react-router-dom';
import { AppProvider, Toast } from '@shopify/polaris';
import ShopifyLinkRouter from './components/ShopifyLinkRouter';
import ShopifyAppRouter from './components/ShopifyAppRouter';
import AdminHome from './components/AdminHome';
import SingleBarView from './components/SingleBarView';
import withShopCookie from './hocs/withShopCookie';
// import LoadingManager from './components/LoadingManager';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shouldShowToast: false, toastContent: '' };
    this.handleToggleToast = this.handleToggleToast.bind(this);
  }

  handleToggleToast(message) {
    const { shouldShowToast } = this.state;
    const toastContent = shouldShowToast ? '' : message;
    this.setState({ shouldShowToast: !shouldShowToast, toastContent });
  }

  render() {
    const { shopOrigin, history } = this.props;
    const { shouldShowToast, toastContent } = this.state;
    const { SHOPIFY_API_CLIENT_KEY } = process.env;

    return (
      <AppProvider
        apiKey={SHOPIFY_API_CLIENT_KEY}
        shopOrigin={shopOrigin}
        linkComponent={(urlProps) => (
          <ShopifyLinkRouter history={history} {...urlProps} />
        )}
        forceRedirect={Boolean(shopOrigin)}
      >
        <Fragment>
          {/* <LoadingManager> */}
          <ShopifyAppRouter />
          <Switch>
            <Route exact path="/" component={AdminHome} />
            <Route path="/bars/:barId" render={(route) => (
              <SingleBarView {...route} toggleToast={this.handleToggleToast} />
            )} />
          </Switch>
          {/* </LoadingManager> */}
          {shouldShowToast && (
            <Toast content={toastContent} onDismiss={this.handleToggleToast} />
          )}
        </Fragment>
      </AppProvider>
    );
  }
}

App.propTypes = {
  shopOrigin: PropTypes.string,
  history: PropTypes.instanceOf(Object).isRequired,
};

App.defaultProps = {
  shopOrigin: '',
};

export default withRouter(withShopCookie(App));
