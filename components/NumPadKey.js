import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

type Props = {};
export default class NumPadKey extends Component<Props> {
    render() {
        const { onPress, style, title, ...props } = this.props

        return (
          <View style={styles.numpadKeyBorder}>
            <TouchableOpacity onPress={onPress} {...props}
              style={[styles.numpadKey, style]}>
              <Text style={styles.numpadKeyText}>{title}</Text>
            </TouchableOpacity>
          </View>
        )
    }
}

const styles = StyleSheet.create({

    numpadKey :{
        width: 99,
        height: 50,
        justifyContent:'center',
        alignItems: 'center',
    },
    numpadKeyBorder:{
      borderBottomWidth: 1,
      borderBottomColor: '#777',
      borderRightWidth: 1,
      borderRightColor: '#666',
    },
    numpadKeyText: {
      color:'teal',
      fontSize: 25,
    },

});
