import React, {Component} from 'react';
import {ApplicationActions} from "../../actions/ApplicationActions";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import RoundButton from "../../widgets/RoundButton";
import SelectInput from "./inputs/SelectInput";
import Label from "../../widgets/Label";
import Modal from "./Modal";
import Dimensions from "../../utils/Dimensions";

export default class ApplicationSelectInput extends Component {
    constructor(props) {
        super(props);
    }

    canConfirm() {
        let data = this.props.data;
        return data.isValid === undefined || data.isValid(data.value);
    }

    confirmSelectValue() {
        let data = this.props.data;
        let callback = data.callback;
        if (callback) {
            callback(data.value);
        }
        ApplicationActions.hideSelectInput();
    }

    render() {
        let data = this.props.data;
        return <Modal
            visible={data.visible}>
            <Row grow>
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
                                    <SelectInput
                                        cols={data.cols}
                                        id={data.id}
                                        multiSelect={data.multiSelect}
                                        selected={data.value}
                                        options={data.values}
                                        renderer={data.renderer}
                                        onSelect={option => ApplicationActions.selectInputSelect(option)}
                                        onDeselect={(option) => ApplicationActions.selectInputDeselect(option)}
                                    />
                                </Column>
                            </Row>
                        </Column>
                    </Row>
                    <Row mt={Dimensions.mediumSpace}>
                        <Column sideMargin={8}>
                            <RoundButton
                                text="Ok"
                                style="success"
                                disabled={!this.canConfirm()}
                                commitAction={() => this.confirmSelectValue()}
                            />
                        </Column>
                        <Column sideMargin={8}>
                            <RoundButton
                                text="Annulla"
                                style="danger"
                                commitAction={() => ApplicationActions.hideSelectInput()}/>
                        </Column>
                    </Row>
                </Column>
            </Row>
        </Modal>
    }
}