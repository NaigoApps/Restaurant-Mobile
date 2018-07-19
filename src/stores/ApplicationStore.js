import {ApplicationActionTypes} from "../actions/ApplicationActions";
import StoresUtils from "../pages/StoresUtils";
import RootFeatureStore from "./RootFeatureStore";
import {DiningTablesEditorActionTypes} from "../pages/eveningEditing/diningTableEditing/DiningTablesEditorActions";
import {OrdersActionTypes} from "../pages/eveningEditing/diningTableEditing/ordinationsEditing/ordersEditing/OrdersActions";
import UTSettings from "./UTSettings";

export const EVT_APPLICATION_STORE_CHANGED = "EVT_APPLICATION_STORE_CHANGED";

export const Screens = {
    TABLES_LIST: 0,
    TABLE_CREATION: 1,
    TABLE_REVIEW: 2,
    ORDINATION_CREATION: 3,
    ORDINATION_REVIEW: 4,
    ORDER_TYPE_EDITING: 5
};

class ApplicationStore extends RootFeatureStore {

    constructor() {
        super(EVT_APPLICATION_STORE_CHANGED);
        this.currentScreen = Screens.TABLES_LIST;
        this.integerInput = StoresUtils.resetIntInput();
        this.selectInput = {};
        this.textInput = StoresUtils.resetTextInput();
        this.settings = null;
        StoresUtils.resetSelectInput(this.selectInput);
    }

    getActions() {
        return Object.values(ApplicationActionTypes);
    }

    handleCompletedAction(action) {

        let changed = true;
        switch (action.type) {
            case ApplicationActionTypes.SHOW_TEXT_INPUT:
                this.textInput = StoresUtils.initTextInput(action.body);
                break;
            case ApplicationActionTypes.TEXT_INPUT_CHANGE:
                StoresUtils.textChange(this.textInput, action.body);
                break;
            case ApplicationActionTypes.HIDE_TEXT_INPUT:
                this.textInput = StoresUtils.resetTextInput();
                break;

            case ApplicationActionTypes.SHOW_INTEGER_INPUT:
                this.integerInput = StoresUtils.initIntInput(action.body);
                break;
            case ApplicationActionTypes.INTEGER_INPUT_CHAR:
                StoresUtils.intChar(this.integerInput, action.body);
                break;
            case ApplicationActionTypes.INTEGER_INPUT_CHANGE:
                StoresUtils.intChange(this.integerInput, action.body);
                break;
            case ApplicationActionTypes.HIDE_INTEGER_INPUT:
                this.integerInput = StoresUtils.resetIntInput();
                break;
            case ApplicationActionTypes.SHOW_SELECT_INPUT:
                this.selectInput = StoresUtils.initSelectInput(action.body);
                break;
            case ApplicationActionTypes.SELECT_INPUT_SELECT:
                this.selectInput = StoresUtils.selectInputSelect(this.selectInput, action.body);
                break;
            case ApplicationActionTypes.SELECT_INPUT_DESELECT:
                this.selectInput = StoresUtils.selectInputDeselect(this.selectInput, action.body);
                break;
            case ApplicationActionTypes.HIDE_SELECT_INPUT:
                StoresUtils.resetSelectInput(this.selectInput);
                break;

            case ApplicationActionTypes.LOAD_SETTINGS:
                this.settings = action.body || {};
                if (this.settings.clientSettings) {
                    this.settings.clientSettings = JSON.parse(this.settings.clientSettings);
                    UTSettings.user = this.settings.clientSettings.utUser;
                }
                break;

            //Screen change
            case DiningTablesEditorActionTypes.BEGIN_DINING_TABLE_CREATION:
                this.currentScreen = Screens.TABLE_CREATION;
                break;
            case DiningTablesEditorActionTypes.DESELECT_DINING_TABLE:
            case DiningTablesEditorActionTypes.ABORT_DINING_TABLE_CREATION:
                this.currentScreen = Screens.TABLES_LIST;
                break;
            case DiningTablesEditorActionTypes.SELECT_DINING_TABLE:
            case DiningTablesEditorActionTypes.CREATE_DINING_TABLE:
            case DiningTablesEditorActionTypes.ABORT_ORDINATION_CREATION:
            case DiningTablesEditorActionTypes.CREATE_ORDINATION:
                this.currentScreen = Screens.TABLE_REVIEW;
                break;
            case OrdersActionTypes.SHOW_EDITOR:
            case OrdersActionTypes.CONFIRM_DISH:
            case OrdersActionTypes.ABORT_DISH:
            case DiningTablesEditorActionTypes.BEGIN_ORDINATION_CREATION:
                this.currentScreen = Screens.ORDINATION_CREATION;
                break;
            case OrdersActionTypes.SHOW_REVIEW:
            case OrdersActionTypes.UPDATE_DISH:
                this.currentScreen = Screens.ORDINATION_REVIEW;
                break;
            case OrdersActionTypes.SELECT_GROUP:
            case OrdersActionTypes.EDIT_DISH:
                this.currentScreen = Screens.ORDER_TYPE_EDITING;
                break;

            default:
                changed = false;
                break;
        }

        return changed;
    }

    buildState() {
        return {
            currentScreen: this.currentScreen,
            textInput: this.textInput,
            integerInput: this.integerInput,
            selectInput: this.selectInput,
            settings: this.settings
        };
    }

}

const applicationStore = new ApplicationStore();
export default applicationStore;