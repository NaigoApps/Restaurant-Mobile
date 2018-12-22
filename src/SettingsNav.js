import React from 'react';
import Column from "./widgets/Column";
import Row from "./widgets/Row";
import IconButton from "./widgets/IconButton";
import {ApplicationActions} from "./actions/ApplicationActions";
import Pages from "./utils/Pages";
import EveningEditorActions from "./pages/eveningEditing/EveningEditorActions";

export default class SettingsNav extends React.Component {

    render() {
        return <Row style={{backgroundColor: "lightblue"}}>
            <Column auto>
                <IconButton icon="home" commitAction={() => ApplicationActions.goToPage(Pages.HOME)}/>
            </Column>
            <Column/>
            <Column auto>
                <IconButton active icon="gear"/>
            </Column>
        </Row>
    }
}