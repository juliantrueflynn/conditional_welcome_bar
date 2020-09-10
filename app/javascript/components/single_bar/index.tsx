import React, { useState } from 'react';
import isEqual from 'lodash/isEqual';
import { Page, Form } from '@shopify/polaris';
import { BarType, Bar } from '../../types/bar';
import { UPDATE_BAR } from '../../utilities/graphql_tags';
import { FieldChangeValue } from '../../types/fields';
import { useMutation } from '@apollo/client';
import SingleBarFormFields from '../single_bar_form_fields';
import { barFalseMap } from '../../utilities/single_bar_utilities';
import { getFieldErrorsMap } from '../../utilities/get_field_errors_map';
import ModalDestroyBar from '../modal_destroy_bar';

type Props = {
  readonly bar: BarType;
};

const SingleBar = ({ bar }: Props) => {
  const [hasDirtyState, setHasDirtyState] = useState(false);
  const [dirtyValues, setDirtyInputs] = useState(barFalseMap);
  const [fieldsValues, setFieldsValues] = useState(bar);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateBar, { loading, data: formData }] = useMutation(UPDATE_BAR, {
    onCompleted: () => {
      setHasDirtyState(false);
      setDirtyInputs(barFalseMap);
    },
  });

  const handleUpdate = () => {
    const { __typename, ...attributes } = fieldsValues;
    updateBar({ variables: { input: attributes } });
  };

  const handleFieldValueChange = (value: FieldChangeValue, id: Bar) => {
    if (Array.isArray(bar[id])) {
      setHasDirtyState(!isEqual(bar[id], value));
      setFieldsValues({ ...fieldsValues, [id]: value });
      setDirtyInputs({ ...dirtyValues, [id]: true });
    } else if (Array.isArray(value)) {
      setHasDirtyState(bar[id] !== value[0]);
      setFieldsValues({ ...fieldsValues, [id]: value[0] });
      setDirtyInputs({ ...dirtyValues, [id]: true });
    }
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
      onAction: () => setIsModalOpen(true),
    },
    {
      content: 'Discard',
      disabled: !hasDirtyState,
      onAction: () => console.log('discard'),
    },
  ];
  const errors = getFieldErrorsMap(
    formData?.updateBar && formData.updateBar.userErrors
  );

  return (
    <>
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
      <ModalDestroyBar
        onClose={() => setIsModalOpen(false)}
        isModalOpen={isModalOpen}
        barId={bar.id}
      />
    </>
  );
};

export default SingleBar;
