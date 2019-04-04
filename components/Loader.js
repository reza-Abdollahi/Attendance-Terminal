import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

export default Loader = props => {
  const { loading, text, overlayOnly, children } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      supportedOrientations={['portrait', 'portrait-upside-down', 'landscape']}
      onRequestClose={() => {console.log('close modal')}}>
        <View style={styles.modalBackground}>
          {children
            ? children
            : (
              !overlayOnly &&
              <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator animating={loading} />
                {text && <Text>{text}</Text>}
              </View>
            )
          }
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000070'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#0009',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
