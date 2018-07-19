import React, {Component} from 'react';
import {distribute, uuid} from "../../../utils/Utils";
import Row from "../../../widgets/Row";
import RoundButton from "../../../widgets/RoundButton";
import {FlatList, ScrollView} from "react-native";
import Column from "../../../widgets/Column";

export default class SelectInput extends Component {
    constructor(props) {
        super(props);
    }

    select(option) {
        if (!option || this.isSelected(this.id(option)) && this.props.onDeselect) {
            this.props.onDeselect(this.id(option));
        } else if (this.props.onSelect) {
            this.props.onSelect(this.id(option));
        }
    }

    id(option) {
        if (option && this.props.id) {
            return this.props.id(option);
        }
        if (option && option.uuid){
            return option.uuid;
        }
        return option;
    }

    isSelected(uuid) {
        if (!this.props.multiSelect) {
            return this.props.selected === uuid;
        } else {
            return this.props.selected.includes(uuid);
        }
    }

    renderOption(option) {
        if (this.props.renderer) {
            return this.props.renderer(option);
        }
        return option;
    }

    renderColor(option) {
        return this.props.colorRenderer ? this.props.colorRenderer(option) : "secondary"
    }

    renderRow(items, cols) {
        items = items.map((item, index) => {
            return (
                <Column key={index} padding={8}>
                    <RoundButton
                        active={this.isSelected(this.id(item))}
                        text={this.renderOption(item)}
                        style={this.renderColor(item)}
                        commitAction={this.select.bind(this, item)}
                    />
                </Column>
            );
        });

        while (items.length < cols) {
            items.push(<Column key={items.length}/>);
        }

        return <Row>{items}</Row>
    }

    render() {
        const entities = this.props.options;
        const colorRenderer = this.props.colorRenderer;

        const cols = this.props.cols || 3;

        let optionsList;

        optionsList = distribute(entities, cols);

        return <FlatList
                data={optionsList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => this.renderRow(item, cols)}/>;
    }
}