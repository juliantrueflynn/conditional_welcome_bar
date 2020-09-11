import React from 'react';
import {Layout, TextField, Checkbox} from '@shopify/polaris';
import {BarType, Bar, BarFieldErrors} from '../../types/bar';
import {FieldChangeEvent, BarFormProps} from '../../types/fields';
import FieldGroup from '../form_fields/field_group';
import ChoiceListField from '../form_fields/choice_list_field';
import ColorPickerField from '../form_fields/color_picker_field';

type Props = {
  updateFieldValue: FieldChangeEvent;
  dirtyValues: BarFormProps;
  errors: BarFieldErrors;
  fields: BarType;
};

const SingleBarFormFields = ({updateFieldValue, errors, fields}: Props) => {
  return (
    <Layout>
      <FieldGroup id="editor">
        <TextField
          id={Bar.title}
          value={fields.title}
          label="Title"
          placeholder="Title"
          error={errors.title}
          onChange={updateFieldValue}
        />
        <TextField
          id={Bar.content}
          value={fields.content}
          label="Content"
          placeholder="Start typing..."
          multiline
          error={errors.content}
          onChange={updateFieldValue}
        />
      </FieldGroup>
      <FieldGroup id="visibility">
        <Checkbox
          id={Bar.isActive}
          label="Active"
          helpText="Live for public view"
          checked={fields.isActive}
          error={errors.isActive}
          onChange={updateFieldValue}
        />
        <ChoiceListField
          id={Bar.themeTemplates}
          label="Page visibility"
          choices={[
            {label: 'Global (all templates)', value: 'global'},
            {label: 'Homepage', value: 'homepage'},
            {label: 'Cart', value: 'cart'},
            {label: 'Collections', value: 'collection'},
            {label: 'Products', value: 'product'},
          ]}
          value={fields.themeTemplates}
          allowMultiple
          error={errors.themeTemplates}
          onChange={updateFieldValue}
        />
      </FieldGroup>
      <FieldGroup id="link">
        <TextField
          id={Bar.url}
          label="URL"
          value={fields.url}
          type="url"
          placeholder="https://example.com"
          error={errors.url}
          onChange={updateFieldValue}
        />
        {fields.url && (
          <>
            <Checkbox
              id={Bar.isNewTabUrl}
              label="Open link in new tab"
              checked={fields.isNewTabUrl}
              error={errors.isNewTabUrl}
              onChange={updateFieldValue}
            />
            <Checkbox
              id={Bar.isFullWidthLink}
              label="Is full width link?"
              checked={fields.isFullWidthLink}
              helpText="Entire welcome bar is clickable link"
              error={errors.isFullWidthLink}
              onChange={updateFieldValue}
            />
          </>
        )}
      </FieldGroup>
      <FieldGroup id="displayStyles">
        <ChoiceListField
          id={Bar.placement}
          label="Placement"
          choices={[
            {label: 'Top', value: 'top'},
            {label: 'Bottom', value: 'bottom'},
          ]}
          value={[fields.placement]}
          error={errors.placement}
          onChange={updateFieldValue}
        />
        <Checkbox
          id={Bar.isSticky}
          label="Is sticky bar"
          helpText="Bar sticks to top/bottom of window on scroll"
          checked={fields.isSticky}
          error={errors.isSticky}
          onChange={updateFieldValue}
        />
        <TextField
          id={Bar.paddingY}
          label="Vertical padding"
          value={fields.paddingY}
          helpText="Options: 'auto', 'inherit' or number px/em/%"
          placeholder="100px, 3em, or 50%"
          error={errors.paddingY}
          onChange={updateFieldValue}
        />
        <TextField
          id={Bar.paddingX}
          label="Horizontal padding"
          value={fields.paddingX}
          helpText="Options: 'auto', 'inherit' or number px/em/%"
          placeholder="100px, 3em, or 50%"
          error={errors.paddingX}
          onChange={updateFieldValue}
        />
        <Checkbox
          id={Bar.hasCloseButton}
          label="Show close button"
          checked={fields.hasCloseButton}
          error={errors.hasCloseButton}
          onChange={updateFieldValue}
        />
      </FieldGroup>
      <FieldGroup id="textStyles">
        <ColorPickerField
          id={Bar.textColor}
          label="Text color"
          value={fields.textColor}
          updateFieldValue={updateFieldValue}
        />
        <ChoiceListField
          id={Bar.textAlign}
          label="Alignment"
          choices={[
            {label: 'Left', value: 'left'},
            {label: 'Center', value: 'center'},
            {label: 'Right', value: 'right'},
          ]}
          value={[fields.textAlign]}
          error={errors.textAlign}
          onChange={updateFieldValue}
        />
        <TextField
          id={Bar.fontSize}
          value={fields.fontSize}
          label="Text size"
          helpText="Options: 'inherit' or number px/em/%"
          placeholder="14px, 1em, or 120%"
          error={errors.fontSize}
          onChange={updateFieldValue}
        />
      </FieldGroup>
      <FieldGroup id="backgroundStyles">
        <ColorPickerField
          id={Bar.backgroundColor}
          label="Background color"
          value={fields.backgroundColor}
          updateFieldValue={updateFieldValue}
        />
      </FieldGroup>
    </Layout>
  );
};

export default SingleBarFormFields;
