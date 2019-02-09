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
      </Layout>
    );
  }

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

  return (
    <Layout>
      {formSections.map((formSection) => (
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
      ))}
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
