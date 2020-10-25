import React from 'react';
import {screen, render} from '@testing-library/react';
import {Bars_bars} from '../graphql';
import {PolarisTestProvider} from '@shopify/polaris';
import BarsList from '../bars_list';

const createdAt = new Date().toString();
const bars: Bars_bars[] = [
  {id: '1', title: 'Bar #1', content: 'Some content #1', createdAt, __typename: 'Bar'},
  {id: '2', title: 'Bar #2', content: 'Some content #2', createdAt, __typename: 'Bar'},
];

test('renders entries', () => {
  render(
    <PolarisTestProvider>
      <BarsList bars={bars} />
    </PolarisTestProvider>
  );

  expect(screen.getByText(bars[0].title)).toBeInTheDocument();
  expect(screen.getByText(bars[0].content)).toBeInTheDocument();
  expect(screen.getByText(bars[1].title)).toBeInTheDocument();
  expect(screen.getByText(bars[1].content)).toBeInTheDocument();
});
