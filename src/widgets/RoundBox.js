import React, {Component} from 'react';
import {View} from 'react-native';
import Dimensions from "../utils/Dimensions";

export default class RoundBox extends Component {
    constructor(props) {
        super(props);
    }

    computeStyle() {
        let result = {
            flexDirection: 'column',
            flex: 1,
            borderWidth: 1,
            borderColor: "#cccccc",
            borderRadius: Dimensions.mediumSpace,
            padding: Dimensions.smallSpace
        };
        if (this.props.align) {
            result.alignItems = this.props.align;
        }
        if (this.props.justify) {
            result.justifyContent = this.props.justify;
        }
        if (this.props.padding) {
            result.padding = this.props.padding;
        }
        if (this.props.mr) {
            result.marginRight = this.props.mr;
        }
        if (this.props.ml) {
            result.marginLeft = this.props.ml;
        }
        return result;
    }

    render() {
        return (
            <View style={this.computeStyle()}>
                {this.props.children}
            </View>
        );
    }

}
