import {BarType, UserError} from '../types/bar';

type BarErrorPayload = {
  [key in keyof BarType]?: string[];
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
