import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Page, Layout } from '@shopify/polaris';
import { apiCreate } from '../../util/apiUtil';
import BarsList from '../BarsList';
import withShopCookie from '../../hocs/withShopCookie';

class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isActionLoading: false };
    this.handleActionClick = this.handleActionClick.bind(this);
    this.navigateToBar = this.navigateToBar.bind(this);
  }

  handleActionClick(e) {
    e.preventDefault();

    const { shopOrigin } = this.props;
    this.setState({ isActionLoading: true });

    apiCreate(`shops/${shopOrigin}/bars`)
      .then((payload) => this.navigateToBar(payload.id))
      .catch(() => {
        this.setState({ isActionLoading: false });
      });
  }

  navigateToBar(barId) {
    const { history } = this.props;
    history.push(`/bars/${barId}`);
  }

  render() {
    const { shopOrigin } = this.props;
    const { isActionLoading } = this.state;

    const primaryAction = {
      content: 'Create welcome bar',
      onAction: this.handleActionClick,
      loading: isActionLoading,
    };

    return (
      <Page title="Home" forceRender primaryAction={primaryAction}>
        <Layout>
          <Layout.Section>
            {shopOrigin && (
              <BarsList
                shopOrigin={shopOrigin}
                navigateToBar={this.navigateToBar}
                createWelcomeBar={this.handleActionClick}
              />
            )}
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}

AdminHome.propTypes = {
  shopOrigin: PropTypes.string.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(withShopCookie(AdminHome));
