import React from 'react';
import LoadingManager from '..';
import { render } from '@testing-library/react';
import { PolarisTestProvider } from '@shopify/polaris';

it('renders title Home', () => {
  const { queryByText } = render(
    <PolarisTestProvider>
      <LoadingManager loadingTo="home" isLoading={true}>
        <>Some child</>
      </LoadingManager>
    </PolarisTestProvider>
  );
  const child = queryByText('Home');

  expect(child).not.toBeNull();
});

it('renders child if not loading', () => {
  const { queryByTestId } = render(
    <PolarisTestProvider>
      <LoadingManager loadingTo="home" isLoading={false}>
        <div data-testid="child">Render me</div>
      </LoadingManager>
    </PolarisTestProvider>
  );
  const child = queryByTestId('child');

  expect(child).not.toBeNull();
});

it('does not render child if loading', () => {
  const { queryByTestId } = render(
    <PolarisTestProvider>
      <LoadingManager loadingTo="home" isLoading={true}>
        <div data-testid="child">Render me</div>
      </LoadingManager>
    </PolarisTestProvider>
  );
  const child = queryByTestId('child');

  expect(child).toBeNull();
});
