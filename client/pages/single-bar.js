/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Page, Card, Form, TextField, FormLayout, ChoiceList, RangeSlider, ColorPicker, Checkbox } from '@shopify/polaris';
import '@shopify/polaris/styles.css';

class SingleBar extends React.Component {
  static propTypes = {
    bar: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      content: PropTypes.string,
      hasCloseButton: PropTypes.bool,
      isActive: PropTypes.bool,
    }),
  };

  static defaultProps = {
    bar: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      hasCloseButton: false,
      isActive: false,
      placement: '',
      pageTemplate: '',
      isSticky: true,
      url: '',
      isFullWidthLink: true,
      isNewTabUrl: true,
      paddingY: '',
      paddingX: '',
      fontSize: '',
      fontColor: '',
      fontFamily: '',
      textOpacity: 100,
      textAlign: '',
      backgroundOpacity: 100,
      backgroundColor: '',
      backgroundImage: '',
      backgroundImageRepeat: '',
      backgroundImageSizeX: '',
      backgroundImagePositionX: '',
      backgroundImagePositionY: '',
    };

    this.handleValueChange = this.handleValueChange.bind(this);
  }

  componentDidMount() {
    const { bar } = this.props;
    const { ...state } = this.state;

    const nextState = {};
    Object.keys(bar).forEach((key) => {
      nextState[key] = bar[key];
    });

    this.setState({ ...state, nextState });
  }

  handleValueChange(field) {
    return (value) => this.setState({ [field]: value });
  }

  render() {
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
      fontColor,
      fontFamily, // @TODO: Google fonts select?
      textOpacity,
      textAlign,
      backgroundColor,
      backgroundOpacity,
      backgroundImage, // @TODO: Image uploader
      backgroundImageRepeat,
      backgroundImageSizeY,
      backgroundImageSizeX,
      backgroundImagePositionX,
      backgroundImagePositionY,
    } = this.state;
    const { bar } = this.props;
    const primaryAction = {
      content: 'Save',
    };

    return (
      <Page title={bar.title} forceRender primaryAction={primaryAction}>
        <Form>
          <Layout>
            <Layout.AnnotatedSection
              title="Editor"
              description="A sample form using Polaris components."
            >
              <Card sectioned>
                <FormLayout>
                  <TextField
                    value={title}
                    label="Title"
                    placeholder="Title"
                    onChange={this.handleValueChange('title')}
                  />
                  <TextField
                    value={content}
                    label="Content"
                    placeholder="Start typing..."
                    onChange={this.handleValueChange('content')}
                    multiline
                  />
                </FormLayout>
              </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection
              title="Visibility"
              description="A sample form using Polaris components."
            >
              <Card sectioned>
                <FormLayout>
                  <ChoiceList
                    title="Active status"
                    choices={[
                      { label: 'Active', value: true },
                      { label: 'Inactive', value: false },
                    ]}
                    selected={[isActive]}
                    onChange={this.handleValueChange('isActive')}
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
                    onChange={this.handleValueChange('pageTemplate')}
                    allowMultiple
                  />
                </FormLayout>
              </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection
              title="Link"
              description="A sample form using Polaris components."
            >
              <Card sectioned>
                <FormLayout>
                  <TextField
                    value={url}
                    label="URL"
                    placeholder="https://example.com"
                    onChange={this.handleValueChange('title')}
                  />
                  <Checkbox
                    label="Open link in new tab"
                    checked={[isNewTabUrl]}
                    onChange={this.handleValueChange('isNewTabUrl')}
                  />
                  <Checkbox
                    label="Entire bar is link"
                    checked={[isFullWidthLink]}
                    onChange={this.handleValueChange('isFullWidthLink')}
                  />
                </FormLayout>
              </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection
              title="Display styles"
              description="A sample form using Polaris components."
            >
              <Card sectioned>
                <FormLayout>
                  <ChoiceList
                    title="Placement"
                    choices={[{ label: 'Top', value: 'top' }, { label: 'Bottom', value: 'bottom' }]}
                    selected={[placement]}
                    onChange={this.handleValueChange('placement')}
                  />
                  <ChoiceList
                    title="Sticky bar"
                    choices={[
                      { label: 'Sticky position', value: true },
                      { label: 'Static position', value: false },
                    ]}
                    selected={[isSticky]}
                    onChange={this.handleValueChange('isSticky')}
                  />
                  <RangeSlider
                    label="Vertical padding"
                    value={paddingY}
                    onChange={this.handleValueChange('paddingY')}
                  />
                  <RangeSlider
                    label="Horizontal padding"
                    value={paddingX}
                    onChange={this.handleValueChange('paddingX')}
                  />
                  <ChoiceList
                    title="Close button"
                    choices={[{ label: 'Show', value: true }, { label: 'Hide', value: false }]}
                    selected={[hasCloseButton]}
                    onChange={this.handleValueChange('hasCloseButton')}
                  />
                </FormLayout>
              </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection
              title="Text styles"
              description="A sample form using Polaris components."
            >
              <Card sectioned>
                <FormLayout>
                  Text color
                  <ColorPicker color={fontColor} allowAlpha />
                  <ChoiceList
                    title="Alignment"
                    choices={[
                      { label: 'Left', value: 'left' },
                      { label: 'Center', value: 'center' },
                      { label: 'Right', value: 'right' },
                    ]}
                    selected={[textAlign]}
                    onChange={this.handleValueChange('textAlign')}
                  />
                  <ChoiceList
                    title="Inherit font size"
                    choices={[
                      { label: 'Use default size from page', value: true },
                      { label: 'Set custom font size', value: false },
                    ]}
                    selected={[fontSize]} // @TODO: Change this to hide/show field below
                    onChange={this.handleValueChange('fontSize')}
                  />
                  <RangeSlider
                    label="Size"
                    value={fontSize}
                    onChange={this.handleValueChange('fontSize')}
                  />
                </FormLayout>
              </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection
              title="Background styles"
              description="A sample form using Polaris components."
            >
              <Card sectioned>
                <FormLayout>
                  Background color
                  <ColorPicker color={backgroundColor} allowAlpha />
                  <ChoiceList
                    title="Image position vertical placement"
                    choices={[
                      { label: 'Center', value: 'center' },
                      { label: 'Use custom number', value: false }, // @TODO: Set conditional field
                    ]}
                    selected={[backgroundImagePositionY]}
                    onChange={this.handleValueChange('backgroundImagePositionY')}
                  />
                  <ChoiceList
                    title="Image position horizontal placement"
                    choices={[
                      { label: 'Center', value: 'center' },
                      { label: 'Use custom number', value: false }, // @TODO: Set conditional field
                    ]}
                    selected={[backgroundImagePositionX]}
                    onChange={this.handleValueChange('backgroundImagePositionX')}
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
                    selected={[backgroundImageSizeY]}
                    onChange={this.handleValueChange('backgroundImageSizeY')}
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
                    selected={[backgroundImageSizeX]}
                    onChange={this.handleValueChange('backgroundImageSizeX')}
                  />
                  <ChoiceList
                    title="Image repeat"
                    choices={[
                      { label: 'Do not repeat', value: 'no-repeat' },
                      { label: 'Repeat', value: 'repeat' },
                      { label: 'Repeat vertically only', value: 'repeat-y' },
                      { label: 'Repeat horizontally only', value: 'repeat-x' },
                    ]}
                    selected={[backgroundImageRepeat]}
                    onChange={this.handleValueChange('backgroundImageRepeat')}
                  />
                </FormLayout>
              </Card>
            </Layout.AnnotatedSection>
          </Layout>
        </Form>
      </Page>
    );
  }
}

SingleBar.getInitialProps = async (ctx) => {
  if (!ctx.query.id) {
    return { bar: {} };
  }

  // eslint-disable-next-line no-undef
  const res = await fetch(`${TUNNEL_URL}/api/bars/${ctx.query.id}`);
  const json = await res.json();

  return { bar: json };
};

export default SingleBar;
