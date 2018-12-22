export const colors = {
    primary: "#337ab7",
    secondary: "#ffffff",
    success: "#5cb85c",
    danger: "#d43f3a",
    warning: "#f0ad4e",
    info: "#5bc0de",
    disabled: "#dddddd"
};

export const borders = {
    primary: "#2e6da4",
    secondary: "#cccccc",
    success: "#4cae4c",
    danger: "#d9534f",
    warning: "#eea236",
    info: "#5bc0de"
};

export default class ButtonStyles {

    static styleTypes = {
        aligns: {
            left: {
                display: 'flex',
                justifyContent: 'flex-start'
            },
            center: {
                display: 'flex',
                justifyContent: 'center'
            },
            right: {
                display: 'flex',
                justifyContent: 'flex-end'
            }
        },
        appearances: {
            success: {
                color: "#FFFFFF",
                backgroundColor: colors.success,
                borderColor: borders.success
            },
            danger: {
                color: "#FFFFFF",
                backgroundColor: colors.danger,
                borderColor: borders.danger
            },
            warning: {
                color: "#000000",
                backgroundColor: colors.warning,
                borderColor: borders.warning
            },
            secondary: {
                color: "#000000",
                backgroundColor: colors.secondary,
                borderColor: borders.secondary
            },
            disabled: {
                color: "#999999",
                backgroundColor: colors.disabled,
                borderColor: colors.disabled
            },
            primary: {
                color: "#FFFFFF",
                backgroundColor: colors.primary,
                borderColor: borders.primary
            },
            info: {
                color: "#FFFFFF",
                backgroundColor: colors.info,
                borderColor: borders.info
            }
        },
        sizes: {
            icon: {
                height: 48,
                width: 48,
                paddingLeft: 4,
                paddingRight: 4,
                marginTop: 4,
                marginBottom: 4,
                marginLeft: 4,
                marginRight: 4
            },
            small: {
                height: 32,
                paddingLeft: 4,
                paddingRight: 4
            },
            default: {
                height: 64,
                paddingLeft: 8,
                paddingRight: 8
            }
        },
        shapes: {
            iconRound: {
                borderWidth: 1,
                borderRadius: 16
            },
            round: {
                borderWidth: 1,
                borderRadius: 12
            },
            iconCircle: {
                borderWidth: 1,
                borderRadius: 24
            },
            flat: {
                borderWidth: 1,
                borderRadius: 0
            }
        }
    };

    static forName(styles) {
        const defaults = {
            aligns: this.styleTypes.aligns.center,
            sizes: this.styleTypes.sizes.default,
            appearances: this.styleTypes.appearances.secondary,
            shapes: this.styleTypes.shapes.round
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