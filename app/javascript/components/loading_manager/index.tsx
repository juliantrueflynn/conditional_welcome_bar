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
import { FORM_SECTION_IDS } from '../../constants/form_sections';
import FieldGroup from '../form_fields/field_group';

type Props = {
  isLoading: boolean;
  loadingTo: string;
  children: React.ReactNode;
};

const LoadingManager: React.FC<Props> = ({
  children,
  isLoading,
  loadingTo,
}) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  const skeletonTitle = loadingTo === 'home' ? 'Home' : '';

  let SkeletonChildren: JSX.Element[] | JSX.Element = FORM_SECTION_IDS.map(
    (formSection) => (
      <FieldGroup key={formSection} id={formSection}>
        <TextContainer>
          <SkeletonBodyText />
          <SkeletonBodyText />
        </TextContainer>
      </FieldGroup>
    )
  );

  if (loadingTo === 'home') {
    SkeletonChildren = (
      <Layout.Section>
        {Array.from({ length: 3 }).map((_, index) => (
          <Card sectioned key={index}>
            <TextContainer spacing="tight">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={1} />
            </TextContainer>
          </Card>
        ))}
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
