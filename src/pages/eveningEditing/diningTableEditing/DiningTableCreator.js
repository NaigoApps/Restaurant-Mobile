import React from 'react';
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import RoundButton from "../../../widgets/RoundButton";
import DiningTablesEditorActions from "./DiningTablesEditorActions";
import DiningTableStatus from "../../../model/DiningTableStatus";
import BaseEntity from "../../../model/BaseEntity";
import RenderingData from "../../../components/widgets/inputs/RenderingData";
import IntegerInput from "../../../components/widgets/inputs/IntegerInput";
import SelectEditor from "../../../components/widgets/inputs/SelectEditor";
import Dimensions from "../../../utils/Dimensions";
import Label from "../../../widgets/Label";

export default class DiningTableCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const settings = this.props.settings;
        const table = this.props.table;
        const waiters = this.props.waiters;
        const tables = this.props.tables;

        let coverChargesComponent = this.buildCoverChargesComponent(settings);

        return <Row grow>
            <Column>
                <Row grow>
                    <Column>
                        <Row>
                            <Column><Label style="bold,large">Nuovo tavolo</Label></Column>
                        </Row>
                        {coverChargesComponent}
                        <Row ofList>
                            <Column>
                                <SelectEditor
                                    options={{
                                        label: "Cameriere",
                                        values: waiters,
                                        renderer: w => w ? w.name : "",
                                        isValid: waiter => !!waiter,
                                        value: table.waiter,
                                        callback: waiter => DiningTablesEditorActions.setEditorWaiter(waiter)
                                    }}
                                />
                            </Column>
                        </Row>
                        <Row ofList>
                            <Column>
                                <SelectEditor
                                    options={{
                                        label: "Tavolo",
                                        cols: 2,
                                        values: tables,
                                        isValid: table => !!table,
                                        renderer: t => this.renderDiningTable(t),
                                        value: table.table,
                                        callback: rTable => DiningTablesEditorActions.setEditorTable(rTable)
                                    }}
                                />
                            </Column>
                        </Row>
                    </Column>
                </Row>
                <Row justify="center">
                    <Column mr={Dimensions.smallSpace}>
                        <RoundButton
                            text="Conferma"
                            style="success"
                            disabled={!this.isValid(settings)}
                            commitAction={() => DiningTablesEditorActions.doCreate(table)}
                        />
                    </Column>
                    <Column ml={Dimensions.smallSpace}>
                        <RoundButton
                            text="Annulla"
                            style="danger"
                            commitAction={() => DiningTablesEditorActions.abortCreation()}
                        />
                    </Column>
                </Row>
            </Column>
        </Row>
    }

    buildCoverChargesComponent(settings) {
        if (settings.coverCharges) {
            return <Row>
                <Column>
                    <IntegerInput
                        label="Coperti"
                        value={this.props.table.coverCharges}
                        commitAction={ccs => DiningTablesEditorActions.setEditorCoverCharges(ccs)}
                    />
                </Column>
            </Row>
        }
        return null;
    }

    isValid(settings) {
        const table = this.props.table;
        return table.waiter && table.table && (!settings.coverCharges || table.coverCharges > 0);
    }

    renderDiningTable(table) {
        let diningTables = this.props.evening.tables;
        let color = "secondary";
        diningTables.filter(dTable => BaseEntity.equals(dTable.table, table))
            .forEach(dTable => {
                if (dTable.status === DiningTableStatus.OPEN) {
                    color = "danger";
                }
                if (dTable.status === DiningTableStatus.CLOSING) {
                    color = "warning";
                }
            });
        return new RenderingData(table ? table.name : "", color);
    }
}