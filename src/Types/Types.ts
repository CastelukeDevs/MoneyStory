import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type IUser = {
  id?: string | null;
  firstName: string;
  lastName: string;
  age: number;
  photo: string | null;
};

export type IErrorMessage = {
  isError: boolean;
  message: string | null;
};

export type IUserAuth = {
  email: string;
  password: string;
};

export type IAuthSuccess = {
  isSuccess: true;
  user: FirebaseAuthTypes.User | null;
};

export type IAuthError = {
  isSuccess: false;
  code: string;
  message: string;
  error: any;
};

export type IUserAuthReturn = IAuthSuccess | IAuthError;
