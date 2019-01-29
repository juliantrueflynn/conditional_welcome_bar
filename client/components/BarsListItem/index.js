import React from 'react';
import PropTypes from 'prop-types';
import { ResourceList, TextStyle } from '@shopify/polaris';
import '@shopify/polaris/styles.css';

const BarsListItem = (props) => {
  const { id, title } = props;

  return (
    <div className="BarsListItem">
      <ResourceList.Item id={id} accessibilityLabel={`View details for ${title}`}>
        <h3 className="BarsListItem__Title">
          <TextStyle variation="strong">{title}</TextStyle>
        </h3>
      </ResourceList.Item>
    </div>
  );
};

BarsListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
};

BarsListItem.defaultProps = {
  title: '',
};

export default BarsListItem;
