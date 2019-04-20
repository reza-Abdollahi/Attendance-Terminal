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
    const { detectFaces } = this.props;
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 1 }}> &nbsp; </Text>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          captureAudio={false}
          permissionDialogTitle={'دسترسی به دوربین'}
          permissionDialogMessage={'لطفا دسترسی به دوربین را تایید کنید.'}
          faceDetectionLandmarks={
            RNCamera.Constants.FaceDetection.Landmarks
              ? RNCamera.Constants.FaceDetection.Landmarks.none
              : null
          }
          faceDetectionMode={
            RNCamera.Constants.FaceDetection.Mode
              ? RNCamera.Constants.FaceDetection.Mode.fast
              : null
          }
          onFacesDetected={detectFaces ? this.facesDetected : null}
          onFaceDetectionError={this.onFaceDetectionError}
        />
        <Text style={{ fontSize: 1 }}> &nbsp; </Text>
      </View>
    );
  }

  facesDetected = ( faces ) => this.props.onFaceDetected(faces);
  onFaceDetectionError = ( isOperational ) => console.warn(isOperational);

  async takePicture() {
    if (this.camera) {
      const options = {
        quality: 0.75,
        width: 300,
        base64: true,
        doNotSave: true,
        pauseAfterCapture: true,
      };
      const data = await this.camera.takePictureAsync(options);
      // console.warn('takePicture ', data);
      return data.base64;
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
