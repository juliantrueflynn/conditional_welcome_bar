import {Bar} from '../types/bar';

export type BarMap = {
  [K in Bar]: boolean;
};

export const barFalseMap = (Object.keys(Bar) as Bar[]).reduce(
  (nullMap, key) => {
    nullMap[key] = false;

    return nullMap;
  },
  {} as BarMap
);
