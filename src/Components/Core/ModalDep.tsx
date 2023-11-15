import React, {PropsWithChildren, useEffect} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import GlobalColor from '../../Utilities/Styles/GlobalColor';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

type IModalProp = {
  visible: boolean;
  onDismiss: (visible: boolean) => void;
  onChange?: (change: boolean) => void;
  addTopPadding?: boolean;
  style?: ViewStyle;
};

/**
 * TODO:
 * - Solve height problem when keyboard appear
 */
/**

 * Modal Components
 * @deprecated use Modal Component
 * @type IModalProp
 * @param visible
 * @param onDismiss
 *
 * to dismiss just change visible to false
 * or drag the draglines down
 */
const Modal = ({
  visible,
  onDismiss,
  children,
  onChange,
  addTopPadding,
  style,
}: PropsWithChildren<IModalProp>) => {
  /**
   * Animator using Reanimated
   */
  const animatedZIndex = useSharedValue(-1);
  const animatedOpacity = useSharedValue(0);
  const animatedYPos = useSharedValue(height);
  const animatedMinHeight = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => ({
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
    minHeight: withTiming(animatedMinHeight.value, {
      duration: 500,
    }),
    transform: [
      {
        translateY: withTiming(animatedYPos.value, {
          duration: 500,
        }),
      },
    ],
  }));

  useEffect(() => {
    if (visible) {
      animatedZIndex.value = 400;
      animatedOpacity.value = 1;
      animatedYPos.value = 0;
    } else {
      animatedZIndex.value = -1;
      animatedOpacity.value = 0;
      animatedYPos.value = height;
      animatedMinHeight.value = 0;
      Keyboard.dismiss();
    }
  }, [visible]);

  const onCloseHandler = () => {
    onDismiss(false);
  };
  const pressed = useSharedValue(false);

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(event => {
      const transY = event.translationY;
      if (transY >= 0) {
        runOnJS(onDismiss)(false);
      }
      if (transY <= -1) {
        animatedMinHeight.value = height;
      }
      pressed.value = false;
    });

  return (
    <Animated.View style={[styles.BaseContainer, animatedContainerStyle]}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <GestureHandlerRootView style={{flex: 1}}>
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

          <Animated.View style={[styles.Background, animatedModalStyle]}>
            <GestureDetector gesture={pan}>
              <View>
                <View style={[styles.DragLines]} />
              </View>
            </GestureDetector>
            {children}
          </Animated.View>
        </GestureHandlerRootView>
      </KeyboardAvoidingView>
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
  Background: {
    marginTop: 'auto',
    backgroundColor: GlobalColor.light,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    maxHeight: height,
  },
  DragLines: {
    backgroundColor: 'black',
    alignSelf: 'center',
    margin: 20,
    borderRadius: 200,
    height: 3,
    width: width / 3,
  },
});
