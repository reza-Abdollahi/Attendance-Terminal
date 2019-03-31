import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';

class AppHeader extends Component<Props> {
    render() {
      return (
        <View style={styles.appHeader}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Text style={styles.menuButtonStyle}>≡</Text>
          </TouchableOpacity>
          <Image source={require('../resources/sepanta-logo.png')} style={styles.logo}/>
          <Text style={styles.title}>پایانه ثبت حضور سپنتا</Text>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    appHeader: {
        flex: 1,
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
     lineHeight:24
   }
});

export default withNavigation(AppHeader);