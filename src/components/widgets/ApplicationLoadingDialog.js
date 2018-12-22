import React, {Component} from 'react';
import Label from "../../widgets/Label";
import Modal from "./Modal";

export default class ApplicationLoadingDialog extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return <Modal
            visible={this.props.visible} collapse>
            <Label style="orange,bgWhite">Loading...</Label>
        </Modal>;
    }
}