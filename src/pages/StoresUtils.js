import {CANC} from "../utils/Characters";
import {iGet} from "../utils/Utils";

export default class StoresUtils {

    /*
    SELECT INPUT
     */

    static initSelectInput(options) {
        return {
            values: options.values,
            id: options.id,
            renderer: options.renderer,
            label: options.label,
            colorRenderer: options.colorRenderer,
            cols: options.cols,
            value: options.value,
            visible: true,
            isValid: options.isValid,
            multiSelect: options.multiSelect,
            callback: options.callback
        };
    }

    static selectInputSelect(editor, value) {
        if (!editor.multiSelect) {
            editor.value = value;
            return editor;
        }
        editor.value.push(value);
        return editor;
    }

    static selectInputDeselect(editor, value) {
        if (!editor.multiSelect) {
            editor.value = null;
            return editor;
        }
        let index = editor.value.indexOf(value);
        editor.value.splice(index, 1);
        return editor;
    }

    static selectPageChange(editor, page) {
        return editor.set('page', page);
    }

    static resetSelectInput(editor) {
        editor.visible = false;
    }

    /*
    INTEGER INPUT
     */

    static initIntInput(options) {
        return {
            visible: true,
            label: options.label,
            text: options.value ? options.value.toString() : "",
            value: options.value,
            callback: options.callback,
            min: options.min,
            max: options.max,
            hit: false
        };
    }

    static intChar(editor, char) {
        let oldText = editor.text;
        if (char === CANC) {
            editor.text = "0";
            editor.value = 0;
        } else {
            if (oldText === "0" || !editor.hit) {
                oldText = "";
            }
            editor.hit = true;
            let newText = oldText + char;
            if (!isNaN(parseInt(newText))) {
                editor.text = newText;
                editor.value = parseInt(newText);
            }
        }
    }

    static intChange(editor, text) {
        if (!isNaN(parseInt(text))) {
            editor.text = text;
            editor.hit = true;
            editor.value = parseInt(text);
        }else{
            editor.text = "0";
            editor.hit = true;
            editor.value = 0;
        }
    }

    static resetIntInput() {
        return {
            visible: false,
            label: "",
            text: "",
            value: 0,
            callback: () => {
            }
        };
    }

    /*
    FLOAT INPUT
     */

    static initFloatInput(options) {
        return {
            visible: true,
            label: options.label,
            text: options.value ? options.value.toString() : "",
            value: options.value,
            callback: options.callback,
            min: options.min,
            max: options.max,
            hit: false
        };
    }

    static floatChar(editor, char) {
        let oldText = editor.get('text');
        if (char === CANC) {
            return editor.set('text', "");
        }
        if (oldText === "0" || !editor.get('hit')) {
            oldText = "";
        }
        let newText = oldText + char;
        editor = editor.set('hit', true);
        if (!isNaN(parseFloat(newText))) {
            editor = editor.set('text', newText);
            return editor.set('value', parseFloat(newText));
        }
        return editor;
    }

    static floatChange(editor, text) {
        if (!isNaN(parseFloat(text))) {
            editor = editor.set('text', text);
            editor = editor.set('hit', true);
            return editor.set('value', parseFloat(text));
        }
        return editor;
    }

    static resetFloatInput() {
        return {
            visible: false,
            label: "",
            text: "",
            value: 0,
            callback: () => {
            }
        };
    }

    static initTextInput(options) {
        return {
            visible: true,
            label: options.label,
            value: options.value || "",
            callback: options.callback
        };
    }

    static textChange(editor, value) {
        editor.value = value;
    }

    static resetTextInput() {
        return {
            visible: false,
            label: "",
            value: "",
            callback: () => {
            }
        };
    }

    static isInteger(text) {
        return !isNaN(parseInt(text));
    }

    static isPercent(text) {
        return this.isInteger(text) && parseInt(text) >= 0 && parseInt(text) <= 100;
    }

    static isFloat(text) {
        return !isNaN(parseFloat(text));
    }

    static settings(data, prop, def) {
        if (data.get('settings')) {
            return iGet(data, "settings.clientSettings." + prop) || def;
        }
        return def;
    }
}

export class EditorStatus {
    static CREATING = "CREATING";
    static EDITING = "EDITING";
    static SURFING = "SURFING";
}