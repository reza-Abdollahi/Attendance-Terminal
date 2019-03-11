import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class Commands extends Component<Props> {
    constructor(props) {
        super(props);
    }
    HandleClick(e) {
        this.props.onClick(e);
    }
    render() {
        const { currentEmployeeInfo, preventCommand } = this.props;
        let disabilityStyle = function(type) {
          return null;

            let enableCondition = currentEmployeeInfo && !preventCommand;
            if (type === "out" && enableCondition) enableCondition = currentEmployeeInfo.lastInTime;
            return enableCondition ? {} : styles.disabled;
        }
        return (
            <View style={styles.commandContainer}>
                <TouchableOpacity onPress={()=>this.HandleClick("in")}
                style={[styles.button, styles.green, disabilityStyle("out")]}>
                    <Text style={styles.buttonText}>ورود</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.HandleClick("out")}
                style={[styles.button, styles.pink, disabilityStyle("out")]}>
                     <Text style={styles.buttonText}>خروج</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  commandContainer:{
    width:300,
    flexDirection: 'row-reverse',
    alignItems: 'flex-start'
  },
  button:{
    flex:1,
    padding:10,
  },
  buttonText:{
    textAlign:'center',
    fontSize: 20,
  },
  green:{
    backgroundColor:'green'
  },
  pink:{
    backgroundColor:'pink'
  },
  disabled:{
    backgroundColor:'grey'
  }
});
