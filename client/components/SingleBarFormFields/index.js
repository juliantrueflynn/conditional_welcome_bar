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
  RangeSlider,
} from '@shopify/polaris';

const SingleBarFormFields = ({
  updateFieldValue,
  updateFieldWithPixel,
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
    textColor,
    textOpacity,
    fontFamily, // @TODO: Google fonts select?
    textAlign,
    backgroundColor,
    backgroundImage, // @TODO: Image uploader
    backgroundImageRepeat,
    backgroundImageSizeY,
    backgroundImageSizeX,
    backgroundImagePositionX,
    backgroundImagePositionY,
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
              label="Entire bar is link"
              id="isFullWidthLink"
              checked={isFullWidthLink}
              onChange={updateFieldValue}
            />
          </FormLayout>
        </Card>
      </Layout.AnnotatedSection>
      <Layout.AnnotatedSection title="Display styles" description="Style the overall display.">
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
              helpText="Bar sticks to top/bottom on scroll"
              checked={isSticky}
              id="isSticky"
              onChange={updateFieldValue}
            />
            <RangeSlider
              label="Vertical padding"
              value={paddingY}
              id="paddingY"
              onChange={updateFieldValue}
            />
            <RangeSlider
              label="Horizontal padding"
              value={paddingX}
              id="paddingX"
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
              color={{ hue: 120, brightness: 1, saturation: 1 }} // Temporary
              // color={fontColor}
              onChange={updateColorPickerValue}
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
            <ChoiceList
              title="Inherit font size"
              choices={[
                { label: 'Use default size from page', value: true },
                { label: 'Set custom font size', value: false },
              ]}
              name="fontSize"
              selected={[fontSize]} // @TODO: Set conditional field
              onChange={updateFieldValue}
            />
            <RangeSlider
              label="Size"
              value={fontSize}
              id="fontSize"
              onChange={updateFieldWithPixel}
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
              color={{ hue: 120, brightness: 1, saturation: 1 }} // Temporary
              // color={backgroundColor}
              onChange={updateColorPickerValue}
            />
            <ChoiceList
              title="Image position vertical placement"
              choices={[
                { label: 'Center', value: 'center' },
                { label: 'Use custom number', value: false }, // @TODO: Set conditional field
              ]}
              name="backgroundImagePositionY"
              selected={[backgroundImagePositionY]}
              onChange={updateFieldValue}
            />
            <ChoiceList
              title="Image position horizontal placement"
              choices={[
                { label: 'Center', value: 'center' },
                { label: 'Use custom number', value: false }, // @TODO: Set conditional field
              ]}
              name="backgroundImagePositionX"
              selected={[backgroundImagePositionX]}
              onChange={updateFieldValue}
            />
            <ChoiceList
              title="Image vertical size"
              choices={[
                { label: 'Default (auto size)', value: 'auto' },
                { label: 'Contained image', value: 'contain' },
                { label: 'Fit entire container', value: 'cover' },
                { label: 'Use custom number', value: false }, // @TODO: Set conditional field
                { label: 'Use custom percent', value: 'backgroundSizeYPixel' }, // @TODO: Set conditional field
              ]}
              name="backgroundImageSizeY"
              selected={[backgroundImageSizeY]}
              onChange={updateFieldValue}
            />
            <ChoiceList
              title="Image horizontal size"
              choices={[
                { label: 'Default (auto size)', value: 'auto' },
                { label: 'Contained image', value: 'contain' },
                { label: 'Fit entire container', value: 'cover' },
                { label: 'Use custom number', value: false }, // @TODO: Set conditional field
                { label: 'Use custom percent', value: 'backgroundSizeXPercent' }, // @TODO: Set conditional field
              ]}
              name="backgroundImageSizeX"
              selected={[backgroundImageSizeX]}
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
  updateFieldWithPixel: PropTypes.func.isRequired,
  updateColorPickerValue: PropTypes.func.isRequired,
};

SingleBarFormFields.defaultProps = {
  fieldValues: {},
};

export default SingleBarFormFields;
