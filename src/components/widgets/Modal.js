import React, {Component} from 'react';
import {View} from 'react-native';
import Dimensions from "../../utils/Dimensions";
import Column from "../../widgets/Column";
import {colors} from "../../utils/ButtonStyles";

export default class Modal extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        // if (!prevProps.visible && this.props.visible) {
        //     global.$("#" + this.state.uuid).modal("show");
        // } else if (prevProps.visible && !this.props.visible) {
        //     global.$("#" + this.state.uuid).modal("hide");
        // }
    }

    componentWillUnmount() {
        // if (this.props.visible) {
        //     global.$("#" + this.state.uuid).modal("hide");
        // }
    }


    static modalClass(props) {
        // let classes = ["modal", "fade"];
        // return classes.join(" ");
    }

    static modalDialogClass(props) {
        // let classes = ["modal-dialog"];
        // if (props.lg) {
        //     classes.push("modal-lg");
        // }
        // return classes.join(" ");
    }

    render() {
        return (
            <View style={Modal.modalContainerStyle(this.props)}>
                <View style={Modal.modalStyle(this.props)}>
                    <Column>
                        {this.props.children}
                    </Column>
                </View>
            </View>
        );
    }

    static modalStyle(props) {
        if (props.visible) {
            const style = {
                position: "absolute",
                backgroundColor: "white",
                borderWidth: 1,
                borderRadius: Dimensions.smallSpace,
                borderColor: colors.disabled,
                margin: Dimensions.smallSpace,
                padding: Dimensions.smallSpace,
                display: "flex",
                flexDirection: "row",
                flex: 0
            };
            if (!props.collapse) {
                style.top = Dimensions.smallSpace;
                style.bottom = Dimensions.smallSpace;
            }
            return style;
        } else {
            return {
                display: "none"
            }
        }
    }

    static modalContainerStyle(props) {
        if (props.visible) {
            const style = {
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: "#FFFFFFCC",
            };
            if (props.collapse) {
                style.justifyContent = "center";
                style.alignItems = "center";
            }
            return style;
        } else {
            return {
                display: "none"
            }
        }
    }

}