import {STATUSES} from "../LazyData";
import GenericStore from "./GenericStore";
import applicationStore from "../ApplicationStore";

export const RETRIEVE_DISHES = "RETRIEVE_DISHES";

class DishesStore extends GenericStore {

    constructor() {
        super(applicationStore, "dishes");
    }

    getActions(){
        return [RETRIEVE_DISHES];
    }

    comparator(d1, d2){
        return d1.name.toLowerCase().localeCompare(d2.name.toLowerCase());
    }

    handleStartedAction(action) {
        let changed = true;
        switch (action.type) {
            case RETRIEVE_DISHES:
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
            case RETRIEVE_DISHES:
                this.setData(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }
}

const dishesStore = new DishesStore();
export default dishesStore;