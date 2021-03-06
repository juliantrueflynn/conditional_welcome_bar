import React from 'react';
import {render, screen} from '@testing-library/react';
import {Bar} from '../../../../types';
import ColorPickerField from '../color_picker_field';

it('renders label if present', () => {
  render(<ColorPickerField id={Bar.backgroundColor} label="Hello world!" value="#FFFFFF" onChange={jest.fn} />);

  expect(screen.getByText('Hello world!')).toBeInTheDocument();
});

it('does not render label if blank', () => {
  render(<ColorPickerField id={Bar.backgroundColor} value="#FFFFFF" onChange={jest.fn} />);

  expect(screen.queryByText('Hello world!')).not.toBeInTheDocument();
});
