import AbstractStore from "./AbstractStore";
import ErrorActions from "./ErrorActions";
import EveningEditorActions from "../pages/eveningEditing/EveningEditorActions";

const EVT_ERRORS_STORE_CHANGED = "EVT_ERRORS_STORE_CHANGED";

class ErrorsStore extends AbstractStore {
    constructor() {
        super("error", EVT_ERRORS_STORE_CHANGED);
        this.lastMessage = null;
    }

    handleErrorAction(action) {
        if (action.type !== EveningEditorActions.GET_SELECTED) {
            this.lastMessage = action.body;
        }
        return true;
    }

    handleFailedAction(action) {
        this.lastMessage = "Errore di connessione";
        return true;
    }

    getActionsClass() {
        return ErrorActions;
    }

    getActionCompletedHandlers() {
        const handlers = {};

        handlers[ErrorActions.CLEAR_ERROR_MESSAGES] = () => this.clearMessages();

        return handlers;
    }

    buildState() {
        return {
            message: this.lastMessage
        }
    }

    clearMessages() {
        this.lastMessage = null;
    }
}

const errorsStore = new ErrorsStore();
export default errorsStore;