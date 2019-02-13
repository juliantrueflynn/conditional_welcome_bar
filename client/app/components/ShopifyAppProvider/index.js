import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { AppProvider, Toast } from '@shopify/polaris';
import Cookies from 'js-cookie';
import queryString from 'query-string';
import ShopifyLinkRouter from '../ShopifyLinkRouter';

class ShopifyAppProvider extends React.Component {
  state = {
    shopOrigin: null,
  };

  componentDidMount() {
    const { location } = this.props;
    const { shop } = queryString.parse(location.search);
    const shopOrigin = Cookies.get('shopOrigin') || shop;
    this.setState({ shopOrigin });
  }

  render() {
    const { children, shouldShowToast, toastContent, toggleToast, history } = this.props;
    const { shopOrigin } = this.state;
    const { SHOPIFY_API_CLIENT_KEY } = process.env;

    if (!shopOrigin) {
      return (
        <AppProvider>
          <Fragment>{children}</Fragment>
        </AppProvider>
      );
    }

    return (
      <AppProvider
        // eslint-disable-next-line no-undef
        apiKey={SHOPIFY_API_CLIENT_KEY}
        shopOrigin={shopOrigin}
        linkComponent={(urlProps) => (
          <ShopifyLinkRouter history={history} {...urlProps} />
        )}
        forceRedirect
      >
        <Fragment>
          {children}
          {shouldShowToast && <Toast content={toastContent} onDismiss={toggleToast} />}
        </Fragment>
      </AppProvider>
    );
  }
};

ShopifyAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
  shouldShowToast: PropTypes.bool.isRequired,
  toggleToast: PropTypes.func.isRequired,
  toastContent: PropTypes.string.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(ShopifyAppProvider);
