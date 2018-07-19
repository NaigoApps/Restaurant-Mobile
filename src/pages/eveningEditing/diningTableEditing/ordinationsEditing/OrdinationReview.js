import React from 'react';
import {findByUuid, uuid} from "../../../../utils/Utils";
import OrdinationsUtils from "../../OrdinationsUtils";
import Column from "../../../../widgets/Column";
import Row from "../../../../widgets/Row";
import Label from "../../../../widgets/Label";
import {DiningTablesEditorActions} from "../DiningTablesEditorActions";
import {BackHandler} from "react-native";
import OrdinationCreatorNav from "../OrdinationCreatorNav";
import OkCancelView from "../../../../widgets/OkCancelView";
import RoundButton from "../../../../widgets/RoundButton";
import {OrdersActions} from "./ordersEditing/OrdersActions";
import {ScrollView} from "react-native";

export default class OrdinationReview extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackPress = this.handleBackPress.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress() {
        setImmediate(() => DiningTablesEditorActions.abortOrdinationCreation());
        return true;
    }

    renderOrders(orders) {
        let phaseOrders = OrdinationsUtils.makePhaseMap(orders, this.props.data.phases);
        let phasesComponents = [];
        Object.keys(phaseOrders).forEach((phase) => {
            let orders = phaseOrders[phase];
            orders = OrdinationsUtils.sortByDish(orders, this.props.data.dishes, this.props.data.additions);
            phasesComponents.push(<Row key={"phase_" + phase}>
                <Column>
                    <Label style="bold,left">{findByUuid(this.props.data.phases, phase).name}</Label>
                </Column>
            </Row>);

            let ordersRenderer = orders.map(o => this.renderOrder(o));

            ordersRenderer.forEach(component => {
                phasesComponents.push(component);
            });
        });
        return <Column>
            {phasesComponents}
        </Column>;
    }

    renderOrder(order) {
        let dishes = this.props.data.dishes;
        let additions = this.props.data.additions;
        let result = OrdinationsUtils.renderImplodedOrder(order, dishes, additions);

        return <Row key={"ord_" + uuid()} ofList>
            <Column>
                <RoundButton
                    style="left"
                    text={result}
                    commitAction={() => OrdersActions.selectGroup(order)}/>
            </Column>
        </Row>
    }

    render() {
        let data = this.props.data;
        let tableUuid = data.diningTableEditing.diningTable;
        let orders = data.ordersEditing.orders;
        return <OkCancelView
            valid={orders.length > 0}
            onAbort={() => DiningTablesEditorActions.abortOrdinationCreation()}
            onConfirm={() => DiningTablesEditorActions.onConfirmOrders(tableUuid, orders)}>
            <OrdinationCreatorNav creating={false}/>
            <Row>
                <Column>
                    <Label style="center,large">Ordinazioni inserite</Label>
                </Column>
            </Row>
            <ScrollView>
                <Row grow>
                    {this.renderOrders(orders)}
                </Row>
            </ScrollView>
        </OkCancelView>;
    }

}