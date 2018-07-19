import {STATUSES} from "../LazyData";
import GenericStore from "./GenericStore";
import {findIndexByUuid} from "../../utils/Utils";
import {EveningEditingActionTypes} from "../../pages/eveningEditing/EveningEditorActions";
import {DiningTablesEditorActionTypes} from "../../pages/eveningEditing/diningTableEditing/DiningTablesEditorActions";
import applicationStore from "../ApplicationStore";
import OrdinationsUtils from "../../pages/eveningEditing/OrdinationsUtils";

export const RETRIEVE_EVENING = "RETRIEVE_EVENING";

class EveningStore extends GenericStore {
    constructor() {
        super(applicationStore, "evening", true, true);
    }

    getActions() {
        return [RETRIEVE_EVENING];
    }

    handleStartedAction(action) {
        let changed = true;
        switch (action.type) {
            case RETRIEVE_EVENING:
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
            case RETRIEVE_EVENING:
                let evening = action.body;
                evening.diningTables.forEach(table => {
                    let ordinations = [];
                    table.ordinations.forEach(ordination => ordinations.push(this.adjustOrdination(ordination)));
                    table.ordinations = ordinations;
                });
                this.setData([evening]);
                this.sortTables();
                break;
            case DiningTablesEditorActionTypes.CREATE_DINING_TABLE: {
                let evening = this.getSingleData();
                evening.diningTables.push(action.body);
                this.sortTables();
                break;
            }
            case DiningTablesEditorActionTypes.CREATE_ORDINATION: {
                let evening = this.getSingleData();
                let diningTableIndex = findIndexByUuid(evening.diningTables, action.body.table);
                if (diningTableIndex !== -1) {
                    let diningTable = evening.diningTables[diningTableIndex];
                    diningTable.ordinations.push(this.adjustOrdination(action.body));
                    this.sortTables();
                }
                break;
            }
            default:
                changed = false;
                break;
        }
        return changed;
    }

    sortTables() {
        this.getSingleData().diningTables
            .sort((t1, t2) => -t1.openingTime.localeCompare(t2.openingTime));
    }

    adjustOrdination(ordination) {
        let orders = [];
        ordination.orders.forEach(order => {
            let done = false;
            orders.forEach(o => {
                if (OrdinationsUtils.sameOrder(o.orderType, order)) {
                    o.quantity++;
                    done = true;
                }
            });
            if (!done) {
                orders.push({
                    orderType: order,
                    quantity: 1
                });
            }
        });
        let result = Object.assign({}, ordination);
        result.orders = orders;
        return result;
    }
}

const eveningStore = new EveningStore();
export default eveningStore;