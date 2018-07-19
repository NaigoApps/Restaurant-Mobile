import {colors} from "./ButtonStyles";

export default class TextStyles {

    static styleTypes = {
        aligns: {
            left: {
                textAlign: 'left'
            },
            center: {
                textAlign: 'center'
            },
            right: {
                textAlign: 'right'
            }
        },
        appearances: {
            success: {
                color: "#FFFFFF"
            },
            disabled: {
                color: "#999999"
            },
            danger: {
                color: "#FFFFFF"
            },
            secondary: {
                color: "#000000"
            },
            primary: {
                color: "#FFFFFF"
            },
            red: {
                color: colors.danger
            },
            orange: {
                color: colors.warning
            },
            green: {
                color: colors.success
            }
        },
        decoration: {
            none: {},
            bold: {
                fontWeight: "bold"
            }
        },
        sizes: {
            small: {
                fontSize: 16
            },
            medium: {
                fontSize: 20
            },
            large: {
                fontSize: 24
            }
        },
        shapes: {
            standard: {
                borderWidth: 0
            },
            badge: {
                padding: 8,
                borderRadius: 16,
                borderWidth: 1
            }
        }
    };

    static forName(styles) {
        const defaults = {
            aligns: this.styleTypes.aligns.center,
            sizes: this.styleTypes.sizes.medium,
            appearances: this.styleTypes.appearances.secondary,
            shapes: this.styleTypes.shapes.standard,
            decoration: this.styleTypes.decoration.none
        };
        styles = styles ? styles.split(",") : [];
        let styleDef = {};
        Object.keys(this.styleTypes).forEach(styleType => {
            let result;
            styles.forEach(style => {
                if (Object.keys(this.styleTypes[styleType]).includes(style)) {
                    result = this.styleTypes[styleType][style];
                }
            });
            if (!result) {
                result = defaults[styleType] || {};
            }
            styleDef = {...styleDef, ...result};
        });
        return styleDef;
    }
}