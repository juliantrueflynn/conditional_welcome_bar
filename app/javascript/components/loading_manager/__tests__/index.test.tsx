import React from 'react';
import LoadingManager from '..';
import { screen, render } from '@testing-library/react';
import { PolarisTestProvider } from '@shopify/polaris';

it('renders title Home', () => {
  render(
    <PolarisTestProvider>
      <LoadingManager loadingTo="home" isLoading={true}>
        <>Some child</>
      </LoadingManager>
    </PolarisTestProvider>
  );

  expect(screen.getByText('Home')).toBeInTheDocument();
});

it('renders child if not loading', () => {
  render(
    <PolarisTestProvider>
      <LoadingManager loadingTo="home" isLoading={false}>
        <div data-testid="child">Render me</div>
      </LoadingManager>
    </PolarisTestProvider>
  );

  expect(screen.queryByTestId('child')).toBeInTheDocument();
});

it('does not render child if loading', () => {
  render(
    <PolarisTestProvider>
      <LoadingManager loadingTo="home" isLoading={true}>
        <div data-testid="child">Render me</div>
      </LoadingManager>
    </PolarisTestProvider>
  );

  expect(screen.queryByTestId('child')).not.toBeInTheDocument();
});
