import {STATUSES} from "../LazyData";
import GenericStore from "./GenericStore";
import applicationStore from "../ApplicationStore";

export const RETRIEVE_TABLES = "RETRIEVE_TABLES";

class TablesStore extends GenericStore {

    constructor() {
        super(applicationStore, "tables");
    }

    getActions(){
        return [RETRIEVE_TABLES];
    }

    comparator(t1, t2){
        return t1.name.toLowerCase().localeCompare(t2.name.toLowerCase());
    }

    handleStartedAction(action){
        let changed = true;
        switch (action.type){
            case RETRIEVE_TABLES:
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
            case RETRIEVE_TABLES:
                this.setData(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

}

const tablesStore = new TablesStore();
export default tablesStore;