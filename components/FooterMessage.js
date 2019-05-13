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
        let notificationText = text;

        let icon;
        if (!this.props.isConnected) {
          icon = <Text style={styles.red}>❗</Text>
          notificationText = 'ارتباط شبکه برقرار نیست'
        }
        else {
          if (type === "success") {
              icon = <Text style={styles.green}>✔</Text>
          } else if (type === "error") {
              icon = <Text style={styles.red}>❗</Text>
          } else {
              icon = <Text>⌘</Text>
          }
        }

        return (
          <View>
            <View style={styles.rtl}>
              <Text>
                <Text style={styles.white}> 🤵 </Text>
                <Text style={{color:'#ccc'}}> کاربر محترم، </Text>
                <Text style={[styles.bold, styles.white]}> {employeeName}</Text>
              </Text>
              { inTime
                ? <Text>
                   <Text> ( 🕒 آخرین ورود: </Text>
                   <Text style={styles.bold}> {inTime} )</Text>
                  </Text>
                : null
              }
            </View>
            <View style={styles.rtl}>
              <Text style={styles.icon}>{icon}</Text>
              <Text style={[styles.iconText, styles.orange]}>  {notificationText}</Text>
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
    fontSize: 28,
    lineHeight: 30
  },
  iconText:{
    lineHeight: 30
  },
  green:{
    color:'green'
  },
  white:{
    color:'white'
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
