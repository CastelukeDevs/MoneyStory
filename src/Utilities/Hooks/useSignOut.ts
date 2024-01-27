import {userSignOut} from '@Redux/Reducers/CommonReducer';
import {useAppDispatch} from '@Redux/Store';

export default () => {
  const dispatch = useAppDispatch();

  return () => dispatch(userSignOut({}));
};
