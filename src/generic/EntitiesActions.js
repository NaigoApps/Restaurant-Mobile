import asyncActionBuilder from "../actions/RequestBuilder";
import {RETRIEVE_WAITERS} from "../stores/generic/WaitersStore";
import {RETRIEVE_ADDITIONS} from "../stores/generic/AdditionsStore";
import {RETRIEVE_CATEGORIES} from "../stores/generic/CategoriesStore";
import {RETRIEVE_DISHES} from "../stores/generic/DishesStore";
import {RETRIEVE_PHASES} from "../stores/generic/PhasesStore";
import {RETRIEVE_TABLES} from "../stores/generic/TablesStore";

class EntitiesActions {

    retrieveData() {
        asyncActionBuilder.get(RETRIEVE_WAITERS, 'waiters');
        asyncActionBuilder.get(RETRIEVE_ADDITIONS, 'additions');
        asyncActionBuilder.get(RETRIEVE_CATEGORIES, 'categories');
        asyncActionBuilder.get(RETRIEVE_DISHES, 'dishes/all');
        asyncActionBuilder.get(RETRIEVE_PHASES, 'phases');
        asyncActionBuilder.get(RETRIEVE_TABLES, 'restaurant-tables');
    }

}

const entitiesActions = new EntitiesActions();
export default entitiesActions;