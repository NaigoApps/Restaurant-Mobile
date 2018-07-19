import {STATUSES} from "../LazyData";
import GenericStore from "./GenericStore";
import {numberCompare} from "../../utils/Utils";
import applicationStore from "../ApplicationStore";

export const RETRIEVE_PHASES = "RETRIEVE_PHASES";

class PhasesStore extends GenericStore {
    constructor() {
        super(applicationStore, "phases");
    }

    getActions(){
        return [RETRIEVE_PHASES];
    }

    comparator(p1, p2){
        return numberCompare(p1, p2);
    }

    handleStartedAction(action){
        let changed = true;
        switch (action.type){
            case RETRIEVE_PHASES:
                this.setStatus(STATUSES.LOADING);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    handleCompletedAction(action){
        let changed = true;
        switch (action.type){
            case RETRIEVE_PHASES:
                this.setData(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

}

const phasesStore = new PhasesStore();
export default phasesStore;