import {uuid} from "./Utils";
import DishStatus from "../model/DishStatus";
import {formatDate} from "../components/widgets/inputs/DateInput";

export const NEW_CUSTOMER_UUID = "new-customer-uuid";

export class EntitiesUtils {
    static nameComparator(e1, e2) {
        return e1.name.localeCompare(e2.name);
    }

    static defaultComparator(property, inverse){
        return (e1, e2) => {
            if (e1[property] < e2[property]) {
                return inverse ? +1 : -1;
            } else if (e1[property] > e2[property]) {
                return inverse ? -1 : +1;
            }
            return 0;
        }
    }

    static newDiningTable() {
        return {
            coverCharges: 0,
            waiter: null,
            table: null,
            ordinations: [],
            bills: [],
            openingTime: null,
            status: "APERTO"
        }
    }

    static newOrdination(table) {
        return {
            uuid: uuid(),
            table: table.uuid,
            orders: []
        };
    }

    static newBill(table) {
        return {
            uuid: uuid(),
            table: table.uuid,
            orders: [],
            total: 0,
            coverCharges: 0
        };
    }

    static newOrder(dish, price, phase, ordination, additions, notes) {
        return {
            uuid: uuid(),
            dish: dish.uuid,
            price: price,
            phase: phase.uuid ,
            additions: additions.map(addition => addition.uuid) || [],
            notes: notes,
            ordination: ordination.uuid
        };
    }

    static duplicateOrder(order) {
        return order.set('uuid', uuid());
    }

    static renderCustomer(customer) {
        if (customer) {
            return customer.surname + " " + customer.name;
        }
        return "?";
    }

    static renderEvening(evening){
        return "Serata " + formatDate(evening.day);
    }
}