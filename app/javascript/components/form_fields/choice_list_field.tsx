import React from 'react';
import { ChoiceListProps, ChoiceList, Error } from '@shopify/polaris';
import { Bar } from '../../types/bar';

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

type PickedChoiceListProps = Omit<ChoiceListProps, 'selected' | 'title'>;

type Props = Overwrite<
  PickedChoiceListProps,
  {
    id: Bar;
    label: string;
    value: string[];
    error?: Error | boolean;
  }
>;

// Simple wrapper for ChoiceList component to have consistent property names with
// all the other form components.
const ChoiceListField: React.FC<Props> = ({
  id,
  label,
  value,
  error,
  ...props
}) => {
  const fieldErrors = (error || undefined) as Error;

  return (
    <ChoiceList
      name={id}
      title={label}
      selected={value}
      error={fieldErrors}
      {...props}
    />
  );
};

export default ChoiceListField;
