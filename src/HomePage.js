import {Immersive} from 'react-native-immersive';
import React from 'react';
import Label from "./widgets/Label";
import Column from "./widgets/Column";
import applicationStore from "./stores/ApplicationStore";
import EveningEditor from "./pages/eveningEditing/EveningEditor";
import ViewController from "./widgets/ViewController";
import EveningEditorActions from "./pages/eveningEditing/EveningEditorActions";
import Row from "./widgets/Row";
import errorsStore from "./stores/ErrorsStore";
import Pages from "./utils/Pages";
import dataStore from "./stores/DataStore";
import Page from "./pages/Page";
import {HomePageActions} from "./HomePageActions";
import AppNav from "./AppNav";

export default class HomePage extends ViewController {

    constructor(props) {
        super(props, applicationStore, errorsStore, dataStore);
    }

    componentDidMount() {
        super.componentDidMount();
        Immersive.addImmersiveListener(() => Immersive.on());
        Immersive.on();
        HomePageActions.loadSettings()
            .then(() => EveningEditorActions.getSelectedEvening());
    }

    render() {
        return (
            <Page nav={<AppNav/>}>
                {this.buildContent()}
            </Page>
        );
    }

    buildContent() {
        const data = this.state.data;
        if (data) {
            const evening = data.evening;
            if (evening) {
                return <EveningEditor evening={evening}/>;
            }
            return <Row grow>
                <Column>
                    <Label>Serata non selezionata</Label>
                </Column>
            </Row>
        }
        return <Row grow>
            <Column>
                <Label>Caricamento in corso</Label>
            </Column>
        </Row>;
    }
}