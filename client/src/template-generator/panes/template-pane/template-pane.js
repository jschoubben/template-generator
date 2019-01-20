import * as CodeMirror from '../../../shared/code-mirror/lib/codemirror.js'
import { Webcomponent } from '../../../decorators/index'
import css from './template-pane.scss'
import html from './template-pane.html'

@Webcomponent({
    selector: 'tg-template-pane',
    template: html,
    style: css,
})
export default class TemplatePane extends HTMLElement {
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
            autoCloseBrackets: true
        })
        this._render()
    }

    _render() {
    }
}