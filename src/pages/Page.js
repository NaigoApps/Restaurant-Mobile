import React from 'react';
import errorsStore from "../stores/ErrorsStore";
import Row from "../widgets/Row";
import Column from "../widgets/Column";
import ErrorActions from "../stores/ErrorActions";
import ViewController from "../widgets/ViewController";
import loadingStore from "../stores/LoadingStore";
import ApplicationLoadingDialog from "../components/widgets/ApplicationLoadingDialog";
import ApplicationSelectInput from "../components/widgets/ApplicationSelectInput";
import applicationStore from "../stores/ApplicationStore";
import Dimensions from "../utils/Dimensions";

export const ApplicationContext = React.createContext(undefined);

export default class Page extends ViewController {

    static bodyStyle = {
        padding: Dimensions.smallSpace
    };

    constructor(props) {
        super(props, errorsStore, loadingStore, applicationStore);
    }

    clearMessages() {
        ErrorActions.clearErrorMessages();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !nextState.loading.busy ||
            !this.state.loading.busy && nextState.loading.busy;
    }

    refreshAction() {
        if (this.props.refreshAction) {
            this.props.refreshAction();
        }
    }

    render() {
        return (
            <Row grow>
                <Column>
                    {this.props.nav}
                    <Row style={Page.bodyStyle} grow>
                        <Column>
                            {this.props.children}
                        </Column>
                    </Row>
                    <ApplicationSelectInput data={this.state.general.selectInput}/>
                    {this.buildErrorComponent()}
                    {this.buildLoadingComponent()}
                </Column>
            </Row>
        )
    }

    buildErrorComponent() {

    }

    buildLoadingComponent() {
        return <ApplicationLoadingDialog visible={this.state.loading.busy}/>
    }
};