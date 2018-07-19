import React, {Component} from 'react';
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import {Modal} from "react-native";
import Label from "../../widgets/Label";

export default class ApplicationLoadingDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Modal
            onRequestClose={() => {}}
            animationType="fade"
            transparent={true}
            visible={this.props.visible}>
            <Row boxMargin={8} grow align="center">
                <Column>
                    <Label style="badge,orange">Loading...</Label>
                </Column>
            </Row>
        </Modal>;
    }
}