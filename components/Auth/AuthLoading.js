import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import AjaxHelper from '../../helpers/AjaxHelper';

export default class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      AjaxHelper.initialize(userToken);
    }
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Rendering loading content
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles= {
  container: {flex:1, justifyContent:'center', alignItems:'center'}
};
