import React, { Component } from 'react';
import {
  Text,
  View,
  NetInfo
} from 'react-native';

export default class ConnectionStatus extends Component {
  state = {
    isConnected: null,
  };

  componentDidMount() {
    NetInfo.isConnected.fetch().done(this._handleConnectivityChange);
    this.eventlistener = NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectivityChange);
  }

  componentWillUnmount() {
    this.eventlistener.remove();
  }

  _handleConnectivityChange = (isConnected) => {
    this.setState({isConnected});
    this.props.onConnectivityChanged(isConnected);
  };

  render() {
    if (this.props.isHidden) {
      return null;
    }
    return (
        <View style={styles.container}>
          <Text style={styles.title}> {this.state.isConnected ? 'آنلاین' : 'آفلاین'}</Text>
          <Text>{this.state.isConnected ? '🔵' : '🔴'}</Text>
        </View>
    );
  }
}

const styles = {
  container:{
    flexDirection: 'row',
    paddingLeft: 20,
  },
  title: {
    lineHeight:24,
    color:'#ccc',
  }
}
