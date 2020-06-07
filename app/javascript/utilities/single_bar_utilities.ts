import { Bar } from '../types/bar';
import { BarFormProps } from '../types/fields';

export const barFalseMap = (Object.keys(Bar) as Bar[]).reduce(
  (nullMap, key) => {
    nullMap[key] = false;

    return nullMap;
  },
  {} as BarFormProps
);
