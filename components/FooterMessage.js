import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class FooterMessage extends Component<Props> {
    constructor(props) {
        super(props);
    }
    render() {
        const { type, text } = this.props.message;
        const currentEmployeeInfo = this.props.employeeInfo;
        const employeeName = currentEmployeeInfo ? currentEmployeeInfo.fullName : "";
        const inTime = currentEmployeeInfo ? currentEmployeeInfo.lastInTime : "";

        let icon;
        if (type === "success") {
            icon = <Text style={styles.green}>✔</Text>
        } else if (type === "error") {
            icon = <Text style={styles.red}>❗</Text>
        } else {
            icon = <Text style={styles.blue}>ℹ</Text>
        }

        return (
          <View>
            <Text style={styles.orange}>
              <Text> 🤵 کاربر محترم، </Text>
              <Text style={styles.bold}> {employeeName}</Text>
            </Text>
            { inTime
              ? <Text style={styles.green}>
                 <Text> 🕒 آخرین ورود: </Text>
                 <Text style={styles.bold}> {inTime}</Text>
                </Text>
              : null
            }
            <View style={styles.rtl}>
              <Text style={styles.icon}>{icon}</Text>
              <Text style={styles.iconText}> {text}</Text>
            </View>
          </View>
        );
      }
}


const styles = StyleSheet.create({
  rtl:{
    flexDirection: 'row-reverse',
  },
  bold:{
    fontWeight: 'bold'
  },
  icon:{
    fontSize: 30,
    lineHeight: 30
  },
  iconText:{
    lineHeight: 30
  },
  green:{
    color:'green'
  },
  red:{
    color:'red'
  },
  blue:{
    color:'blue'
  },
  orange:{
    color:'orange'
  }
});
