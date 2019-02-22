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
    const { shopOrigin, history, location } = this.props;
    const { shouldShowToast, toastContent, modalBarId } = this.state;
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
                  <SingleBarView
                    {...route}
                    toggleToast={this.handleToggleToast}
                    toggleModal={this.handleModalToggle}
                  />
                )}
              />
            </Switch>
          )}
          {shouldShowToast && <Toast content={toastContent} onDismiss={this.handleToggleToast} />}
          <SingleBarDestroyModal
            barId={modalBarId}
            toggleModal={this.handleModalToggle}
            toggleToast={this.handleToggleToast}
          />
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
