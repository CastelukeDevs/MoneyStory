import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

//TODO: NEED REINFORCEMENT
type IDimens = {
  width: number;
  height: number;
  isHorizontal?: boolean;
};
const useDimension = () => {
  const windowDimensions = Dimensions.get('window');
  const screenDimensions = Dimensions.get('screen');

  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimensions({window, screen});
      },
    );
    return () => subscription?.remove();
  });
};

export default useDimension;
