import {findByUuid, iGet, stringEquals, uuid} from "../../../utils/Utils";
import {beautifyTime} from "../../../components/widgets/inputs/DateInput";
import OrdinationsUtils from "../OrdinationsUtils";

export default class DiningTablesUtils {

    static sameOrder(o1, o2) {
        if (!o1 || !o2) {
            return false;
        }
        if (o1.dish !== o2.dish) {
            return false;
        }
        if (!stringEquals(o1.notes, o2.notes)) {
            return false;
        }
        if (o1.price !== o2.price) {
            return false;
        }
        let ok = true;
        ok &= o1.additions.every(addition => o2.additions.includes(addition));
        ok &= o2.additions.every(addition => o1.additions.includes(addition));
        return ok;
    }

    static findOrderInTable(table, sample) {
        let result = null;
        table.ordinations.forEach(ordination => {
            if (!result) {
                result = ordination.orders.find(order => DiningTablesUtils.sameOrder(sample, order));
            }
        });
        return result;
    }

    static findTableOrders(table) {
        let orders = [];
        table.ordination.forEach(ordination => orders.push(...ordination.orders));
        return orders;
    }

    static hasZeroPrices(table) {
        let result = false;
        let orders = this.findTableOrders(table);
        orders.forEach(order => result |= order.price === 0);
        return result;
    }

    static ordersTotal(orders){
        let sum = 0;
        orders.forEach(order => sum += order.price);
        return sum;
    }

    static tableOrdersTotal(table){
        let sum = 0;
        table.ordinations.forEach(ordination => {
            ordination.orders.forEach(order => sum += order.price)
        });
        return sum;
    }

    static findSimilarTo(orders, order) {
        return orders.filter(o => DiningTablesUtils.sameOrder(o, order));
    }

    static implode(orders) {
        let groups = [];
        orders.forEach(order => {
            DiningTablesUtils.mergeOrder(groups, order);
        });
        return groups;
    }

    static mergeOrder(group, order) {
        let found = false;
        group.forEach((groupOrder, i) => {
            if (DiningTablesUtils.sameOrder(groupOrder.orderType, order.orderType)) {
                groupOrder.quantity += order.quantity;
                found = true;
            }
        });
        if (!found) {
            group.push({
                orderType: order.orderType,
                quantity: order.quantity
            })
        }
        return group;
    }

    static renderDiningTable(diningTable, tables, waiters) {
        let result = "Tavolo ";
        if (diningTable) {
            const table = findByUuid(tables, diningTable.table);
            const waiter = findByUuid(waiters, diningTable.waiter);
            result += table ? table.name : "?";
            if (diningTable.openingTime) {
                result += " (" + beautifyTime(diningTable.openingTime) + ") ";
            } else {
                result += " (?) "
            }
            result += waiter ? waiter.name : "?";
        }
        return result;
    }

    static renderDiningTableColor(dt) {
        if (dt.status === "IN CHIUSURA") {
            return "warning";
        }
        return "secondary";
    }

}