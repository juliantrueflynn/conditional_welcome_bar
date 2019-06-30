import React from 'react';
import PropTypes from 'prop-types';
import { Layout, FormLayout, Card, TextField, ChoiceList, Checkbox } from '@shopify/polaris';
import FileUploadField from '../FileUploadField';
import ColorPickerField from '../ColorPickerField';

const SIZE_PLACEHOLDER = '200px, 14em, or 100%';

const SingleBarFormFields = ({
  updateFieldValue,
  updateColorPickerValue,
  updateImageUpload,
  updateChoiceListValue,
  dirtyInputs,
  errors,
  ...fields
}) => (
  <Layout>
    <Layout.AnnotatedSection title="Editor" description="Edit welcome bar title or content.">
      <Card sectioned>
        <FormLayout>
          <TextField
            value={fields.title}
            id="title"
            label="Title"
            placeholder="Title"
            onChange={updateFieldValue}
            error={!dirtyInputs.title && errors.title}
          />
          <TextField
            value={fields.content}
            label="Content"
            id="content"
            placeholder="Start typing..."
            onChange={updateFieldValue}
            multiline
            error={!dirtyInputs.content && errors.content}
          />
        </FormLayout>
      </Card>
    </Layout.AnnotatedSection>
    <Layout.AnnotatedSection
      title="Visibility"
      description="Set visibility status and which templates welcomebar displays."
    >
      <Card sectioned>
        <FormLayout>
          <Checkbox
            label="Active"
            helpText="Live for public view"
            checked={fields.isActive}
            id="isActive"
            onChange={updateFieldValue}
            error={!dirtyInputs.isActive && errors.isActive}
          />
          <ChoiceList
            title="Page visibility"
            choices={[
              { label: 'Global (all templates)', value: 'global' },
              { label: 'Homepage', value: 'homepage' },
              { label: 'Cart', value: 'cart' },
              { label: 'Collections', value: 'collection' },
              { label: 'Products', value: 'product' },
            ]}
            selected={fields.pageTemplates}
            name="pageTemplates"
            onChange={updateChoiceListValue}
            allowMultiple
            error={!dirtyInputs.pageTemplates && errors.pageTemplates}
          />
        </FormLayout>
      </Card>
    </Layout.AnnotatedSection>
    <Layout.AnnotatedSection title="Link" description="Settings for welcome bar link.">
      <Card sectioned>
        <FormLayout>
          <TextField
            value={fields.url}
            label="URL"
            id="url"
            type="url"
            placeholder="https://example.com"
            onChange={updateFieldValue}
            error={!dirtyInputs.url && errors.url}
          />
          {fields.url && (
            <Checkbox
              label="Open link in new tab"
              id="isNewTabUrl"
              checked={fields.isNewTabUrl}
              onChange={updateFieldValue}
              error={!dirtyInputs.isNewTabUrl && errors.isNewTabUrl}
            />
          )}
          {fields.url && (
            <Checkbox
              label="Is full width link?"
              helpText="Entire welcome bar is clickable link"
              id="isFullWidthLink"
              checked={fields.isFullWidthLink}
              onChange={updateFieldValue}
              error={!dirtyInputs.isFullWidthLink && errors.isFullWidthLink}
            />
          )}
        </FormLayout>
      </Card>
    </Layout.AnnotatedSection>
    <Layout.AnnotatedSection title="Display styles" description="Style the overall appearance.">
      <Card sectioned>
        <FormLayout>
          <ChoiceList
            title="Placement"
            choices={[{ label: 'Top', value: 'top' }, { label: 'Bottom', value: 'bottom' }]}
            selected={[fields.placement]}
            name="placement"
            onChange={updateChoiceListValue}
            error={!dirtyInputs.placement && errors.placement}
          />
          <Checkbox
            label="Is sticky bar"
            helpText="Bar sticks to top/bottom of window on scroll"
            checked={fields.isSticky}
            id="isSticky"
            onChange={updateFieldValue}
            error={!dirtyInputs.isSticky && errors.isSticky}
          />
          <TextField
            value={fields.paddingY}
            label="Vertical padding"
            helpText="Options: 'auto', 'inherit' or number px/em/%"
            id="paddingY"
            placeholder="100px, 3em, or 50%"
            onChange={updateFieldValue}
            error={!dirtyInputs.paddingY && errors.paddingY}
          />
          <TextField
            value={fields.paddingX}
            label="Horizontal padding"
            helpText="Options: 'auto', 'inherit' or number px/em/%"
            id="paddingX"
            placeholder="100px, 3em, or 50%"
            onChange={updateFieldValue}
            error={!dirtyInputs.paddingX && errors.paddingX}
          />
          <Checkbox
            label="Show close button"
            checked={fields.hasCloseButton}
            id="hasCloseButton"
            onChange={updateFieldValue}
            error={!dirtyInputs.hasCloseButton && errors.hasCloseButton}
          />
        </FormLayout>
      </Card>
    </Layout.AnnotatedSection>
    <Layout.AnnotatedSection title="Text styles" description="Style the welcome bar text.">
      <Card sectioned>
        <FormLayout>
          <ColorPickerField
            id="textHSBA"
            label="Text color"
            color={fields.textHSBA}
            updateColorPicker={updateColorPickerValue}
            error={!dirtyInputs.textHSBA && errors.textHSBA}
          />
          <ChoiceList
            title="Alignment"
            choices={[
              { label: 'Left', value: 'left' },
              { label: 'Center', value: 'center' },
              { label: 'Right', value: 'right' },
            ]}
            name="textAlign"
            selected={[fields.textAlign]}
            onChange={updateChoiceListValue}
            error={!dirtyInputs.textAlign && errors.textAlign}
          />
          <TextField
            value={fields.fontSize}
            label="Text size"
            helpText="Options: 'inherit' or number px/em/%"
            id="fontSize"
            placeholder="14px, 1em, or 120%"
            onChange={updateFieldValue}
            error={!dirtyInputs.fontSize && errors.fontSize}
          />
        </FormLayout>
      </Card>
    </Layout.AnnotatedSection>
    <Layout.AnnotatedSection
      title="Background styles"
      description="Style the background and or upload an image."
    >
      <Card sectioned>
        <FormLayout>
          <ColorPickerField
            id="backgroundHSBA"
            label="Background color"
            color={fields.backgroundHSBA}
            updateColorPicker={updateColorPickerValue}
            error={!dirtyInputs.backgroundHSBA && errors.backgroundHSBA}
          />
          <FileUploadField
            updateImageUpload={updateImageUpload}
            backgroundImage={fields.backgroundImage}
            backgroundFile={fields.backgroundFile}
            error={!dirtyInputs.backgroundImage && errors.backgroundImage}
          />
          {fields.backgroundImage && (
            <>
              <TextField
                value={fields.backgroundImagePositionY}
                label="Image position vertical position"
                helpText="Options: 'center' or number px/em/%"
                id="backgroundImageSizeY"
                placeholder="center"
                onChange={updateFieldValue}
                error={!dirtyInputs.backgroundImagePositionY && errors.backgroundImagePositionY}
              />
              <TextField
                value={fields.backgroundImagePositionX}
                label="Image position horizontal position"
                helpText="Options: 'center' or number px/em/%"
                id="backgroundImageSizeY"
                placeholder="center"
                onChange={updateFieldValue}
                error={!dirtyInputs.backgroundImagePositionX && errors.backgroundImagePositionX}
              />
              <TextField
                value={fields.backgroundImageSizeY}
                label="Image vertical size"
                helpText="Options: 'auto', 'contain', 'cover', or number px/em/%"
                id="backgroundImageSizeY"
                placeholder={SIZE_PLACEHOLDER}
                onChange={updateFieldValue}
                error={!dirtyInputs.backgroundImageSizeY && errors.backgroundImageSizeY}
              />
              <TextField
                value={fields.backgroundImageSizeX}
                label="Image horizontal size"
                helpText="Options: 'auto', 'contain', 'cover', or number px/em/%"
                id="backgroundImageSizeX"
                placeholder={SIZE_PLACEHOLDER}
                onChange={updateFieldValue}
                error={!dirtyInputs.backgroundImageSizeX && errors.backgroundImageSizeX}
              />
              <ChoiceList
                title="Image repeat"
                choices={[
                  { label: 'Do not repeat', value: 'no-repeat' },
                  { label: 'Repeat', value: 'repeat' },
                  { label: 'Repeat vertically only', value: 'repeat-y' },
                  { label: 'Repeat horizontally only', value: 'repeat-x' },
                ]}
                name="backgroundImageRepeat"
                selected={[fields.backgroundImageRepeat]}
                onChange={updateChoiceListValue}
                error={!dirtyInputs.backgroundImageRepeat && errors.backgroundImageRepeat}
              />
            </>
          )}
        </FormLayout>
      </Card>
    </Layout.AnnotatedSection>
  </Layout>
);

SingleBarFormFields.propTypes = {
  updateFieldValue: PropTypes.func.isRequired,
  updateColorPickerValue: PropTypes.func.isRequired,
  updateImageUpload: PropTypes.func.isRequired,
  updateChoiceListValue: PropTypes.func.isRequired,
  dirtyInputs: PropTypes.instanceOf(Object).isRequired,
  errors: PropTypes.instanceOf(Object).isRequired,
};

export default SingleBarFormFields;
