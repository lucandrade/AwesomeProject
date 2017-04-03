import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';

export default class Login extends Component {
    nav() {
        this.props.navigator.push({
            id: 'recipes'
        });
    }
    render() {
        return (
            <View>
                <Text>
                    Login
                </Text>
                <TouchableHighlight onPress={this.nav.bind(this)}>
                    <Text>
                        Go to recipes
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}
