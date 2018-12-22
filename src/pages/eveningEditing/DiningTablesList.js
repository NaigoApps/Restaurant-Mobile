import React from "react";
import DiningTablesUtils from "./tables/DiningTablesUtils";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import {FlatList} from "react-native";
import RoundButton from "../../widgets/RoundButton";
import DiningTablesEditorActions from "./diningTableEditing/DiningTablesEditorActions";
import {DataActions} from "../../actions/DataActions";
import Dimensions from "../../utils/Dimensions";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import DiningTableStatus from "../../model/DiningTableStatus";
import Label from "../../widgets/Label";
import {ApplicationActions} from "../../actions/ApplicationActions";
import Pages from "../../utils/Pages";
import SelectInput from "../../components/widgets/inputs/SelectInput";

export default class DiningTablesList extends React.Component {

    render() {
        const tables = this.props.tables
            .filter(table => table.status !== DiningTableStatus.CLOSED)
            .sort(EntitiesUtils.defaultComparator("openingTime", true));
        return <Row grow>
            <Column>
                <Row>
                    <Column>
                        <Label style="bold,large">Elenco tavoli</Label>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <SelectInput
                            cols={1}
                            options={tables}
                            onRefresh={() => DataActions.loadDiningTables()}
                            renderer={(table) => DiningTablesUtils.renderDiningTable(table)}
                            onSelect={(table) => {
                                DiningTablesEditorActions.select(table);
                                ApplicationActions.goToPage(Pages.TABLE);
                            }}
                        />
                    </Column>
                </Row>
                <Row ofList0>
                    <Column>
                        <RoundButton
                            commitAction={() => DiningTablesEditorActions.beginCreation()}
                            style="success"
                            text="Nuovo tavolo"/>
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    static renderTable(table) {
        const rendered = DiningTablesUtils.renderDiningTable(table);
        return <Row mt={Dimensions.smallSpace} mb={Dimensions.smallSpace}>
            <Column>
                <RoundButton
                    commitAction={() => {
                        DiningTablesEditorActions.select(table);
                        ApplicationActions.goToPage(Pages.TABLE);
                    }}
                    text={rendered.text}
                    style={rendered.backgroundColor}/>
            </Column>
        </Row>
    }


}