import React from 'react';
import PropTypes from 'prop-types';
import { ResourceList, TextStyle } from '@shopify/polaris';
import TimeAgo from 'timeago-react';
import { navigateToBar } from '../../util/linkUtil';
import './styles.css';

class BarsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    const { id } = this.props;
    navigateToBar({ id });
  }

  render() {
    const { id, title, content, createdAt } = this.props;
    const createDatetime = new Date(createdAt);
    const accessibilityLabel = `View details for ${title}`;

    return (
      <div className="BarsListItem">
        <ResourceList.Item
          id={id}
          onClick={this.handleOnClick}
          accessibilityLabel={accessibilityLabel}
        >
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
  }
}

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
