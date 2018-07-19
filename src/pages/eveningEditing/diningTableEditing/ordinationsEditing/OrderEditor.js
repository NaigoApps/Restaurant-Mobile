import React from 'react';
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import {BackHandler} from "react-native";
import {OrdersActions} from "./ordersEditing/OrdersActions";
import OrdinationsUtils from "../../OrdinationsUtils";
import {findByUuid} from "../../../../utils/Utils";
import Label from "../../../../widgets/Label";
import SelectInput from "../../../../components/widgets/inputs/SelectInput";
import RoundButton from "../../../../widgets/RoundButton";
import TextEditor from "../../../../components/widgets/inputs/TextEditor";
import IntegerEditor from "../../../../components/widgets/inputs/IntegerEditor";
import Dimensions from "../../../../utils/Dimensions";
import OkCancelView from "../../../../widgets/OkCancelView";

export default class OrderEditor extends React.Component {
    constructor(props) {
        super(props);

        this.handleBackPress = this.handleBackPress.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress() {
        let ordersData = this.props.data.ordersEditing;
        if (ordersData.selectedCategory) {
            setImmediate(() => OrdersActions.selectCategory(null));
        } else {
            setImmediate(() => OrdersActions.showReview());
        }
        return true;
    }

    renderPhases() {
        const phases = this.props.data.phases;
        let columns = [];
        phases.forEach(phase => {
            columns.push(<Column key={phase.uuid} sideMargin={Dimensions.smallSpace}>
                <RoundButton style="secondary"
                             active={this.props.data.ordersEditing.selectedPhase === phase.uuid}
                             text={phase.name}
                             commitAction={() => OrdersActions.selectPhase(phase.uuid)}
                />
            </Column>)
        });
        return columns;
    }

    canHaveAddition(dishUuid, additionUuid) {
        let dish = findByUuid(this.props.data.dishes, dishUuid);
        if (dish) {
            let category = findByUuid(this.props.data.categories, dish.category);
            if (category) {
                return category.additions.includes(additionUuid);
            }
        }
        return false;
    }

    onConfirm(){
        if(this.props.creator){
            OrdersActions.confirmDish();
        }else{
            OrdersActions.updateDish();
        }
    }

    render() {
        let order = this.props.data.ordersEditing.orderType;
        const quantity = this.props.data.ordersEditing.quantity;
        let availableAdditions = this.props.data.additions;
        availableAdditions = availableAdditions
            .filter(addition => addition.generic ||
                order.additions.includes(addition.uuid) ||
                this.canHaveAddition(order.dish, addition.uuid));

        return <OkCancelView
            onConfirm={() => this.onConfirm()}
            onAbort={() => OrdersActions.abortDish()}>
            <Row ofList>
                {this.renderPhases()}
            </Row>
            <Row ofList>
                <Column>
                    <Row>
                        <Column>
                            <TextEditor
                                options={{
                                    label: "Variante libera",
                                    value: order.notes,
                                    callback: result => OrdersActions.setFreeAddition(result)
                                }}
                            />
                        </Column>
                    </Row>
                    <Row ofList>
                        <Column>
                            <IntegerEditor
                                options={{
                                    label: "Quantità",
                                    value: quantity,
                                    callback: result => OrdersActions.setQuantity(result)
                                }}
                            />
                        </Column>
                    </Row>
                    <Row ofList>
                        <Column><Label>Varianti fisse</Label></Column>
                    </Row>
                </Column>
            </Row>
            <Row grow ofList>
                <Column>
                    <SelectInput
                        uuid="order_free_additions"
                        cols={2}
                        id={addition => addition.uuid}
                        options={availableAdditions}
                        renderer={addition => addition.name}
                        selected={order.additions}
                        onSelect={addition => OrdersActions.toggleAddition(addition)}
                        onDeselect={addition => OrdersActions.toggleAddition(addition)}
                        multiSelect
                    />
                </Column>
            </Row>
        </OkCancelView>;
    }

}