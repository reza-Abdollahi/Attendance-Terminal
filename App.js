/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import NumPad from './components/NumPad';
import SoundHelper from './components/SoundHelper';
import Camera from './components/Camera';
import Commands from './components/Commands';


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
      super(props);
      this.state = {
          message: { text: "لطفا کد پرسنلی را وارد نمایید" },
          employeeId: undefined,
          currentEmployeeInfo: undefined,
          faceTracked: false
      };

      this.playBeep = this.playBeep.bind(this);
      this.playSuccessBeep = this.playSuccessBeep.bind(this);
      this.playErrorBeep = this.playErrorBeep.bind(this);
      this.onEmployeeIdChanged = this.onEmployeeIdChanged.bind(this);
      this.registerCommand = this.registerCommand.bind(this);
      this.camera = React.createRef();


      SoundHelper.initiate();
      this.errorSound =  SoundHelper.getSoundObject({path:require('./resources/Beep-Error.wav')});
      this.successSound =  SoundHelper.getSoundObject({path:require('./resources/Beep-Success.wav')});
      this.keyPressSound =  SoundHelper.getSoundObject({path:require('./resources/Beep-KeyPress.wav')});
  }
  playBeep() {
    this.keyPressSound.play((success) => {
      if (!success) {console.log('Sound did not play')}
    });
  }
  playSuccessBeep() {
    this.successSound.play((success) => {
      if (!success) {console.log('Sound did not play')}
    });
  }
  playErrorBeep() {
    this.errorSound.play((success) => {
      if (!success) {console.log('Sound did not play')}
    });
  }
  onEmployeeIdChanged (employeeId, isFullId) {
      this.setState({ employeeId: employeeId, faceTracked: false });
      //this.onClear();
      if (!isFullId)
          return;

      //this.getEmployee(employeeId);
  }
  registerCommand (type) {
      this.playBeep();
      this.camera.current.takePicture();
  }
  render() {
    const { message, employeeId, currentEmployeeInfo, faceTracked } = this.state;

    return (
        <View style={styles.mainContainer}>
            <View style={styles.appHeader}>
              <Image source={require('./resources/sepanta-logo.png')} style={{marginLeft:10}}/>
              <Text>پایانه ثبت حضور سپنتا</Text>
            </View>
            <View style={styles.appMain}>
              <View style={styles.appMainCenter}>
                <View style={styles.rightCol}>
                  <NumPad onEmployeeIdChanged={this.onEmployeeIdChanged} value={employeeId} playBeep={this.playBeep}/>
                  <Commands onClick={this.registerCommand} {...this.state}/>
                </View>
                <View style={styles.leftCol}>
                  <Camera ref={this.camera}/>
                </View>
              </View>
            </View>
            <View style={styles.appFooter}>
              <Text>تست</Text>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({

    mainContainer:{
      flex: 1,
    },
    appMain: {
      flex: 1,
    },
    appMainCenter:{
      flex: 1,
      flexDirection: 'row-reverse',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-around',

      backgroundColor: '#888',
    },
    appHeader: {
        justifyContent: 'flex-start',
        flexDirection: 'row-reverse',
        padding: 10,
        backgroundColor: 'darkslategray',
    },
    appFooter: {
        justifyContent: 'flex-start',
        flexDirection: 'row-reverse',
        padding: 10,
        backgroundColor: 'darkslategray',
    },
    leftCol:{
      width:'60%',
      height:'60%',
    },
    rightCol:{
      width:'30%',
      minWidth:300,
    },
});
