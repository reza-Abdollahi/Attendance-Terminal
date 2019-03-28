//  https://reactnavigation.org/docs/en/navigation-lifecycle.html
import React from 'react';
import { View, Text, Button } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import App from './App';
import AuthLoading from './components/Auth/AuthLoading';
import SignIn from './components/Auth/SignIn';
import SignOut from './components/Auth/SignOut';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: 'darkslategray',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const AppStack = createStackNavigator(
  {
    Home: {
      screen: App,
      navigationOptions:{
        headerBackTitle: "بازگشت",
      }
    },
    SignOut: SignOut
  },
  { defaultNavigationOptions: defaultNavigationOptions }
);
const AppDrawer = createDrawerNavigator(
  {
    Home: {
      screen: AppStack,
      navigationOptions: {
        title: "ثبت حضور",
      }
    },
    SignOut: {
      screen: SignOut,
      navigationOptions: {
        title: "خروج",
      }
    },
  },
  {
    drawerPosition: 'right',
    drawerBackgroundColor: 'lightgrey'
  }
);
const AuthStack = createStackNavigator(
  { SignIn: SignIn },
  { defaultNavigationOptions: defaultNavigationOptions }
);
const AppContainer = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppDrawer,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
    defaultNavigationOptions: defaultNavigationOptions
  }
);

export default createAppContainer(AppContainer);
