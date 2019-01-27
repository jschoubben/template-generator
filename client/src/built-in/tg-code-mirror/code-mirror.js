import {
  Webcomponent
} from '../../decorators/index'
import * as CodeMirror from '../../shared/code-mirror/lib/codemirror.js'

@Webcomponent({
  selector: 'tg-code-mirror',
})
export default class TGCodeMirror extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.myCodeMirror = CodeMirror(this.native, {
      mode: {
        name: this.getAttribute('mode') || 'javascript',
        json: true
      },
      tabSize: this.getAttribute('tabsize') || 2,
      lineNumbers: true,
      theme: this.getAttribute('theme') || 'solarized dark',
      extraKeys: {
        'Ctrl-Q': function (cm) {
          cm.foldCode(cm.getCursor());
        }
      },
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      matchBrackets: true,
      autoCloseBrackets: true,
      scrollbarStyle: 'overlay',
      readOnly: this.getAttribute('readonly') === 'true'
    })
    this._render()
  }

  _render() {}

  get value() {
    return this.myCodeMirror ? this.myCodeMirror.getValue() : ''
  }

  set value(val) {
    if(this.myCodeMirror){ 
      this.myCodeMirror.setValue(val)
    }
  }
}