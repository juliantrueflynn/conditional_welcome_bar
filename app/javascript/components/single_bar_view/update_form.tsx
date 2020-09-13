import React, {useState, useMemo} from 'react';
import isEqual from 'lodash/isEqual';
import {Page, Form, TextField, Layout, Checkbox} from '@shopify/polaris';
import {useMutation} from '@apollo/client';
import {Bar, BarFields, UserError} from '../../types';
import {UPDATE_BAR} from '../../utilities/graphql_tags';
import {barFalseMap} from '../../utilities/single_bar_utilities';
import {getFieldErrorsMap} from '../../utilities/get_field_errors_map';
import {FieldGroup, ColorPicker, ChoiceList} from '../form_fields';

type Props = {
  bar: BarFields;
  openModal: () => void;
};

type UpdateBarPayload = {
  bar?: BarFields;
  userErrors?: UserError[];
};

type BarFieldErrors = {
  [key in keyof BarFields]: boolean | string[] | undefined;
};

const UpdateForm = ({bar, openModal}: Props) => {
  const [dirtyFields, setDirtyFields] = useState(barFalseMap);
  const [fieldsValues, setFieldsValues] = useState(bar);
  const [prevFieldsValues, setPrevFieldsValues] = useState(bar);

  const [updateBar, {loading, data}] = useMutation<
    {updateBar: UpdateBarPayload},
    {input: BarFields}
  >(UPDATE_BAR, {
    onCompleted: () => setDirtyFields(barFalseMap),
  });

  const fieldErrors = useMemo(() => {
    const errorMap = getFieldErrorsMap(data?.updateBar?.userErrors);
    const fieldKeys = Object.keys(errorMap) as Array<keyof BarFields>;

    return fieldKeys.reduce((acc, key) => {
      acc[key] = !dirtyFields[key] && errorMap[key];

      return acc;
    }, {} as BarFieldErrors);
  }, [data, dirtyFields]);

  const handleSubmit = async () => {
    const {__typename, ...attributes} = fieldsValues;
    await updateBar({variables: {input: attributes}});
    setPrevFieldsValues(fieldsValues);
  };

  const handleFieldValueChange = (
    value: BarFields[keyof BarFields],
    id: keyof BarFields
  ) => {
    if (Array.isArray(prevFieldsValues[id])) {
      setFieldsValues({...fieldsValues, [id]: value});
      setDirtyFields({
        ...dirtyFields,
        [id]: !isEqual(prevFieldsValues[id], value),
      });
    } else if (Array.isArray(value)) {
      setFieldsValues({...fieldsValues, [id]: value[0]});
      setDirtyFields({...dirtyFields, [id]: prevFieldsValues[id] !== value[0]});
    } else {
      setFieldsValues({...fieldsValues, [id]: value});
      setDirtyFields({...dirtyFields, [id]: prevFieldsValues[id] !== value});
    }
  };

  const hasDirtyState = Object.values(dirtyFields).some(Boolean);

  return (
    <Page
      title={prevFieldsValues.title}
      primaryAction={{
        content: 'Save',
        onAction: handleSubmit,
        disabled: !hasDirtyState,
        loading,
      }}
      secondaryActions={[
        {content: 'Delete', onAction: openModal},
        {
          content: 'Discard',
          disabled: !hasDirtyState,
          onAction: () => setFieldsValues(prevFieldsValues),
        },
      ]}
    >
      <Form onSubmit={handleSubmit}>
        <Layout>
          <FieldGroup id="editor">
            <TextField
              id={Bar.title}
              value={fieldsValues.title}
              label="Title"
              placeholder="Title"
              error={fieldErrors.title}
              onChange={handleFieldValueChange}
            />
            <TextField
              id={Bar.content}
              value={fieldsValues.content}
              label="Content"
              placeholder="Start typing..."
              multiline
              error={fieldErrors.content}
              onChange={handleFieldValueChange}
            />
          </FieldGroup>
          <FieldGroup id="visibility">
            <Checkbox
              id={Bar.isActive}
              label="Active"
              helpText="Live for public view"
              checked={fieldsValues.isActive}
              error={fieldErrors.isActive}
              onChange={handleFieldValueChange}
            />
            <ChoiceList
              id={Bar.themeTemplates}
              label="Page visibility"
              choices={[
                {label: 'Global (all templates)', value: 'global'},
                {label: 'Homepage', value: 'homepage'},
                {label: 'Cart', value: 'cart'},
                {label: 'Collections', value: 'collection'},
                {label: 'Products', value: 'product'},
              ]}
              value={fieldsValues.themeTemplates}
              allowMultiple
              error={fieldErrors.themeTemplates}
              onChange={handleFieldValueChange}
            />
          </FieldGroup>
          <FieldGroup id="link">
            <TextField
              id={Bar.url}
              label="URL"
              value={fieldsValues.url}
              type="url"
              placeholder="https://example.com"
              error={fieldErrors.url}
              onChange={handleFieldValueChange}
            />
            {fieldsValues.url && (
              <>
                <Checkbox
                  id={Bar.isNewTabUrl}
                  label="Open link in new tab"
                  checked={fieldsValues.isNewTabUrl}
                  error={fieldErrors.isNewTabUrl}
                  onChange={handleFieldValueChange}
                />
                <Checkbox
                  id={Bar.isFullWidthLink}
                  label="Is full width link?"
                  checked={fieldsValues.isFullWidthLink}
                  helpText="Entire welcome bar is clickable link"
                  error={fieldErrors.isFullWidthLink}
                  onChange={handleFieldValueChange}
                />
              </>
            )}
          </FieldGroup>
          <FieldGroup id="displayStyles">
            <ChoiceList
              id={Bar.placement}
              label="Placement"
              choices={[
                {label: 'Top', value: 'top'},
                {label: 'Bottom', value: 'bottom'},
              ]}
              value={[fieldsValues.placement]}
              error={fieldErrors.placement}
              onChange={handleFieldValueChange}
            />
            <Checkbox
              id={Bar.isSticky}
              label="Is sticky bar"
              helpText="Bar sticks to top/bottom of window on scroll"
              checked={fieldsValues.isSticky}
              error={fieldErrors.isSticky}
              onChange={handleFieldValueChange}
            />
            <TextField
              id={Bar.paddingY}
              label="Vertical padding"
              value={fieldsValues.paddingY}
              helpText="Options: 'auto', 'inherit' or number px/em/%"
              placeholder="100px, 3em, or 50%"
              error={fieldErrors.paddingY}
              onChange={handleFieldValueChange}
            />
            <TextField
              id={Bar.paddingX}
              label="Horizontal padding"
              value={fieldsValues.paddingX}
              helpText="Options: 'auto', 'inherit' or number px/em/%"
              placeholder="100px, 3em, or 50%"
              error={fieldErrors.paddingX}
              onChange={handleFieldValueChange}
            />
            <Checkbox
              id={Bar.hasCloseButton}
              label="Show close button"
              checked={fieldsValues.hasCloseButton}
              error={fieldErrors.hasCloseButton}
              onChange={handleFieldValueChange}
            />
          </FieldGroup>
          <FieldGroup id="textStyles">
            <ColorPicker
              id={Bar.textColor}
              label="Text color"
              value={fieldsValues.textColor}
              onChange={handleFieldValueChange}
            />
            <ChoiceList
              id={Bar.textAlign}
              label="Alignment"
              choices={[
                {label: 'Left', value: 'left'},
                {label: 'Center', value: 'center'},
                {label: 'Right', value: 'right'},
              ]}
              value={[fieldsValues.textAlign]}
              error={fieldErrors.textAlign}
              onChange={handleFieldValueChange}
            />
            <TextField
              id={Bar.fontSize}
              value={fieldsValues.fontSize}
              label="Text size"
              helpText="Options: 'inherit' or number px/em/%"
              placeholder="14px, 1em, or 120%"
              error={fieldErrors.fontSize}
              onChange={handleFieldValueChange}
            />
          </FieldGroup>
          <FieldGroup id="backgroundStyles">
            <ColorPicker
              id={Bar.backgroundColor}
              label="Background color"
              value={fieldsValues.backgroundColor}
              onChange={handleFieldValueChange}
            />
          </FieldGroup>
        </Layout>
      </Form>
    </Page>
  );
};

export default UpdateForm;
