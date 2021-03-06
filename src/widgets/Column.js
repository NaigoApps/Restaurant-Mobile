import React, {Component} from 'react';
import {View} from 'react-native';
import Dimensions from "../utils/Dimensions";

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class Column extends Component {
    constructor(props) {
        super(props);
    }

    computeStyle() {
        let result = {
            display: 'flex',
            flexDirection: 'column'
        };
        if (this.props.grow) {
            result.flex = this.props.grow;
        }else if (this.props.auto) {
            result.flex = -1;
        } else {
            result.flex = 1;
        }
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
            result.marginRight = this.props.mr === true ? Dimensions.smallSpace : this.props.mr;
        }
        if (this.props.ml) {
            result.marginLeft = this.props.ml === true ? Dimensions.smallSpace : this.props.ml;
        }
        if (this.props.paddingTop) {
            result.paddingTop = this.props.paddingTop;
        }
        if (this.props.sideMargin) {
            result.marginLeft = this.props.sideMargin;
            result.marginRight = this.props.sideMargin;
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
