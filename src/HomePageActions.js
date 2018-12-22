import {SettingsPageActions} from "./pages/settings/SettingsPageActions";
import {ApplicationActions} from "./actions/ApplicationActions";

export class HomePageActions {
    static loadSettings() {
        return SettingsPageActions.loadSettings()
            .then(() => ApplicationActions.loadServerSettings());
    }
}