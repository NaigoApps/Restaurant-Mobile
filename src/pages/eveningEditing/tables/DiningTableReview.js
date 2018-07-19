import React from 'react';
import OrdinationsUtils from "../OrdinationsUtils";
import Column from "../../../widgets/Column";
import Row from "../../../widgets/Row";
import DiningTablesUtils from "./DiningTablesUtils";
import Label from "../../../widgets/Label";
import {BackHandler, ScrollView} from "react-native";
import RoundButton from "../../../widgets/RoundButton";
import {DiningTablesEditorActions} from "../diningTableEditing/DiningTablesEditorActions";
import {findByUuid, uuid} from "../../../utils/Utils";

export default class DiningTableReview extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress() {
        setImmediate(() => DiningTablesEditorActions.deselect());
        return true;
    }

    render() {
        let data = this.props.data;
        let orders = [];
        let evening = data.evening;
        let tableUuid = data.diningTableEditing.diningTable;
        let table = findByUuid(data.evening.diningTables, tableUuid);

        table.ordinations.forEach(ordination => {
            ordination.orders.forEach(order => {
                orders.push(order);
            });
        });
        let allOrders = orders;
        let groups = DiningTablesUtils.implode(orders);
        groups = OrdinationsUtils.sortByDish(groups, data.dishes, data.additions);
        let ordersComponents = groups.map(grp => {
            let left = OrdinationsUtils.renderImplodedOrder(grp, data.dishes, data.additions);
            let textColor = "secondary";
            // if (grp.orderType.price === 0) {
            //     textColor = "red";
            // }
            return <Row key={uuid()}>
                <Column>
                    <Label
                        style={textColor + ",left"}>{left} {OrdinationsUtils.formatGroupPrice(grp)}</Label>
                </Column>
            </Row>;
        });
        let coverCharges = table.coverCharges;
        let leftCoverCharges = coverCharges + " ";
        if (coverCharges > 1) {
            leftCoverCharges += " COPERTI";
        } else {
            leftCoverCharges += " COPERTO";
        }
        let coverChargesPrice = coverCharges * evening.coverCharge;
        //let rightCoverCharges = OrdinationsUtils.formatPrice(coverChargesPrice);
        let total = OrdinationsUtils.total(allOrders) + coverChargesPrice;

        return <Row grow>
            <Column>
                <Row>
                    <Column>
                        <Label
                            style="large,center">Riepilogo {DiningTablesUtils.renderDiningTable(table, data.tables, data.waiters)}</Label>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <Row>
                            <Column>
                                <Label style="left">{leftCoverCharges} {/*rightCoverCharges*/""}</Label>
                            </Column>
                        </Row>
                        <Row grow>
                            <Column>
                                <ScrollView>
                                    {ordersComponents}
                                </ScrollView>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <Label
                                    style="right,large,red">TOTALE: {OrdinationsUtils.formatPrice(total)}</Label>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <RoundButton
                                    style="success"
                                    text="Nuova comanda"
                                    commitAction={() => DiningTablesEditorActions.beginOrdinationCreation()}/>
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

}