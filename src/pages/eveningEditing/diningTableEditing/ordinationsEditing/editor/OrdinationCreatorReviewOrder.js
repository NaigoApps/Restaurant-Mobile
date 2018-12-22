import React from 'react';
import OrdinationsUtils from "../../../OrdinationsUtils";
import Row from "../../../../../widgets/Row";
import Column from "../../../../../widgets/Column";
import RoundButton from "../../../../../widgets/RoundButton";
import OrdinationsEditorActions from "../OrdinationsEditorActions";
import IconButton from "../../../../../widgets/IconButton";

export default class OrdinationCreatorReviewOrder extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const group = this.props.group;

        const result = OrdinationsUtils.renderImplodedOrder(group);
        const rightText = OrdinationsUtils.formatGroupPrice(group);

        return <Row mt>
            <Column mr>
                <RoundButton
                    textStyle="small,left"
                    text={result + " " + rightText}
                    commitAction={() => OrdinationsEditorActions.editGroup(group.orders)}//TODO
                />
            </Column>
            <Column auto>
                <IconButton color="danger" icon="trash"/>
            </Column>
        </Row>;
    }
}