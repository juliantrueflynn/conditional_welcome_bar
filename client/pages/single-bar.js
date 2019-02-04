import React from 'react';
import PropTypes from 'prop-types';
import { Page, Form } from '@shopify/polaris';
import Router from 'next/router';
import { decamelizeKeys } from 'humps';
import { apiUpdate, apiFetch } from '../util/apiUtil';
import SingleBarFormFields from '../components/SingleBarFormFields';

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
      fontColor: '',
      fontFamily: '',
      textOpacity: 100,
      textAlign: '',
      backgroundOpacity: 100,
      backgroundColor: '',
      backgroundImage: '',
      backgroundImageRepeat: '',
      backgroundImageSizeX: '',
      backgroundImageSizeY: '',
      backgroundImagePositionX: '',
      backgroundImagePositionY: '',
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleColorPickerValueChange = this.handleColorPickerValueChange.bind(this);
    this.handlePixelValueChange = this.handlePixelValueChange.bind(this);
  }

  componentDidMount() {
    const { bar } = this.props;
    this.updateState(bar);
  }

  updateState(bar) {
    const { ...state } = this.state;

    const nextState = {};
    Object.keys(bar)
      .filter((key) => key !== 'createdAt' && key !== 'updatedAt' && key !== 'id' && bar[key])
      .forEach((key) => {
        nextState[key] = bar[key];
      });

    this.setState({ ...state, ...nextState, pageTitle: nextState.title });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const { bar } = this.props;
    const { ...state } = this.state;
    const payload = decamelizeKeys(state);

    apiUpdate(`bars/${bar.id}`, payload).then((json) => this.updateState(json));
  }

  handleValueChange(value, id) {
    this.setState({ [id]: value });
  }

  handleColorPickerValueChange(field) {
    // this.handleValueChange(field);
  }

  handlePixelValueChange(field) {
    this.handlePixelValueChange(field);
  }

  render() {
    const { bar } = this.props;
    const { pageTitle } = this.state;
    const primaryAction = {
      content: 'Save',
      onAction: this.handleFormSubmit,
    };
    const breadcrumbs = [{ content: 'Welcome Bars', onAction: () => Router.push('/') }];
    const title = pageTitle || bar.title;

    return (
      <Page title={title} forceRender primaryAction={primaryAction} breadcrumbs={breadcrumbs}>
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
