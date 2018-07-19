import React from 'react';
import {StyleSheet, View, YellowBox} from 'react-native';
import HomePage from "./src/HomePage";
import diningTableEditingStore from "./src/pages/eveningEditing/diningTableEditing/DiningTableEditorStore";
import ordersEditingStore
    from "./src/pages/eveningEditing/diningTableEditing/ordinationsEditing/ordersEditing/OrdersEditingStore";
import eveningPageStore from "./src/pages/eveningEditing/EveningPageStore";
import eveningStore from "./src/stores/generic/EveningStore";
import additionsStore from "./src/stores/generic/AdditionsStore";
import categoriesStore from "./src/stores/generic/CategoriesStore";
import dishesStore from "./src/stores/generic/DishesStore";
import phasesStore from "./src/stores/generic/PhasesStore";
import tablesStore from "./src/stores/generic/TablesStore";
import waitersStore from "./src/stores/generic/WaitersStore";
import loadingStore from "./src/stores/LoadingStore";

YellowBox.ignoreWarnings(['Warning: ...']);
console.disableYellowBox = true;

export default class App extends React.Component {

    constructor(props){
        super(props);

        this.requireModules();
    }

    requireModules() {
        console.log("Requiring generic stores");
        console.log("Requiring " + additionsStore.getTopicName());
        console.log("Requiring " + categoriesStore.getTopicName());
        console.log("Requiring " + dishesStore.getTopicName());
        console.log("Requiring " + eveningStore.getTopicName());
        console.log("Requiring " + phasesStore.getTopicName());
        console.log("Requiring " + tablesStore.getTopicName());
        console.log("Requiring " + waitersStore.getTopicName());

        console.log("Requiring features stores");
        console.log("Requiring " + loadingStore.getFeatureName());
        console.log("Requiring " + eveningPageStore.getFeatureName());
        console.log("Requiring " + diningTableEditingStore.getFeatureName());
        console.log("Requiring " + ordersEditingStore.getFeatureName());
    }

    render() {
        return (
            <View style={styles.container}>
                <HomePage/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
