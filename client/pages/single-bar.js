/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Page } from '@shopify/polaris';
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
      fontFamily,
      textOpacity,
      textAlign,
      backgroundOpacity,
      backgroundColor,
      backgroundImage,
      backgroundImageRepeat,
      backgroundImageSizeX,
      backgroundImagePositionX,
      backgroundImagePositionY,
    } = this.state;
    const { bar } = this.props;
    const primaryAction = {
      content: 'Save',
    };

    return (
      <Page title="Single" forceRender primaryAction={primaryAction}>
        <Layout>
          SINGLE VIEW
        </Layout>
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
