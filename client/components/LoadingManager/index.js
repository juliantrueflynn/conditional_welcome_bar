import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import {
  Loading,
  Layout,
  TextContainer,
  SkeletonDisplayText,
  SkeletonBodyText,
  Card,
  SkeletonPage,
} from '@shopify/polaris';

class LoadingManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, loadingTo: props.router.route };
  }

  componentDidMount() {
    this.setState({ isLoading: false, loadingTo: null });

    Router.events.on('routeChangeStart', (url) => {
      this.setState({ isLoading: true, loadingTo: url });
    });

    Router.events.on('routeChangeComplete', () => {
      this.setState({ isLoading: false, loadingTo: null });
    });

    Router.events.on('routeChangeError', () => {
      this.setState({ isLoading: false, loadingTo: null });
    });
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
  router: PropTypes.shape({
    route: PropTypes.string,
  }).isRequired,
};

export default withRouter(LoadingManager);
