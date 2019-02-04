export * from './panes/model-pane/model-pane'
export * from './panes/result-pane/result-pane'
export * from './panes/template-pane/template-pane'

import { Webcomponent } from '../decorators/index'
import css from './template-generator.scss'
import html from './template-generator.html'

@Webcomponent({
    selector: 'tg-main',
    template: html,
    style: css,
})
export default class TemplateGenerator extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        // define private variables
        this.toggleButton = this.native.querySelector('#toggleDirection')
        this.parseButton = this.native.querySelector('#generateTemplate')
        this.panes = this.native.querySelector('.panes')
        this.modelPane = this.native.querySelector('tg-model-pane')
        this.resultPane = this.native.querySelector('tg-result-pane')
        this.templatePane = this.native.querySelector('tg-template-pane')

        // load default settings
        if(localStorage.getItem('stng.dir') === 'true') {
            this.toggleDirection()
        }
        // add event listeners
        this.toggleButton.addEventListener('click', this.toggleDirection.bind(this))
        this.parseButton.addEventListener('click', this.parseTemplate.bind(this))
        this._render()
    }

    toggleDirection(){
        this.toggleButton.classList.toggle('vertical')
        this.panes.classList.toggle('horizontal')
        localStorage.setItem('stng.dir', this.panes.classList.contains('horizontal'))
    }

    async parseTemplate() {
        const resp = await fetch(API_URL + 'api/parse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: JSON.parse(this.modelPane.model),
                customValues: JSON.parse(this.modelPane.customValues),
                template: this.templatePane.value
            })
        })
        const body = await resp.json()
        this.resultPane.results = body.data
    }

    disconnectedCallback() {}

    _render() {
    }
}