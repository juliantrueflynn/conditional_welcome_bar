import {Bar} from './bar';

export type FieldChangeValue = boolean | string | string[];

export type FieldChangeEvent = (value: FieldChangeValue, id: Bar) => void;

export type BarInput = Exclude<
  Bar,
  Bar.id | Bar.__typename | Bar.createdAt | Bar.updatedAt
>;

export type BarFormProps = {
  [K in Bar]: boolean;
};
