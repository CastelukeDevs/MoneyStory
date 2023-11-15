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

  const {onLayout, height} = useLayout();
  const keyboard = useKeyboard();
  const animkey = useAnimatedKeyboard();

  // console.log('animkey', animkey.height.value);
  // console.log('animkey', animkey.state.value);

  // console.log('keyboard is open -> ', keyboard.keyboardShown);
  // console.log('keyboard height -> ', keyboard.keyboardHeight);
  // console.log('keyboard coord -> ', keyboard.coordinates);

  const offsetY = useSharedValue(0);
  const bottomOffset = useSharedValue(-OverflowHeight);

  useEffect(() => {
    if (isOpen !== visible) toggleOpenModal();
  }, [visible]);

  // useEffect(() => {
  //   console.log('=======================triggered');

  //   if (keyboard.keyboardShown) {
  //     bottomOffset.value = withSpring(
  //       -OverflowHeight + keyboard.keyboardHeight,
  //     );
  //   } else {
  //     bottomOffset.value = withSpring(-OverflowHeight);
  //   }
  // }, [keyboard]);

  /**
   * use this function to toggle modal
   */
  const toggleOpenModal = () => {
    onChange?.(!isOpen);
    setIsOpen(!isOpen);
    if (isOpen) onDismiss?.();
    offsetY.value = 0;
  };

  const gesture = Gesture.Pan()
    .onChange(({changeY}) => {
      const offsetDelta = changeY + offsetY.value;

      //Clamping scroll to top
      const clamp = Math.max(-OverflowHeight, offsetDelta);

      offsetY.value =
        offsetDelta > 0 ? offsetDelta : windowHeight < height ? 0 : clamp;
    })
    .onFinalize(() => {
      const closingHeight = height / 4;
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
            onLayout={onLayout}
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
  //   return (
  //     visible && (
  //       <>
  //         <AnimatedPressable
  //           style={styles.Overlay}
  //           onPress={toggleOpenModal}
  //           entering={FadeIn}
  //           exiting={FadeOut}
  //         />
  //         <KeyboardAvoidingView
  //           style={styles.KeyAvoidingStyle}
  //           behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
  //           <GestureDetector gesture={gesture}>
  //             <Animated.View
  //               entering={SlideInDown.springify().damping(15)}
  //               exiting={SlideOutDown}
  //               style={[
  //                 {
  //                   backgroundColor: 'white',
  //                   bottom: 0,
  //                   borderTopLeftRadius: 12,
  //                   borderTopRightRadius: 12,
  //                 },
  //                 animateTranslateY,
  //               ]}>
  //               {children}
  //               <View style={[styles.Overflow]} />
  //             </Animated.View>
  //           </GestureDetector>
  //         </KeyboardAvoidingView>
  //       </>
  //     )
  //   );
};

export default Modal;

const styles = StyleSheet.create({
  Overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    // zIndex: 1,
  },
  KeyAvoidingStyle: {
    // backgroundColor: 'white',
    // ...StyleSheet.absoluteFillObject,
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    bottom: -OverflowHeight,
    flex: 1,
  },
  ModalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    position: 'absolute',
    width: '100%',
    // height: '100%',
    zIndex: 1,
    bottom: -OverflowHeight,
    // bottom: 0,
    flex: 1,
    // maxHeight: windowHeight + OverflowHeight,
  },
  ModalFullViewContainer: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: '100%',
    height: '100%',
    // bottom: -OverflowHeight,
    // bottom: 0,
    // top: 0,
    // flex: 1,
    // maxHeight: windowHeight + OverflowHeight,
  },
  Overflow: {
    height: OverflowHeight,
  },
});
