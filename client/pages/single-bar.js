import React from 'react';
import PropTypes from 'prop-types';
import { Page, Form } from '@shopify/polaris';
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
    const { ...state } = this.state;

    const nextState = {};
    Object.keys(bar)
      .filter((key) => bar[key])
      .forEach((key) => {
        nextState[key] = bar[key];
      });

    this.setState({ ...state, ...nextState });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const { ...state } = this.state;
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
    const primaryAction = {
      content: 'Save',
    };

    return (
      <Page title={bar.title} forceRender primaryAction={primaryAction}>
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

  // eslint-disable-next-line no-undef
  const res = await fetch(`${TUNNEL_URL}/api/bars/${ctx.query.id}`);
  const json = await res.json();

  return { bar: json };
};

export default SingleBar;
