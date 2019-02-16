import React from 'react';
import PropTypes from 'prop-types';
import { Page, Layout } from '@shopify/polaris';
import { apiCreate, apiFetch } from '../../util/apiUtil';
import LoadingManager from '../LoadingManager';
import BarsList from '../BarsList';
import withLoading from '../../hocs/withLoading';

class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bars: [], isActionLoading: false };
    this.handleActionClick = this.handleActionClick.bind(this);
    this.navigateToBar = this.navigateToBar.bind(this);
  }

  componentDidMount() {
    const { shopOrigin, toggleLoading } = this.props;

    apiFetch(`shops/${shopOrigin}/bars`).then((bars) => {
      toggleLoading();
      this.setState({ bars });
    });
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
    const { isLoading } = this.props;
    const { bars, isActionLoading } = this.state;

    const primaryAction = {
      content: 'Create welcome bar',
      onAction: this.handleActionClick,
      loading: isActionLoading,
    };

    return (
      <LoadingManager loadingTo="home" isLoading={isLoading}>
        <Page title="Home" forceRender primaryAction={primaryAction}>
          <Layout>
            <Layout.Section>
              <BarsList
                bars={bars}
                navigateToBar={this.navigateToBar}
                createWelcomeBar={this.handleActionClick}
                isActionLoading={isActionLoading}
                isLoading={isLoading}
              />
            </Layout.Section>
          </Layout>
        </Page>
      </LoadingManager>
    );
  }
}

AdminHome.propTypes = {
  shopOrigin: PropTypes.string.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  toggleLoading: PropTypes.func.isRequired,
};

export default withLoading(AdminHome);
