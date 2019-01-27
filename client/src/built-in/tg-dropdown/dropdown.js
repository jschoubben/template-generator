import {
  Webcomponent
} from '../../decorators/Webcomponent'
import css from './dropdown.scss'
@Webcomponent({
  selector: 'tg-dropdown',
  template: `
    <span></span>
    ${require('../../assets/svg/chevron-down.svg')}
    <ul></ul>
  `,
  style: css
})
export class Dropdown extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.$list = this.native.querySelector('ul')
    this.$selectedOptionText = this.native.querySelector('span')
    this.native.addEventListener('click', this.toggleState.bind(this))
  }

  // Event handler to open/close the dropdown options
  toggleState() {
    this.$list.classList.toggle('open')
    if (this.$list.classList.contains('open')) {
      // TODO: handle document click to hide the list
    }
  }

  // Event handler for the <li> click events
  selectOption(e) {
    this.selectedOption = this._options[e.target.id]
  }

  // Setter for the options of the dropdown
  set options(value) {
    this._options = value
    this.$list.innerHTML = ''
    if (value.length) {
      this.style.visibility = 'visible'
      value.forEach((option, index) => {
        if (typeof option === 'string') {
          option = {
            key: option,
            value: option
          }
        }
        const $li = document.createElement('li')
        $li.innerHTML = `${option.key}`
        $li.setAttribute('id', index)
        this.$list.appendChild($li)
        $li.addEventListener('click', this.selectOption.bind(this))
      })
    } else {
      this.style.visibility = 'hidden'
    }
  }

  // Updates the selected option and dispatches a "select" event
  set selectedOption(option) {
    if (typeof option === 'string') {
      option = {
        key: option,
        value: option
      }
    }
    this._selectedOption = option
    this.$selectedOptionText.innerText = option.key
    const select = new CustomEvent("select", {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: this._selectedOption
    });
    this.dispatchEvent(select)
  }

  get selectedOption() {
    return this._selectedOption
  }

  get selectedOptionValue() {
    return this._selectedOption ? this._selectedOption.value : null
  }
}