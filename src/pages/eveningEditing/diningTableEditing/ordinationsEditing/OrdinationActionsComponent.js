import React from 'react';
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import OrdinationsEditorActions from "./OrdinationsEditorActions";
import RoundButton from "../../../../widgets/RoundButton";

/**
 * props:
 * ordination
 * visible
 */

export default class OrdinationActionsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Row grow>
            <Column>
                <Row grow>
                    <Column>
                        <Row mt>
                            <Column>
                                <RoundButton
                                    commitAction={() => OrdinationsEditorActions.selectOrdination(this.props.ordination)}
                                    text="Modifica"/>
                            </Column>
                        </Row>
                        <Row mt>
                            <Column>
                                <RoundButton
                                    commitAction={() => OrdinationsEditorActions.printOrdination(this.props.ordination)}
                                    style={this.props.ordination && this.props.ordination.dirty ? "warning" : "secondary"}
                                    text="Stampa"/>
                            </Column>
                        </Row>
                        <Row mt>
                            <Column>
                                <RoundButton
                                    commitAction={() => OrdinationsEditorActions.beginOrdinationAbortion(this.props.ordination)}
                                    text="Stampa annullamento"
                                    style="danger"/>
                            </Column>
                        </Row>
                        <Row mt>
                            <Column>
                                <RoundButton
                                    commitAction={() => OrdinationsEditorActions.beginOrdinationDeletion(this.props.ordination)}
                                    text="Elimina"
                                    style="danger"/>
                            </Column>
                        </Row>
                    </Column>
                </Row>
                <Row>
                    <Column auto>
                        <RoundButton text="Torna al tavolo"
                                     style="info"
                                     commitAction={() => OrdinationsEditorActions.hideOptions()}/>
                    </Column>
                </Row>
            </Column>
        </Row>
    }

}