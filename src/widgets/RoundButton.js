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

export default class RoundButton extends Component {
    colors = {
        primary: "#0275d8",
        secondary: "#FFFFFF",
        success: "#5cb85c",
        danger: "#d9534f",
        warning: "#f0ad4e",
        info: "#5bc0de"
    };

    constructor(props) {
        super(props);
    }

    clickAction() {
        if (!this.props.disabled && this.props.commitAction) {
            this.props.commitAction();
        }
    }

    longClickAction() {
        if (!this.props.disabled && this.props.longCommitAction) {
            this.props.longCommitAction();
        }
    }

    color(color) {
        if (!color) {
            return this.colors.secondary;
        }
        return this.colors[color];
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
        if (this.props.disabled){
            if (style) {
                style += ",disabled";
            } else {
                style = "disabled";
            }
        }
        return <TouchableOpacity
            disabled={this.props.disabled}
            onLongPress={() => this.longClickAction()}
            onPress={() => this.clickAction()}>
            <View style={ButtonStyles.forName(style)}>
                <Label style={style}>{this.props.text}</Label>
            </View>
        </TouchableOpacity>
    }

}