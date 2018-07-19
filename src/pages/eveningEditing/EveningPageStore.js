import SubFeatureStore from "../../stores/SubFeatureStore";
import applicationStore from "../../stores/ApplicationStore";

class EveningPageStore extends SubFeatureStore {

    constructor() {
        super(applicationStore, "eveningEditing");
        this.state = {};
    }

    getActions() {
        return [];
    }

    handleCompletedAction(action) {
        return false;
    }

    getState() {
        return {};
    }

}

const eveningPageStore = new EveningPageStore();
export default eveningPageStore;