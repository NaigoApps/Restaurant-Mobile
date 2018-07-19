import dispatcher from "../../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../../actions/RequestBuilder";
import {DiningTablesEditorActionTypes} from "./DiningTablesEditorActions";

export const DiningTablesCreatorActions = {

    beginDiningTable: () => dispatcher.fireEnd(DiningTablesEditorActionTypes.BEGIN_DINING_TABLE_CREATION),
    onConfirm: (table) => asyncActionBuilder.post(DiningTablesEditorActionTypes.CREATE_DINING_TABLE, 'evenings/tables', table),
    onAbort: () => dispatcher.fireEnd(DiningTablesEditorActionTypes.ABORT_DINING_TABLE_CREATION),

    confirmCoverCharges: (uuid, value) => dispatcher.fireEnd(DiningTablesEditorActionTypes.CONFIRM_CREATOR_CCS, value),
    confirmWaiter: (uuid, value) => dispatcher.fireEnd(DiningTablesEditorActionTypes.CONFIRM_CREATOR_WAITER, value),
    confirmTable: (uuid, value) => dispatcher.fireEnd(DiningTablesEditorActionTypes.CONFIRM_CREATOR_TABLE, value),
};