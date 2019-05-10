import React from 'react';
import PropTypes from 'prop-types';
import { ResourceList, TextStyle } from '@shopify/polaris';
import BarCreationDate from '../BarCreationDate';

const BarsListItem = ({ id, title, content, createdAt, navigateToBar }) => {
  const handleOnClick = () => navigateToBar(id);

  const accessibilityLabel = `View details for ${title}`;

  return (
    <div className="BarsListItem">
      <ResourceList.Item id={id} onClick={handleOnClick} accessibilityLabel={accessibilityLabel}>
        <div className="BarsListItem__Main">
          <h3 className="BarsListItem__Title">
            <TextStyle variation="strong">{title}</TextStyle>
          </h3>
          <div className="BarsListItem__Date">
            <TextStyle variation="subdued">
              {'Created '}
              <BarCreationDate createdAt={createdAt} />
            </TextStyle>
          </div>
        </div>
        {content}
      </ResourceList.Item>
    </div>
  );
};

BarsListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  navigateToBar: PropTypes.func.isRequired,
};

export default BarsListItem;
