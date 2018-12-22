import React from 'react';
import {YellowBox} from 'react-native';
import SettingsPage from "./src/pages/settings/SettingsPage";
import DiningTablePage from "./src/pages/eveningEditing/diningTableEditing/DiningTablePage";
import HomePage from "./src/HomePage";
import ViewController from "./src/widgets/ViewController";
import applicationStore from "./src/stores/ApplicationStore";
import Pages from "./src/utils/Pages";
import errorsStore from "./src/stores/ErrorsStore";
import Row from "./src/widgets/Row";
import Column from "./src/widgets/Column";

YellowBox.ignoreWarnings(['Warning: ...']);
console.disableYellowBox = true;

export default class App extends ViewController {

    constructor(props) {
        super(props, applicationStore, errorsStore);
    }

    render() {
        let page = <HomePage/>;
        switch (this.state.general.currentPage) {
            case Pages.SETTINGS:
                page = <SettingsPage/>;
                break;
            case Pages.TABLE:
                page = <DiningTablePage/>;
                break;
        }
        return <Row grow>
            <Column>{page}</Column>
        </Row>
    }
}