export class Button extends HTMLButtonElement {
  constructor(){
    super()
  }

  connectedCallback() {
    const icon = this.attributes['icon']
    if(icon && icon.value){
      const iconTemplate = document.createElement('template')
      const svgContent = require('../../assets/svg/' + icon.value + '.svg')
      iconTemplate.innerHTML  = svgContent
      iconTemplate.content.firstElementChild.classList = 'icon icon-' + icon.value
      this.innerHTML = iconTemplate.innerHTML + this.innerHTML
    }
  }
}

customElements.define('tg-button', Button, { 
  extends: 'button' 
})