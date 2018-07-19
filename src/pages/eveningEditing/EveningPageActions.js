import asyncActionBuilder from "../../actions/RequestBuilder";
import {ApplicationActions} from "../../actions/ApplicationActions";
import entitiesActions from "../../generic/EntitiesActions";
import {RETRIEVE_EVENING} from "../../stores/generic/EveningStore";

class EveningPageActions {

    initEveningPage(){
        this.retrieveSelectedEvening();

        entitiesActions.retrieveData();
        ApplicationActions.loadSettings();
    }

    retrieveSelectedEvening() {
        asyncActionBuilder.get(RETRIEVE_EVENING, 'evenings/selected');
    }
}

const eveningPageActions = new EveningPageActions();
export default eveningPageActions;