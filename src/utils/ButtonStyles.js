export const colors = {
    primary: "#337ab7",
    secondary: "#ffffff",
    success: "#5cb85c",
    danger: "#d43f3a",
    warning: "#f0ad4e",
    info: "#5bc0de"
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
                justifyContent: 'center'
            },
            center: {
                justifyContent: 'center'
            },
            right: {
                justifyContent: 'center'
            }
        },
        appearances: {
            success: {
                backgroundColor: colors.success,
                borderColor: borders.success
            },
            danger: {
                backgroundColor: colors.danger,
                borderColor: borders.danger
            },
            warning: {
                backgroundColor: colors.warning,
                borderColor: borders.warning
            },
            secondary: {
                backgroundColor: colors.secondary,
                borderColor: borders.secondary
            },
            disabled: {
                backgroundColor: "#DDDDDD",
                borderColor: "#DDDDDD"
            },
            primary: {
                backgroundColor: colors.primary,
                borderColor: borders.primary
            }
        },
        sizes: {
            default: {
                height: 64,
                paddingLeft: 8,
                paddingRight: 8
            }
        },
        shapes: {
            round: {
                borderWidth: 1,
                borderRadius: 12
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