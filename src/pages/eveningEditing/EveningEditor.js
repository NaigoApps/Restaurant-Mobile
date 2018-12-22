import React from 'react';
import {beautifyDate, formatDate} from "../../components/widgets/inputs/DateInput";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import Label from "../../widgets/Label";
import DiningTablesList from "./DiningTablesList";
import ViewController from "../../widgets/ViewController";
import diningTableEditingStore from "./diningTableEditing/DiningTableEditorStore";
import CRUDStatus from "../../utils/CRUDStatus";
import DiningTableCreator from "./diningTableEditing/DiningTableCreator";
import applicationStore from "../../stores/ApplicationStore";
import dataStore from "../../stores/DataStore";

export default class EveningEditor extends ViewController {

    constructor(props) {
        super(props, diningTableEditingStore, applicationStore, dataStore);
    }

    render() {
        const evening = this.props.evening;

        return <Row grow>
            <Column>
                <Row>
                    <Column>
                        <Label style="large">Serata {beautifyDate(formatDate(evening.day))}</Label>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <Row grow>
                            <Column>
                                {this.buildEditorContent()}
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </Column>
        </Row>
    }

    buildEditorContent() {
        const tablesData = this.state.diningTableEditing;

        if (tablesData.crudStatus === CRUDStatus.CREATE) {
            return <DiningTableCreator
                evening={this.state.data.evening}
                settings={this.state.general.serverSettings}
                tables={this.state.data.tables}
                waiters={this.state.data.waiters}
                table={tablesData.currentTable}/>;
        }

        return <Row grow>
            <Column>
                <DiningTablesList tables={this.props.evening.tables}/>
            </Column>
        </Row>
    }
}
