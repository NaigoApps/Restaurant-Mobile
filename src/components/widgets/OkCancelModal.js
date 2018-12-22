import React, {Component} from 'react';
import Modal from "./Modal";
import Label from "../../widgets/Label";
import Column from "../../widgets/Column";
import RoundButton from "../../widgets/RoundButton";
import Row from "../../widgets/Row";

export default class OkCancelModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal visible={this.props.visible} collapse>
                <Row>
                    <Column><Label>{this.props.message}</Label></Column>
                </Row>
                <Row mt>
                    <Column mr>
                        <RoundButton
                            style={this.props.abortType}
                            text={this.props.abortMessage || "Annulla"}
                            commitAction={this.props.abortAction}
                        />
                    </Column>
                    <Column>
                        <RoundButton
                            style={this.props.confirmType}
                            text={this.props.confirmMessage || "Conferma"}
                            commitAction={this.props.confirmAction}
                        />
                    </Column>
                </Row>
            </Modal>
        );
    }

}