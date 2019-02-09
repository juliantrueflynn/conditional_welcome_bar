import React from 'react';
import PropTypes from 'prop-types';
import {
  Layout,
  SkeletonBodyText,
  Card,
  TextContainer,
  SkeletonDisplayText,
} from '@shopify/polaris';

const LoadingSkeletonLayout = ({ loadingTo }) => {
  if (loadingTo === '/') {
    return (
      <Layout>
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
      </Layout>
    );
  }

  return (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText />
          </TextContainer>
        </Card>
      </Layout.Section>
    </Layout>
  );
};

LoadingSkeletonLayout.propTypes = {
  loadingTo: PropTypes.string,
};

LoadingSkeletonLayout.defaultProps = {
  loadingTo: '',
};

export default LoadingSkeletonLayout;
