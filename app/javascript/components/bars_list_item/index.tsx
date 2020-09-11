import React from 'react';
import {ResourceItem, TextStyle, Caption} from '@shopify/polaris';
import BarCreationDate from '../bar_creation_date';

type Props = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  locale: string;
};

const BarsListItem = ({id, title, content, createdAt, locale}: Props) => {
  const accessibilityLabel = `View details for ${title}`;

  return (
    <ResourceItem
      id={id}
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
