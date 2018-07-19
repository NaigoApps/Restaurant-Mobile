import React from 'react';
import DiningTablesUtils from "./tables/DiningTablesUtils";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import {DiningTablesEditorActions} from "./diningTableEditing/DiningTablesEditorActions";

export default class DiningTablesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.data;
        let evening = data.evening;

        const waiters = data.waiters;
        const tables = data.tables;

        const diningTables = evening.diningTables
            .filter(dt => dt.status !== "CHIUSO");

        return <SelectInput
            cols={1}
            id={table => table.uuid}
            options={diningTables}
            renderer={table => DiningTablesUtils.renderDiningTable(table, tables, waiters)}
            colorRenderer={table => DiningTablesUtils.renderDiningTableColor(table)}
            onSelect={table => DiningTablesEditorActions.select(table)}
        />
    }

}