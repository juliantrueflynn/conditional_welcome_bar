import React from 'react';
import { Layout, FormLayout, Card } from '@shopify/polaris';
import { FORM_SECTIONS } from '../../constants/form_sections';

type Props = {
  id: keyof typeof FORM_SECTIONS;
};

const FieldGroup: React.FC<Props> = ({ id, children }) => {
  const { title, description } = FORM_SECTIONS[id];

  return (
    <Layout.AnnotatedSection title={title} description={description}>
      <Card sectioned>
        <FormLayout>{children}</FormLayout>
      </Card>
    </Layout.AnnotatedSection>
  );
};

export default FieldGroup;
