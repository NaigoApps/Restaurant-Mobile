import React from 'react';
import applicationStore from "../../stores/ApplicationStore";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import dataStore from "../../stores/DataStore";
import ViewController from "../../widgets/ViewController";
import {SettingsPageActions} from "./SettingsPageActions";
import {FlatList} from "react-native";
import Settings from "./Settings";
import Page from "../Page";
import SettingsNav from "../../SettingsNav";
import TextEditor from "../../components/widgets/inputs/TextEditor";

export default class SettingsPage extends ViewController {

    constructor(props) {
        super(props, applicationStore, dataStore);
    }

    componentDidMount() {
        super.componentDidMount();
        SettingsPageActions.loadSettings();
    }

    render() {
        let pageContent = this.makePageContent();
        return <Page nav={<SettingsNav/>}>
            {pageContent}
        </Page>;
    }

    makePageContent() {
        const settingsData = this.createSettingsArray();

        return <FlatList
            data={settingsData}
            renderItem={({item}) => this.renderSetting(item)}
        />
    }

    createSettingsArray() {
        const settings = this.state.general.settings;
        const result = [];
        result.push({
            name: "Indirizzo del server",
            key: Settings.KEYS.SERVER_IP,
            value: settings[Settings.KEYS.SERVER_IP]
        });
        result.push({
            name: "Porta del server",
            key: Settings.KEYS.SERVER_PORT,
            value: settings[Settings.KEYS.SERVER_PORT]
        });
        return result;
    }

    renderSetting(setting) {
        return <Row>
            <Column>
                <TextEditor
                    label={setting.name}
                    value={setting.value}
                    commitAction={newValue => SettingsPageActions.storeSettings({key: setting.key, value: newValue})}/>
            </Column>
        </Row>
    }
}