import React, {Component} from 'react';
import {TouchableOpacity, View} from "react-native";
import Label from "./Label";
import ButtonStyles from "../utils/ButtonStyles";
import TextStyles from "../utils/TextStyles";

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class FlatButton extends Component {

    constructor(props) {
        super(props);
    }

    clickAction() {
        if (!this.props.disabled && this.props.commitAction) {
            this.props.commitAction();
        }
    }

    render() {
        let style = this.props.style || "";
        if (this.props.active) {
            if (style) {
                style += ",primary";
            } else {
                style = "primary";
            }
        }
        return <TouchableOpacity
            disabled={this.props.disabled}
            onPress={() => this.clickAction()}>
            <View style={ButtonStyles.forName(style + ",flat")}>
                <Label style={style}>{this.props.text}</Label>
            </View>
        </TouchableOpacity>
    }

}