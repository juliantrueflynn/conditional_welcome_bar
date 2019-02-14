import React from 'react';
import PropTypes from 'prop-types';
import { Page, Form, Button } from '@shopify/polaris';
import { decamelizeKeys } from 'humps';
import { convertToHSBa, convertFromHSBa } from '../../util/colorPickerUtil';
import { apiUpdate } from '../../util/apiUtil';
import SingleBarFormFields from '../SingleBarFormFields';
import ActiveBadge from '../ActiveBadge';

class SingleBarForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTitle: '',
      hasValuesChanged: false,
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
      fontSize: 'inherit',
      textColor: '',
      textOpacity: 1.0,
      textAlign: '',
      backgroundOpacity: 1.0,
      backgroundColor: '',
      backgroundImage: '',
      backgroundImageRepeat: '',
      backgroundImageSizeX: '',
      backgroundImageSizeY: '',
      backgroundImagePositionX: '',
      backgroundImagePositionY: '',
      backgroundHSBa: { hue: 0, brightness: 0, saturation: 0, alpha: 0 },
      textHSBa: { hue: 0, brightness: 0, saturation: 0, alpha: 0 },
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleColorPickerValueChange = this.handleColorPickerValueChange.bind(this);
  }

  componentDidMount() {
    const { bar } = this.props;
    this.updateBarAttributes(bar, convertToHSBa(bar));
  }

  updateBarAttributes(bar, extras = {}) {
    const { hasValuesChanged, textHSBa, backgroundHSBa, ...state } = this.state;

    const nextState = {};
    Object.keys(bar)
      .filter((key) => key !== 'createdAt' && key !== 'updatedAt' && key !== 'id' && bar[key])
      .forEach((key) => {
        nextState[key] = bar[key];
      });

    this.setState({ ...state, ...nextState, ...extras, pageTitle: nextState.title });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const { bar, toggleToast } = this.props;
    const { textHSBa, backgroundHSBa, ...state } = this.state;
    const nextState = { ...state, ...convertFromHSBa(this.state) };
    const payload = decamelizeKeys(nextState);

    apiUpdate(`bars/${bar.id}`, payload).then((json) => {
      this.updateBarAttributes(json);
      this.setState({ hasValuesChanged: false });
      toggleToast('Welcome bar updated');
    });
  }

  handleValueChange(value, id) {
    const { bar } = this.props;
    const hasValuesChanged = bar[id] !== value;
    this.setState({ [id]: value, hasValuesChanged });
  }

  handleColorPickerValueChange(color, id) {
    const hsbaKey = `${id}HSBa`;
    this.setState({ [hsbaKey]: color });
  }

  render() {
    const { bar, breadcrumbs } = this.props;
    const { pageTitle, isActive, hasValuesChanged } = this.state;
    const primaryAction = {
      content: 'Save',
      onAction: this.handleFormSubmit,
      disabled: !hasValuesChanged,
    };
    const title = pageTitle || bar.title;

    return (
      <Page
        title={title}
        primaryAction={primaryAction}
        breadcrumbs={breadcrumbs}
        titleMetadata={<ActiveBadge isActive={isActive} />}
        forceRender
      >
        <Form onSubmit={this.handleFormSubmit}>
          <SingleBarFormFields
            updateFieldValue={this.handleValueChange}
            updateFieldWithPixel={this.handlePixelValueChange}
            updateColorPickerValue={this.handleColorPickerValueChange}
            {...this.state}
          />
          <Button submit primary disabled={!hasValuesChanged}>
            Save
          </Button>
        </Form>
      </Page>
    );
  }
}

SingleBarForm.propTypes = {
  bar: PropTypes.instanceOf(Object).isRequired,
  breadcrumbs: PropTypes.instanceOf(Object),
  toggleToast: PropTypes.func.isRequired,
};

export default SingleBarForm;
