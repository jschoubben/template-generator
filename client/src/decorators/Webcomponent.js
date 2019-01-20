export function Webcomponent(config = {
  selector,
  template,
  style,
  useShadow
}) {
  return function decorator(klass) {
    validateSelector(config.selector)
    if (!config.template) {
      throw new Error('You need to pass a template for the element')
    }
    const element = document.createElement('template')
    if(config.style){
      config.template = `<style>${config.style}</style>${config.template}`
    }
    element.innerHTML = config.template

    const connectedCallback = klass.prototype.connectedCallback || function(){}
    klass.prototype.connectedCallback = function() {
      const clone = element.content.cloneNode(true)
      if(config.useShadow) {
        this.native = this.attachShadow({mode: 'open'})
      } else {
        this.native = this
      }
      this.native.appendChild(clone)
      connectedCallback.call(this)
    }
    window.customElements.define(config.selector, klass)
  }
}

const validateSelector = (selector) => {
  if (selector.indexOf('-') <= 0) {
    throw new Error('You need at least 1 dash in the custom element name!');
  }
};