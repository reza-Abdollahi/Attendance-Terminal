import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';
import ConnectionStatus from './ConnectionStatus';

class AppHeader extends Component<Props> {
    render() {
      return (
        <View style={styles.appHeaderContainer}>
          <View style={styles.appHeader}>
            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
              <Text style={styles.menuButtonStyle}>≡</Text>
            </TouchableOpacity>
            <Image source={require('../resources/sepanta-logo.png')} style={styles.logo}/>
            <Text style={styles.title}>پایانه ثبت حضور سپنتا</Text>
          </View>
          <ConnectionStatus onConnectivityChanged={this.props.onConnectivityChanged} />
        </View>
      );
    }
}

const styles = StyleSheet.create({
    appHeaderContainer:{
      justifyContent: 'space-between',
      flexDirection: 'row-reverse',
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: '#364653',
    },
    appHeader: {
        justifyContent: 'flex-start',
        flexDirection: 'row-reverse',
    },
    menuButtonStyle: {
      color:'black',
      fontWeight:'bold',
      fontSize:25,
      lineHeight:27,
      paddingRight:20,
      paddingLeft:20
   },
   logo: {
     marginLeft:10
   },
   title: {
     lineHeight:24,
     color:'#ccc',
   }
});

export default withNavigation(AppHeader);
