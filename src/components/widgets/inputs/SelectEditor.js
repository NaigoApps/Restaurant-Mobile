import React, {Component} from 'react';
import RoundButton from "../../../widgets/RoundButton";
import {ApplicationActions} from "../../../actions/ApplicationActions";
import RenderingData from "./RenderingData";

export default class SelectEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }

    renderValue(value) {
        let renderingData;
        if (this.props.options.renderer) {
            renderingData = this.props.options.renderer(value);
            if (renderingData instanceof RenderingData) {
                return renderingData;
            }
            renderingData = new RenderingData(renderingData, "secondary");
        } else {
            renderingData = new RenderingData(value, "secondary");
        }
        return renderingData;
    }

    render() {
        const label = this.props.options.label;
        const rendered = this.renderValue(this.props.options.value);
        return <RoundButton
            disabled={this.props.disabled}
            text={label + ": " + rendered.text}
            style={rendered.backgroundColor}
            commitAction={() => ApplicationActions.showSelectInput(this.props.options)}
        />;
    }

}