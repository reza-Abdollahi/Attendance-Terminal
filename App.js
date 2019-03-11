/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import NumPad from './components/NumPad';

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
  }
  playBeep() {
    //this.keyPressAudio.play();
  }
  playSuccessBeep() {
    //this.successAudio.play();
  }
  playErrorBeep() {
    //this.errorAudio.play();
  }
  onEmployeeIdChanged (employeeId, isFullId) {
      this.setState({ employeeId: employeeId, faceTracked: false });
      //this.onClear();
      if (!isFullId)
          return;

      //this.getEmployee(employeeId);
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
                </View>
                <View style={styles.leftCol}>
                  <Text>ستون چپ</Text>
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
      //justifyContent: 'center',
      //alignItems: 'center',
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
    appVideo: {
        borderWidth: 7,
        borderColor: 'darkslategrey',
        width: 300,
        height: 225,
    },
    appCanvas: {
        borderWidth: 14,
        borderColor: 'darkorange',
        width: 300,
        height: 225,
    },
    leftCol:{
      backgroundColor:'red'
    },
    rightCol:{
    },

    appCommands: {
        flexDirection: 'row-reverse',
    },
      appCommandsButton: {
          flex: 1,
      },

});
