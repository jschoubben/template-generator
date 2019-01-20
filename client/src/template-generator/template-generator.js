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
        this.$input = this.native.querySelector('tg-model-pane')
        this.$input.addEventListener('onSubmit', this.addItem.bind(this))
        this._render()
    }

    addItem(e) {
        this._list.push({
            text: e.detail,
            checked: false,
        });
        this._render()
    }

    removeItem(e) {
        this._list.splice(e.detail, 1)
        this._render()
    }

    toggleItem(e) {
        const item = this._list[e.detail]
        this._list[e.detail] = Object.assign({}, item, {
            checked: !item.checked
        });
        this._render()
    }

    disconnectedCallback() {}

    _render() {
        if (!this.$listContainer) return;
        // empty the list
        this.$listContainer.innerHTML = ''
        this._list.forEach((item, index) => {
            let $item = document.createElement('tg-todo-item')
            $item.setAttribute('text', item.text)
            $item.checked = item.checked
            $item.index = index
            $item.addEventListener('onRemove', this.removeItem.bind(this))
            $item.addEventListener('onToggle', this.toggleItem.bind(this))
            this.$listContainer.appendChild($item)
        });
    }
}