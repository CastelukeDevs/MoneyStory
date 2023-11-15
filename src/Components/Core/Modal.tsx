import {useLayout} from '@react-native-community/hooks';
import React, {ReactNode, useEffect, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const windowHeight = Dimensions.get('window').height;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type IModalProp = {
  visible: boolean;
  onDismiss?: () => void;
  onChange?: (open: boolean) => void;
  addTopPadding?: boolean;
  style?: ViewStyle;
  children: ReactNode;
};

//bottom overflow height
const defaultOverflowHeight = 250;

/**
 * Simple Modal Components
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

const Modal = (props: IModalProp) => {
  const {children, visible, onDismiss, onChange, addTopPadding, style} = props;

  const [isOpen, setIsOpen] = useState(false);

  const {onLayout: onContainerLayout, height: containerHeight} = useLayout();

  const offsetY = useSharedValue(0);

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

  const gesture = Gesture.Pan()
    .onChange(({changeY}) => {
      const offsetDelta = changeY + offsetY.value;
      const windowDelta =
        containerHeight - defaultOverflowHeight - windowHeight;

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

  const containerAnimationStyle = useAnimatedStyle(() => ({
    transform: [{translateY: offsetY.value}],
  }));

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
              containerAnimationStyle,
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
    bottom: -defaultOverflowHeight,
    flex: 1,
  },

  Overflow: {
    height: defaultOverflowHeight,
  },
});
