import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';
import GlobalColor from '../../Utilities/Styles/GlobalColor';
import {viewStyle} from '../../Utilities/Styles/GlobalStyle';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Button from './Button';
import ConCol from '../../Utilities/Styles/ConCol';

const width = Dimensions.get('window').width;

type IModalProp = {
  visible: boolean;
  onDismiss: (visible: boolean) => void;
};
const Modal = ({visible, onDismiss}: IModalProp) => {
  //   const {width, height} = useWindowDimensions();

  //   const [childHeight, setChildHeight] = useState(0);
  const dimensionH = useWindowDimensions().height;

  const animatedZIndex = useSharedValue(-1);
  const animatedOpacity = useSharedValue(0);
  const animatedYPos = useSharedValue(dimensionH);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    // zIndex: animatedZIndex.value,
    zIndex: withTiming(animatedZIndex.value, {
      duration: 500,
    }),
  }));

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: withTiming(animatedOpacity.value, {
      duration: 500,
    }),
  }));

  const animatedModalStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(animatedYPos.value, {
          duration: 500,
        }),
      },
    ],
  }));

  useEffect(() => {
    console.log(
      visible ? ConCol.bg.green : ConCol.bg.red,
      `Modal is now ${visible ? 'visible' : 'invisible'}`,
      ConCol.reset,
    );

    if (visible) {
      animatedZIndex.value = 400;
      animatedOpacity.value = 1;
      animatedYPos.value = 0;
    } else {
      animatedZIndex.value = -1;
      animatedOpacity.value = 0;
      animatedYPos.value = dimensionH;
    }
    return () => {};
  }, [visible]);

  const onCloseHandler = () => {
    onDismiss(false);
  };

  return (
    <Animated.View style={[styles.BaseContainer, animatedContainerStyle]}>
      <TouchableWithoutFeedback
        style={[StyleSheet.absoluteFillObject]}
        onPress={onCloseHandler}>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {backgroundColor: GlobalColor.overlay},
            animatedOverlayStyle,
          ]}
        />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          {
            marginTop: 'auto',
            backgroundColor: GlobalColor.light,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            //   transform: [{translateY: 100}],
          },
          animatedModalStyle,
        ]}
        // onLayout={event => {
        //   const {height} = event.nativeEvent.layout;
        //   setChildHeight(height);
        // }}
      >
        <View style={[styles.DragLines]} />
        <Text>Modal</Text>
        <Button onPress={onCloseHandler} label="Close" />
      </Animated.View>
    </Animated.View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  BaseContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  Overlay: {},
  DragLines: {
    backgroundColor: 'black',
    alignSelf: 'center',
    margin: 20,
    borderRadius: 200,
    height: 3,
    width: width / 3,
  },
});
