import React from 'react';
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import IconButton from "../../../widgets/IconButton";
import {ApplicationActions} from "../../../actions/ApplicationActions";
import Pages from "../../../utils/Pages";
import DiningTablesEditorActions from "./DiningTablesEditorActions";
import OrdinationsEditorActions from "./ordinationsEditing/OrdinationsEditorActions";
import {EntitiesUtils} from "../../../utils/EntitiesUtils";

export default class DiningTableNav extends React.Component {

    render() {
        return <Row style={{backgroundColor: "lightblue"}}>
            <Column auto>
                <IconButton icon="home" commitAction={() => {
                    ApplicationActions.goToPage(Pages.HOME);
                    DiningTablesEditorActions.deselect();
                }}/>
            </Column>
            <Column/>
            <Column auto>
                <IconButton icon="refresh" commitAction={() => DiningTablesEditorActions.refresh(this.props.table)}/>
            </Column>
            <Column auto>
                <IconButton color="success" icon="plus" commitAction={() => OrdinationsEditorActions.beginCreation(EntitiesUtils.newOrdination(this.props.table))}/>
            </Column>
        </Row>
    }
}