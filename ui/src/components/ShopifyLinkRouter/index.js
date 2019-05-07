import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const ShopifyLinkRouter = ({ history, location: { search }, url, children, ...attrs }) => {
  const handleOnClick = (e) => {
    e.preventDefault();

    history.push({ pathname: url, search });
  };

  return (
    <a {...attrs} onClick={handleOnClick}>
      {children}
    </a>
  );
};

ShopifyLinkRouter.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(ShopifyLinkRouter);
