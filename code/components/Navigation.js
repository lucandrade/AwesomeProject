import React, { Component } from 'react';
import { Text, Navigator, TouchableHighlight } from 'react-native';

import Recipes from '../pages/Recipes';
import Login from '../pages/Login';

export default class Navigation extends Component {
    render() {
        const route = {
            id: 'login'
        };
        const style = {
            paddingTop: 100
        };
        return (
            <Navigator
                initialRoute={route}
                sceneStyle={style}
                renderScene={this.renderScene.bind(this)}
                navigationBar={this.renderNavigationBar()} />
        );
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
            Title: () => {
                return <Text>Cancel</Text>;
            },
            LeftButton: this.renderBackButton,
            RightButton: () => {
                return null;
            }
        };
        return (
            <Navigator.NavigationBar
                routeMapper={config}
                style={{backgroundColor: 'gray'}} />
        );
    }

    renderBackButton(route, navigator) {
        if (navigator.getCurrentRoutes().length === 1) {
            return null;
        }

        return (
            <TouchableHighlight onPress={navigator.pop}>
                <Text>
                    Voltar
                </Text>
            </TouchableHighlight>
        );
    }
}
