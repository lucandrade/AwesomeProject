/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './code/components/Navigation';

export default class AwesomeProject extends Component {
    componentDidMount() {
        setTimeout(SplashScreen.hide, 2000);
    }
    render() {
        return (
            <Navigation />
        );
    }
}
