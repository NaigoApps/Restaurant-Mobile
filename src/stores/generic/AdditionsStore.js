import {STATUSES} from "../LazyData";
import GenericStore from "./GenericStore";
import applicationStore from "../ApplicationStore";

export const RETRIEVE_ADDITIONS = "RETRIEVE_ADDITIONS";

class AdditionsStore extends GenericStore {
    constructor() {
        super(applicationStore, "additions");
    }

    getActions(){
        return [RETRIEVE_ADDITIONS];
    }

    comparator(a1, a2){
        return a1.name.toLowerCase().trim().localeCompare(a2.name.toLowerCase().trim());
    }

    handleStartedAction(action) {
        let changed = true;
        switch (action.type) {
            case RETRIEVE_ADDITIONS:
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
            case RETRIEVE_ADDITIONS:
                this.setData(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

}


const additionsStore = new AdditionsStore();
export default additionsStore;