import EventEmitter from "events";
import dispatcher from "../dispatcher/SimpleDispatcher";

export default class RootFeatureStore extends EventEmitter{
    constructor(changeEvent){
        super();
        this.token = dispatcher.register(this.handleAction.bind(this));
        this.changeEvent = changeEvent;
        this.subFeatureStores = [];
        this.genericStores = [];
    }

    static ALL_ACTIONS = "ALL_ACTIONS";

    getToken(){
        return this.token;
    }

    addChangeListener(callback){
        this.addListener(this.changeEvent, callback);
    }

    removeChangeListener(callback){
        this.removeListener(this.changeEvent, callback);
    }

    addSubFeature(subFeatureStore){
        this.subFeatureStores.push(subFeatureStore);
    }

    addGenericStore(genericStore){
        this.genericStores.push(genericStore);
    }

    handleAction(action){
        let changed = false;

        dispatcher.waitFor(this.genericStores.map(generic => generic.getToken()));
        dispatcher.waitFor(this.subFeatureStores.map(subFeature => subFeature.getToken()));

        if(action.isCompleted()){
            changed |= this.handleCompletedAction(action);
        }else if(action.isInProgress()){
            changed |= this.handleStartedAction(action);
        }else if(action.isError()){
            changed |= this.handleErrorAction(action);
        }else if(action.isFailed()){
            changed |= this.handleFailedAction(action);
        }

        this.genericStores.forEach(store => {
            if(store.getActions() === RootFeatureStore.ALL_ACTIONS || store.getActions().includes(action.type)){
                changed = true;
            }
        });

        this.subFeatureStores.forEach(store => {
            if(store.getActions().includes(action.type)){
                changed = true;
            }
        });

        this.genericStores.forEach(store => {
            if(!store.isLoaded()){
                changed = false;
            }
        });

        if(changed) {
            this.emit(this.changeEvent, this.getState());
        }
    }

    buildState(){
        console.warn("No buildState() method definition in " + this.constructor.name);
    }

    getState(){
        let data = this.buildState();

        this.genericStores.forEach(store => {
            data[store.getTopicName()] = store.getData();
        });

        this.subFeatureStores.forEach(store => {
            data[store.getFeatureName()] = store.getState();
        });

        return {
            data : data
        }
    }

    handleCompletedAction(action){
        console.warn("No completed event handler");
        return false;
    }
    handleStartedAction(action){
        return false;
    }
    handleErrorAction(action){
        return false;
    }
    handleFailedAction(action){
        return false;
    }
}
