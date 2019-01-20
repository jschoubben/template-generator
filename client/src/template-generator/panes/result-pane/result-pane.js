import * as CodeMirror from '../../../shared/code-mirror/lib/codemirror.js'
import { Webcomponent } from '../../../decorators/index'
import css from './result-pane.scss'
import html from './result-pane.html'

@Webcomponent({
    selector: 'tg-result-pane',
    template: html,
    style: css,
})
export default class ResultPane extends HTMLElement {
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
            readOnly: true
        })
        this._render()
    }

    _render() {
    }
}