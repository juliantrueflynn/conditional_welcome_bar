import { enableFetchMocks } from 'jest-fetch-mock';
import React from 'react';
import IndexBarsView from '..';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { PolarisTestProvider } from '@shopify/polaris';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { mockBarFields } from '../../../__mocks__/single_bar_mocks';
import { GET_ALL_BARS } from '../../../utilities/graphql_tags';

const mockBarsData = [
  { ...mockBarFields, id: Math.random(), title: 'Bar #1' },
  { ...mockBarFields, id: Math.random(), title: 'Bar #2' },
];
const graphqlResponseMocks = [
  {
    request: {
      query: GET_ALL_BARS,
    },
    result: {
      data: {
        bars: mockBarsData,
      },
    },
  },
];

it('renders entries', () => {
  enableFetchMocks();
  const history = createMemoryHistory();
  const { findByText } = render(
    <MockedProvider mocks={graphqlResponseMocks} addTypename={false}>
      <Router history={history}>
        <PolarisTestProvider>
          <React.Suspense fallback="Mocked for test">
            <IndexBarsView />
          </React.Suspense>
        </PolarisTestProvider>
      </Router>
    </MockedProvider>
  );

  mockBarsData.forEach(async (welcomeBar) => {
    expect(await findByText(welcomeBar.title)).toBeInTheDocument();
  });
});
