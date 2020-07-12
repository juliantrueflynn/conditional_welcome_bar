import { BarErrorPayload, UserError } from '../types/bar';

export const getFieldErrorsMap = (
  errors: UserError[] | undefined
): BarErrorPayload => {
  if (!errors) {
    return {};
  }

  return errors.reduce((allErrors, error) => {
    const attribute = error.field[0];

    if (!allErrors[attribute]) {
      allErrors[attribute] = [];
    }

    allErrors[attribute]?.push(error.message);

    return allErrors;
  }, {} as BarErrorPayload);
};
