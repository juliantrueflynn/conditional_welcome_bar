import React from 'react';
import {
  ResourceList,
  Card,
  ResourceItem,
  TextStyle,
  Caption,
} from '@shopify/polaris';
import {BarEntryProps} from './types';
import {getSingleBarUrlPath} from '../../utilities/get_single_bar_url_path';
import ResourceCreationTime from './resource_creation_time';

const DEFAULT_LOCALE = 'en-US';

type Props = {
  bars: BarEntryProps[];
};

const locale =
  new URLSearchParams(window.location.search).get('locale') || DEFAULT_LOCALE;

const ListItem = ({id, title, content, createdAt}: BarEntryProps) => {
  const accessibilityLabel = `View details for ${title}`;

  return (
    <ResourceItem
      id={id}
      name={title}
      url={getSingleBarUrlPath(id)}
      accessibilityLabel={accessibilityLabel}
    >
      <h3>
        <TextStyle variation="strong">{title}</TextStyle>
      </h3>
      <Caption>
        <TextStyle variation="subdued">
          {'Created '}
          <ResourceCreationTime createdAt={createdAt} locale={locale} />
        </TextStyle>
      </Caption>
      {content}
    </ResourceItem>
  );
};

const BarsList = ({bars}: Props) => {
  return (
    <Card>
      <ResourceList
        resourceName={{
          singular: 'Welcome bar',
          plural: 'Welcome bars',
        }}
        items={bars}
        renderItem={(bar) => <ListItem {...bar} />}
      />
    </Card>
  );
};

export default BarsList;
