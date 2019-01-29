import React from 'react';
import PropTypes from 'prop-types';
import { ResourceList, TextStyle } from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import TimeAgo from 'timeago-react';

const BarsListItem = (props) => {
  const { id, title, content, createdAt } = props;
  const createDatetime = new Date(createdAt);

  return (
    <div className="BarsListItem">
      <ResourceList.Item id={id} accessibilityLabel={`View details for ${title}`}>
        <div className="BarsListItem__Main">
          <h3 className="BarsListItem__Title">
            <TextStyle variation="strong">{title}</TextStyle>
          </h3>
          <div className="BarsListItem__Date">
            {'Created '}
            <TimeAgo datetime={createDatetime} />
          </div>
        </div>
        {content}
      </ResourceList.Item>
    </div>
  );
};

BarsListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};

BarsListItem.defaultProps = {
  title: '',
  content: '',
};

export default BarsListItem;
