import toastReducer, {initialState} from '../reducer';

test('returns welcome bar updated content', () => {
  const result = toastReducer(initialState, {type: 'bar/update'});

  expect(result).toEqual({content: 'Welcome bar updated'});
});

test('returns welcome bar delete content', () => {
  const result = toastReducer(initialState, {type: 'bar/destroy'});

  expect(result).toEqual({content: 'Welcome bar deleted'});
});

test('resets state to initial state', () => {
  const prevState = {content: 'Welcome bar deleted'};

  const result = toastReducer(prevState, {type: 'reset'});

  expect(result).toEqual(initialState);
});
