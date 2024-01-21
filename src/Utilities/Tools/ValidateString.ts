// type IValidationEntries = {
//   description: string;
//   regex?: RegExp;
//   test?: (e: string) => boolean;
// };

// type IPasswordErrorCase = {
//   uppercase: IValidationEntries;
//   lowercase: IValidationEntries;
//   digit: IValidationEntries;
//   special: IValidationEntries;
//   length: IValidationEntries;
// };

// type IEmailErrorCase = {
//   validity: IValidationEntries;
//   empty: IValidationEntries;
// };

// type IErrorCase = IPasswordErrorCase & IEmailErrorCase;

// export type IErrorID = keyof IErrorCase;

// export type IValidationResult = {
//   description: string;
//   name: string;
// };

// const passwordMinLength = 8;

// var passwordError: IPasswordErrorCase = {
//   uppercase: {regex: /[A-Z]/, description: 'At least one uppercase letter'},
//   lowercase: {regex: /[a-z]/, description: 'At least one lowercase letter'},
//   digit: {regex: /[0-9]/, description: 'At least one number digit'},
//   special: {regex: /[^A-Za-z0-9]/, description: 'At least one special symbol'},
//   length: {
//     test: (e: string) => e.length > passwordMinLength,
//     description: `Should be more than ${passwordMinLength} characters`,
//   },
// };

// export function validatePassword(password: string): IValidationResult[] {
//   return Object.entries(passwordError).flatMap(
//     ([name, {test, regex, description}]) => {
//       const isValid = test?.(password) || regex?.test(password);
//       return isValid ? [] : {description, name};
//     },
//   );
// }

// var emailError: IEmailErrorCase = {
//   validity: {
//     test: (e: string) => mailRegexValidation.test(e),

//     description: 'Email is invalid',
//   },
//   empty: {
//     test: (e: string) => e.length >= 1,
//     description: `Should not empty`,
//   },
// };

// export function validateEmail(email: string): IValidationResult[] {
//   return Object.entries(emailError).flatMap(
//     ([name, {test, regex, description}]) => {
//       const isValid = test?.(email) || regex?.test(email);
//       return isValid ? [] : {description, name};
//     },
//   );
// }

const mailRegexValidation =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordMinLength = 8;

type IValidationCaseEntries = {
  message: string;
  regex?: RegExp;
  test?: (e: string) => boolean;
};
type IValidationCase = {[key: string]: IValidationCaseEntries};
type IValidationCaseName = keyof typeof ValidationCases;
type IValidationContent = {[key: string]: IValidationCaseName[]};
type IValidationMode = keyof typeof ValidationContent;
export type IValidationResult = {
  description: string;
  name: string;
};

//List of validation case
const ValidationCases = {
  empty: {
    test: (e: string) => e.length >= 1,
    message: 'Cannot be empty',
  },
  validMail: {
    test: (e: string) => mailRegexValidation.test(e),

    message: 'Email invalid',
  },
  length: {
    test: (e: string) => e.length > passwordMinLength,
    message: `Should be more than ${passwordMinLength} character`,
  },
  uppercase: {regex: /[A-Z]/, message: 'At least one uppercase letter'},
  lowercase: {regex: /[a-z]/, message: 'At least one lowercase letter'},
  number: {regex: /[0-9]/, message: 'At least one number'},
  special: {regex: /[^A-Za-z0-9]/, message: 'At least one special character'},
} as const satisfies IValidationCase;

//List of validation
const ValidationContent = {
  password: ['length', 'lowercase', 'uppercase', 'number', 'special'],
  email: ['empty', 'validMail'],
  name: ['empty'],
} as const satisfies IValidationContent;

/**
 * Validate input and return failure validation message
 * @requires text string
 * @param mode default 'name' validation
 * @returns string[]
 */

// export function validateEmail(email: string): IValidationResult[] {
//   return Object.entries(emailError).flatMap(
//     ([name, {test, regex, description}]) => {
//       const isValid = test?.(email) || regex?.test(email);
//       return isValid ? [] : {description, name};
//     },
//   );
// }
export default (text: string, mode?: IValidationMode): string[] => {
  const selectedCase: IValidationCaseEntries[] = ValidationContent[
    mode || 'name'
  ].map(key => ValidationCases[key]);
  const validTest = selectedCase.flatMap(({test, regex, message}) => {
    const isValid = test?.(text) || regex?.test(text);
    return isValid ? [] : message;
  });
  return validTest;
};
