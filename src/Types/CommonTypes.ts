import CurrencyList from '@Utilities/DefaultData/CurrencyList';
import {IconList, LogoList} from '@Utilities/DefaultData/IconList';

export type ICurrencyTypes = (typeof CurrencyList)[number]['abbreviation'];

export type IPaginateProps = {
  limit?: number;
  page?: number;
};

export type IFile = {
  uri: string;
  type: IFileType;
  name: string;
};

export type IFileType = 'image/jpeg';

export type IOrientation = 'portrait' | 'landscape';
