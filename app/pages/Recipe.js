import React, { Component } from 'react';
import {
    Text,
    ListView,
    ScrollView,
    View
} from 'react-native';

export default class Recipe extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { recipes, recipeId } = this.props;
        const recipe = recipes.recipe || {};

        if (!(recipe.id && recipe.id === recipeId)) {
            this.props.fetchRecipe(recipeId, recipes.list);
        }
    }

    render() {
        const { recipes } = this.props;

        if (recipes.error !== null) {
            return <Text>Erro</Text>;
        }

        if (recipes.fetching) {
            return <Text>Carregando</Text>;
        }

        if (!(recipes.recipe && recipes.recipe.id)) {
            return <Text>Erro ao carregar receita</Text>;
        }

        const { recipe } = recipes;
        const ingredients = this.renderIngredients(recipe.ingredients);

        return (
            <View>
                <ScrollView style={this.getContainerStyle()}>
                    <Text style={this.getTitleStyle()}>
                        {recipe.title}
                    </Text>
                    <Text style={this.getDateStyle()}>
                        {recipe.date}
                    </Text>
                    {ingredients}
                    <Text style={this.getSectionStyle()}>
                        MODO DE PREPARO
                    </Text>
                    <Text style={this.getTextStyle()}>
                        {recipe.text}
                    </Text>
                </ScrollView>
            </View>
        );
    }

    renderIngredients(ingredients) {
        if (!(ingredients && ingredients.length > 0)) {
            return null;
        }

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const dataSource = ds.cloneWithRows(ingredients);

        return (
            <View>
                <Text style={this.getSectionStyle()}>
                    INGREDIENTES
                </Text>
                <ListView
                    style={this.getIngredientsListStyle()}
                    dataSource={dataSource}
                    renderRow={this.renderRowIngredient.bind(this)}
                    renderSeparator={this.renderRowIngredientSeparator.bind(this)} />
            </View>
        );
    }

    renderRowIngredient(ingrediente) {
        return (
            <Text style={this.getIngredientsItemStyle()}>
                {ingrediente.amount ?
                    `${ingrediente.amount} ${ingrediente.text}` :
                    ingrediente.text}
            </Text>
        );
    }

    renderRowIngredientSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={this.getIngredientsSeparatorStyle()} />
        );
    }

    getContainerStyle() {
        return {
            padding: 15,
        };
    }

    getTitleStyle() {
        return {
            fontWeight: 'bold',
            fontSize: 25,
            textAlign: 'justify',
            color: '#222',
        };
    }

    getDateStyle() {
        return {
            fontStyle: 'italic',
            fontSize: 16,
            fontWeight: '500',
            color: '#555',
            marginTop: 5,
            marginBottom: 10,
        };
    }

    getSectionStyle() {
        return {
            backgroundColor: '#edeae3',
            padding: 5,
            color: '#514e44',
            fontSize: 20,
            marginTop: 15,
        };
    }

    getIngredientsListStyle() {
        return {
            backgroundColor: '#f9f8f7',
            marginBottom: 10,
        }
    }

    getIngredientsItemStyle() {
        return {
            color: '#514e44',
            padding: 10,
        };
    }

    getIngredientsSeparatorStyle() {
        return {
            height: 1,
            backgroundColor: '#514e44',
        };
    }

    getTextStyle() {
        return {
            paddingTop: 20,
            paddingBottom: 10,
        };
    }
}
