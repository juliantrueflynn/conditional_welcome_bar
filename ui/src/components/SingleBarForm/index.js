import React from 'react';
import PropTypes from 'prop-types';
import { Page, Form, Button, ButtonGroup } from '@shopify/polaris';
import { decamelizeKeys } from 'humps';
import { convertToHSBa, convertFromHSBa } from '../../util/colorPickerUtil';
import { apiUpdateBar } from '../../util/apiUtil';
import SingleBarFormFields from '../SingleBarFormFields';
import ActiveBadge from '../ActiveBadge';

class SingleBarForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTitle: '',
      isUpdating: false,
      hasFormValuesChanged: false,
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
      backgroundFile: null,
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleColorPickerValueChange = this.handleColorPickerValueChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  componentDidMount() {
    const { bar } = this.props;
    this.updateBarAttributes(bar, convertToHSBa(bar));
  }

  getBarStateAttributes() {
    const {
      id,
      isUpdating,
      hasFormValuesChanged,
      pageTitle,
      textHSBa,
      backgroundHSBa,
      backgroundFile,
      ...state
    } = this.state;

    return state;
  }

  getFormData() {
    const nextState = decamelizeKeys({
      ...this.getBarStateAttributes(),
      ...convertFromHSBa(this.state),
    });

    const formData = new FormData();
    Object.keys(nextState).forEach((key) => {
      formData.append(`bar[${key}]`, nextState[key]);
    });

    return formData;
  }

  updateBarAttributes(bar, extras = {}) {
    const nextState = {};
    Object.keys(bar)
      .filter((key) => key !== 'createdAt' && key !== 'updatedAt' && key !== 'id' && bar[key])
      .forEach((key) => {
        nextState[key] = bar[key];
      });

    this.setState({
      ...this.getBarStateAttributes(),
      ...nextState,
      ...extras,
      pageTitle: nextState.title,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.setState({ isUpdating: true });
    const { bar, toggleToast } = this.props;
    const body = this.getFormData();

    apiUpdateBar(bar.id, body).then((json) => {
      this.updateBarAttributes(json);
      this.setState({ hasFormValuesChanged: false, isUpdating: false });
      toggleToast('Welcome bar updated');
    });
  }

  handleValueChange(value, id) {
    const { bar } = this.props;
    const hasFormValuesChanged = bar[id] !== value;
    this.setState({ [id]: value, hasFormValuesChanged });
  }

  handleColorPickerValueChange(color, id) {
    const hsbaKey = `${id}HSBa`;
    this.setState({ [hsbaKey]: color, hasFormValuesChanged: true });
  }

  handleImageUpload(_, acceptedFiles) {
    this.setState({
      backgroundFile: acceptedFiles[0],
      backgroundImage: acceptedFiles[0],
      hasFormValuesChanged: true,
    });
  }

  render() {
    const { bar, breadcrumbs, toggleModal } = this.props;
    const { pageTitle, isActive, hasFormValuesChanged, isUpdating } = this.state;

    const primaryAction = {
      content: 'Save',
      onAction: this.handleFormSubmit,
      disabled: !hasFormValuesChanged,
      loading: isUpdating,
    };
    const title = pageTitle || bar.title;

    return (
      <Page
        title={title}
        primaryAction={primaryAction}
        breadcrumbs={breadcrumbs}
        titleMetadata={<ActiveBadge isActive={isActive} />}
      >
        <Form onSubmit={this.handleFormSubmit}>
          <SingleBarFormFields
            updateFieldValue={this.handleValueChange}
            updateFieldWithPixel={this.handlePixelValueChange}
            updateColorPickerValue={this.handleColorPickerValueChange}
            updateImageUpload={this.handleImageUpload}
            {...this.state}
          />
          <div className="SingleBarForm__SecondaryButtons">
            <ButtonGroup>
              <Button onClick={() => toggleModal(bar.id)}>Delete</Button>
              <Button submit primary loading={isUpdating} disabled={!hasFormValuesChanged}>
                Save
              </Button>
            </ButtonGroup>
          </div>
        </Form>
      </Page>
    );
  }
}

SingleBarForm.propTypes = {
  bar: PropTypes.instanceOf(Object).isRequired,
  breadcrumbs: PropTypes.instanceOf(Object).isRequired,
  toggleToast: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default SingleBarForm;
