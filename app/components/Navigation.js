import React, { Component } from 'react';
import {
    View,
    Text,
    Navigator,
    TouchableHighlight,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Recipes from '../pages/Recipes';
import Login from '../pages/Login';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.barHeight = Platform.OS !== 'ios' ? 64 : 80;
    }

    render() {
        return (
            <Navigator
                initialRoute={this.getInitialRoute()}
                sceneStyle={this.getContainerStyle()}
                renderScene={this.renderScene.bind(this)}
                navigationBar={this.renderNavigationBar()} />
        );
    }

    getInitialRoute() {
        return {
            id: 'login'
        };
    }

    getContainerStyle() {
        const paddingTop = this.barHeight;
        const backgroundColor = 'white';

        return {
            paddingTop,
            backgroundColor
        };
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case 'login':
                return <Login navigator={navigator} />;
                break;
            case 'recipes':
                return <Recipes navigator={navigator} />;
                break;
            default:
                return <Login navigator={navigator} />;
        }
    }

    renderNavigationBar() {
        const config = {
            Title: this.renderTitle.bind(this),
            LeftButton: this.renderLeftButton.bind(this),
            RightButton: this.renderRightButton.bind(this)
        };
        return (
            <Navigator.NavigationBar
                routeMapper={config}
                navigationStyles={Navigator.NavigationBar.StylesIOS}
                style={this.getNavigationBarStyle()} />
        );
    }

    getNavigationBarStyle() {
        const backgroundColor = '#00c6bf';
        const height = this.barHeight;

        return {
            backgroundColor,
            height
        };
    }

    renderTitle() {
        return (
            <View>
                <Text style={this.getTitleStyle()}>
                    Cancel
                </Text>
            </View>
        );
    }

    getItemsStyle() {
        const marginTop = Platform.OS !== 'ios' ? 0 : 20;
        const color = 'white';
        const fontSize = 20;

        return {
            marginTop,
            color,
            fontSize
        };
    }

    getTitleStyle() {
        return Object.assign(this.getItemsStyle(), {

        });
    }

    getButtonStyle() {
        const fontSize = 25;
        return Object.assign(this.getItemsStyle(), {
            fontSize
        });
    }

    renderLeftButton(route, navigator) {
        if (navigator.getCurrentRoutes().length === 1) {
            return null;
        }

        return (
            <Icon
                name="chevron-left"
                onPress={navigator.pop}
                style={this.getLeftButtonStyle()} />
        );
    }

    getLeftButtonStyle() {
        const marginLeft = 10;

        return Object.assign(this.getButtonStyle(), {
            marginLeft
        });
    }

    renderRightButton(route, navigator) {
        return null;
    }
}
