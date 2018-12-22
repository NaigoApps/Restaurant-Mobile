import {ApplicationActionTypes} from "../../actions/ApplicationActions";
import {AsyncStorage} from "react-native";
import Settings from "./Settings";
import dispatcher from "../../dispatcher/SimpleDispatcher";

export class SettingsPageActions {
    static loadSettings() {
        return new Promise((resolve, reject) => {
            let nKeys = Object.keys(Settings.KEYS).length;
            const result = {};
            Object.keys(Settings.KEYS).forEach(key => {
                AsyncStorage.getItem(Settings.KEYS[key])
                    .then(value => {
                        result[Settings.KEYS[key]] = value;
                        nKeys--;
                        if (nKeys === 0) {
                            dispatcher.fireEnd(ApplicationActionTypes.LOAD_SETTINGS, result);
                            resolve();
                        }
                    })
            });
        });
    }

    static storeSettings(setting) {
        AsyncStorage.setItem(setting.key, setting.value)
            .then(() => this.loadSettings());
    }
}