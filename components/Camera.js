// package: https://github.com/react-native-community/react-native-camera
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class Camera extends Component {
  constructor(props) {
      super(props);
      this.takePicture = this.takePicture.bind(this)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 1 }}> &nbsp; </Text>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.auto}
          captureAudio={false}
          permissionDialogTitle={'دسترسی به دوربین'}
          permissionDialogMessage={'لطفا دسترسی به دوربین را تایید کنید.'}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <Text style={{ fontSize: 1 }}> &nbsp; </Text>
      </View>
    );
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      alert("saved image address: "+ data.uri);
    }
  };
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      // backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },

});
