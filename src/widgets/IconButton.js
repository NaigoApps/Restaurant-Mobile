import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import ButtonStyles from "../utils/ButtonStyles";
import {TouchableOpacity, View} from "react-native";
import TextStyles from "../utils/TextStyles";

export default class IconButton extends Component {
    constructor(props) {
        super(props);
    }

    clickAction(){
        if(this.props.commitAction){
            this.props.commitAction();
        }
    }

    longClickAction(){
        if(this.props.longCommitAction){
            this.props.longCommitAction();
        }
    }

    render() {
        let color = this.props.color || "secondary";
        color = this.props.active ? "primary" : color;
        return (
            <TouchableOpacity
                disabled={this.props.disabled}
                onLongPress={() => this.longClickAction()}
                onPress={() => this.clickAction()}>
                <View style={ButtonStyles.forName("icon,iconCircle," + color)}>
                    <Icon size={TextStyles.styleTypes.sizes.medium.fontSize} name={this.props.icon}
                          style={{textAlign: "center"}}/>
                </View>
            </TouchableOpacity>

        );
    }

}