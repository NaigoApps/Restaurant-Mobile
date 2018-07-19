import SubFeatureStore from "../../../stores/SubFeatureStore";
import {EditorStatus} from "../../StoresUtils";
import {EntitiesUtils} from "../../../utils/EntitiesUtils";
import {DiningTablesEditorActionTypes} from "./DiningTablesEditorActions";
import applicationStore from "../../../stores/ApplicationStore";

class DiningTableEditorStore extends SubFeatureStore {
    constructor() {
        super(applicationStore, "diningTableEditing");
        this.status = EditorStatus.SURFING;
        this.creatingOrdination = false;

        this.diningTable = null;
    }

    getState() {
        return {
            diningTable: this.diningTable,
            status: this.status,
            creatingOrdination: this.creatingOrdination
        }
    }

    getActions() {
        return Object.values(DiningTablesEditorActionTypes);
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case DiningTablesEditorActionTypes.BEGIN_ORDINATION_CREATION:
                this.creatingOrdination = true;
                break;
            case DiningTablesEditorActionTypes.CREATE_ORDINATION:
            case DiningTablesEditorActionTypes.ABORT_ORDINATION_CREATION:
                this.creatingOrdination = false;
                break;
            case DiningTablesEditorActionTypes.SELECT_DINING_TABLE:
                this.diningTable = action.body;
                this.status = EditorStatus.EDITING;
                break;
            case DiningTablesEditorActionTypes.DESELECT_DINING_TABLE:
            case DiningTablesEditorActionTypes.ABORT_DINING_TABLE_CREATION:
                this.creatingOrdination = false;
                this.diningTable = null;
                this.status = EditorStatus.SURFING;
                break;
            case DiningTablesEditorActionTypes.BEGIN_DINING_TABLE_CREATION:
                this.diningTable = EntitiesUtils.newDiningTable();
                this.status = EditorStatus.CREATING;
                break;
            case DiningTablesEditorActionTypes.CREATE_DINING_TABLE:
                this.diningTable = action.body.uuid;
                this.status = EditorStatus.EDITING;
                this.creatingOrdination = false;
                break;
            //CoverCharges
            case DiningTablesEditorActionTypes.CONFIRM_CREATOR_CCS:
                this.diningTable.coverCharges = action.body;
                break;
            //Waiter
            case DiningTablesEditorActionTypes.CONFIRM_CREATOR_WAITER:
                this.diningTable.waiter = action.body;
                break;
            //Table
            case DiningTablesEditorActionTypes.CONFIRM_CREATOR_TABLE:
                this.diningTable.table = action.body;
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }
}

const diningTableEditingStore = new DiningTableEditorStore();
export default diningTableEditingStore;