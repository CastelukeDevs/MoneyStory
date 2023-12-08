import auth from '@react-native-firebase/auth';
import {IUserAuthReturn} from '../../Types/Types';

export default async (email: string) => {
  return await auth()
    .sendPasswordResetEmail(email)
    .then((res): IUserAuthReturn => {
      console.log('send email success', res);

      return {isSuccess: true, user: null};
    })
    .catch((err): IUserAuthReturn => {
      console.log('send email error', err);

      return {
        isSuccess: false,
        code: err.code,
        message: err.message,
        error: err,
      };
    });
};
