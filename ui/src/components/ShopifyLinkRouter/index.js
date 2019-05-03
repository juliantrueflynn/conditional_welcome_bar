import React from 'react';
import PropTypes from 'prop-types';

class ShopifyLinkRouter extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    e.preventDefault();

    const { url, history } = this.props;
    history.push(url);
  }

  render() {
    const { children, url, history, ...props } = this.props;

    return (
      <a href="#" {...props} onClick={this.handleOnClick}>
        {children}
      </a>
    );
  }
}

ShopifyLinkRouter.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default ShopifyLinkRouter;
