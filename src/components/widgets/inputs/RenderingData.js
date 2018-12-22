export default class RenderingData{
    constructor(text, bgColor, textStyle){
        this._text = text;
        this._bgColor = bgColor;
        this._textStyle = textStyle;
    }


    get text() {
        return this._text;
    }

    set text(value) {
        this._text = value;
    }

    get backgroundColor() {
        return this._bgColor;
    }

    set backgroundColor(value) {
        this._bgColor = value;
    }

    get textStyle(){
        return this._textStyle;
    }

    set textStyle(value){
        this._textStyle = value;
    }
}