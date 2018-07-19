import asyncActionBuilder from '../../actions/RequestBuilder';
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {RETRIEVE_EVENING} from "../../stores/generic/EveningStore";

export const EveningEditorActions = {

    getSelectedEvening: () => asyncActionBuilder.get(
        RETRIEVE_EVENING,
        "evenings/selected"),

    deselectEvening: () => dispatcher.fireEnd(EveningEditingActionTypes.DESELECT),

};