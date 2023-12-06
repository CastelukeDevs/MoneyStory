type IValidationEntries = {
  description: string;
  regex?: RegExp;
  test?: (e: string) => boolean;
};
export type IValidationResult = {
  description: string;
  name: string;
};

type IPasswordErrorCase = {
  uppercase: IValidationEntries;
  lowercase: IValidationEntries;
  digit: IValidationEntries;
  special: IValidationEntries;
  length: IValidationEntries;
};

const passwordMinLength = 8;

var errors: IPasswordErrorCase = {
  uppercase: {regex: /[A-Z]/, description: 'At least one uppercase letter'},
  lowercase: {regex: /[a-z]/, description: 'At least one lowercase letter'},
  digit: {regex: /[0-9]/, description: 'At least one number digit'},
  special: {regex: /[^A-Za-z0-9]/, description: 'At least one special symbol'},
  length: {
    test: (e: string) => e.length > passwordMinLength,
    description: `Should be more than ${passwordMinLength} characters`,
  },
};

function validatePassword(password: string): IValidationResult[] {
  return Object.entries(errors).flatMap(
    ([name, {test, regex, description}]) => {
      const isValid = test?.(password) || regex?.test(password);
      return isValid ? [] : {description, name};
    },
  );
}

export default validatePassword;
