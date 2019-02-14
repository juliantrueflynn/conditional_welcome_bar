import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { AppProvider } from '@shopify/polaris';
import AppRoutes from './components/AppRoutes';
import ShopifyLinkRouter from './components/ShopifyLinkRouter';
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
            <AppRoutes />
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
