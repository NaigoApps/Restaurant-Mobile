import React, {Component} from 'react';
import Column from "../../../widgets/Column";
import Row from "../../../widgets/Row";
import Label from "../../../widgets/Label";
import {TextInput, TouchableOpacity} from "react-native";
import ButtonStyles from "../../../utils/ButtonStyles";
import Dimensions from "../../../utils/Dimensions";

export default class FloatInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.value ? props.value.toString() : "0"
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                text: this.props.value ? this.props.value.toString() : "0"
            })
        }
    }

    onChange(text) {
        this.setState({
            text: text
        })
    }

    onConfirm() {
        if (this.props.commitAction) {
            const min = this.props.min !== undefined ? this.props.min : Number.MIN_SAFE_INTEGER;
            const max = this.props.max !== undefined ? this.props.max : Number.MAX_SAFE_INTEGER;
            let number = parseFloat(this.state.text);
            if (isNaN(number)) {
                return;
            }
            number = Math.max(number, min);
            number = Math.min(number, max);
            this.props.commitAction(number);
        }
    }

    focus() {
        this.input && this.input.focus();
        this.setState({
            text: ""
        })
    }

    render() {
        const text = this.state.text;

        return (
            <Row>
                <Column>
                    <TouchableOpacity style={ButtonStyles.forName()} onPress={() => this.focus()}>
                        <Row align="center" justify="center">
                            <Column auto>
                                <Label>{this.props.label}: </Label>
                            </Column>
                            <Column auto>
                                <TextInput
                                    style={{fontSize: Dimensions.defaultFont}}
                                    ref={ref => this.input = ref}
                                    keyboardType="numeric"
                                    editable={!this.props.disabled}
                                    value={text}
                                    onChangeText={text => this.onChange(text)}
                                    onEndEditing={() => this.onConfirm()}
                                />
                            </Column>
                        </Row>
                    </TouchableOpacity>
                </Column>
            </Row>);
    }

}