import React from 'react';
import {
  EmptyState as PolarisEmptyState,
  EmptyStateProps,
} from '@shopify/polaris';

export const DEFAULT_IMAGE =
  'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

interface Props extends Omit<EmptyStateProps, 'image'> {
  image?: string;
}

const EmptyState: React.FC<Props> = ({
  children,
  image = DEFAULT_IMAGE,
  ...props
}) => {
  return (
    <PolarisEmptyState {...props} image={image}>
      <p>{children}</p>
    </PolarisEmptyState>
  );
};

export default EmptyState;
