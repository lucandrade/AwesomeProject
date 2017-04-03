import React, { Component } from 'react';
import {
  Text,
  View,
  ListView
} from 'react-native';

import LoremIpsum from 'lorem-hipsum';

export default class Recipes extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // this.props.setTitle('Recipes');
    }

    addRecipe() {
        this.props.addRecipe({
            title: LoremIpsum({
                count: 3,
                units: 'words',
            }),
            text: LoremIpsum({
                count: 1,
                units: 'sentences',
            })
        });
    }

    render() {
        if (this.props.recipes.list.length < 1) {
            return <Text onPress={this.addRecipe.bind(this)}>Aqui</Text>;
        }

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const dataSource = ds.cloneWithRows(this.props.recipes.list);
        return (
            <View>
                <Text onPress={this.addRecipe.bind(this)}>Aqui</Text>
                <ListView style={{padding: 10}}
                    dataSource={dataSource}
                    renderRow={this.renderRow}
                    renderSeparator={this.renderRowSeparator} />
            </View>
        );
    }

    renderRow(data) {
        const titleStyle = {
            fontWeight: 'bold',
            marginBottom: 10,
            fontSize: 20
        };

        return (
            <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                <Text style={titleStyle}>{data.title}</Text>
                <Text>{data.text}</Text>
            </View>
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
