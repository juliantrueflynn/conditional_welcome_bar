import React, { useState } from 'react';
import isEqual from 'lodash/isEqual';
import { UPDATE_BAR } from '../../utilities/graphql_utilities';
import { BarType, Bar } from '../../types/bar';
import { BarFormProps, FieldChangeValue } from '../../types/fields';
import { useMutation } from '@apollo/react-hooks';
import { Page, Form } from '@shopify/polaris';
import SingleBarFormFields from '../single_bar_form_fields';
import { barFalseMap } from '../../utilities/single_bar_utilities';

type Props = {
  readonly bar: BarType;
};

const SingleBar: React.FC<Props> = ({ bar }) => {
  const [hasDirtyState, setHasDirtyState] = useState<boolean>(false);
  const [dirtyValues, setDirtyInputs] = useState<BarFormProps>(barFalseMap);
  const [fieldsValues, setFieldsValues] = useState<BarType>(bar);

  const onFormComplete = (): void => {
    setHasDirtyState(false);
    setDirtyInputs(barFalseMap);
  };

  const [updateBar, { loading, data: formData }] = useMutation(UPDATE_BAR, {
    onCompleted: onFormComplete,
  });

  const handleUpdate = (): void => {
    const { __typename, ...attributes } = fieldsValues;
    updateBar({ variables: { input: attributes } });
  };

  const handleFieldValueChange = (value: FieldChangeValue, id: Bar): void => {
    let nextValue = value;
    let hasChanged = bar[id] !== value;

    if (Array.isArray(bar[id])) {
      nextValue = value;
      hasChanged = !isEqual(bar[id], value);
    } else if (Array.isArray(value)) {
      nextValue = value[0];
      hasChanged = bar[id] !== value[0];
    }

    setHasDirtyState(hasChanged);
    setFieldsValues({ ...fieldsValues, [id]: nextValue });
    setDirtyInputs({ ...dirtyValues, [id]: true });
  };

  const primaryAction = {
    content: 'Save',
    onAction: handleUpdate,
    disabled: !hasDirtyState,
    loading,
  };
  const secondaryActions = [
    {
      content: 'Delete',
      destructive: true,
      onAction: (): void => console.log('delete'),
    },
    {
      content: 'Discard',
      disabled: !hasDirtyState,
      onAction: (): void => console.log('discard'),
    },
  ];

  const errors =
    (formData && formData.updateBar && formData.updateBar.errors) || {};

  return (
    <Page
      title={bar.title}
      primaryAction={primaryAction}
      secondaryActions={secondaryActions}
    >
      <Form onSubmit={handleUpdate}>
        <SingleBarFormFields
          updateFieldValue={handleFieldValueChange}
          dirtyValues={dirtyValues}
          errors={errors}
          fields={fieldsValues}
        />
      </Form>
    </Page>
  );
};

export default SingleBar;
