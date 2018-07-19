import {uuid} from "./Utils";

export class EntitiesUtils {
    static newDiningTable() {
        return {
            coverCharges: 0,
            waiter: null,
            table: null,
            ordinations: [],
            bills: [],
            openingTime: null,
            status: "APERTO"
        };
    }

    static newOrdination() {
        return {
            orders: []
        };
    }

    static newOrder(dish, phase) {
        return {
            uuid: uuid(),
            dish: dish.uuid,
            price: dish.price,
            phase: phase,
            notes: null,
            additions: []
        };
    }

    static duplicateOrder(order) {
        return {
            uuid: uuid(),
            dish: order.dish,
            price: order.price,
            phase: order.phase,
            additions: []
        }
    }

    static renderCustomer(customer) {
        if (customer) {
            return customer.get('surname') + " " + customer.get('name');
        }
        return "?";
    }
}