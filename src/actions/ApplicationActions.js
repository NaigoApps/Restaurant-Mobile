import dispatcher from "../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "./RequestBuilder";

export const ApplicationActionTypes = {
    RETRIEVE_RESTAURANT_TABLES: "RETRIEVE_RESTAURANT_TABLES",
    RETRIEVE_WAITERS: "RETRIEVE_WAITERS",
    RETRIEVE_ADDITIONS: "RETRIEVE_ADDITIONS",
    RETRIEVE_CATEGORIES: "RETRIEVE_CATEGORIES",
    RETRIEVE_DISHES: "RETRIEVE_DISHES",
    RETRIEVE_PHASES: "RETRIEVE_PHASES",

//FailedStore
    REMOVE_FAILED_ACTION: "REMOVE_FAILED_ACTION",
    CLEAR_ERROR_MESSAGES: "CLEAR_ERROR_MESSAGES",

    LOAD_SETTINGS: "LOAD_SETTINGS",

    SHOW_TEXT_INPUT: "SHOW_TEXT_INPUT",
    TEXT_INPUT_CHANGE: "TEXT_INPUT_CHANGE",
    HIDE_TEXT_INPUT: "HIDE_TEXT_INPUT",

    SHOW_INTEGER_INPUT: "SHOW_INTEGER_INPUT",
    INTEGER_INPUT_CHAR: "INTEGER_INPUT_CHAR",
    INTEGER_INPUT_CHANGE: "INTEGER_INPUT_CHANGE",
    HIDE_INTEGER_INPUT: "HIDE_INTEGER_INPUT",

    SHOW_SELECT_INPUT: "SHOW_SELECT_INPUT",
    SELECT_INPUT_SELECT: "SELECT_INPUT_SELECT",
    SELECT_INPUT_DESELECT: "SELECT_INPUT_DESELECT",
    HIDE_SELECT_INPUT: "HIDE_SELECT_INPUT"
};

export const ApplicationActions = {

    loadSettings: () =>
        asyncActionBuilder.get(
            ApplicationActionTypes.LOAD_SETTINGS,
            "settings"
        ),

    showTextInput: (options) => dispatcher.fireEnd(ApplicationActionTypes.SHOW_TEXT_INPUT, options),
    hideTextInput: () => dispatcher.fireEnd(ApplicationActionTypes.HIDE_TEXT_INPUT),
    textInputChange: (char) => dispatcher.fireEnd(ApplicationActionTypes.TEXT_INPUT_CHANGE, char),

    showIntegerInput: (options) => dispatcher.fireEnd(ApplicationActionTypes.SHOW_INTEGER_INPUT, options),
    hideIntegerInput: () => dispatcher.fireEnd(ApplicationActionTypes.HIDE_INTEGER_INPUT),
    integerInputChar: (char) => dispatcher.fireEnd(ApplicationActionTypes.INTEGER_INPUT_CHAR, char),
    integerInputChange: (text) => dispatcher.fireEnd(ApplicationActionTypes.INTEGER_INPUT_CHANGE, text),

    showSelectInput: (options) => dispatcher.fireEnd(ApplicationActionTypes.SHOW_SELECT_INPUT, options),
    hideSelectInput: () => dispatcher.fireEnd(ApplicationActionTypes.HIDE_SELECT_INPUT),
    selectInputSelect: (value) => dispatcher.fireEnd(ApplicationActionTypes.SELECT_INPUT_SELECT, value),
    selectInputDeselect: (value) => dispatcher.fireEnd(ApplicationActionTypes.SELECT_INPUT_DESELECT, value),
};