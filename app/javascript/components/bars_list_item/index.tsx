import React from 'react';
import { ResourceItem, TextStyle, Caption } from '@shopify/polaris';
import BarCreationDate from '../bar_creation_date';

type Props = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  locale: string;
};

const BarsListItem: React.FC<Props> = ({
  id,
  title,
  content,
  createdAt,
  locale,
}) => {
  const accessibilityLabel = `View details for ${title}`;

  return (
    <ResourceItem
      id={id.toString()}
      name={title}
      url={`/bars/${id}`}
      accessibilityLabel={accessibilityLabel}
    >
      <h3>
        <TextStyle variation="strong">{title}</TextStyle>
      </h3>
      <Caption>
        <TextStyle variation="subdued">
          {'Created '}
          <BarCreationDate createdAt={createdAt} locale={locale} />
        </TextStyle>
      </Caption>
      {content}
    </ResourceItem>
  );
};

export default BarsListItem;
