import React from 'react';
import OrdinationsUtils from "../OrdinationsUtils";
import Column from "../../../widgets/Column";
import Row from "../../../widgets/Row";
import {FlatList} from "react-native";
import Label from "../../../widgets/Label";
import OrdinationReviewComponent from "../diningTableEditing/ordinationsEditing/review/OrdinationReviewComponent";


export default class DiningTableReview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let reviewContent = this.buildDetailedReview();
        return <Row grow>
            <Column>
                {reviewContent}
            </Column>
        </Row>
    }


    buildDetailedReview() {
        const table = this.props.table;

        let allOrders = table.listOrders();

        let coverChargesPrice = 0;
        let coverChargesEditor;

        if (this.props.settings.coverCharges) {
            coverChargesEditor = this.buildCoverChargesComponent();
            coverChargesPrice = table.getCoverChargesPrice();
        }

        let total = OrdinationsUtils.total(allOrders) + coverChargesPrice;

        return <Row grow>
            <Column>
                {coverChargesEditor}
                <FlatList
                    data={table.ordinations}
                    renderItem={item => DiningTableReview.renderDetailedReviewComponent(item)}>
                </FlatList>
                <Row>
                    <Column>
                        <Label>TOTALE: {OrdinationsUtils.formatPrice(total)}</Label>
                    </Column>
                </Row>
                {/*<OkCancelModal*/}
                    {/*message="Eliminare la comanda?"*/}
                    {/*confirmType="danger"*/}
                    {/*abortType="secondary"*/}
                    {/*visible={this.props.ordinationEditing.crudStatus === CRUDStatus.DELETE}*/}
                    {/*confirmAction={() => OrdinationsEditorActions.deleteOrdination(this.props.ordinationEditing.currentOrdination)}*/}
                    {/*abortAction={() => OrdinationsEditorActions.abortOrdinationDeletion()}*/}
                {/*/>*/}
                {/*<OkCancelModal*/}
                    {/*message="Inviare annullamento comanda?"*/}
                    {/*confirmType="danger"*/}
                    {/*abortType="secondary"*/}
                    {/*visible={this.props.ordinationEditing.aborting}*/}
                    {/*confirmAction={() => OrdinationsEditorActions.abortOrdination(this.props.ordinationEditing.currentOrdination)}*/}
                    {/*abortAction={() => OrdinationsEditorActions.abortOrdinationAbortion()}*/}
                {/*/>*/}
            </Column>
        </Row>
    }

    static renderDetailedReviewComponent(item){
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


    buildCoverChargesComponent() {
        const table = this.props.table;

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