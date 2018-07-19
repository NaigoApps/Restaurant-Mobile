import React from 'react';
import Row from "../../widgets/Row";
import {Button, FlatList, ScrollView} from "react-native";
import Column from "../../widgets/Column";
import {beautifyDate} from "../../components/widgets/inputs/DateInput";
import Label from "../../widgets/Label";
import TextStyles from "../../utils/TextStyles";
import DiningTablesUtils from "./tables/DiningTablesUtils";
import {DiningTablesCreatorActions} from "./diningTableEditing/DiningTablesCreatorActions";
import RoundButton from "../../widgets/RoundButton";
import ButtonStyles from "../../utils/ButtonStyles";
import {ApplicationActions} from "../../actions/ApplicationActions";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import {DiningTablesEditorActions} from "./diningTableEditing/DiningTablesEditorActions";
import DiningTablesList from "./DiningTablesList";

export default class EveningEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.data;
        let evening = data.evening;

        return <Row grow>
            <Column>
                <Row>
                    <Column>
                        <Label style="large">Serata {beautifyDate(evening.day)}</Label>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <Row>
                            <Column>
                                <Label>Elenco tavoli</Label>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <DiningTablesList data={data}/>
                            </Column>
                        </Row>
                    </Column>
                </Row>
                <RoundButton
                    commitAction={() => DiningTablesCreatorActions.beginDiningTable()}
                    style="success"
                    text="Nuovo tavolo"/>
            </Column>
        </Row>
    }

}