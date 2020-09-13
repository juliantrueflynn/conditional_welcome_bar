import React from 'react';
import {
  Card,
  Layout,
  Loading,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
} from '@shopify/polaris';

const LoadingSkeleton = () => (
  <>
    <Loading />
    <SkeletonPage primaryAction>
      <Layout>
        <Layout.Section>
          {Array.from({length: 3}).map((_, index) => (
            <Card sectioned key={index}>
              <TextContainer spacing="tight">
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={1} />
              </TextContainer>
            </Card>
          ))}
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  </>
);

export default LoadingSkeleton;
