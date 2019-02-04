import * as CodeMirror from '../../../shared/code-mirror/lib/codemirror.js'
import {
    Webcomponent
} from '../../../decorators/index'
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
        this.$codeMirror = this.native.querySelector('tg-code-mirror')
        this.$dropdown = this.native.querySelector('tg-dropdown')
        fetch(API_URL + 'api/templates').then(resp => {
            resp.json().then(body => {
                this._templates = body.data
                if (this._templates.length) {
                    this.$dropdown.options = this._templates
                    this.$dropdown.selectedOption = this._templates[0]
                }
            })
        })
        this.$dropdown.addEventListener('select', this.setSelectedResult.bind(this))
        this._render()
    }

    _render() {}

    // Event handler for when the dropdown value changes
    async setSelectedResult() {
        const resp = await fetch(API_URL + 'api/template?template=' + this.$dropdown.selectedOptionValue)
        const body = await resp.json()
        this.$codeMirror.value = body.data
    }

    get value(){
        return this.$codeMirror ? this.$codeMirror.value : ''
    }
}