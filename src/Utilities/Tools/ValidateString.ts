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
