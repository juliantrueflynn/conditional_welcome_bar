import React from 'react';
import PropTypes from 'prop-types';
import {
  Layout,
  FormLayout,
  Card,
  TextField,
  ChoiceList,
  Checkbox,
  ColorPicker,
} from '@shopify/polaris';

const SingleBarFormFields = ({
  updateFieldValue,
  updateColorPickerValue,
  ...fieldValues
}) => {
  const {
    title,
    content,
    hasCloseButton,
    isActive,
    placement,
    pageTemplate,
    isSticky,
    url,
    isFullWidthLink,
    isNewTabUrl,
    paddingY,
    paddingX,
    fontSize,
    textAlign,
    backgroundImage, // @TODO: Image uploader
    backgroundImageRepeat,
    backgroundImageSizeY,
    backgroundImageSizeX,
    backgroundImagePositionX,
    backgroundImagePositionY,
    backgroundHSBa,
    textHSBa,
  } = fieldValues;

  return (
    <Layout>
      <Layout.AnnotatedSection title="Editor" description="Edit welcome bar title or content.">
        <Card sectioned>
          <FormLayout>
            <TextField
              value={title}
              id="title"
              label="Title"
              placeholder="Title"
              onChange={updateFieldValue}
            />
            <TextField
              value={content}
              label="Content"
              id="content"
              placeholder="Start typing..."
              onChange={updateFieldValue}
              multiline
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
              checked={isActive}
              id="isActive"
              onChange={updateFieldValue}
            />
            <ChoiceList
              title="Page visibility"
              choices={[
                { label: 'Global (all pages)', value: 'global' },
                { label: 'Homepage', value: 'homepage' },
                { label: 'Cart', value: 'cart' },
                { label: 'Collections', value: 'collection' },
                { label: 'Products', value: 'product' },
              ]}
              selected={[pageTemplate]}
              name="pageTemplate"
              onChange={updateFieldValue}
              allowMultiple
            />
          </FormLayout>
        </Card>
      </Layout.AnnotatedSection>
      <Layout.AnnotatedSection title="Link" description="Settings for welcome bar link.">
        <Card sectioned>
          <FormLayout>
            <TextField
              value={url}
              label="URL"
              id="url"
              type="url"
              placeholder="https://example.com"
              onChange={updateFieldValue}
            />
            <Checkbox
              label="Open link in new tab"
              id="isNewTabUrl"
              checked={isNewTabUrl}
              onChange={updateFieldValue}
            />
            <Checkbox
              label="Is full width link?"
              helpText="Entire welcome bar is clickable link"
              id="isFullWidthLink"
              checked={isFullWidthLink}
              onChange={updateFieldValue}
            />
          </FormLayout>
        </Card>
      </Layout.AnnotatedSection>
      <Layout.AnnotatedSection title="Display styles" description="Style the overall appearance.">
        <Card sectioned>
          <FormLayout>
            <ChoiceList
              title="Placement"
              choices={[{ label: 'Top', value: 'top' }, { label: 'Bottom', value: 'bottom' }]}
              selected={[placement]}
              name="placement"
              onChange={updateFieldValue}
            />
            <Checkbox
              label="Is sticky bar"
              helpText="Bar sticks to top/bottom of window on scroll"
              checked={isSticky}
              id="isSticky"
              onChange={updateFieldValue}
            />
            <TextField
              value={paddingY}
              label="Vertical padding"
              helpText="Options: 'auto', 'inherit' or number px/em/%"
              id="paddingY"
              placeholder="100px, 3em, or 50%"
              onChange={updateFieldValue}
            />
            <TextField
              value={paddingX}
              label="Horizontal padding"
              helpText="Options: 'auto', 'inherit' or number px/em/%"
              id="paddingX"
              placeholder="100px, 3em, or 50%"
              onChange={updateFieldValue}
            />
            <Checkbox
              label="Show close button"
              checked={hasCloseButton}
              id="hasCloseButton"
              onChange={updateFieldValue}
            />
          </FormLayout>
        </Card>
      </Layout.AnnotatedSection>
      <Layout.AnnotatedSection title="Text styles" description="Style the welcome bar text.">
        <Card sectioned>
          <FormLayout>
            Text color
            <ColorPicker
              allowAlpha
              id="textColor"
              color={textHSBa}
              onChange={(hsba) => updateColorPickerValue(hsba, 'text')}
            />
            <ChoiceList
              title="Alignment"
              choices={[
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
              ]}
              name="textAlign"
              selected={[textAlign]}
              onChange={updateFieldValue}
            />
            <TextField
              value={fontSize}
              label="Text size"
              helpText="Options: 'inherit' or number px/em/%"
              id="fontSize"
              placeholder="14px, 1em, or 120%"
              onChange={updateFieldValue}
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
            Background color
            <ColorPicker
              allowAlpha
              id="backgroundColor"
              color={backgroundHSBa}
              onChange={(hsba) => updateColorPickerValue(hsba, 'background')}
            />
            <TextField
              value={backgroundImagePositionY}
              label="Image position vertical position"
              helpText="Options: 'center' or number px/em/%"
              id="backgroundImageSizeY"
              placeholder="center"
              onChange={updateFieldValue}
            />
            <TextField
              value={backgroundImagePositionX}
              label="Image position horizontal position"
              helpText="Options: 'center' or number px/em/%"
              id="backgroundImageSizeY"
              placeholder="center"
              onChange={updateFieldValue}
            />
            <TextField
              value={backgroundImageSizeY}
              label="Image vertical size"
              helpText="Options: 'auto', 'contain', 'cover', or number px/em/%"
              id="backgroundImageSizeY"
              placeholder="200px, 14em, or 100%"
              onChange={updateFieldValue}
            />
            <TextField
              value={backgroundImageSizeX}
              label="Image horizontal size"
              helpText="Options: 'auto', 'contain', 'cover', or number px/em/%"
              id="backgroundImageSizeX"
              placeholder="200px, 14em, or 100%"
              onChange={updateFieldValue}
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
              selected={[backgroundImageRepeat]}
              onChange={updateFieldValue}
            />
          </FormLayout>
        </Card>
      </Layout.AnnotatedSection>
    </Layout>
  );
};

SingleBarFormFields.propTypes = {
  fieldValues: PropTypes.instanceOf(Object),
  updateFieldValue: PropTypes.func.isRequired,
  updateColorPickerValue: PropTypes.func.isRequired,
};

SingleBarFormFields.defaultProps = {
  fieldValues: {},
};

export default SingleBarFormFields;
