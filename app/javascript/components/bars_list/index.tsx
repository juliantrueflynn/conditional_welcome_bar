import React from 'react';
import {ResourceList, Card} from '@shopify/polaris';
import BarsListItem from '../bars_list_item';

type BarEntryProps = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

type Props = {
  bars: BarEntryProps[];
};

const resourceName = {
  singular: 'Welcome bar',
  plural: 'Welcome bars',
};

const locale: string =
  new URLSearchParams(window.location.search).get('locale') || 'en-US';

const BarsList = ({bars}: Props) => {
  return (
    <Card>
      <ResourceList
        resourceName={resourceName}
        items={bars}
        renderItem={(bar) => <BarsListItem {...bar} locale={locale} />}
      />
    </Card>
  );
};

export default BarsList;
