import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

export default class SignOut extends React.Component {
  static navigationOptions = {
    title: 'خروج',
    drawerLabel: "خروج",
    drawerIcon: <Text>🚪</Text>
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.prompt}>
            <Text style={styles.headerIcon}>🚪</Text>
            <Text style={styles.headerText}>
              برای خروج از سامانه اطمینان دارید؟
            </Text>
          </View>
          <TouchableOpacity style={[styles.buttonContainer, styles.mainButton]} onPress={this.signOutAsync}>
            <Text style={styles.buttonText}>خروج</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonContainer, styles.backButton]} onPress={this.goBack}>
            <Text style={styles.buttonText}>لغو</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
  };
  goBack = async () => {
      this.props.navigation.goBack();
  };
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aaa'
  },
  form:{
    width: '50%',
    minWidth: 260,
    maxWidth: 300,
    alignItems: 'center',
    backgroundColor: '#0006',
    padding: 20,
    borderRadius:30,
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:250,
    borderRadius:30,
    marginBottom:20
  },
  mainButton: {
    backgroundColor: "darkorange",
  },
  backButton: {
    backgroundColor: "#aaa",
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  prompt: {
    margin: 20,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    color: '#ddd',
    fontWeight: 'bold',
    alignItems:'center',
    textAlign: 'center'
  },
  headerIcon: {
    fontSize: 40,
  },
});
