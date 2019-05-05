import React from 'react';
import PropTypes from 'prop-types';
import history from '../../util/historyUtil';

const ShopifyLinkRouter = ({ url, children, ...attrs }) => {
  const handleOnClick = (e) => {
    e.preventDefault();

    history.push(url);
  }

  return <a {...attrs} onClick={handleOnClick}>{children}</a>;
}

ShopifyLinkRouter.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string.isRequired,
};

export default ShopifyLinkRouter;
