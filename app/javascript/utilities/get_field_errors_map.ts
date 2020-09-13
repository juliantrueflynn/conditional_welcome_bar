import {Bar, UserError} from '../types/bar';

type BarErrorPayload = {
  -readonly [key in keyof typeof Bar]?: string[];
};

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
