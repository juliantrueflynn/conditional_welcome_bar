import {BarErrorPayload, UserError} from '../types/bar';

export const getFieldErrorsMap = (
  errors: UserError[] | undefined
): BarErrorPayload => {
  const userErrors = errors || [];

  return userErrors.reduce((mappedErrors, userError) => {
    const fieldId = userError.field[0];

    if (mappedErrors[fieldId]) {
      mappedErrors[fieldId]?.push(userError.message);
    } else {
      mappedErrors[fieldId] = [userError.message];
    }

    return mappedErrors;
  }, {} as BarErrorPayload);
};
