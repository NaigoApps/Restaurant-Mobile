import {ApplicationActionTypes} from "../actions/ApplicationActions";
import {DataActionTypes} from "../actions/DataActions";
import AbstractStore from "./AbstractStore";
import loadingStore from "./LoadingStore";
import errorsStore from "./ErrorsStore";
import asyncActionBuilder from "../actions/RequestBuilder";
import StoresUtils from "../pages/StoresUtils";

export const EVT_APPLICATION_STORE_CHANGED = "EVT_APPLICATION_STORE_CHANGED";

class ApplicationStore extends AbstractStore {

    constructor() {
        super("general", EVT_APPLICATION_STORE_CHANGED, loadingStore, errorsStore);
        this.isFullScreen = false;
        this.currentPage = null;
        this.selectInput = {};
        this.settings = {};
        this.serverSettings = {};
        this.mainPrinter = null;
        this.fiscalPrinter = null;
    }

    getActionsClass() {
        return ApplicationActionTypes;
    }

    getActionCompletedHandlers() {
        const handlers = {};

        handlers[ApplicationActionTypes.GO_TO_PAGE] = (page) => this.currentPage = page;

        handlers[ApplicationActionTypes.SHOW_SELECT_INPUT] = (options) => this.selectInput = StoresUtils.initSelectInput(options);
        handlers[ApplicationActionTypes.SELECT_INPUT_SELECT] = (value) => StoresUtils.selectInputSelect(this.selectInput, value);
        handlers[ApplicationActionTypes.SELECT_INPUT_DESELECT] = (value) => StoresUtils.selectInputDeselect(this.selectInput, value);
        handlers[ApplicationActionTypes.SELECT_INPUT_PAGE_CHANGE] = (page) => StoresUtils.selectPageChange(this.selectInput, page);
        handlers[ApplicationActionTypes.HIDE_SELECT_INPUT] = () => StoresUtils.resetSelectInput(this.selectInput);

        handlers[ApplicationActionTypes.LOAD_SETTINGS] = (settings) => this.storeSettings(settings);
        handlers[ApplicationActionTypes.LOAD_SERVER_SETTINGS] = (settings) => this.storeServerSettings(settings);

        handlers[DataActionTypes.LOAD_PRINTERS] = () => {};

        return handlers;
    }

    storeSettings(settings) {
        this.settings = settings || {};
        asyncActionBuilder.setSettings(this.settings);
    }

    storeServerSettings(settings){
        this.serverSettings = settings || {};
    }

    buildState() {
        return {
            fullScreen: this.isFullScreen,

            currentPage: this.currentPage,

            selectInput: this.selectInput,

            settings: this.settings,
            serverSettings: this.serverSettings
        };
    }

}

const applicationStore = new ApplicationStore();
export default applicationStore;