import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Page } from '@shopify/polaris';
import { apiFetch, apiCreate } from '../util/apiUtil';
import { navigateToBar } from '../util/linkUtil';
import BarsList from '../components/BarsList';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isActionLoading: false };
    this.handleActionClick = this.handleActionClick.bind(this);
  }

  handleActionClick(e) {
    e.preventDefault();

    const { shopOrigin } = this.props;
    this.setState({ isActionLoading: true });

    apiCreate(`shops/${shopOrigin}/bars`)
      .then((payload) => {
        navigateToBar(payload);
      })
      .catch(() => {
        this.setState({ isActionLoading: false });
      });
  }

  render() {
    const { bars } = this.props;
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
            <BarsList bars={bars} createWelcomeBar={this.handleActionClick} />
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}

Index.propTypes = {
  bars: PropTypes.instanceOf(Array),
  shopOrigin: PropTypes.string,
};

Index.defaultProps = {
  bars: [],
  shopOrigin: '',
};

Index.getInitialProps = async (_, shopOrigin) => {
  if (!shopOrigin) {
    return { bars: [] };
  }

  const response = await apiFetch(`shops/${shopOrigin}/bars`);

  return { bars: response, shopOrigin };
};

export default Index;
