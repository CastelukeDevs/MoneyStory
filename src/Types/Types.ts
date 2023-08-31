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
