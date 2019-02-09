import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Loading,
  Layout,
  TextContainer,
  SkeletonDisplayText,
  SkeletonBodyText,
  Card,
  SkeletonPage,
} from '@shopify/polaris';

const LoadingManager = ({ isLoading, loadingTo, children }) => {
  if (!isLoading) {
    return <Fragment>{children}</Fragment>;
  }

  let SkeletonContent = (
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

  if (loadingTo !== '/') {
    SkeletonContent = (
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
  }

  return (
    <Fragment>
      <Loading />
      <SkeletonPage primaryAction>
        <Layout>{SkeletonContent}</Layout>
      </SkeletonPage>
    </Fragment>
  );
};

LoadingManager.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  loadingTo: PropTypes.string,
};

LoadingManager.defaultProps = {
  loadingTo: '',
};

export default LoadingManager;
