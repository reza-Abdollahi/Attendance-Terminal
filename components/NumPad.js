import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import NumPadDisplay from './NumPadDisplay';
import NumPadKey from './NumPadKey';

type Props = {};
export default class NumPad extends Component<Props> {
    constructor(props) {
        super(props);
        this.defaultDisplayValue = "????";
        this.maxValueLength = this.defaultDisplayValue.length;

        this.clearDisplay = this.clearDisplay.bind(this);
        this.clearLastChar = this.clearLastChar.bind(this);
    }
    clearDisplay() {
        this.props.playBeep();
        const value = this.props.value;
        if (value !== undefined)
            this.valueChanged(undefined);
    }
    clearLastChar() {
        this.props.playBeep();
        const value = this.props.value;
        if (value !== undefined) {
            let stringValue = value.toString();
            if (stringValue.length !== 1)
                this.valueChanged(stringValue.slice(0, stringValue.length - 1));
            else
                this.clearDisplay();
        }
    }
    inputDigit(digit) {
        this.props.playBeep();
        const value = this.props.value;
        if (value === undefined)
            this.valueChanged(digit);
        else {
            let stringValue = value.toString();
            if (stringValue.length !== this.maxValueLength) {
                this.valueChanged(stringValue + digit);
            }
        }
    }
    valueChanged(value) {
        const stringValue = value === undefined ? "" : value.toString();
        let isFullId = stringValue.length === this.maxValueLength;
        this.props.onEmployeeIdChanged(value, isFullId);
    }
    render() {
        const { value } = this.props;
                const stringValue = value === undefined ? "" : value.toString();
        const displayValue = (stringValue + this.defaultDisplayValue).slice(0, this.defaultDisplayValue.length);
        const clearBackBtnText = <b><i
        //className="fa fa-long-arrow-left fa-lg"
        >back</i></b>;

        return (
          <View style={styles.numpad}>
            <View style={styles.numpadKeypad}>
                <View style={styles.digitKeys}>
                  <NumPadKey onPress={() => this.inputDigit(0)} title="0" />
                  <NumPadKey onPress={this.clearLastChar} title="←" />
                  <NumPadKey onPress={this.clearDisplay}
                  title="C" style={styles.removeRightBorder}/>
                  <NumPadKey onPress={() => this.inputDigit(1)} title="1" />
                  <NumPadKey onPress={() => this.inputDigit(2)} title="2" />
                  <NumPadKey onPress={() => this.inputDigit(3)}  title="3" style={styles.removeRightBorder}/>
                  <NumPadKey onPress={() => this.inputDigit(4)} title="4" />
                  <NumPadKey onPress={() => this.inputDigit(5)} title="5" />
                  <NumPadKey onPress={() => this.inputDigit(6)}  title="6" style={styles.removeRightBorder}/>
                  <NumPadKey onPress={() => this.inputDigit(7)} title="7" />
                  <NumPadKey onPress={() => this.inputDigit(8)} title="8" />
                  <NumPadKey onPress={() => this.inputDigit(9)}  title="9" style={styles.removeRightBorder}/>
                </View>
            </View>
            <NumPadDisplay value={displayValue}/>
          </View>
        )
    }
}

const styles = StyleSheet.create({

  numpad: {
    //flex:1,
      backgroundColor: 'black',
      width: 300,
      height: 250,
      flexDirection: 'column',
  },

  numpadKeypad :{
      height: 200,
      //width: 300,
      //display:'flex',
  },

  digitKeys :{
      backgroundColor:'#e0e0e7',
      display:'flex',
      flexDirection:'row',
      flexWrap:'wrap-reverse',
  },

      removeRightBorder:{
          borderRightWidth:0,
      },

  disabled :{
      backgroundColor:'gray',
      borderColor:'gray',
  }

});
