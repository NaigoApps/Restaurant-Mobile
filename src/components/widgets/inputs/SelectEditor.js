import React, {Component} from 'react';
import RoundButton from "../../../widgets/RoundButton";
import {ApplicationActions} from "../../../actions/ApplicationActions";

/**
 * Events:
 * - onSelect
 * - onDeselect
 * - onSelectPage
 *
 * - onShowModal
 * - onAbort
 * - onConfirm
 */

export default class SelectEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }

    renderValue(value) {
        const options = this.props.options;
        if (!options.renderer || !value) {
            return value || "?";
        }
        return options.renderer(value);
    }

    id(option) {
        if (option && this.props.options.id) {
            return this.props.options.id(option);
        }
        if (option && option.uuid) {
            return option.uuid;
        }
        return option;
    }

    findValue(value) {
        return this.props.options.values.find(val => this.id(val) === value) || null;
    }

    renderLabel() {
        const label = this.props.options.label;
        const value = this.findValue(this.props.options.value);
        return label + ": " + this.renderValue(value);
    }

    render() {
        return <RoundButton
            disabled={this.props.disabled}
            text={this.renderLabel()}
            style="left"
            commitAction={() => ApplicationActions.showSelectInput(this.props.options)}
        />;
    }

}