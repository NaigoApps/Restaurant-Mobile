import {OrdersActionTypes} from "./OrdersActions";
import SubFeatureStore from "../../../../../stores/SubFeatureStore";
import phasesStore from "../../../../../stores/generic/PhasesStore";
import {EntitiesUtils} from "../../../../../utils/EntitiesUtils";
import {findByUuid} from "../../../../../utils/Utils";
import dishesStore from "../../../../../stores/generic/DishesStore";
import {DiningTablesEditorActionTypes} from "../../DiningTablesEditorActions";
import applicationStore from "../../../../../stores/ApplicationStore";
import additionsStore from "../../../../../stores/generic/AdditionsStore";
import OrdinationsUtils from "../../../OrdinationsUtils";

export const OrdersWizardPages = {
    DISHES_PAGE: 0,
};

class OrdersEditingStore extends SubFeatureStore {
    constructor() {
        super(applicationStore, "ordersEditing");
        this.creating = true;
        this.orders = null;

        this.selectedCategory = null;
        this.selectedPhase = null;
        this.quantity = 1;

        this.orderType = null;
        this.backupOrderType = null;

    }

    getState() {
        return {
            creating: this.creating,
            orders: this.orders,
            selectedCategory: this.selectedCategory,
            selectedPhase: this.selectedPhase,

            orderType: this.orderType,

            quantity: this.quantity
        }
    }

    getActions() {
        return Object.values(OrdersActionTypes).concat([
            DiningTablesEditorActionTypes.BEGIN_ORDINATION_CREATION]);
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case DiningTablesEditorActionTypes.BEGIN_ORDINATION_CREATION:
                this.orders = [];
                this.initOrdersEditor();
                this.creating = true;
                break;
            case OrdersActionTypes.SELECT_CATEGORY:
                this.selectedCategory = action.body;
                this.dishPage = 0;
                break;
            case OrdersActionTypes.SELECT_DISH:
                let dish = findByUuid(dishesStore.getData(), action.body);
                this.orderType = EntitiesUtils.newOrder(dish, this.selectedPhase);
                this.confirmDish();
                break;
            case OrdersActionTypes.EDIT_DISH: {
                let dish = findByUuid(dishesStore.getData(), action.body);
                this.orderType = EntitiesUtils.newOrder(dish, this.selectedPhase);
                this.quantity = 1;
                break;
            }
            case OrdersActionTypes.CONFIRM_DISH: {
                this.confirmDish();
                break;
            }
            case OrdersActionTypes.SELECT_GROUP:
                this.creating = false;
                this.backupOrderType = this.copyOrderType(action.body.orderType);
                this.orderType = this.copyOrderType(action.body.orderType);
                this.quantity = action.body.quantity;
                this.selectedPhase = action.body.orderType.phase;
                break;
            case OrdersActionTypes.UPDATE_DISH: {
                this.confirmDish();
                this.backupOrderType = null;
                this.creating = true;
                break;
            }
            case OrdersActionTypes.ABORT_DISH:
                this.orderType = null;
                this.backupOrderType = null;
                this.quantity = 1;
                this.creating = true;
                break;
            case OrdersActionTypes.SELECT_PHASE:
                this.selectedPhase = action.body;
                if (this.orderType) {
                    this.orderType.phase = this.selectedPhase;
                }
                break;
            case OrdersActionTypes.QUANTITY_CONFIRM:
                this.quantity = action.body;
                break;
            case OrdersActionTypes.TOGGLE_ADDITION:
                this.toggleAddition(action.body);
                break;
            case OrdersActionTypes.SET_FREE_ADDITION:
                this.setFreeAddition(action.body);
                break;
            case OrdersActionTypes.SET_PRICE:
                this.setPrice(action.body);
                break;
            case OrdersActionTypes.SET_QUANTITY:
                this.setQuantity(action.body);
                break;
            case OrdersActionTypes.ORDER_PHASE:
                this.editOrderPhase(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    copyOrderType(ot) {
        return {
            dish: ot.dish,
            price: ot.price,
            phase: ot.phase,
            notes: ot.notes,
            additions: ot.additions.slice()
        };
    }

    initOrdersEditor() {
        this.selectedCategory = null;
        this.selectedPhase = phasesStore.getData()[0].uuid;
        this.quantity = 1;
    }

    theChosenOne(grp) {
        return grp.orders[i].uuid;
    }

    confirmDish() {
        let done = false;

        //If updating need to remove old orderType
        if (!this.creating) {
            const index = this.orders.findIndex(order => OrdinationsUtils.sameOrder(order.orderType, this.backupOrderType));
            if (index !== -1) {
                this.orders.splice(index, 1);
            }
        }

        //Look for new orderType
        this.orders.forEach(order => {
            if (OrdinationsUtils.sameOrder(order.orderType, this.orderType)) {
                order.quantity += this.quantity;
                done = true;
            }
        });
        if (!done && this.quantity > 0) {
            this.orders.push({
                orderType: this.orderType,
                quantity: this.quantity
            });
        }

        this.orderType = null;
        this.quantity = 1;
    }

    addOrder(dishUuid) {
        const phase = this.selectedPhase;

        let orders = [];
        for (let i = 0; i < this.quantity; i++) {
            let dish = findByUuid(dishesStore.getData(), dishUuid);
            let newOrder = EntitiesUtils.newOrder(dish, phase);
            orders.push(newOrder);
        }
        this.orders = this.orders.concat(orders);
    }

    toggleAddition(additionUuid) {
        const addition = findByUuid(additionsStore.getData(), additionUuid);
        let additionIndex = this.orderType.additions.indexOf(additionUuid);
        if (additionIndex !== -1) {
            this.orderType.additions.splice(additionIndex, 1);
            this.orderType.price -= addition.price;
        } else {
            this.orderType.additions.push(additionUuid);
            this.orderType.price += addition.price;
        }
    }

    setFreeAddition(text) {
        this.orderType.notes = text;
    }

    setQuantity(value) {
        this.quantity = value;
    }

}

const ordersEditingStore = new OrdersEditingStore();
export default ordersEditingStore;