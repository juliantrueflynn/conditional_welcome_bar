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
import {PAGE_TITLE} from './constants';

const SKELETON_BAR_COUNT = 3;

const LoadingSkeleton = () => (
  <>
    <Loading />
    <SkeletonPage title={PAGE_TITLE} primaryAction>
      <Layout>
        <Layout.Section>
          {Array.from({length: SKELETON_BAR_COUNT}).map((_, index) => (
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
