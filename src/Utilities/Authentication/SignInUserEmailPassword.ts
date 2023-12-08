import auth from '@react-native-firebase/auth';
import {IUserAuth, IUserAuthReturn} from '@Types/Types';

export default async (loginDetail: IUserAuth) => {
  return await auth()
    .signInWithEmailAndPassword(loginDetail.email, loginDetail.password)
    .then((res): IUserAuthReturn => {
      console.log('login success', res);
      return {isSuccess: true, user: res.user};
    })
    .catch((err): IUserAuthReturn => {
      console.log('login error', err);
      return {
        isSuccess: false,
        code: err.code,
        message: err.message,
        error: err,
      };
    });
};
