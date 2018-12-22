import React from 'react';
import OrdinationsUtils from "../../../OrdinationsUtils";
import Row from "../../../../../widgets/Row";
import Column from "../../../../../widgets/Column";
import Label from "../../../../../widgets/Label";

export default class OrderGroupReviewComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const group = this.props.group;

        let orderText = OrdinationsUtils.renderImplodedOrder(group);
        const priceText = OrdinationsUtils.formatGroupPrice(group);

        let bg;
        if (group.price === 0) {
            bg = "warning"
        }

        let textColor;
        if(group.dish.category.color){
            textColor = group.dish.category.color.toHexString();
        }

        return <Row justify="space-between" align="center">
            <Column grow={3}>
                <Label style="left" color={textColor}>{orderText}</Label>
            </Column>
            <Column grow={1}>
                <Label style="right">{priceText}</Label>
            </Column>
        </Row>;
    }
}