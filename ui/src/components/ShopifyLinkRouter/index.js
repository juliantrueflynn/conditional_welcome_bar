import React from 'react';
import PropTypes from 'prop-types';

const ShopifyLinkRouter = ({ history, url, children, ...attrs }) => {
  const handleOnClick = (e) => {
    e.preventDefault();

    const { url, history } = this.props;
    history.push(url);
  }

  return <a {...attrs} onClick={handleOnClick}>{children}</a>;
}

ShopifyLinkRouter.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default ShopifyLinkRouter;
