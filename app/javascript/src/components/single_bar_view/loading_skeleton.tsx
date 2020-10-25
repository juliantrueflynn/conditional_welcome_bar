import React from 'react';
import {Layout, Loading, SkeletonBodyText, SkeletonPage, TextContainer} from '@shopify/polaris';
import {FORM_SECTION_IDS} from './constants';
import {FieldGroup} from './form_fields';

const LoadingSkeleton = () => (
  <>
    <Loading />
    <SkeletonPage primaryAction secondaryActions={2}>
      <Layout>
        {FORM_SECTION_IDS.map((sectionId) => (
          <FieldGroup key={sectionId} id={sectionId}>
            <TextContainer>
              <SkeletonBodyText />
              <SkeletonBodyText />
            </TextContainer>
          </FieldGroup>
        ))}
      </Layout>
    </SkeletonPage>
  </>
);

export default LoadingSkeleton;
