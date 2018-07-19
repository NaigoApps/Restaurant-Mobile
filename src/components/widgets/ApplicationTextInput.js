import React, {Component} from 'react';
import {ApplicationActions} from "../../actions/ApplicationActions";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import RoundButton from "../../widgets/RoundButton";
import {Modal} from "react-native";
import StringInput from "./inputs/text/StringInput";
import Label from "../../widgets/Label";

export default class ApplicationTextInput extends Component {
    constructor(props) {
        super(props);
    }

    confirmTextValue() {
        let data = this.props.data;
        let callback = data.callback;
        if (callback) {
            callback(data.value);
        }
        ApplicationActions.hideTextInput();
    }

    focusText() {
        if (this.input) {
            this.input.focus();
        }
    }

    render() {
        let data = this.props.data;
        return <Modal
            onRequestClose={() => ApplicationActions.hideTextInput()}
            animationType="slide"
            transparent={false}
            onShow={() => this.focusText()}
            visible={data.visible}>
            <Row boxMargin={8} grow>
                <Column>
                    <Row grow>
                        <Column>
                            <Row>
                                <Column>
                                    <Label>{data.label}</Label>
                                </Column>
                            </Row>
                            <Row grow>
                                <Column>
                                    <StringInput
                                        ref={ref => {
                                            this.input = ref
                                        }}
                                        onConfirm={() => this.confirmTextValue()}
                                        value={data.value}/>
                                </Column>
                            </Row>
                        </Column>
                    </Row>
                    <Row topSpaced>
                        <Column sideMargin={8}>
                            <RoundButton
                                text="Ok"
                                style="success"
                                commitAction={() => this.confirmTextValue()}
                            />
                        </Column>
                        <Column sideMargin={8}>
                            <RoundButton
                                text="Annulla"
                                style="danger"
                                commitAction={() => ApplicationActions.hideTextInput()}/>
                        </Column>
                    </Row>
                </Column>
            </Row>
        </Modal>;
    }
}