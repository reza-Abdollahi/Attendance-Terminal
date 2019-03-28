import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Button
} from 'react-native';

export default class SignOut extends React.Component {
  static navigationOptions = {
    title: 'خروج',
  };

  render() {
    return (
      <View >
        <Button title="خروج" onPress={this._signOutAsync} />
        <Button title="لغو" color="#808080" onPress={this._goBack} />
      </View>
    );
  }

  _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
  };
  _goBack = async () => {
      this.props.navigation.goBack();
  };
}
