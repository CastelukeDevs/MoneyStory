import {ICancelSignal} from '@Utilities/APIs/APIUtils';
import {ICurrencyTypes} from './CommonTypes';

export type IUserMain = {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  avatarUrl?: string;
  defaultCurrency?: ICurrencyTypes;
};

export type IUserType = {
  lastSignIn: Date;
  level: number;
  points: number;
  wallet: string[];
  firebaseUID: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
} & IUserMain;

export type IUserCreateUpdateData = {
  avatar?: any;
} & IUserMain;

export type ICreateUserDataProps = {
  data: IUserCreateUpdateData;
} & ICancelSignal;
