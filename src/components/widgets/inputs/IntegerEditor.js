import React, {Component} from 'react';
import {ApplicationActions} from "../../../actions/ApplicationActions";
import RoundButton from "../../../widgets/RoundButton";
import ButtonStyles from "../../../utils/ButtonStyles";

export default class IntegerEditor extends Component {
    constructor(props) {
        super(props);
    }

    onChangeText(text) {
        if (this.props.commitAction) {
            let number = parseInt(text);
            if (isNaN(number)) {
                number = 0;
            }
            this.props.commitAction(number);
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
            text={this.renderLabel()}
            commitAction={() => ApplicationActions.showIntegerInput(this.props.options)}
        />;
    }
}