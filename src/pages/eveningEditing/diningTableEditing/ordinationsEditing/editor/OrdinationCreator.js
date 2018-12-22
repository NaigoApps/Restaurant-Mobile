import React from 'react';
import Row from "../../../../../widgets/Row";
import Column from "../../../../../widgets/Column";
import OrdinationsEditorActions from "../OrdinationsEditorActions";
import DishStatus from "../../../../../model/DishStatus";
import IntegerEditor from "../../../../../components/widgets/inputs/IntegerEditor";
import SelectEditor from "../../../../../components/widgets/inputs/SelectEditor";
import SelectInput from "../../../../../components/widgets/inputs/SelectInput";
import OrdersEditorActions from "../OrdersEditorActions";
import OrdinationEditorMode from "./OrdinationEditorMode";
import ViewController from "../../../../../widgets/ViewController";
import dataStore from "../../../../../stores/DataStore";
import RoundButton from "../../../../../widgets/RoundButton";
import FloatInput from "../../../../../components/widgets/inputs/FloatInput";
import Label from "../../../../../widgets/Label";
import IntegerInput from "../../../../../components/widgets/inputs/IntegerInput";
import RenderingData from "../../../../../components/widgets/inputs/RenderingData";
import TextEditor from "../../../../../components/widgets/inputs/TextEditor";
import OrdinationCreatorReview from "./OrdinationCreatorReview";

export default class OrdinationCreator extends ViewController {
    constructor(props) {
        super(props, dataStore);
    }

    render() {
        const wizardData = this.props.wizardData;
        const ordination = this.props.ordination;

        let content;
        if(wizardData.mode === OrdinationEditorMode.REVIEWING){
            content = <OrdinationCreatorReview {...this.props}/>
        }else if (wizardData.mode === OrdinationEditorMode.EDITING) {
            content = this.buildEditingContent();
        } else if (wizardData.mode === OrdinationEditorMode.ADVANCED_INSERTING) {
            content = this.buildAdvancedInsertingContent();
        } else {
            content = this.buildInsertingContent();
        }

        return <Row grow>
            <Column>
                {content}
            </Column>
        </Row>;
    }

    buildInsertingContent() {
        const data = this.state.data;
        const wData = this.props.wizardData;
        const selectedCategory = wData.selectedCategory;


        const categoriesButton = <RoundButton
            text="Categorie"
            active={!selectedCategory}
            commitAction={() => OrdinationsEditorActions.deselectWizardCategory()}
        />;
        let categoryButton;
        if (selectedCategory) {
            categoryButton = <RoundButton
                text={selectedCategory.name}
                active={true}
            />;
        }

        let content = null;
        if (selectedCategory) {
            content = this.buildDishesContent(data);
        } else {
            content = this.buildCategoriesContent(data);
        }

        const quantity = wData.quantity;

        let availablePhases = data.phases;
        let selectedPhase = wData.selectedPhase;

        return <Row grow>
            <Column>
                <Row grow>
                    <Column>
                        <Row>
                            <Column>
                                <SelectEditor
                                    options={{
                                        cols: 1,
                                        label: "Portata",
                                        values: availablePhases,
                                        renderer: p => p ? p.name : "",
                                        value: selectedPhase,
                                        callback: result => OrdinationsEditorActions.setWizardPhase(result)
                                    }}
                                />
                            </Column>
                        </Row>
                        <Row grow mt>
                            <Column>
                                <Row>
                                    <Column mr>
                                        {categoriesButton}
                                    </Column>
                                    <Column ml>
                                        {categoryButton}
                                    </Column>
                                </Row>
                                <Row grow mt>
                                    <Column>
                                        {content}
                                    </Column>
                                </Row>
                            </Column>
                        </Row>
                    </Column>
                </Row>
                <Row>
                    <Column mr>
                        <RoundButton
                            style="danger"
                            text="Annulla comanda"
                            commitAction={() => OrdinationsEditorActions.abortOrdinationCreation(this.props.ordination)}
                        />
                    </Column>
                    <Column>
                        <RoundButton
                            style="info"
                            text="Avanti"
                            commitAction={() => OrdinationsEditorActions.setWizardMode(OrdinationEditorMode.REVIEWING)}
                        />
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    buildAdvancedInsertingContent() {
        const wData = this.props.wizardData;
        const dish = wData.currentDish;

        const availableAdditions = this.state.data.additions
            .filter(addition => dish.category.hasAddition(addition));

        return <Row grow>
            <Column>
                <Row grow>
                    <Column>
                        <Row>
                            <Column>
                                <Label>{dish.name}</Label>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <TextEditor
                                    label="Variante libera"
                                    value={wData.freeAddition}
                                    commitAction={result => OrdinationsEditorActions.setFreeAddition(result)}
                                />
                            </Column>
                        </Row>
                        <Row ofList>
                            <Column mr>
                                <FloatInput
                                    label="Prezzo"
                                    value={wData.price || 0}
                                    min={0.01}
                                    commitAction={value => OrdinationsEditorActions.setPrice(value)}
                                    currency
                                />
                            </Column>
                            <Column>
                                <IntegerInput
                                    label="Quantità"
                                    value={wData.quantity}
                                    commitAction={value => OrdinationsEditorActions.setWizardQuantity(value)}
                                />
                            </Column>
                        </Row>
                        <Row ofList>
                            <Column><Label>Varianti fisse</Label></Column>
                        </Row>
                        <Row grow ofList>
                            <Column>
                                <SelectInput
                                    cols={2}
                                    options={availableAdditions}
                                    renderer={addition => addition.name}
                                    selected={wData.additions}
                                    onSelect={addition => OrdinationsEditorActions.addAddition(addition)}
                                    onDeselect={addition => OrdinationsEditorActions.removeAddition(addition)}
                                    multiSelect/>
                            </Column>
                        </Row>
                    </Column>
                </Row>
                <Row ofList>
                    <Column mr>
                        <RoundButton text="Annulla ordine"
                                     style="danger"
                                     commitAction={() => OrdinationsEditorActions.setWizardMode(OrdinationEditorMode.INSERTING)}/>
                    </Column>
                    <Column>
                        <RoundButton text="Conferma ordine"
                                     style="success"
                                     commitAction={() => OrdinationsEditorActions.
                                     selectWizardDish(this.props.ordination, wData)}/>
                    </Column>
                </Row>
            </Column>
        </Row>
    }

    buildEditingContent(data) {
        const orders = this.props.selectedGroup;
        const targetOrder = orders[0];

        const availableAdditions = data.additions.filter(addition => {
            return targetOrder.dish.category.hasAddition(addition) ||
                targetOrder.additions.includes(addition)
        });

        return <Row grow>
            <Column justify="space-between">
                <Row>
                    <Column>
                        <Row>
                            <Column>
                                <h5>{targetOrder.dish.name}</h5>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <TextEditor
                                    label="Variante libera"
                                    value={targetOrder.notes}
                                    commitAction={result => OrdersEditorActions.setFreeAddition(result)}
                                />
                            </Column>
                        </Row>
                        <Row ofList>
                            <Column>
                                <FloatEditor
                                    options={{
                                        label: "Prezzo",
                                        value: targetOrder ? targetOrder.price : 0,
                                        callback: result => OrdersEditorActions.setPrice(result),
                                        min: 0.01,
                                    }}
                                    currency
                                />
                            </Column>
                            <Column>
                                <IntegerEditor
                                    options={{
                                        label: "Quantità",
                                        value: orders ? orders.length : 0,
                                        callback: result => this.editQuantity(orders, result)
                                    }}
                                />
                            </Column>
                            <Column>
                                <SelectEditor
                                    options={{
                                        rows: 2,
                                        cols: 2,
                                        label: "Portata",
                                        values: data.phases,
                                        renderer: p => p.name,
                                        value: targetOrder ? targetOrder.phase : null,
                                        callback: result => OrdersEditorActions.setPhase(result),
                                        isValid: value => !!value
                                    }}
                                />
                            </Column>
                            <Column auto>
                                <RoundButton
                                    type="danger"
                                    icon="trash"
                                    commitAction={() => OrdersEditorActions.decreaseQuantity(orders)}
                                />
                            </Column>
                        </Row>
                        <Row topSpaced>
                            <Column><h5>Varianti fisse</h5></Column>
                        </Row>
                        <Row ofList>
                            <Column>
                                <SelectInput
                                    uuid="order_fixed_additions"
                                    rows={7}
                                    cols={2}
                                    options={availableAdditions}
                                    renderer={addition => addition.name}
                                    selected={targetOrder ? targetOrder.additions : []}
                                    onSelect={addition => OrdersEditorActions.setAdditions(addition, true)}
                                    onDeselect={addition => OrdersEditorActions.setAdditions(addition, false)}
                                    multiSelect/>
                            </Column>
                        </Row>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <RoundButton text="Torna a inserimento" type="info"
                                     commitAction={() => OrdersEditorActions.deselectOrders()}/>
                    </Column>
                </Row>
            </Column>
        </Row>
    }

    editQuantity(orders, quantity) {
        if (quantity > orders.length) {
            OrdersEditorActions.increaseQuantity(orders[0], quantity - orders.length);
        } else {
            OrdersEditorActions.decreaseQuantity(orders.slice(0, orders.length - quantity))
        }
    }

    buildCategoriesContent(data) {
        const editorData = this.props.wizardData;

        let selectedCategory = editorData.selectedCategory;

        let availableCategories = data.categories;
        return <SelectInput
            cols={2}
            options={availableCategories}
            renderer={cat => cat.name}
            selected={selectedCategory}
            onSelect={cat => OrdinationsEditorActions.selectWizardCategory(cat)}
            onDeselect={() => OrdinationsEditorActions.deselectWizardCategory()}
        />;
    }

    buildDishesContent() {
        const wData = this.props.wizardData;
        const selectedCategory = wData.selectedCategory;
        let availableDishes = selectedCategory.dishes
            .filter(dish => dish.status === DishStatus.ACTIVE);

        return <SelectInput
            fontSize="small"
            cols={2}
            options={availableDishes}
            renderer={dish => OrdinationCreator.renderDish(dish, this.props.ordination)}
            onSelect={dish => OrdinationsEditorActions.editDish(dish)}
            onLongSelect={dish => OrdinationsEditorActions.selectWizardDish(dish, this.props.ordination, wData.quantity, wData.selectedPhase)}
        />;
    }

    static renderDish(dish, ordination){
        const count = ordination.countDishes(dish);
        if(count > 0){
            return new RenderingData(dish.name + " (" + count + ")",
                "secondary",
                "small,bold");
        }
        return new RenderingData(dish.name, "secondary", "small");
    }

}