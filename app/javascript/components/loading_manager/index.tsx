import React from 'react';
import {
  Loading,
  SkeletonPage,
  Card,
  Layout,
  TextContainer,
  SkeletonDisplayText,
  SkeletonBodyText,
} from '@shopify/polaris';

type Props = {
  isLoading: boolean;
  loadingTo: string;
  children: React.ReactNode;
};

export const FORM_SECTIONS = [
  { title: 'Editor', content: 'Edit welcome bar title or content.' },
  {
    title: 'Visibility',
    content: 'Set visibility status and which templates welcomebar displays.',
  },
  { title: 'Link', content: 'Settings for welcome bar link.' },
  { title: 'Display styles', content: 'Style the overall appearance.' },
  { title: 'Text styles', content: 'Style the welcome bar text.' },
  {
    title: 'Background styles',
    content: 'Style the background and or upload an image.',
  },
];

const LoadingManager: React.FC<Props> = ({
  children,
  isLoading,
  loadingTo,
}) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  const skeletonTitle = loadingTo === 'home' ? 'Home' : '';

  let SkeletonChildren: JSX.Element[] | JSX.Element = FORM_SECTIONS.map(
    (formSection) => (
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
    )
  );

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
    <>
      <Loading />
      <SkeletonPage primaryAction title={skeletonTitle}>
        <Layout>{SkeletonChildren}</Layout>
      </SkeletonPage>
    </>
  );
};

export default LoadingManager;
