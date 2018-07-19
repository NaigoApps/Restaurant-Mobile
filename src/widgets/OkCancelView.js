import React, {Component} from 'react';
import {uuid} from "../utils/Utils";
import RoundButton from "./RoundButton";
import Column from "./Column";
import {DiningTablesCreatorActions} from "../pages/eveningEditing/diningTableEditing/DiningTablesCreatorActions";
import Row from "./Row";
import Dimensions from "../utils/Dimensions";

export default class OkCancelView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: "em_" + uuid()
        }
    }

    isValid(){
        return this.props.valid === undefined || this.props.valid;
    }

    onConfirm(){
        if(this.props.onConfirm){
            this.props.onConfirm();
        }
    }

    onAbort(){
        if(this.props.onAbort){
            this.props.onAbort();
        }
    }

    render() {

        return <Row grow>
            <Column>
                <Row grow>
                    <Column>
                        {this.props.children}
                    </Column>
                </Row>
                <Row ofList>
                    <Column sideMargin={Dimensions.smallSpace}>
                        <RoundButton
                            text="Conferma"
                            style="success"
                            disabled={!this.isValid()}
                            commitAction={() => this.onConfirm()}
                        />
                    </Column>
                    <Column sideMargin={Dimensions.smallSpace}>
                        <RoundButton
                            text="Annulla"
                            style="danger"
                            commitAction={() => this.onAbort()}
                        />
                    </Column>
                </Row>
            </Column>
        </Row>

    }

}