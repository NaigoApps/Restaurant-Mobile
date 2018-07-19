import dispatcher from "../../../../../dispatcher/SimpleDispatcher";

export const OrdersActionTypes = {
    SELECT_CATEGORY : "SELECT_CATEGORY",
    SELECT_DISH: "SELECT_DISH",
    SHOW_REVIEW: "SHOW_REVIEW",
    SHOW_EDITOR: "SHOW_EDITOR",
    EDIT_DISH: "EDIT_DISH",
    CONFIRM_DISH: "CONFIRM_DISH",
    UPDATE_DISH: "UPDATE_DISH",
    ABORT_DISH: "ABORT_DISH",
    SELECT_PHASE: "SELECT_PHASE",
    QUANTITY_CONFIRM: "QUANTITY_CONFIRM",
    SELECT_GROUP: "SELECT_GROUP",
    TOGGLE_ADDITION: "TOGGLE_ADDITION",
    SET_FREE_ADDITION: "SET_FREE_ADDITION",
    SET_PRICE: "SET_PRICE",
    SET_QUANTITY: "SET_QUANTITY",
    ORDER_PHASE: "ORDER_PHASE",
};

export const OrdersActions = {
    selectCategory: (cat) => dispatcher.fireEnd(OrdersActionTypes.SELECT_CATEGORY, cat),

    showReview: () => dispatcher.fireEnd(OrdersActionTypes.SHOW_REVIEW),
    showEditor: () => dispatcher.fireEnd(OrdersActionTypes.SHOW_EDITOR),

    editDish: (dish) => dispatcher.fireEnd(OrdersActionTypes.EDIT_DISH, dish),
    confirmDish: () => dispatcher.fireEnd(OrdersActionTypes.CONFIRM_DISH),
    updateDish: () => dispatcher.fireEnd(OrdersActionTypes.UPDATE_DISH),
    abortDish: () => dispatcher.fireEnd(OrdersActionTypes.ABORT_DISH),

    selectDish: (dish) => dispatcher.fireEnd(OrdersActionTypes.SELECT_DISH, dish),

    selectPhase: (phase) => dispatcher.fireEnd(OrdersActionTypes.SELECT_PHASE, phase),

    quantityConfirm: (value) => dispatcher.fireEnd(OrdersActionTypes.QUANTITY_CONFIRM, value),

    selectGroup: (grp) => dispatcher.fireEnd(OrdersActionTypes.SELECT_GROUP, grp),

    toggleAddition: (addition) => dispatcher.fireEnd(OrdersActionTypes.TOGGLE_ADDITION, addition),

    setFreeAddition: text => dispatcher.fireEnd(OrdersActionTypes.SET_FREE_ADDITION, text),
    setPrice: value => dispatcher.fireEnd(OrdersActionTypes.SET_PRICE, value),
    setQuantity: value => dispatcher.fireEnd(OrdersActionTypes.SET_QUANTITY, value),
    editOrderPhase: phase => dispatcher.fireEnd(OrdersActionTypes.ORDER_PHASE, phase),
};