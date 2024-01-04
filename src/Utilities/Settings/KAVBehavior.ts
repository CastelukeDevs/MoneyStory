import {Platform} from 'react-native';

const KAVBehavior: 'height' | 'position' | 'padding' | undefined =
  Platform.OS === 'ios' ? 'padding' : undefined;

export default KAVBehavior;
