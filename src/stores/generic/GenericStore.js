import {STATUSES} from "../LazyData";
import dispatcher from "../../dispatcher/SimpleDispatcher";

export default class GenericStore {
    constructor(rootFeatureStore, topicName, optimized = true, single = false) {
        this.token = dispatcher.register(this.handleAction.bind(this));
        this.topicName = topicName;
        this.optimized = optimized;
        this.single = single;
        rootFeatureStore.addGenericStore(this);
        this.clearData();
    }

    getToken(){
        return this.token;
    }

    getActions() {
        console.warn("No getActions() definition in " + this.constructor.name);
        return [];
    }

    getTopicName() {
        return this.topicName;
    }

    handleAction(action) {
        let changed = false;
        if (action.isCompleted()) {
            changed |= this.handleCompletedAction(action);
        } else if (action.isInProgress()) {
            changed |= this.handleStartedAction(action);
        } else if (action.isError()) {
            changed |= this.handleErrorAction(action);
        } else if (action.isFailed()) {
            changed |= this.handleFailedAction(action);
        }
        return changed;
    }

    handleCompletedAction(action) {
        console.warn("No handleCompletedAction() method definition in " + this.constructor.name);
        return false;
    }

    handleStartedAction(action) {
        return false;
    }

    handleErrorAction(action) {
        console.warn("No handleErrorAction() method definition in " + this.constructor.name);
        return false;
    }

    handleFailedAction(action) {
        console.warn("No handleFailedAction() method definition in " + this.constructor.name);
        return false;
    }

    clearData() {
        this.data = [];
        if (this.optimized) {
            this.data.aux = {};
        }
        this.status = STATUSES.NOT_LOADED;
    }

    setData(data) {
        this.data = data.slice();
        this.data.aux = {};
        this.sortData();
        if (this.optimized) {
            this.data.forEach(element => this.data.aux[element.uuid] = element);
        }
        this.status = STATUSES.LOADED;
    }

    comparator(d1, d2) {
        if (this.optimized) {
            return d1.uuid.localeCompare(d2.uuid);
        } else {
            console.warn("Specify comparator for " + this.constructor.name);
            return 0;
        }
    }

    sortData() {
        this.data.sort((a, b) => this.comparator(a, b));
    }

    getData() {
        if (this.isLoaded()) {
            if(this.single) {
                return this.data[0];
            }
            return this.data;
        }
        return null;
    }

    getSingleData() {
        if (this.isLoaded()) {
            if (this.data.length === 1) {
                return this.data[0]
            }
        }
        return null;
    }

    createData(newElement) {
        if (!this.hasElement()) {
            this.data.push(newElement);
            this.sortData();
            if (this.optimized) {
                this.data.aux[newElement.uuid] = newElement;
            }
        } else {
            console.warn("Trying to create existent data " + newElement.uuid);
        }
    }

    updateData(newElement) {
        if (this.data.aux[newElement.uuid]) {
            const index = this.elementPosition(newElement.uuid);
            this.data.splice(index, 1, newElement);
            this.sortData();
            this.data.aux[newElement.uuid] = newElement;
        } else {
            console.warn("Trying to update non existent data " + newElement.uuid);
        }
    }

    deleteData(uuid) {
        if (this.data.aux[uuid]) {
            const index = this.elementPosition(uuid);
            this.data.splice(index, 1);
            delete this.data.aux[uuid];
        } else {
            console.warn("Trying to update non existent data " + newElement.uuid);
        }
    }

    hasElement(target) {
        if (this.optimized) {
            return !!this.data.aux[target.uuid];
        } else {
            return !!this.data.find(element => this.comparator(element, target) === 0);
        }
    }

    elementPosition(uuid) {
        if (this.optimized) {
            return this.data.findIndex(element => element.uuid === uuid);
        } else {
            return this.data.findIndex(element => this.comparator(element, uuid) === 0);
        }
    }

    setStatus(status) {
        this.status = status;
    }

    isLoaded() {
        return this.status === STATUSES.LOADED;
    }

    isNotLoaded() {
        return this.status === STATUSES.NOT_LOADED;
    }

    isLoading() {
        return this.status === STATUSES.LOADING;
    }

    static areLoaded(genericStores) {
        let result = true;
        genericStores.forEach(store => {
            result &= store.isLoaded();
        });
        return result;
    }
}
