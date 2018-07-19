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
import List from "../../../../components/widgets/inputs/List";
import OrdinationCreatorNav from "../OrdinationCreatorNav";
import Dimensions from "../../../../utils/Dimensions";

export default class OrdinationCreator extends React.Component {
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

    buildCategoryInput() {
        let data = this.props.data;
        let ordersData = this.props.data.ordersEditing;
        return <Row grow>
            <Column>
                <OrdinationCreatorNav creating/>
                <Row>
                    <Column>
                        <Label style="center,large">Categorie</Label>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <SelectInput
                            cols={2}
                            id={cat => cat.uuid}
                            selected={ordersData.selectedCategory}
                            options={data.categories}
                            renderer={cat => cat.name}

                            onSelect={cat => OrdersActions.selectCategory(cat)}
                            onDeselect={() => OrdersActions.selectCategory(null)}
                        />
                    </Column>
                </Row>
            </Column>
        </Row>
    }

    buildDishesInput() {
        let data = this.props.data;
        let ordersData = this.props.data.ordersEditing;
        let category = findByUuid(this.props.data.categories, ordersData.selectedCategory);
        let dishes = data.dishes;
        let availableDishes = data.dishes
            .filter(dish => dish.status === "ATTIVO")
            .filter(dish => dish.category === ordersData.selectedCategory);
        return <Row grow>
            <Column>
                <OrdinationCreatorNav creating/>
                <Row ofList>
                    {this.renderPhases()}
                </Row>
                <Row ofList>
                    <Column>
                        <Label style="center,large">{category.name}</Label>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <List
                            options={availableDishes}
                            renderer={dish => this.renderDishRow(dish)}
                        />
                    </Column>
                </Row>
            </Column>
        </Row>
    }

    renderDishRow(dish) {
        const count = this.countDish(dish.uuid);
        return <Row>
            <Column justify="center">
                <RoundButton text={dish.name}
                             longCommitAction={() => OrdersActions.editDish(dish.uuid)}
                             commitAction={() => OrdersActions.selectDish(dish.uuid)}/>
            </Column>
            <Column auto justify="center" sideMargin={Dimensions.mediumSpace}>
                <Label style={"large,center," + ((count > 0) ? "green" : "red")}>{count}</Label>
            </Column>
        </Row>
    }

    countDish(dish) {
        return OrdinationsUtils.rawCountOrders(this.props.data.ordersEditing.orders, dish);
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

    render() {
        let data = this.props.data.ordersEditing;
        let orders = data.orders;

        if (!data.selectedCategory) {
            return this.buildCategoryInput();
        } else {
            return this.buildDishesInput();
        }
    }

}