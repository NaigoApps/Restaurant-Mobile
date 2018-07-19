import React, {Component} from 'react';
import {ApplicationActions} from "../../actions/ApplicationActions";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import RoundButton from "../../widgets/RoundButton";
import TextStyles from "../../utils/TextStyles";
import {Modal} from "react-native";
import IntegerInput from "./inputs/IntegerInput";
import Label from "../../widgets/Label";

export default class ApplicationIntegerInput extends Component {
    constructor(props) {
        super(props);
    }

    confirmIntegerValue() {
        let data = this.props.data;
        let callback = data.callback;
        if (callback) {
            callback(data.value);
        }
        ApplicationActions.hideIntegerInput();
    }

    focusText() {
        if (this.input) {
            this.input.focus();
        }
    }

    isValid() {
        let data = this.props.data;
        let value = data.get('value');
        let min = data.get('min');
        let max = data.get('max');
        return (min === undefined || min <= value) && (max === undefined || value <= max);
    }

    render() {
        let data = this.props.data;
        return <Modal
            onRequestClose={() => ApplicationActions.hideIntegerInput()}
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
                                    <IntegerInput
                                        ref={ref => {
                                            this.input = ref
                                        }}
                                        onConfirm={() => this.confirmIntegerValue()}
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
                                // disabled={!this.canConfirm()}
                                commitAction={() => this.confirmIntegerValue()}
                            />
                        </Column>
                        <Column sideMargin={8}>
                            <RoundButton
                                text="Annulla"
                                style="danger"
                                commitAction={() => ApplicationActions.hideIntegerInput()}/>
                        </Column>
                    </Row>
                </Column>
            </Row>
        </Modal>;
    }
}