import {UpdateBar_updateBar_bar, UpdateBar_updateBar_userErrors} from './graphql';

export const getFieldErrorsMap = (
  errors?: UpdateBar_updateBar_userErrors[]
): {[key in keyof UpdateBar_updateBar_bar]?: string[]} => {
  const userErrors = errors || [];
  const errorsMap = userErrors.reduce((mappedErrors, userError) => {
    const fieldId = userError.field[0] as keyof UpdateBar_updateBar_bar;

    if (mappedErrors[fieldId]) {
      mappedErrors[fieldId]?.push(userError.message);
    } else {
      mappedErrors[fieldId] = [userError.message];
    }

    return mappedErrors;
  }, {} as {[key in keyof UpdateBar_updateBar_bar]?: string[]});

  const {__typename, ...mutableErrors} = errorsMap;

  return mutableErrors;
};
