import React from 'react';
import EmptyState, { DEFAULT_IMAGE } from '..';
import { render } from '@testing-library/react';
import { PolarisTestProvider } from '@shopify/polaris';

const getImageSrc = (container: HTMLElement) =>
  container.querySelector('img')?.getAttribute('src');

it('renders default image', () => {
  const { container } = render(
    <PolarisTestProvider>
      <EmptyState />
    </PolarisTestProvider>
  );

  expect(getImageSrc(container)).toEqual(DEFAULT_IMAGE);
});

it('renders image passed', () => {
  const subjectImageSrc = 'https://example.com/some-image.svg';
  const { container } = render(
    <PolarisTestProvider>
      <EmptyState image={subjectImageSrc} />
    </PolarisTestProvider>
  );

  expect(getImageSrc(container)).toEqual(subjectImageSrc);
});
