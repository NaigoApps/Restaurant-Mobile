import React, {Component} from 'react';
import Column from "../../../../widgets/Column";
import Row from "../../../../widgets/Row";
import {ApplicationActions} from "../../../../actions/ApplicationActions";
import Label from "../../../../widgets/Label";
import {TextInput} from "react-native";

export default class StringInput extends Component {
    constructor(props) {
        super(props);
    }

    onChange(evt) {
        if (this.props.onChange) {
            this.props.onChange(evt.target.value);
        }
    }

    focus() {
        if (this.input) {
            this.input.focus();
        }
    }

    render() {
        const text = this.props.value || "";
        return (
            <Row>
                <Column>
                    <Row align="center">
                        <Column auto>
                            <Label>{this.props.label}</Label>
                        </Column>
                        <Column>
                            <TextInput
                                ref={ref => {
                                    this.input = ref
                                }}
                                editable={!this.props.disabled}
                                value={text}
                                onChangeText={text => ApplicationActions.textInputChange(text)}
                                onEndEditing={() => this.props.onConfirm()}
                            />
                        </Column>
                    </Row>
                </Column>
            </Row>);
    }

}