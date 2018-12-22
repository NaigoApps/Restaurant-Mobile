import {EntitiesUtils} from "../../../../../utils/EntitiesUtils";
import React from 'react';
import Column from "../../../../../widgets/Column";
import Row from "../../../../../widgets/Row";
import Label from "../../../../../widgets/Label";
import OrdinationCreatorReviewOrder from "./OrdinationCreatorReviewOrder";

export default class OrdinationCreatorReviewPhase extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const groups = this.props.groups.slice();
        groups.sort((g1, g2) => EntitiesUtils.nameComparator(g1.dish, g2.dish));

        return <Row>
            <Column>
                <Row>
                    <Column>
                        <Label>{this.props.phase.name}</Label>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        {groups.map(group => <OrdinationCreatorReviewOrder
                            key={group.groupId}
                            group={group}/>)
                        }
                    </Column>
                </Row>
            </Column>
        </Row>
    }

}