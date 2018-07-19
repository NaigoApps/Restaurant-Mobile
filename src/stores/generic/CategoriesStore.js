import {STATUSES} from "../LazyData";
import GenericStore from "./GenericStore";
import applicationStore from "../ApplicationStore";

export const RETRIEVE_CATEGORIES = "RETRIEVE_CATEGORIES";

class CategoriesStore extends GenericStore {

    constructor() {
        super(applicationStore, "categories");
    }

    getActions(){
        return [RETRIEVE_CATEGORIES];
    }

    comparator(c1, c2){
        return c1.name.toLowerCase().localeCompare(c2.name.toLowerCase());
    }

    handleStartedAction(action) {
        let changed = true;
        switch (action.type) {
            case RETRIEVE_CATEGORIES:
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
            case RETRIEVE_CATEGORIES:
                this.setData(action.body);
                this.setStatus(STATUSES.LOADED);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

}

const categoriesStore = new CategoriesStore();
export default categoriesStore;