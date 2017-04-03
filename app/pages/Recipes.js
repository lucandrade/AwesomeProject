import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableHighlight,
    ListView
} from 'react-native';

export default class Recipes extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { recipes } = this.props;
        if (!recipes.fetched && !recipes.fetching) {
            this.props.fetchList();
        }
    }

    nextPage() {
        this.props.nextPage();
    }

    goToRecipe(data) {
        this.props.navigator.push({
            id: `recipe/${data.id}`,
            title: data.title,
            recipeId: data.id
        });
    }

    render() {
        const { recipes } = this.props;

        if (recipes.error !== null || (recipes.fetching && !recipes.fetched)) {
            if (recipes.error !== null) {
                return <Text>Erro</Text>;
            }

            return <Text>Carregando</Text>;
        }

        if (recipes.list.length < 1) {
            return <Text>Lista Vazia</Text>;
        }

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const dataSource = ds.cloneWithRows(recipes.list);
        return (
            <View>
                <ListView style={{padding: 10}}
                    dataSource={dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderSeparator={this.renderRowSeparator} />
                <Text onPress={this.nextPage.bind(this)}>Carregar</Text>
            </View>
        );
    }

    renderRow(data) {
        const titleStyle = {
            fontWeight: 'bold',
            marginBottom: 10,
            fontSize: 20
        };

        const text = data.text.length > 120 ?
            data.text.substring(0, 120) + '...' :
            data.text;

        return (
            <TouchableHighlight onPress={this.goToRecipe.bind(this, data)}>
                <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <Text style={titleStyle}>{data.title}</Text>
                    <Text>{text}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    renderRowSeparator(sectionID, rowID, adjacentRowHighlighted) {
        const style = {
            height: adjacentRowHighlighted ? 4 : 1,
            backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        };
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={style} />
        );
    }
}
