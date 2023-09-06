import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

/**
 * @returns isShow boolean
 * @returns keyboardHeight number
 */
export default () => {
  const [isShow, setIsShow] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      ev => {
        setIsShow(true);
        setHeight(ev.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsShow(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return {isShow, keyboardHeight: height};
};
