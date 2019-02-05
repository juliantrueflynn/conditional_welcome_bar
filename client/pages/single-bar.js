import React from 'react';
import PropTypes from 'prop-types';
import { Page, Form, hsbToHex, rgbToHsb } from '@shopify/polaris';
import hexToRgb from 'hex-to-rgb';
import Router from 'next/router';
import { decamelizeKeys } from 'humps';
import { apiUpdate, apiFetch } from '../util/apiUtil';
import SingleBarFormFields from '../components/SingleBarFormFields';
import ActiveBadge from '../components/ActiveBadge';

class SingleBar extends React.Component {
  static propTypes = {
    bar: PropTypes.instanceOf(Object),
  };

  static defaultProps = {
    bar: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      pageTitle: '',
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
      fontFamily: '',
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
    this.handlePixelValueChange = this.handlePixelValueChange.bind(this);
  }

  componentDidMount() {
    const { bar } = this.props;
    this.updateState(bar, this.convertToHSBa());
  }

  updateState(bar, extras = {}) {
    const { textHSBa, backgroundHSBa, ...state } = this.state;

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

    const { bar } = this.props;
    const { textHSBa, backgroundHSBa, ...state } = this.state;
    const nextState = { ...state, ...this.convertFromHSBa() };
    const payload = decamelizeKeys(nextState);

    apiUpdate(`bars/${bar.id}`, payload).then((json) => this.updateState(json));
  }

  handleValueChange(value, id) {
    this.setState({ [id]: value });
  }

  handleColorPickerValueChange(color, type) {
    const hslaFor = `${type}HSBa`;
    this.setState({ [hslaFor]: color });
  }

  convertFromHSBa() {
    const { backgroundHSBa, textHSBa } = this.state;
    const { alpha, ...bgHSL } = backgroundHSBa;
    const { alpha: txtAlpha, ...txtHSL } = textHSBa;

    return {
      backgroundColor: hsbToHex(txtHSL),
      backgroundOpacity: backgroundHSBa.alpha,
      textColor: hsbToHex(bgHSL),
      textOpacity: textHSBa.alpha,
    };
  }

  convertToHSBa() {
    const { bar } = this.props;

    const bgRgb = hexToRgb(bar.backgroundColor);
    const bgHSL = rgbToHsb({ red: bgRgb[0], green: bgRgb[1], blue: bgRgb[2] });
    const backgroundHSBa = { ...bgHSL, alpha: bar.backgroundOpacity };

    const txtRgb = hexToRgb(bar.textColor);
    const txtHSL = rgbToHsb({ red: txtRgb[0], green: txtRgb[1], blue: txtRgb[2] });
    const textHSBa = { ...txtHSL, alpha: bar.textOpacity };

    return { backgroundHSBa, textHSBa };
  }

  handlePixelValueChange(field) {
    this.handlePixelValueChange(field);
  }

  render() {
    const { bar } = this.props;
    const { pageTitle, isActive } = this.state;
    const primaryAction = {
      content: 'Save',
      onAction: this.handleFormSubmit,
    };
    const breadcrumbs = [{ content: 'Welcome Bars', onAction: () => Router.push('/') }];
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
        </Form>
      </Page>
    );
  }
}

SingleBar.getInitialProps = async (ctx) => {
  if (!ctx.query.id) {
    return { bar: {} };
  }

  const response = await apiFetch(`bars/${ctx.query.id}`);

  return { bar: response };
};

export default SingleBar;
