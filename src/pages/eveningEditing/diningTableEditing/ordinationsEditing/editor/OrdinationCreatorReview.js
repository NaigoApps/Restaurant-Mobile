import React from 'react';
import Row from "../../../../../widgets/Row";
import Column from "../../../../../widgets/Column";
import OrdinationsUtils from "../../../OrdinationsUtils";
import {FlatList} from "react-native";
import OrdinationCreatorReviewPhase from "./OrdinationCreatorReviewPhase";
import OrdinationEditorMode from "./OrdinationEditorMode";
import OrdinationsEditorActions from "../OrdinationsEditorActions";
import RoundButton from "../../../../../widgets/RoundButton";
import Label from "../../../../../widgets/Label";

export default class OrdinationCreatorReview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const ordersContent = this.buildOrdersContent();

        return <Row grow>
            <Column>
                <Row>
                    <Column>
                        <Label style="large,bold">Riepilogo comanda</Label>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        {ordersContent}
                    </Column>
                </Row>
                <Row>
                    <Column mr>
                        <RoundButton
                            style="info"
                            text="Torna ad inserimento"
                            commitAction={() => OrdinationsEditorActions.setWizardMode(OrdinationEditorMode.INSERTING)}
                        />
                    </Column>
                    <Column>
                        <RoundButton
                            style="success"
                            text="Conferma comanda"
                            commitAction={() => OrdinationsEditorActions.createOrdination(this.props.table, this.props.ordination)}
                        />
                    </Column>
                </Row>
            </Column>
        </Row>;

    }

    buildOrdersContent() {
        const ordination = this.props.ordination;
        let phaseGroups = OrdinationsUtils.makePhaseList(ordination.orders);

        return <FlatList
            data={phaseGroups}
            renderItem={({item}) => this.renderPhase(item)}>
        </FlatList>
    }

    renderPhase(phase) {
        const implodedGroups = OrdinationsUtils.implode(phase.orders);
        return <OrdinationCreatorReviewPhase
            key={phase.phase.uuid}
            phase={phase.phase}
            groups={implodedGroups}/>;
    }
}