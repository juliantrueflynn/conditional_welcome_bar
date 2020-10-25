import React, {useState, useMemo} from 'react';
import isEqual from 'lodash/isEqual';
import {Page, Form, Layout, Checkbox} from '@shopify/polaris';
import {useMutation} from '@apollo/client';
import {UPDATE_BAR, UpdateBar, UpdateBarVariables, Bar_bar, UpdateBar_updateBar_bar} from './graphql';
import {getFieldErrorsMap} from './get_field_errors_map';
import {useToastDispatchContext} from '../toast_context';
import {TextField, FieldGroup, ColorPicker, ChoiceList} from './form_fields';

type Props = {
  barId: string;
  bar: Bar_bar;
  openModal: () => void;
};

type FieldsWithoutTypename = Omit<UpdateBar_updateBar_bar, '__typename'>;

type BarFieldErrors = {
  [key in keyof FieldsWithoutTypename]?: boolean | string[] | undefined;
};

const barFalseMap: {[key in keyof FieldsWithoutTypename]: boolean} = {
  title: false,
  content: false,
  url: false,
  backgroundColor: false,
  placement: false,
  textAlign: false,
  isActive: false,
  isSticky: false,
  isFullWidthLink: false,
  hasCloseButton: false,
  isNewTabUrl: false,
  paddingY: false,
  paddingX: false,
  themeTemplates: false,
  textColor: false,
  fontSize: false,
};

const useUpdateBarMutation = () => useMutation<UpdateBar, UpdateBarVariables>(UPDATE_BAR);

const UpdateForm = ({barId, bar, openModal}: Props) => {
  const toastDispatch = useToastDispatchContext();
  const [updateBar, updateBarQuery] = useUpdateBarMutation();
  const [dirtyFields, setDirtyFields] = useState(barFalseMap);
  const [fieldsValues, setFieldsValues] = useState(bar);
  const [prevFieldsValues, setPrevFieldsValues] = useState(bar);

  const fieldErrors = useMemo(() => {
    const errorMap = getFieldErrorsMap(updateBarQuery.data?.updateBar?.userErrors);
    const fieldKeys = Object.keys(errorMap) as Array<keyof FieldsWithoutTypename>;

    return fieldKeys.reduce((acc, key) => {
      acc[key] = !dirtyFields[key] && errorMap[key];

      return acc;
    }, {} as BarFieldErrors);
  }, [updateBarQuery.data, dirtyFields]);

  const handleSubmit = async () => {
    const {__typename, ...attributes} = fieldsValues;
    const formResults = await updateBar({
      variables: {input: {id: barId, ...attributes}},
    });

    setDirtyFields(barFalseMap);

    if (formResults.data && !formResults.data.updateBar?.userErrors?.length) {
      setPrevFieldsValues(fieldsValues);
      toastDispatch({type: 'bar/update'});
    }
  };

  const handleFieldValueChange = (value: Bar_bar[keyof Bar_bar], id: keyof Bar_bar) => {
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
        loading: updateBarQuery.loading,
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
              id="title"
              value={fieldsValues.title}
              label="Title"
              error={fieldErrors.title}
              onChange={handleFieldValueChange}
            />
            <TextField
              id="content"
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
              id="isActive"
              label="Active"
              helpText="Live for public view"
              checked={fieldsValues.isActive}
              error={fieldErrors.isActive}
              onChange={handleFieldValueChange}
            />
            <ChoiceList
              id="themeTemplates"
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
              id="url"
              label="URL"
              value={fieldsValues.url || undefined}
              type="url"
              placeholder="https://example.com"
              error={fieldErrors.url}
              onChange={handleFieldValueChange}
            />
            {fieldsValues.url && (
              <>
                <Checkbox
                  id="isNewTabUrl"
                  label="Open link in new tab"
                  checked={fieldsValues.isNewTabUrl}
                  error={fieldErrors.isNewTabUrl}
                  onChange={handleFieldValueChange}
                />
                <Checkbox
                  id="isFullWidthLink"
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
              id="placement"
              label="Placement"
              choices={[
                {label: 'Top', value: 'top'},
                {label: 'Bottom', value: 'bottom'},
              ]}
              value={fieldsValues.placement ? [fieldsValues.placement] : []}
              error={fieldErrors.placement}
              onChange={handleFieldValueChange}
            />
            <Checkbox
              id="isSticky"
              label="Is sticky bar"
              helpText="Bar sticks to top/bottom of window on scroll"
              checked={fieldsValues.isSticky}
              error={fieldErrors.isSticky}
              onChange={handleFieldValueChange}
            />
            <TextField
              id="paddingY"
              label="Vertical padding"
              value={fieldsValues.paddingY}
              helpText="Options: 'auto', 'inherit' or number px/em/%"
              placeholder="100px, 3em, or 50%"
              error={fieldErrors.paddingY}
              onChange={handleFieldValueChange}
            />
            <TextField
              id="paddingX"
              label="Horizontal padding"
              value={fieldsValues.paddingX}
              helpText="Options: 'auto', 'inherit' or number px/em/%"
              placeholder="100px, 3em, or 50%"
              error={fieldErrors.paddingX}
              onChange={handleFieldValueChange}
            />
            <Checkbox
              id="hasCloseButton"
              label="Show close button"
              checked={fieldsValues.hasCloseButton}
              error={fieldErrors.hasCloseButton}
              onChange={handleFieldValueChange}
            />
          </FieldGroup>
          <FieldGroup id="textStyles">
            <ColorPicker
              id="textColor"
              label="Text color"
              value={fieldsValues.textColor}
              onChange={handleFieldValueChange}
            />
            <ChoiceList
              id="textAlign"
              label="Alignment"
              choices={[
                {label: 'Left', value: 'left'},
                {label: 'Center', value: 'center'},
                {label: 'Right', value: 'right'},
              ]}
              value={fieldsValues.textAlign ? [fieldsValues.textAlign] : []}
              error={fieldErrors.textAlign}
              onChange={handleFieldValueChange}
            />
            <TextField
              id="fontSize"
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
              id="backgroundColor"
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
