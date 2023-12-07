import {IUserAuth} from '../../Types/Types';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

type IAuthSuccess = {
  isSuccess: true;
  user: FirebaseAuthTypes.User;
};

type IAuthError = {
  isSuccess: false;
  code: string;
  message: string;
  error: any;
};

type IUserAuthReturn = IAuthSuccess | IAuthError;

const CreateUserEmailPassword = async (userAuth: IUserAuth) => {
  return await auth()
    .createUserWithEmailAndPassword(userAuth.email, userAuth.password)
    .then((res): IUserAuthReturn => {
      console.log('User account created & signed in!', res);
      return {isSuccess: true, user: res.user};
    })
    .catch((err): IUserAuthReturn => {
      if (err.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        return {
          isSuccess: false,
          code: err.code,
          message: 'That email address is already in use!',
          error: err,
        };
      }
      if (err.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        return {
          isSuccess: false,
          code: err.code,
          message: 'That email address is already in use!',
          error: err,
        };
      }
      return {
        isSuccess: false,
        code: 'auth/general error',
        message: 'Something went wrong',
        error: err,
      };
    });
};

export default CreateUserEmailPassword;
