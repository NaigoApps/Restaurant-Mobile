import {STATUSES} from "../LazyData";
import GenericStore from "./GenericStore";
import applicationStore from "../ApplicationStore";

export const RETRIEVE_WAITERS = "RETRIEVE_WAITERS";

class WaitersStore extends GenericStore {

    constructor() {
        super(applicationStore, "waiters");
    }

    getActions(){
        return [RETRIEVE_WAITERS];
    }

    comparator(w1, w2){
        return w1.name.toLowerCase().localeCompare(w2.name.toLowerCase());
    }

    handleStartedAction(action){
        let changed = true;
        switch (action.type){
            case RETRIEVE_WAITERS:
                this.setStatus(STATUSES.LOADING);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case RETRIEVE_WAITERS:
                this.setData(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }
}

const waitersStore = new WaitersStore();
export default waitersStore;