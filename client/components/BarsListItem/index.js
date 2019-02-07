import React from 'react';
import PropTypes from 'prop-types';
import { ResourceList, TextStyle } from '@shopify/polaris';
import TimeAgo from 'timeago-react';
import './styles.css';

const BarsListItem = (props) => {
  const { id, title, content, createdAt } = props;
  const createDatetime = new Date(createdAt);
  const accessibilityLabel = `View details for ${title}`;
  const url = { to: { pathname: '/single-bar', query: { id } }, as: `/bars/${id}` };

  return (
    <div className="BarsListItem">
      <ResourceList.Item id={id} url={url} accessibilityLabel={accessibilityLabel}>
        <div className="BarsListItem__Main">
          <h3 className="BarsListItem__Title">
            <TextStyle variation="strong">{title}</TextStyle>
          </h3>
          <div className="BarsListItem__Date">
            <TextStyle variation="subdued">
              {'Created '}
              <TimeAgo datetime={createDatetime} />
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
  title: PropTypes.string,
  content: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};

BarsListItem.defaultProps = {
  title: '',
  content: '',
};

export default BarsListItem;
