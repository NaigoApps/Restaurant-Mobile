import React, {Component} from 'react';
import {View} from 'react-native';
import Label from "./Label";
import Dimensions from "../utils/Dimensions";

export default class Row extends Component {
    constructor(props) {
        super(props);
    }

    computeStyle(){
        let result = {
            display: 'flex',
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
        if(this.props.justify){
            result.justifyContent = this.props.justify
        }
        if(this.props.margin){
            result.margin = this.props.margin;
        }
        if(this.props.mt){
            result.marginTop = this.props.mt !== true ? this.props.mt : Dimensions.smallSpace;
        }
        if(this.props.mb){
            result.marginBottom = this.props.mb !== true ? this.props.mb : Dimensions.smallSpace;
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
        if(this.props.style){
            result = {
                ...result,
                ...this.props.style
            }
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