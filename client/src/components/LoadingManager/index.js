import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Loading,
  SkeletonPage,
  Card,
  Layout,
  TextContainer,
  SkeletonDisplayText,
  SkeletonBodyText,
} from '@shopify/polaris';

const LoadingManager = ({ children, isLoading, loadingTo }) => {
  if (!isLoading) {
    return <Fragment>{children}</Fragment>;
  }

  const skeletonTitle = loadingTo === 'home' ? 'Home' : null;

  const formSections = [
    { title: 'Editor', content: 'Edit welcome bar title or content.' },
    {
      title: 'Visibility',
      content: 'Set visibility status and which templates welcomebar displays.',
    },
    { title: 'Link', content: 'Settings for welcome bar link.' },
    { title: 'Display styles', content: 'Style the overall appearance.' },
    { title: 'Text styles', content: 'Style the welcome bar text.' },
    { title: 'Background styles', content: 'Style the background and or upload an image.' },
  ];

  let SkeletonChildren = formSections.map((formSection) => (
    <Layout.AnnotatedSection
      key={formSection.title}
      title={formSection.title}
      description={formSection.content}
    >
      <Card sectioned>
        <TextContainer>
          <SkeletonBodyText />
          <SkeletonBodyText />
        </TextContainer>
      </Card>
    </Layout.AnnotatedSection>
  ));
  
  if (loadingTo === 'home') {
    SkeletonChildren = (
      <Layout.Section>
        <Card sectioned>
          <TextContainer spacing="tight">
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText lines={1} />
          </TextContainer>
        </Card>
        <Card sectioned>
          <TextContainer spacing="tight">
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText lines={1} />
          </TextContainer>
        </Card>
        <Card sectioned>
          <TextContainer spacing="tight">
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText lines={1} />
          </TextContainer>
        </Card>
      </Layout.Section>
    );
  }

  return (
    <Fragment>
      <Loading />
      <SkeletonPage primaryAction title={skeletonTitle}>
        <Layout>{SkeletonChildren}</Layout>
      </SkeletonPage>
    </Fragment>
  );
};

LoadingManager.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  loadingTo: PropTypes.string.isRequired,
};

export default LoadingManager;
