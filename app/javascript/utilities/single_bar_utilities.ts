import {Bar} from '../types';

export const barFalseMap = (Object.keys(Bar) as Bar[]).reduce(
  (nullMap, key) => {
    nullMap[key] = false;

    return nullMap;
  },
  {} as {[k in Bar]: boolean}
);
