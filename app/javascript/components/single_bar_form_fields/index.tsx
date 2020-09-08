import React from 'react';
import { Layout, TextField, Checkbox } from '@shopify/polaris';
import { BarType, BarErrorPayload, Bar } from '../../types/bar';
import { FieldChangeEvent, BarFormProps } from '../../types/fields';
import FieldGroup from '../form_fields/field_group';

const ChoiceListField = React.lazy(
  () => import('../form_fields/choice_list_field')
);
const ColorPickerField = React.lazy(
  () => import('../form_fields/color_picker_field')
);

type Props = {
  updateFieldValue: FieldChangeEvent;
  dirtyValues: BarFormProps;
  errors: BarErrorPayload;
  fields: BarType;
};

const SingleBarFormFields: React.FC<Props> = ({
  updateFieldValue,
  dirtyValues,
  errors,
  fields,
}) => {
  return (
    <Layout>
      <FieldGroup id="editor">
        <TextField
          id={Bar.title}
          value={fields[Bar.title]}
          label="Title"
          placeholder="Title"
          onChange={updateFieldValue}
          error={!dirtyValues[Bar.title] && errors[Bar.title]}
        />
        <TextField
          id={Bar.content}
          value={fields[Bar.content]}
          label="Content"
          placeholder="Start typing..."
          onChange={updateFieldValue}
          multiline
          error={!dirtyValues[Bar.content] && errors[Bar.content]}
        />
      </FieldGroup>
      <FieldGroup id="visibility">
        <Checkbox
          id={Bar.isActive}
          label="Active"
          helpText="Live for public view"
          checked={fields[Bar.isActive]}
          onChange={updateFieldValue}
          error={!dirtyValues[Bar.isActive] && errors[Bar.isActive]}
        />
        <ChoiceListField
          id={Bar.themeTemplates}
          label="Page visibility"
          choices={[
            { label: 'Global (all templates)', value: 'global' },
            { label: 'Homepage', value: 'homepage' },
            { label: 'Cart', value: 'cart' },
            { label: 'Collections', value: 'collection' },
            { label: 'Products', value: 'product' },
          ]}
          value={fields[Bar.themeTemplates]}
          onChange={updateFieldValue}
          allowMultiple
          error={!dirtyValues[Bar.themeTemplates] && errors[Bar.themeTemplates]}
        />
      </FieldGroup>
      <FieldGroup id="link">
        <TextField
          id={Bar.url}
          label="URL"
          value={fields[Bar.url]}
          onChange={updateFieldValue}
          type="url"
          placeholder="https://example.com"
          error={!dirtyValues[Bar.url] && errors[Bar.url]}
        />
        {fields[Bar.url] && (
          <Checkbox
            id={Bar.isNewTabUrl}
            label="Open link in new tab"
            checked={fields[Bar.isNewTabUrl]}
            onChange={updateFieldValue}
            error={!dirtyValues[Bar.isNewTabUrl] && errors[Bar.isNewTabUrl]}
          />
        )}
        {fields[Bar.url] && (
          <Checkbox
            id={Bar.isFullWidthLink}
            label="Is full width link?"
            checked={fields[Bar.isFullWidthLink]}
            onChange={updateFieldValue}
            helpText="Entire welcome bar is clickable link"
            error={
              !dirtyValues[Bar.isFullWidthLink] && errors[Bar.isFullWidthLink]
            }
          />
        )}
      </FieldGroup>
      <FieldGroup id="displayStyles">
        <ChoiceListField
          id={Bar.placement}
          label="Placement"
          choices={[
            { label: 'Top', value: 'top' },
            { label: 'Bottom', value: 'bottom' },
          ]}
          value={[fields.placement]}
          onChange={updateFieldValue}
          error={!dirtyValues[Bar.placement] && errors[Bar.placement]}
        />
        <Checkbox
          id={Bar.isSticky}
          label="Is sticky bar"
          helpText="Bar sticks to top/bottom of window on scroll"
          checked={fields[Bar.isSticky]}
          onChange={updateFieldValue}
          error={!dirtyValues[Bar.isSticky] && errors[Bar.isSticky]}
        />
        <TextField
          id={Bar.paddingY}
          label="Vertical padding"
          value={fields[Bar.paddingY]}
          helpText="Options: 'auto', 'inherit' or number px/em/%"
          placeholder="100px, 3em, or 50%"
          onChange={updateFieldValue}
          error={!dirtyValues[Bar.paddingY] && errors[Bar.paddingY]}
        />
        <TextField
          id={Bar.paddingX}
          label="Horizontal padding"
          value={fields[Bar.paddingX]}
          onChange={updateFieldValue}
          helpText="Options: 'auto', 'inherit' or number px/em/%"
          placeholder="100px, 3em, or 50%"
          error={!dirtyValues[Bar.paddingX] && errors[Bar.paddingX]}
        />
        <Checkbox
          id={Bar.hasCloseButton}
          label="Show close button"
          checked={fields[Bar.hasCloseButton]}
          onChange={updateFieldValue}
          error={!dirtyValues[Bar.hasCloseButton] && errors[Bar.hasCloseButton]}
        />
      </FieldGroup>
      <FieldGroup id="textStyles">
        <ColorPickerField
          id={Bar.textColor}
          label="Text color"
          value={fields[Bar.textColor]}
          updateFieldValue={updateFieldValue}
        />
        <ChoiceListField
          id={Bar.textAlign}
          label="Alignment"
          choices={[
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ]}
          value={[fields[Bar.textAlign]]}
          onChange={updateFieldValue}
          error={!dirtyValues[Bar.textAlign] && errors[Bar.textAlign]}
        />
        <TextField
          id={Bar.fontSize}
          value={fields[Bar.fontSize]}
          label="Text size"
          helpText="Options: 'inherit' or number px/em/%"
          placeholder="14px, 1em, or 120%"
          onChange={updateFieldValue}
          error={!dirtyValues[Bar.fontSize] && errors[Bar.fontSize]}
        />
      </FieldGroup>
      <FieldGroup id="backgroundStyles">
        <ColorPickerField
          id={Bar.backgroundColor}
          label="Background color"
          value={fields[Bar.backgroundColor]}
          updateFieldValue={updateFieldValue}
        />
      </FieldGroup>
    </Layout>
  );
};

export default SingleBarFormFields;
