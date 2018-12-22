import React from 'react';
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import ViewController from "../../../widgets/ViewController";
import diningTableEditingStore from "./DiningTableEditorStore";
import OrdinationsUtils from "../OrdinationsUtils";
import OrdinationReviewComponent from "./ordinationsEditing/review/OrdinationReviewComponent";
import applicationStore from "../../../stores/ApplicationStore";
import Label from "../../../widgets/Label";
import {FlatList} from "react-native";
import Page from "../../Page";
import DiningTableNav from "./DiningTableNav";
import dataStore from "../../../stores/DataStore";
import ordinationEditingStore from "./ordinationsEditing/OrdinationEditingStore";
import CRUDStatus from "../../../utils/CRUDStatus";
import OrdinationCreator from "./ordinationsEditing/editor/OrdinationCreator";
import {EntitiesUtils} from "../../../utils/EntitiesUtils";
import OrdinationActionsComponent from "./ordinationsEditing/OrdinationActionsComponent";
import OkCancelModal from "../../../components/widgets/OkCancelModal";
import OrdinationsEditorActions from "./ordinationsEditing/OrdinationsEditorActions";

export default class DiningTablePage extends ViewController {
    constructor(props) {
        super(props, dataStore, diningTableEditingStore, ordinationEditingStore, applicationStore);
    }

    render() {
        const table = this.state.diningTableEditing.currentTable;
        const ordinationData = this.state.ordinationEditing;

        let content;

        if(ordinationData.options){
            content = <OrdinationActionsComponent
                    ordination={ordinationData.options}/>
        }else if (ordinationData.crudStatus === CRUDStatus.CREATE) {
            content = <OrdinationCreator
                wizardData={ordinationData.wizardData}
                table={table}
                ordination={ordinationData.currentOrdination}/>;
        } else {
            content = this.buildDetailedReview();
        }

        return <Page nav={<DiningTableNav table={table}/>}>
            {content}
        </Page>
    }

    buildDetailedReview() {
        const tablesData = this.state.diningTableEditing;
        const settings = this.state.general.serverSettings;

        const table = tablesData.currentTable;

        let allOrders = table.listOrders();

        let coverChargesPrice = 0;
        let coverChargesEditor;

        if (settings.coverCharges) {
            coverChargesEditor = this.buildCoverChargesComponent(table);
            coverChargesPrice = table.getCoverChargesPrice();
        }

        let total = OrdinationsUtils.total(allOrders) + coverChargesPrice;

        const ordinationsData = this.state.ordinationEditing;

        const ordinations = table.ordinations
            .sort(EntitiesUtils.defaultComparator("creationTime", true));

        return <Row grow>
            <Column>
                {coverChargesEditor}
                <FlatList
                    data={ordinations}
                    renderItem={item => DiningTablePage.renderDetailedReviewComponent(item)}>
                </FlatList>
                <Row>
                    <Column>
                        <Label>TOTALE: {OrdinationsUtils.formatPrice(total)}</Label>
                    </Column>
                </Row>
                <OkCancelModal
                    message="Eliminare la comanda?"
                    confirmType="danger"
                    abortType="secondary"
                    visible={ordinationsData.crudStatus === CRUDStatus.DELETE}
                    confirmAction={() => OrdinationsEditorActions.deleteOrdination(ordinationsData.currentOrdination)}
                    abortAction={() => OrdinationsEditorActions.abortOrdinationDeletion()}
                />
                <OkCancelModal
                    message="Inviare annullamento comanda?"
                    confirmType="danger"
                    abortType="secondary"
                    visible={ordinationsData.aborting}
                    confirmAction={() => OrdinationsEditorActions.abortOrdination(ordinationsData.currentOrdination)}
                    abortAction={() => OrdinationsEditorActions.abortOrdinationAbortion()}
                />
            </Column>
        </Row>
    }

    static renderDetailedReviewComponent(item) {
        const obj = item.item;

        return <Row ofList>
            <Column>
                <OrdinationReviewComponent
                    title={OrdinationsUtils.renderOrdination(obj)}
                    ordination={obj}
                />
            </Column>
        </Row>;
    }

    buildCoverChargesComponent(table) {

        let ccs = table.coverCharges;
        let ccsText = ccs.toString() + ((ccs > 1) ? " COPERTI" : " COPERTO");
        let ccsPrice = ccs * table.evening.coverCharge;
        return <Row>
            <Column auto><Label>{ccsText}</Label></Column>
            <Column/>
            <Column auto><Label>{OrdinationsUtils.formatPrice(ccsPrice)}</Label></Column>
        </Row>
    }

}