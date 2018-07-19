import requestBuilder from "../../../actions/RequestBuilder";
import dispatcher from "../../../dispatcher/SimpleDispatcher";

export const DiningTablesEditorActionTypes = {
    BEGIN_DINING_TABLE_CREATION: "BEGIN_DINING_TABLE_CREATION",
    CREATE_DINING_TABLE: "CREATE_DINING_TABLE",
    ABORT_DINING_TABLE_CREATION: "ABORT_DINING_TABLE_CREATION",

    BEGIN_ORDINATION_CREATION: "BEGIN_ORDINATION_CREATION",
    ABORT_ORDINATION_CREATION: "ABORT_ORDINATION_CREATION",
    CREATE_ORDINATION: "CREATE_ORDINATION",

    SELECT_DINING_TABLE: "SELECT_DINING_TABLE",
    DESELECT_DINING_TABLE: "DESELECT_DINING_TABLE",

    CONFIRM_CREATOR_CCS: "CONFIRM_CREATOR_CCS",

    CONFIRM_CREATOR_WAITER: "CONFIRM_CREATOR_WAITER",

    CONFIRM_CREATOR_TABLE: "CONFIRM_CREATOR_TABLE",

};

export const DiningTablesEditorActions = {

    select: (table) => dispatcher.fireEnd(DiningTablesEditorActionTypes.SELECT_DINING_TABLE, table),
    deselect: () => dispatcher.fireEnd(DiningTablesEditorActionTypes.DESELECT_DINING_TABLE),

    beginOrdinationCreation: () => dispatcher.fireEnd(DiningTablesEditorActionTypes.BEGIN_ORDINATION_CREATION),

    abortOrdinationCreation: () => dispatcher.fireEnd(DiningTablesEditorActionTypes.ABORT_ORDINATION_CREATION),

    onConfirmOrders: (table, orders) => {
        let adjustedOrders = [];
        orders.forEach(group => {
            for (let i = 0; i < group.quantity; i++) {
                adjustedOrders.push({
                    dish: group.orderType.dish,
                    price: group.orderType.price,
                    phase: group.orderType.phase,
                    notes: group.orderType.notes,
                    additions: group.orderType.additions.slice()
                });
            }
        });
        requestBuilder.post(
            DiningTablesEditorActionTypes.CREATE_ORDINATION,
            'dining-tables/' + table + '/ordinations', adjustedOrders)
    },

};