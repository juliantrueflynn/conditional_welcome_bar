import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@shopify/polaris';

const ActiveBadge = ({ isActive }) => {
  if (isActive) {
    return (
      <Badge progress="complete" status="success">
        Active
      </Badge>
    );
  }

  return <Badge progress="incomplete">Active</Badge>;
};

ActiveBadge.propTypes = {
  isActive: PropTypes.bool,
};

ActiveBadge.defaultProps = {
  isActive: false,
};

export default ActiveBadge;
