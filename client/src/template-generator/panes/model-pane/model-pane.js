import * as CodeMirror from '../../../shared/code-mirror/lib/codemirror.js'
import { Webcomponent } from '../../../decorators/index'
import css from './model-pane.scss'
import html from './model-pane.html'

@Webcomponent({
    selector: 'tg-model-pane',
    template: html,
    style: css,
})
export default class ModelPane extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        var myCodeMirror = CodeMirror(this.native, {
            mode: {
                name: "javascript",
                json: true
            },
            tabSize: 2,
            lineNumbers: true,
            theme: 'solarized dark',
            extraKeys: {"Ctrl-Q": function(cm){ 
                cm.foldCode(cm.getCursor()); 
            }},
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            matchBrackets: true,
            autoCloseBrackets: true,
            scrollbarStyle: 'overlay'
        })
        this._render()
    }

    _render() {
    }
}