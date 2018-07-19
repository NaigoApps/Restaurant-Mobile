import React, {Component} from 'react';
import {View} from 'react-native';
import Label from "./Label";

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class Row extends Component {
    constructor(props) {
        super(props);
    }

    computeStyle(){
        let result = {
            flexDirection: 'row',
        };
        if(this.props.grow){
            result.flex = 1;
        }else{
            result.flex = -1;
        }
        if(this.props.align){
            result.alignItems = this.props.align;
        }
        if(this.props.margin){
            result.margin = this.props.margin;
        }
        if(this.props.ofList){
            result.marginTop = 8;
        }
        if(this.props.boxMargin){
            result.marginTop = this.props.boxMargin;
            result.marginLeft = this.props.boxMargin;
            result.marginBottom = this.props.boxMargin;
            result.marginRight = this.props.boxMargin;
        }
        return result;
    }

    render() {
        return (
            <View style={this.computeStyle()}>
                <Label>{this.props.grow}</Label>
                {this.props.children}
            </View>
        );
    }

}