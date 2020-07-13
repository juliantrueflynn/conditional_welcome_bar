import { getFieldErrorsMap } from '../get_field_errors_map';
import { UserError } from '../../types/bar';

describe('getFieldErrorsMap', () => {
  it('returns userErrors in object merging keys and values', () => {
    const mockUserErrors: UserError[] = [
      {
        field: ['title'],
        message: 'some error message 0',
      },
      {
        field: ['title'],
        message: 'some error message 1',
      },
      {
        field: ['content'],
        message: 'some error message 2',
      },
    ];

    const result = getFieldErrorsMap(mockUserErrors);

    expect(result).toMatchObject({
      title: ['some error message 0', 'some error message 1'],
      content: ['some error message 2'],
    });
  });

  it('returns empty object if given empty array', () => {
    const result = getFieldErrorsMap([]);

    expect(result).toMatchObject({});
  });

  it('returns empty object if given undefined', () => {
    const result = getFieldErrorsMap(undefined);

    expect(result).toMatchObject({});
  });
});
