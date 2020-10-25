import React from 'react';
import {ChoiceListProps, ChoiceList, Error} from '@shopify/polaris';
import {UpdateBar_updateBar_bar} from '../graphql';

type Props = Omit<ChoiceListProps, 'selected' | 'title' | 'error'> & {
  id: keyof UpdateBar_updateBar_bar;
  label: string;
  value: string[];
  error?: Error | boolean;
};

// Simple wrapper for ChoiceList component to have consistent property names with
// all the other form components.
const ChoiceListField = ({id, label, value, error, ...props}: Props) => {
  const fieldErrors = (error || undefined) as Error;

  return <ChoiceList name={id} title={label} selected={value} error={fieldErrors} {...props} />;
};

export default ChoiceListField;
