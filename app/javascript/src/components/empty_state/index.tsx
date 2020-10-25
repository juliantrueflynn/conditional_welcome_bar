import React from 'react';
import {EmptyState as PolarisEmptyState, EmptyStateProps} from '@shopify/polaris';

export const DEFAULT_IMAGE = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

interface Props extends Omit<EmptyStateProps, 'image'> {
  image?: string;
  children: React.ReactNode;
}

const EmptyState = ({children, image = DEFAULT_IMAGE, ...props}: Props) => {
  return (
    <PolarisEmptyState {...props} image={image}>
      <p>{children}</p>
    </PolarisEmptyState>
  );
};

export default EmptyState;
