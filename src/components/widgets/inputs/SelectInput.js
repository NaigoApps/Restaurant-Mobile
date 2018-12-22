import React, {Component} from 'react';
import {distribute} from "../../../utils/Utils";
import Row from "../../../widgets/Row";
import RoundButton from "../../../widgets/RoundButton";
import {FlatList} from "react-native";
import Column from "../../../widgets/Column";
import RenderingData from "./RenderingData";
import Dimensions from "../../../utils/Dimensions";

export default class SelectInput extends Component {
    constructor(props) {
        super(props);
    }

    select(option) {
        if (!option || this.isSelected(option) && this.props.onDeselect) {
            this.props.onDeselect(option);
        } else if (this.props.onSelect) {
            this.props.onSelect(option);
        }
    }

    longSelect(option){
        if(this.props.onLongSelect){
            this.props.onLongSelect(option);
        }
    }

    isSelected(option) {
        if (!this.props.multiSelect) {
            return this.props.selected === option;
        } else {
            return this.props.selected.includes(option);
        }
    }

    renderOption(option) {
        let renderingData;
        if (this.props.renderer) {
            renderingData = this.props.renderer(option);
            if (renderingData instanceof RenderingData) {
                return renderingData;
            }
            renderingData = new RenderingData(renderingData, "secondary");
        } else {
            renderingData = new RenderingData(option, "secondary");
        }
        return renderingData;
    }

    renderRow(items, cols, index) {
        items = items.map((item, index) => {
            const rendered = this.renderOption(item);
            const pR = index === 0 ? Dimensions.smallSpace : 0;
            const pL = index === items.length - 1 ? Dimensions.smallSpace : 0;
            return (
                <Column mL={pL} mr={pR} key={index} >
                    <RoundButton
                        active={this.isSelected(item)}
                        text={rendered.text}
                        style={rendered.backgroundColor}
                        textStyle={rendered.textStyle}
                        longCommitAction={this.longSelect.bind(this, item)}
                        commitAction={this.select.bind(this, item)}
                    />
                </Column>
            );
        });

        while (items.length < cols) {
            items.push(<Column key={items.length}/>);
        }

        return <Row mt={index !== 0}>{items}</Row>
    }

    render() {
        const entities = this.props.options;

        const cols = this.props.cols || 2;

        let optionsList;

        optionsList = distribute(entities, cols);

        return <FlatList
                data={optionsList}
                refreshing={false}
                onRefresh={this.props.onRefresh}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(row) => this.renderRow(row.item, cols, row.index)}/>;
    }
}