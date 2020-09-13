import {getSingleBarUrlPath} from '../get_single_bar_url_path';

it('returns url path using given ID', () => {
  const result = getSingleBarUrlPath('1');

  expect(result).toEqual('/bars/1');
});
