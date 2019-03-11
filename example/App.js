/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { IHAKCCInput } from 'ihakccinput';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <View style={styles.container}>
        <IHAKCCInput showName style={{ fontSize: 20, color: "black", margin: 5, padding: 2 }} 
	validStyle={{borderColor: "green"}} 
	invalidStyle={{borderColor: "red"}}
	defaultStyle={{borderColor: "gray"}}
	placeholderColor="gray"
	onValid={
		(card, expiry, code) => {
			console.log(card, expiry, code);
			console.log("Valid number entered");
		}
		}
	/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
