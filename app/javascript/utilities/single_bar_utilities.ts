import {Bar} from '../types/bar';

export const barFalseMap = (Object.keys(Bar) as Bar[]).reduce(
  (nullMap, key) => {
    nullMap[key] = false;

    return nullMap;
  },
  {} as {[k in Bar]: boolean}
);
