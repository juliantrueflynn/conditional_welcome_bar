import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AppRoutes from './components/AppRoutes';
import ShopifyAppProvider from './components/ShopifyAppProvider';
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

    return (
      <ShopifyAppProvider
        shopOrigin={shopOrigin}
        history={history}
        toggleToast={this.handleToggleToast}
        shouldShowToast={shouldShowToast}
        toastContent={toastContent}
      >
        {/* <LoadingManager> */}
          <AppRoutes />
        {/* </LoadingManager> */}
      </ShopifyAppProvider>
    );
  }
}

ShopifyAppProvider.propTypes = {
  shopOrigin: PropTypes.string.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(withShopCookie(App));
