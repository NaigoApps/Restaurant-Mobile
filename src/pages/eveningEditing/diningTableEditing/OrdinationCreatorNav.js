import React from 'react';
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import {OrdersActions} from "./ordinationsEditing/ordersEditing/OrdersActions";
import FlatButton from "../../../widgets/FlatButton";

export default class OrdinationCreatorNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Row>
            <Column key="creation">
                <FlatButton style="secondary"
                            active={this.props.creating}
                            text="Inserimento"
                            commitAction={() => OrdersActions.showEditor()}
                />
            </Column>
            <Column key="review">
                <FlatButton style="secondary"
                            active={!this.props.creating}
                            text="Riepilogo"
                            commitAction={() => OrdersActions.showReview()}
                />
            </Column>
        </Row>;
    }

}