import React from 'react';
import { ResourceList, Card } from '@shopify/polaris';
import { BarType } from '../../types/bar';

const BarsListItem = React.lazy(() => import('../bars_list_item'));

type Props = {
  bars: BarType[];
};

const resourceName = {
  singular: 'Welcome bar',
  plural: 'Welcome bars',
};

const locale: string =
  new URLSearchParams(window.location.search).get('locale') || 'en-US';

const BarsList: React.FC<Props> = ({ bars }) => {
  return (
    <Card>
      <ResourceList
        resourceName={resourceName}
        items={bars}
        renderItem={(bar: BarType) => <BarsListItem {...bar} locale={locale} />}
      />
    </Card>
  );
};

export default BarsList;
