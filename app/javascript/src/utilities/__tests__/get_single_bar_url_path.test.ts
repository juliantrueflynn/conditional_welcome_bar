import {getSingleBarUrlPath} from '../get_single_bar_url_path';
import * as shopifyHelpers from '../../../shopify_app';

const oldWindowLocation = window.location;

beforeEach(() => {
  window.location = oldWindowLocation;
});

test('returns url path using given ID and appends location search', () => {
  const search = '?shop=example.myshopify.com&foo=bar';
  Object.defineProperty(window, 'location', {
    value: {...window.location, search},
    writable: true,
  });

  expect(getSingleBarUrlPath('1')).toEqual(`/bars/1${search}`);
});

test('returns url path using given ID and adds shop param from DOM', () => {
  jest.spyOn(shopifyHelpers, 'getShopOrigin').mockReturnValue('ex2.myshopify.com');
  Object.defineProperty(window, 'location', {
    value: {...window.location, search: ''},
    writable: true,
  });

  expect(getSingleBarUrlPath('2')).toEqual('/bars/2?shop=ex2.myshopify.com');
});
