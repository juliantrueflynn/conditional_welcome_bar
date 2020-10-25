import React from 'react';
import {TextField as PolarisTextField, TextFieldProps} from '@shopify/polaris';
import {UpdateBar_updateBar_bar} from '../graphql';

type Props = Omit<TextFieldProps, 'id' | 'value' | 'onChange'> & {
  id: keyof UpdateBar_updateBar_bar;
  value?: string | null;
  onChange(value: string, id: keyof UpdateBar_updateBar_bar): void;
};

const TextField = ({label, value, ...props}: Props) => {
  const fieldValue = value === null ? undefined : value;

  return <PolarisTextField value={fieldValue} label={label} placeholder={label} {...props} />;
};

export default TextField;
