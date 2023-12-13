export type IDefaultFetchState = {
  isLoading: boolean | null;
  error: IErrorMessage | null;
  isSuccess: boolean | null;
};

export type IErrorMessage = {
  message: string | null;
  error: any;
};
