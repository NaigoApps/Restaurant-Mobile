import asyncActionBuilder from '../../actions/RequestBuilder';
import dispatcher from "../../dispatcher/SimpleDispatcher";
import eveningPageActions from "./EveningPageActions";

export default class EveningEditorActions {

    static GET_SELECTED = "GET_SELECTED";

    static SELECT_DINING_TABLE = "SELECT_DINING_TABLE";
    static SELECT_DINING_TABLE_PAGE = "SELECT_DINING_TABLE_PAGE";

    static SHOW_EVENING_REVIEW = "SHOW_EVENING_REVIEW";

    static getSelectedEvening() {
        asyncActionBuilder.get(
            this.GET_SELECTED,
            "evenings/selected")
            .then(() => {
                eveningPageActions.initEveningPage();
            });
    }

    static selectPage(page) {
        dispatcher.fireEnd(this.SELECT_DINING_TABLE_PAGE, page);
    }

    static selectDiningTable(table) {
        dispatcher.fireEnd(this.SELECT_DINING_TABLE, table);
    }

    static showReview() {
        dispatcher.fireEnd(this.SHOW_EVENING_REVIEW);
    }

}