import {findByUuid, stringEquals, uuid} from "../../utils/Utils";
import DiningTablesUtils from "./tables/DiningTablesUtils";
import {beautifyTime, formatDate} from "../../components/widgets/inputs/DateInput";
import StoresUtils from "../StoresUtils";

export default class OrdinationsUtils {

    static phaseComparator(o1, o2, phases){
        let p1 = findByUuid(phases, o1.orderType.phase).priority;
        let p2 = findByUuid(phases, o2.orderType.phase).priority;
        return p1 - p2;
    }

    static makePhaseMap(orders, phases) {
        let result = {};
        if(orders) {
            orders = orders.slice();
            orders.sort((o1, o2) => OrdinationsUtils.phaseComparator(o1, o2, phases));
            orders.forEach(order => {
                let phase = order.orderType.phase;
                if (!result[phase]) {
                    result[phase] = [];
                }
                result[phase].push(order);
            });
        }
        return result;
    }

    static implode(orders) {
        let result = [];
        orders.forEach(order => {
            result = OrdinationsUtils.mergeOrder(result, order);
        });
        return result;
    }

    static sortByDish(orders, dishes, additions) {
        return orders.sort((o1, o2) => {
            let d1 = findByUuid(dishes, o1.orderType.dish);
            let d2 = findByUuid(dishes, o2.orderType.dish);
            if (d1 && d2) {
                let cmp = d1.name.localeCompare(d2.name);
                if (cmp === 0) {
                    if (o1.orderType.additions.length > o2.orderType.additions.length) {
                        return -1;
                    } else if (o2.orderType.additions.length > o1.orderType.additions.length) {
                        return 1;
                    }
                    for (let i = 0; i < o1.orderType.additions.length; i++) {
                        let a1 = findByUuid(additions, o1.orderType.additions[i]);
                        let a2 = findByUuid(additions, o2.orderType.additions[i]);
                        if (a1 && a2) {
                            if (a1.name.localeCompare(a2.name) < 0) {
                                return -1;
                            }
                            if (a1.name.localeCompare(a2.name) > 0) {
                                return 1;
                            }
                        }
                    }
                    return 0;
                }
                return cmp;
            }
            return o1.orderType.dish.localeCompare(o2.orderType.dish);
        });
    }



    static mergeOrder(groupsList, order) {
        let found = false;
        groupsList.forEach((group, i) => {
            if (OrdinationsUtils.sameOrder(group, order)) {
                group.orders.push(order);
                found = true;
            }
        });
        if (!found) {
            groupsList.push({
                groupId: groupsList.size,
                dish: order.dish,
                phase: order.phase,
                price: order.price,
                additions: order.additions,
                notes: order.notes,
                orders: [order]
            })
        }
        return groupsList;
    }

    static sameOrder(o1, o2) {
        return DiningTablesUtils.sameOrder(o1, o2) && o1.phase === o2.phase
    }

    static countOrders(orders, order){
        let result = 0;
        orders.forEach(o => result += OrdinationsUtils.sameOrder(o, order) ? 1 : 0);
        return result;
    }

    static rawCountOrders(orders, dish){
        let result = 0;
        orders.forEach(o => result += o.orderType.dish === dish ? o.quantity : 0);
        return result;
    }

    static buildOrder(dish, phase, price, ordination) {
        return {
            dish: dish,
            phase: phase,
            price: price,
            additions: [],
            notes:''
        };
    }

    static total(orders) {
        let result = 0;
        orders.forEach(order => {
            result += order.orderType.price * order.quantity;
        });
        return result;
    }

    static renderOrder(order, dishes, additions) {
        let result = dishes.find(d => d.uuid === order.dish).name;

        order.additions.forEach(uuid => {
            let addition = findByUuid(additions, uuid);
            if (addition) {
                result += " " + addition.name
            }
        });

        if(order.notes){
            result += " " + order.notes;
        }

        return result;
    }

    static renderImplodedOrder(order, dishes, additions) {
        let dish = findByUuid(dishes, order.orderType.dish);
        let result = order.quantity + " " + (dish ? dish.name : "?");

        order.orderType.additions.forEach(uuid => {
            let addition = findByUuid(additions, uuid);
            if (addition) {
                result += " " + addition.name;
            }
        });

        if(order.orderType.notes){
            result += " " + order.orderType.notes;
        }

        return result;
    }

    static formatPrice(price) {
        return "€" + price.toFixed(2);
    }

    static formatGroupPrice(grp) {
        return "";
        //return this.formatPrice(grp.orderType.price * grp.quantity);
    }

    static renderOrdination(ordination){
        return "Comanda delle " + beautifyTime(ordination.creationTime);
    }

    static ordinationDateSorter(o1, o2){
        return o1.creationTime.localeCompare(o2.creationTime);
    }
}