import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import {
  Card,
  Layout,
  Loading,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
} from '@shopify/polaris';

class LoadingManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, loadingTo: props.router.route };
    this.handleUpdateLoading = this.handleUpdateLoading.bind(this);
  }

  componentDidMount() {
    this.handleUpdateLoading(null);
    Router.events.on('routeChangeStart', this.handleUpdateLoading);
    Router.events.on('routeChangeComplete', () => this.handleUpdateLoading(null));
    Router.events.on('routeChangeError', () => this.handleUpdateLoading(null));
  }

  handleUpdateLoading(loadingTo) {
    const isLoading = !!loadingTo;
    this.setState({ isLoading, loadingTo });
  }

  render() {
    const { children } = this.props;
    const { isLoading, loadingTo } = this.state;

    if (!isLoading) {
      return children;
    }

    let SkeletonContent = (
      <Fragment>
        <Layout.Section>
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText />
            </TextContainer>
          </Card>
        </Layout.Section>
      </Fragment>
    );

    if (loadingTo === '/') {
      SkeletonContent = (
        <Fragment>
          <Layout.Section>
            <Card sectioned>
              <SkeletonBodyText />
            </Card>
            <Card sectioned>
              <SkeletonBodyText />
            </Card>
            <Card sectioned>
              <SkeletonBodyText />
            </Card>
            <Card sectioned>
              <SkeletonBodyText />
            </Card>
            <Card sectioned>
              <SkeletonBodyText />
            </Card>
          </Layout.Section>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Loading />
        <SkeletonPage primaryAction>
          <Layout>{SkeletonContent}</Layout>
        </SkeletonPage>
      </Fragment>
    );
  }
}

LoadingManager.propTypes = {
  children: PropTypes.node.isRequired,
  router: PropTypes.shape({ route: PropTypes.string }).isRequired,
};

export default withRouter(LoadingManager);
