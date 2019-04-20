import {Platform} from 'react-native';

const settings = {
  noFaceDetection: Platform.OS === 'ios',
}
export default settings
