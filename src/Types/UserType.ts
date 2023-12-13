import {ICurrencyTypes} from './CommonTypes';

export type IUserType = {
  lastSignIn: Date;
  level: number;
  points: number;
  wallet: []; //TODO: update wallet type later
  defaultCurrency: ICurrencyTypes[];
  //   _id: string;
  firebaseUID: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  //   __v: 0;
};
