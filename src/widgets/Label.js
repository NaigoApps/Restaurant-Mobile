import React, {Component} from 'react';
import {Text} from 'react-native';
import TextStyles from "../utils/TextStyles";

export default class Label extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let style = TextStyles.forName(this.props.style);
        if(this.props.color){
            style.color = this.props.color;
        }

        return (
            <Text style={style}>
                {this.props.children}
            </Text>
        );
    }

}