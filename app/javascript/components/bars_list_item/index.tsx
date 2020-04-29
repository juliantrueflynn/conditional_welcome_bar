import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ResourceList, TextStyle } from '@shopify/polaris';
import BarCreationDate from '../bar_creation_date';

type Props = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  locale: string | null;
};

const BarsListItem: React.FC<Props> = ({
  id,
  title,
  content,
  createdAt,
  locale,
}) => {
  const history = useHistory();
  const { search } = useLocation();

  const handleOnClick = (): void => {
    history.push({ pathname: `/bars/${id}`, search });
  };

  const accessibilityLabel = `View details for ${title}`;

  return (
    <div className="BarsListItem">
      <ResourceList.Item
        id={id.toString()}
        onClick={handleOnClick}
        accessibilityLabel={accessibilityLabel}
      >
        <div className="BarsListItem__Main">
          <h3 className="BarsListItem__Title">
            <TextStyle variation="strong">{title}</TextStyle>
          </h3>
          <div className="BarsListItem__Date">
            <TextStyle variation="subdued">
              {'Created '}
              <BarCreationDate createdAt={createdAt} locale={locale} />
            </TextStyle>
          </div>
        </div>
        {content}
      </ResourceList.Item>
    </div>
  );
};

export default BarsListItem;
