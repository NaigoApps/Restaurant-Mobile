import React, {Component} from 'react';
import {Text} from 'react-native';
import TextStyles from "../utils/TextStyles";

export default class Label extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const style = this.props.style;
        return (
            <Text style={style ? TextStyles.forName(style) : TextStyles.forName()}>
                {this.props.children}
            </Text>
        );
    }

}