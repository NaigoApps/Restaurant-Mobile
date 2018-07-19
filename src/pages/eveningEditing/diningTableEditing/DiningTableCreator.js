import React from 'react';
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import {DiningTablesCreatorActions} from "./DiningTablesCreatorActions";
import IntegerEditor from "../../../components/widgets/inputs/IntegerEditor";
import SelectEditor from "../../../components/widgets/inputs/SelectEditor";
import {BackHandler} from "react-native";
import OkCancelView from "../../../widgets/OkCancelView";

export default class DiningTableCreator extends React.Component {
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
        setImmediate(() => DiningTablesCreatorActions.onAbort());
        return true;
    }

    render() {
        const data = this.props.data;
        const dTable = data.diningTableEditing.diningTable;

        const waiters = this.props.data.waiters;
        const waiter = dTable.waiter;

        const tables = this.props.data.tables;
        const table = dTable.table;

        return <OkCancelView
            valid={dTable.waiter && dTable.table && dTable.coverCharges > 0}
            onAbort={() => DiningTablesCreatorActions.onAbort()}
            onConfirm={() => DiningTablesCreatorActions.onConfirm(dTable)}>
            <Row>
                <Column>
                    <IntegerEditor
                        options={{
                            label: "Coperti",
                            value: dTable.coverCharges,
                            callback: result => DiningTablesCreatorActions.confirmCoverCharges(null, result)
                        }}
                    />
                </Column>
            </Row>
            <Row ofList>
                <Column>
                    <SelectEditor
                        options={{
                            cols: 2,
                            label: "Cameriere",
                            values: waiters,
                            renderer: w => w ? w.name : "?",
                            value: waiter,
                            callback: result => DiningTablesCreatorActions.confirmWaiter(null, result)
                        }}
                    />
                </Column>
            </Row>
            <Row ofList>
                <Column>
                    <SelectEditor
                        options={{
                            cols: 3,
                            label: "Tavolo",
                            values: tables,
                            renderer: t => t ? t.name : "?",
                            colorRenderer: t => this.renderDiningTableColor(t),
                            value: table,
                            callback: result => DiningTablesCreatorActions.confirmTable(null, result)
                        }}
                    />
                </Column>
            </Row>
        </OkCancelView>
    }

    renderDiningTableColor(table) {

        let diningTables = this.props.data.evening.diningTables;
        let color = "secondary";
        diningTables.filter(dTable => dTable.table === table.uuid)
            .forEach(dTable => {
                if (dTable.status === "APERTO") {
                    color = "danger";
                }
                if (dTable.status === "IN CHIUSURA") {
                    color = "warning";
                }
            });
        return color;
    }

}