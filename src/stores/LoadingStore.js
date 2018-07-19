import SubFeatureStore from "./SubFeatureStore";
import applicationStore from "./ApplicationStore";
import RootFeatureStore from "./RootFeatureStore";

class LoadingStore extends SubFeatureStore {
    constructor() {
        super(applicationStore, "loading");
        this.inProgress = [];
    }

    getActions(){
        return RootFeatureStore.ALL_ACTIONS;
    }

    getState(){
        return {
            busy: this.isBusy()
        }
    }

    handleStartedAction(action) {
        this.inProgress.push(action.type);
        return true;
    }

    handleCompletedAction(action) {
        return this.removeAction(action);
    }

    handleErrorAction(action) {
        return this.removeAction(action);
    }

    handleFailedAction(action) {
        return this.removeAction(action);
    }

    removeAction(action){
        let index = this.inProgress.findIndex(t => t === action.type);
        if(index !== -1) {
            this.inProgress.splice(index , 1);
            return true;
        }
        return false;
    }

    isBusy(){
        return this.inProgress.length > 0;
    }
}

const loadingStore = new LoadingStore();
export default loadingStore;