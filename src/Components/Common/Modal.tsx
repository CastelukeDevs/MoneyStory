import React, {ReactNode, useEffect, useState} from 'react';
import {
  Dimensions as APPDimension,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useLayout} from '@react-native-community/hooks';
import Animated, {
  Extrapolate,
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import GlobalColor, {Opacity} from '@Utilities/Styles/ThemeColor';
import {Dimension} from '@Utilities/Styles/GlobalStyle';

const windowHeight = APPDimension.get('window').height;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type IModalPropTypes = {
  visible: boolean;
  onDismiss?: () => void;
  onChange?: (open: boolean) => void;
  addTopPadding?: boolean;
  style?: ViewStyle;
  children: ReactNode;
  avoidKeyboard?: boolean;
};

//bottom overflow height
const defaultOverflowHeight = 50;

/**
 * Simple Modal Components
 * @type IModalPropTypes
 * @param visible *required
 * @param onDismiss
 * @param onChange
 * @param addTopPadding
 * @param style (container style)
 *
 * to dismiss just change visible to false
 * or drag the draglines down
 */

const Modal = (props: IModalPropTypes) => {
  const {children, visible, onDismiss, onChange, addTopPadding, style} = props;

  const [isOpen, setIsOpen] = useState(false);

  const {onLayout: onContainerLayout, height: containerHeight} = useLayout();

  const offsetY = useSharedValue(0);

  /**
   * use this function to toggle modal
   */
  const toggleOpenModal = () => {
    console.log('toggling modal');

    onChange?.(!isOpen);
    setIsOpen(!isOpen);
    if (isOpen) onDismiss?.();
    offsetY.value = 0;
  };

  useEffect(() => {
    setIsOpen(visible);
  }, [visible]);

  const windowDelta = containerHeight - defaultOverflowHeight - windowHeight;
  const gesture = Gesture.Pan()
    .onChange(({changeY}) => {
      const offsetDelta = changeY + offsetY.value;

      //Clamping scroll to top
      const topClamp = Math.max(
        -defaultOverflowHeight,
        offsetDelta,
        windowDelta,
      );

      offsetY.value = offsetDelta > 0 ? offsetDelta : topClamp;
    })
    .onFinalize(() => {
      const closingHeight = containerHeight / 4;

      if (offsetY.value > closingHeight) runOnJS(toggleOpenModal)();
      offsetY.value = withSpring(0);
    });

  const containerAnimationStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      offsetY.value,
      [windowDelta + 75, windowDelta],
      [12, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{translateY: offsetY.value}],
      borderTopLeftRadius: borderRadius,
    };
  });

  //TODO: Validate this behavior
  const KAVBehavior =
    Platform.OS === 'ios' && props.avoidKeyboard ? 'height' : undefined;

  return (
    visible && (
      <KeyboardAvoidingView behavior={KAVBehavior} style={styles.RootContainer}>
        {/* <Pressable style={styles.Overlay} onPress={toggleOpenModal} /> */}
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
              containerAnimationStyle,
            ]}
            entering={SlideInDown.springify().damping(15)}
            exiting={SlideOutDown}>
            {children}
            <View style={[styles.Overflow]} />
          </Animated.View>
        </GestureDetector>
      </KeyboardAvoidingView>
    )
  );
};

export default Modal;

const styles = StyleSheet.create({
  RootContainer: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
  },

  Overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: GlobalColor.dark + Opacity[50],
    zIndex: 1,
  },

  ModalContainer: {
    backgroundColor: GlobalColor.light,
    borderTopLeftRadius: Dimension.Space,
    borderTopRightRadius: Dimension.Space,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    bottom: -defaultOverflowHeight,
    flex: 1,
  },

  Overflow: {
    height: defaultOverflowHeight,
  },
});
