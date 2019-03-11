import React, {Component} from 'react';
import {StyleSheet,
  Text, View} from 'react-native';

type Props = {};
export default class NumPadDisplay extends Component<Props> {
    render() {
        const { value, ...props } = this.props
        return (
            <View {...props} style={styles.numpadDisplay}>
              <Text style={styles.numpadDisplayText}>{value}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

  numpadDisplay: {
      flex: 1,
      backgroundColor: 'lightslategray',
  },
  numpadDisplayText: {
      color: 'white',
      fontSize: 40,
      textAlign: 'center'
      //lineHeight: 50,
      //direction: 'ltr',
  },

});
