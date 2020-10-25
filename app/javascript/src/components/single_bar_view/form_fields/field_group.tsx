import React from 'react';
import {Layout, FormLayout, Card} from '@shopify/polaris';
import {FORM_SECTIONS} from '../constants';

type Props = {
  id: keyof typeof FORM_SECTIONS;
  children: React.ReactNode;
};

const FieldGroup = ({id, children}: Props) => {
  const {title, description} = FORM_SECTIONS[id];

  return (
    <Layout.AnnotatedSection title={title} description={description}>
      <Card sectioned>
        <FormLayout>{children}</FormLayout>
      </Card>
    </Layout.AnnotatedSection>
  );
};

export default FieldGroup;
