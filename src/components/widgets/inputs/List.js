import React, {Component} from 'react';
import Row from "../../../widgets/Row";
import RoundButton from "../../../widgets/RoundButton";
import {FlatList, ScrollView} from "react-native";
import Column from "../../../widgets/Column";

export default class List extends Component {
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
        let rendered = option;
        if (this.props.renderer) {
            rendered = this.props.renderer(option);
        }
        return <Row ofList>
            <Column>
                {rendered}
            </Column>
        </Row>;
    }

    render() {
        const options = this.props.options;

        return <ScrollView>
            <FlatList
                data={options}
                keyExtractor={(option, index) => index}
                renderItem={({item}) => this.renderOption(item)}/>
        </ScrollView>;
    }
}