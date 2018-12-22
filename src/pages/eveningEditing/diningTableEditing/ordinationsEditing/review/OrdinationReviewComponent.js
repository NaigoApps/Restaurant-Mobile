import React from 'react';
import OrdinationsUtils from "../../../OrdinationsUtils";
import Column from "../../../../../widgets/Column";
import Row from "../../../../../widgets/Row";
import PhaseGroupReviewComponent from "./PhaseGroupReviewComponent";
import OrdinationsEditorActions from "../OrdinationsEditorActions";
import Label from "../../../../../widgets/Label";
import IconButton from "../../../../../widgets/IconButton";
import {FlatList} from "react-native";
import RoundBox from "../../../../../widgets/RoundBox";

export default class OrdinationReviewComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let titleComponent;

        let printButton;
        // if (this.props.ordination.dirty) {
        //     printButton = <Column auto>
        //         <Button
        //             commitAction={() => OrdinationsEditorActions.printOrdination(this.props.ordination)}
        //             type="warning"
        //             icon="print"/>
        //     </Column>;
        // }

        if (this.props.title) {
            titleComponent =
                <Row align="center">
                    <Column auto>
                        <Label style="bold,large">{this.props.title}</Label>
                    </Column>
                    {printButton}
                    <Column/>
                    <Column auto>
                        <IconButton icon="gear"
                                    commitAction={() => OrdinationsEditorActions.showOptions(this.props.ordination)}/>
                    </Column>
                </Row>;
        }

        const ordersContent = this.buildOrdersContent();

        return <Row grow>
            <RoundBox>
                {titleComponent}
                <Row grow>
                    <Column>
                        {ordersContent}
                    </Column>
                </Row>
            </RoundBox>
        </Row>;
    }

    buildOrdersContent() {
        const ordination = this.props.ordination;
        const phaseGroups = OrdinationsUtils.makePhaseMap(ordination.orders);

        return <FlatList
            data={Array.from(phaseGroups.entries())}
            renderItem={item => OrdinationReviewComponent.renderOrdinationComponent(item)}>
        </FlatList>;
    }

    static renderOrdinationComponent(phaseItem) {
        const phaseGroup = phaseItem.item;
        const implodedGroups = OrdinationsUtils.implode(phaseGroup[1]);
        return <Row ofList>
            <Column>
                <PhaseGroupReviewComponent
                    phase={phaseGroup[0]}
                    groups={implodedGroups}/>
            </Column>
        </Row>;
    }
}