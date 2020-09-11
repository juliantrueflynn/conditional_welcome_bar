import React, {useState, useMemo} from 'react';
import isEqual from 'lodash/isEqual';
import {Page, Form} from '@shopify/polaris';
import {useMutation} from '@apollo/client';
import {BarType, Bar, BarFieldErrors} from '../../types/bar';
import {UPDATE_BAR} from '../../utilities/graphql_tags';
import {FieldChangeValue} from '../../types/fields';
import {barFalseMap} from '../../utilities/single_bar_utilities';
import {getFieldErrorsMap} from '../../utilities/get_field_errors_map';
import SingleBarFormFields from '../single_bar_form_fields';

type Props = {
  bar: BarType;
  openModal: () => void;
};

const SingleBar = ({bar, openModal}: Props) => {
  const [hasDirtyState, setHasDirtyState] = useState(false);
  const [dirtyValues, setDirtyInputs] = useState(barFalseMap);
  const [fieldsValues, setFieldsValues] = useState(bar);

  const [updateBar, {loading, data}] = useMutation(UPDATE_BAR, {
    onCompleted: () => {
      setHasDirtyState(false);
      setDirtyInputs(barFalseMap);
    },
  });

  const fieldErrors = useMemo(() => {
    const errorMap = getFieldErrorsMap(data?.updateBar?.userErrors);
    const fieldKeys = Object.keys(errorMap) as Array<keyof BarFieldErrors>;

    return fieldKeys.reduce((acc, key) => {
      acc[key] = !dirtyValues[key] && errorMap[key];

      return acc;
    }, {} as BarFieldErrors);
  }, [data, dirtyValues]);

  const handleUpdate = () => {
    const {__typename, ...attributes} = fieldsValues;
    updateBar({variables: {input: attributes}});
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
    setFieldsValues({...fieldsValues, [id]: nextValue});
    setDirtyInputs({...dirtyValues, [id]: true});
  };

  return (
    <>
      <Page
        title={bar.title}
        primaryAction={{
          content: 'Save',
          onAction: handleUpdate,
          disabled: !hasDirtyState,
          loading,
        }}
        secondaryActions={[
          {
            content: 'Delete',
            destructive: true,
            onAction: openModal,
          },
          {
            content: 'Discard',
            disabled: !hasDirtyState,
            onAction: () => setFieldsValues(bar),
          },
        ]}
      >
        <Form onSubmit={handleUpdate}>
          <SingleBarFormFields
            updateFieldValue={handleFieldValueChange}
            dirtyValues={dirtyValues}
            errors={fieldErrors}
            fields={fieldsValues}
          />
        </Form>
      </Page>
    </>
  );
};

export default SingleBar;
