import React, { Component } from 'react';
import {
    View,
    Text,
    Navigator,
    TouchableHighlight,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Recipes from '../pages/Recipes';
import Recipe from '../pages/Recipe';
import Login from '../pages/Login';
import * as topbarActions from '../actions/topbarActions';
import * as recipeActions from '../actions/recipeActions';

class Navigation extends Component {
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
            id: 'recipes',
            title: 'Receitas'
        };

        return {
            id: 'login',
            title: 'Login'
        };
    }

    getContainerStyle() {
        const paddingTop = this.barHeight;
        const paddingBottom = 30;
        const backgroundColor = 'white';

        return {
            paddingTop,
            paddingBottom,
            backgroundColor
        };
    }

    renderScene(route, navigator) {
        const { state, actions } = this.props;
        switch (true) {
            case /recipes/.test(route.id):
                return <Recipes navigator={navigator} {...state} {...actions} />;
            case /recipe\/\d{0,5}/.test(route.id):
                return <Recipe navigator={navigator} recipeId={route.recipeId} {...state} {...actions} />;
            default:
                return <Login navigator={navigator} {...actions}  {...state}/>;
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

    renderTitle(route, navigator) {
        const title = route.title || 'Carregando';
        return (
            <View>
                <Text style={this.getTitleStyle()}>
                    {title.length > 20 ? title.substring(0, 20) + '...' : title}
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
            <Text
                style={this.getLeftButtonStyle()}
                onPress={navigator.pop}>
                Voltar
            </Text>
        );

        return (
            <Icon
                name="chevron-left"
                onPress={navigator.pop}
                style={this.getLeftButtonStyle()} />
        );
    }

    getLeftButtonStyle() {
        const style = this.getTitleStyle();
        const marginLeft = 10;
        const marginTop = style.marginTop+2;
        const fontSize = 18;

        return Object.assign(style, {
            marginLeft,
            fontSize,
            marginTop
        });
        // return Object.assign(this.getButtonStyle(), {
        //     marginLeft
        // });
    }

    renderRightButton(route, navigator) {
        return null;
    }
}

export default connect(state => ({
        state,
    }),
    (dispatch) => ({
        actions: bindActionCreators(recipeActions, dispatch)
    })
)(Navigation);
