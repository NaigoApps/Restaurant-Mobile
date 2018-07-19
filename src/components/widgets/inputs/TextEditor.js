import React, {Component} from 'react';
import Column from "../../../widgets/Column";
import Row from "../../../widgets/Row";
import {TextInput} from "react-native";
import Label from "../../../widgets/Label";
import {ApplicationActions} from "../../../actions/ApplicationActions";
import RoundButton from "../../../widgets/RoundButton";

export default class TextEditor extends Component {
    constructor(props) {
        super(props);
    }

    onChangeText(text) {
        if (this.props.commitAction) {
            this.props.commitAction(text);
        }
    }

    renderLabel() {
        const label = this.props.options.label;
        const value = this.props.options.value || "?";
        return label + ": " + value;
    }

    render() {
        return <RoundButton
            disabled={this.props.disabled}
            style="left"
            text={this.renderLabel()}
            commitAction={() => ApplicationActions.showTextInput(this.props.options)}
        />;
    }
}