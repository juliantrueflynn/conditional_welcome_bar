import toastReducer, { initialState } from '../toast';

it('returns welcome bar delete content', () => {
  const result = toastReducer(initialState, { type: 'bar/destroy' });

  expect(result).toEqual({ content: 'Welcome bar deleted' });
});

it('resets state to initial state', () => {
  const prevState = { content: 'Welcome bar deleted' };

  const result = toastReducer(prevState, { type: 'reset' });

  expect(result).toEqual(initialState);
});
