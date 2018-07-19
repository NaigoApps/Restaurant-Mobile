import React from 'react';
import {Text} from 'react-native';
import eveningPageActions from "./pages/eveningEditing/EveningPageActions";
import Label from "./widgets/Label";
import Column from "./widgets/Column";
import ApplicationSelectInput from "./components/widgets/ApplicationSelectInput";
import ApplicationIntegerInput from "./components/widgets/ApplicationIntegerInput";
import ApplicationTextInput from "./components/widgets/ApplicationTextInput";
import applicationStore, {Screens} from "./stores/ApplicationStore";
import ApplicationLoadingDialog from "./components/widgets/ApplicationLoadingDialog";
import EveningEditor from "./pages/eveningEditing/EveningEditor";
import DiningTableCreator from "./pages/eveningEditing/diningTableEditing/DiningTableCreator";
import OrdinationReview from "./pages/eveningEditing/diningTableEditing/ordinationsEditing/OrdinationReview";
import OrdinationCreator from "./pages/eveningEditing/diningTableEditing/ordinationsEditing/OrdinationCreator";
import DiningTableReview from "./pages/eveningEditing/tables/DiningTableReview";
import OrderEditor from "./pages/eveningEditing/diningTableEditing/ordinationsEditing/OrderEditor";

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = applicationStore.getState();

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        applicationStore.addChangeListener(this.updateState);
        eveningPageActions.initEveningPage();
    }

    updateState(state) {
        this.setState(state);
    }

    componentWillUnmount() {
        applicationStore.removeChangeListener(this.updateState);
    }

    render() {
        return (
            <Column padding={5} paddingTop={20}>
                {this.buildContent()}
                <ApplicationIntegerInput data={this.state.data.integerInput}/>
                <ApplicationSelectInput data={this.state.data.selectInput}/>
                <ApplicationTextInput data={this.state.data.textInput}/>
                <ApplicationLoadingDialog visible={this.state.data.loading && this.state.data.loading.busy}/>
            </Column>
        );
    }

    buildContent() {
        const data = this.state.data;
        if (data) {
            const evening = data.evening;
            if (evening) {
                const currentScreen = data.currentScreen;
                switch (currentScreen){
                    case Screens.TABLES_LIST:
                        return <EveningEditor data={data}/>;
                    case Screens.TABLE_CREATION:
                        return <DiningTableCreator data={data}/>;
                    case Screens.TABLE_REVIEW:
                        return <DiningTableReview data={data}/>;
                    case Screens.ORDINATION_REVIEW:
                        return <OrdinationReview data={data}/>;
                    case Screens.ORDINATION_CREATION:
                        return <OrdinationCreator data={data}/>;
                    case Screens.ORDER_TYPE_EDITING:
                        return <OrderEditor data={data} creator={data.ordersEditing.creating}/>;
                }
            }
            return <Label>Serata non selezionata</Label>
        }
        return <Text>Caricamento in corso</Text>;
    }
}