import {useKeyboard, useLayout} from '@react-native-community/hooks';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedKeyboard,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import useKeyboardStatus from '../../Utilities/Hooks/useKeyboardStatus';

const windowHeight = Dimensions.get('window').height;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type IModalProp = {
  visible: boolean;
  onDismiss?: () => void;
  onChange?: (open: boolean) => void;
  addTopPadding?: boolean;
  style?: ViewStyle;
};

const OverflowHeight = 300;

/**
 * Modal Components
 * @type IModalProp
 * @param visible *required
 * @param onDismiss
 * @param onChange
 * @param addTopPadding
 * @param style (container style)
 *
 * to dismiss just change visible to false
 * or drag the draglines down
 */
const Modal = ({
  children,
  visible,
  onDismiss,
  onChange,
  addTopPadding,
  style,
}: PropsWithChildren<IModalProp>) => {
  const [isOpen, setIsOpen] = useState(false);

  const {onLayout: onContainerLayout, height: containerHeight} = useLayout();

  const offsetY = useSharedValue(0);
  const bottomOffset = useSharedValue(-OverflowHeight);

  useEffect(() => {
    if (isOpen !== visible) toggleOpenModal();
  }, [visible]);

  /**
   * use this function to toggle modal
   */
  const toggleOpenModal = () => {
    onChange?.(!isOpen);
    setIsOpen(!isOpen);
    if (isOpen) onDismiss?.();
    offsetY.value = 0;
  };

  console.log('height', {
    cHeight: containerHeight - OverflowHeight,
    windowHeight,
  });

  const gesture = Gesture.Pan()
    .onChange(({changeY}) => {
      const offsetDelta = changeY + offsetY.value;
      const windowDelta = containerHeight - OverflowHeight - windowHeight;

      //Clamping scroll to top
      const topClamp = Math.max(-OverflowHeight, offsetDelta, windowDelta);

      console.log('clamp', -OverflowHeight, offsetDelta, topClamp, windowDelta);

      offsetY.value =
        offsetDelta > 0
          ? offsetDelta
          : // : containerHeight - OverflowHeight >= windowHeight
            // ? 0
            topClamp;
    })
    .onFinalize(() => {
      const closingHeight = containerHeight / 4;
      // console.log('allHeightProp -> ', {closingHeight, height, windowHeight});
      // console.log('offsetY.value -> ', offsetY.value);

      if (offsetY.value > closingHeight) runOnJS(toggleOpenModal)();
      offsetY.value = withSpring(0);
    });

  const animateTranslateY = useAnimatedStyle(() => ({
    transform: [{translateY: offsetY.value}],
  }));

  // const animateBottomOffset = useAnimatedStyle(() => ({
  //   bottom: bottomOffset.value,
  // }));

  return (
    visible && (
      <>
        <AnimatedPressable
          style={styles.Overlay}
          onPress={toggleOpenModal}
          entering={FadeIn}
          exiting={FadeOut}
        />

        <GestureDetector gesture={gesture}>
          <Animated.View
            onLayout={onContainerLayout}
            style={[
              styles.ModalContainer,
              addTopPadding && {paddingTop: 12},
              style,
              animateTranslateY,
            ]}
            entering={SlideInDown.springify().damping(15)}
            exiting={SlideOutDown}>
            {children}
            <View style={[styles.Overflow]} />
          </Animated.View>
        </GestureDetector>
      </>
    )
  );
};

export default Modal;

const styles = StyleSheet.create({
  Overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },

  ModalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    bottom: -OverflowHeight,
    flex: 1,
    // maxHeight: windowHeight + OverflowHeight,
  },

  Overflow: {
    height: OverflowHeight,
  },
});
