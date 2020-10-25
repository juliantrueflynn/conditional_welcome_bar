import {UpdateBar_updateBar_userErrors} from '../graphql';
import {getFieldErrorsMap} from '../get_field_errors_map';

const mockUserErrors: UpdateBar_updateBar_userErrors[] = [
  {
    field: ['title'],
    message: 'some error message 0',
    __typename: 'UserError',
  },
  {
    field: ['title'],
    message: 'some error message 1',
    __typename: 'UserError',
  },
  {
    field: ['content'],
    message: 'some error message 2',
    __typename: 'UserError',
  },
];

test('returns userErrors in object merging keys and values', () => {
  const result = getFieldErrorsMap(mockUserErrors);

  expect(result).toMatchObject({
    title: ['some error message 0', 'some error message 1'],
    content: ['some error message 2'],
  });
});

test('returns empty object if given empty array', () => {
  const result = getFieldErrorsMap([]);

  expect(result).toMatchObject({});
});

test('returns empty object if given undefined', () => {
  const result = getFieldErrorsMap(undefined);

  expect(result).toMatchObject({});
});
