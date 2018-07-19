import React, {Component} from 'react';
import {ApplicationActions} from "../../actions/ApplicationActions";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import RoundButton from "../../widgets/RoundButton";
import SelectInput from "./inputs/SelectInput";
import {Modal} from "react-native";
import Label from "../../widgets/Label";
import ButtonStyles from "../../utils/ButtonStyles";
import TextStyles from "../../utils/TextStyles";

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
            onRequestClose={() => ApplicationActions.hideSelectInput()}
            animationType="slide"
            transparent={false}
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
                                    <SelectInput
                                        cols={data.cols}
                                        id={data.id}
                                        multiSelect={data.multiSelect}
                                        selected={data.value}
                                        options={data.values}
                                        renderer={data.renderer}
                                        colorRenderer={data.colorRenderer}

                                        onSelect={option => ApplicationActions.selectInputSelect(option)}
                                        onDeselect={(option) => ApplicationActions.selectInputDeselect(option)}
                                    />
                                </Column>
                            </Row>
                        </Column>
                    </Row>
                    <Row topSpaced>
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