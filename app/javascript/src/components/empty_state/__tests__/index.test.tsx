import React from 'react';
import EmptyState, {DEFAULT_IMAGE} from '..';
import {screen, render} from '@testing-library/react';
import {PolarisTestProvider} from '@shopify/polaris';

const getImageSrc = (container: HTMLElement) => container.querySelector('img')?.getAttribute('src');

it('renders default image', () => {
  const {container} = render(
    <PolarisTestProvider>
      <EmptyState>Hello world!</EmptyState>
    </PolarisTestProvider>
  );

  expect(screen.getByText('Hello world!')).toBeInTheDocument();
  expect(getImageSrc(container)).toEqual(DEFAULT_IMAGE);
});

it('renders image passed', () => {
  const subjectImageSrc = 'https://example.com/some-image.svg';
  const {container} = render(
    <PolarisTestProvider>
      <EmptyState image={subjectImageSrc}>Hello world!</EmptyState>
    </PolarisTestProvider>
  );

  expect(screen.getByText('Hello world!')).toBeInTheDocument();
  expect(getImageSrc(container)).toEqual(subjectImageSrc);
});
