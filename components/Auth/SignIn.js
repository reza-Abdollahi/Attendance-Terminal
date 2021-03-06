import React from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import Loader from '../Loader';
import SoundHelper from '../../helpers/SoundHelper';
import AjaxHelper from '../../helpers/AjaxHelper';
import ConnectionStatus from '../ConnectionStatus';

export default class SignIn extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = { username:'', password:'', loading:false };
    this.passwordInput = React.createRef();
  }

  componentDidMount(){
    SoundHelper.initiate();
    this.errorSound =  SoundHelper.getSoundObject({path:require('../../resources/Beep-Error.wav')});
  }

  onConnectivityChanged = isConnected => {
    this.isConnected = isConnected;
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} resizeMode="cover" source={require('../../resources/login-bg.jpg')} />
        <View style={styles.form}>
          <KeyboardAvoidingView behavior="padding" >
            <View style={styles.logo} >
              <Image source={require('../../resources/sepanta-logo.png')} />
              <Text style={styles.headerText}>سامانه حضور و غیاب پرسنلی سپنتا</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.inputs}
                onChangeText={value => this.setState({username: value.trim()})}
                placeholder="نام کاربری"
                textContentType="username"
                autoCapitalize="none"
                onSubmitEditing={() => this.passwordInput.current.focus()}
                autoCorrect={false}
                returnKeyType="next"
                underlineColorAndroid='transparent' />
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.inputs}
                onChangeText={value => this.setState({password: value.trim()})}
                placeholder="کلمه عبور"
                textContentType="password"
                autoCapitalize="none"
                secureTextEntry={true}
              returnKeyType="done"
                ref={this.passwordInput}
                underlineColorAndroid='transparent' />
            </View>
            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.signInAsync} disabled={this.state.loading}>
              {this.state.loading
                ? <ActivityIndicator color="#fff"/>
                : <Text style={styles.loginText}>ورود</Text>}
            </TouchableOpacity>
            <Loader loading={this.state.loading} overlayOnly={true} />
            <ConnectionStatus isHidden={true} onConnectivityChanged={this.onConnectivityChanged} />
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }

  signInAsync = async () => {
    let username = encodeURIComponent(this.state.username),
        password = encodeURIComponent(this.state.password);
    if (!this.isConnected) {
      Alert.alert('خطا', 'ارتباط شبکه برقرار نیست');
      return;
    }
    if (!username || !password) {
      Alert.alert('خطا','لطفا نام کاربری و رمز عبور را وارد نمایید');
      return;
    }

    this.setState({loading: true})
    var userToken = await AjaxHelper.getLoginId(username, password);
    if (!userToken) {
      Alert.alert('خطا','نام کاربری یا رمز عبور اشتباه است',
        [{text: 'OK', onPress: () => this.setState({loading: false})}]
      );
      this.errorSound.play();
      return;
    }

    AjaxHelper.initialize(userToken);
    await AsyncStorage.setItem('userToken', userToken);
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      marginRight:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
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
  loginButton: {
    backgroundColor: "darkorange",
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerText: {
    color: '#ddd',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  logo: {
    margin: 20,
    alignItems:'center'
  },
  backgroundImage:{
    position:'absolute',
    width:'100%',
    height:'100%'
  }
});
