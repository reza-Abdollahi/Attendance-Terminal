import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Alert,
  View,
  Button
} from 'react-native';
import SoundHelper from '../SoundHelper';
import AjaxHelper from '../AjaxHelper';

export default class SignIn extends React.Component {
  static navigationOptions = {
    title: 'ورود',
  };

  componentDidMount(){
    SoundHelper.initiate();
    this.errorSound =  SoundHelper.getSoundObject({path:require('../../resources/Beep-Error.wav')});
  }

  render() {
    return (
      <View>
        <Button title="ورود" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    let username = 'Tablet.Test.Attendance',
        password = 'Test@321';
    var userToken = await AjaxHelper.getLoginId(username, password);

    if (!userToken) {
      Alert.alert('نام کاربری یا رمز عبور اشتباه است');
      this.errorSound.play();
      return;
    }

    AjaxHelper.initialize(userToken);
    await AsyncStorage.setItem('userToken', userToken);
    this.props.navigation.navigate('App');
  };
}
