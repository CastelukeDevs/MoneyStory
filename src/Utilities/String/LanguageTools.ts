import EN from './Language/EN';
import ID from './Language/ID';

const Language = {
  EN,
  ID,
};

type ILanguage = keyof typeof Language;

type IGetString = {
  language: ILanguage;
  key: StringKey;
};

type StringKey = keyof typeof EN;

const getString = (param: IGetString | StringKey): string => {
  const isDefault = typeof param === 'string';
  if (isDefault) return Language.EN[param];
  return Language[param.language][param.key];
};

export default getString;
