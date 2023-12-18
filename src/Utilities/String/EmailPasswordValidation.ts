type IValidationEntries = {
  description: string;
  regex?: RegExp;
  test?: (e: string) => boolean;
};

type IPasswordErrorCase = {
  uppercase: IValidationEntries;
  lowercase: IValidationEntries;
  digit: IValidationEntries;
  special: IValidationEntries;
  length: IValidationEntries;
};

type IEmailErrorCase = {
  validity: IValidationEntries;
  empty: IValidationEntries;
};

type IErrorCase = IPasswordErrorCase & IEmailErrorCase;

export type IErrorID = keyof IErrorCase;

export type IValidationResult = {
  description: string;
  name: string;
};

const passwordMinLength = 8;

var passwordError: IPasswordErrorCase = {
  uppercase: {regex: /[A-Z]/, description: 'At least one uppercase letter'},
  lowercase: {regex: /[a-z]/, description: 'At least one lowercase letter'},
  digit: {regex: /[0-9]/, description: 'At least one number digit'},
  special: {regex: /[^A-Za-z0-9]/, description: 'At least one special symbol'},
  length: {
    test: (e: string) => e.length > passwordMinLength,
    description: `Should be more than ${passwordMinLength} characters`,
  },
};

export function validatePassword(password: string): IValidationResult[] {
  return Object.entries(passwordError).flatMap(
    ([name, {test, regex, description}]) => {
      const isValid = test?.(password) || regex?.test(password);
      return isValid ? [] : {description, name};
    },
  );
}
const mailRegexValidation =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var emailError: IEmailErrorCase = {
  validity: {
    test: (e: string) => mailRegexValidation.test(e),

    description: 'Email is invalid',
  },
  empty: {
    test: (e: string) => e.length >= 1,
    description: `Should not empty`,
  },
};

export function validateEmail(email: string): IValidationResult[] {
  return Object.entries(emailError).flatMap(
    ([name, {test, regex, description}]) => {
      const isValid = test?.(email) || regex?.test(email);
      return isValid ? [] : {description, name};
    },
  );
}
