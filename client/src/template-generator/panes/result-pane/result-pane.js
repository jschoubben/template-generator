import {
    Webcomponent
} from '../../../decorators/index'
import css from './result-pane.scss'
import html from './result-pane.html'
import * as downloadHelper from '../../../helpers/download.helper'
import * as clipboardHelper from '../../../helpers/clipboard.helper'

@Webcomponent({
    selector: 'tg-result-pane',
    template: html,
    style: css,
})
export default class ResultPane extends HTMLElement {
    constructor() {
        super()
        this._results = []
        this.$codeMirror = null
        this.$dropdown = null
    }

    connectedCallback() {
        this.$codeMirror = this.native.querySelector('tg-code-mirror')
        this.$dropdown = this.native.querySelector('tg-dropdown')
        this.$download = this.native.querySelector('[icon="desktop-download"]')
        this.$copy = this.native.querySelector('[icon="copy"]')
        this.$download.style.visibility = 'hidden'
        this.$copy.style.visibility = 'hidden'
        this.$dropdown.addEventListener('select', this._setSelectedResult.bind(this))
        this.$download.addEventListener('click', this._downloadSelectedResult.bind(this))
        this.$copy.addEventListener('click', this._copySelectedResult.bind(this))
        this.results = {}
        this._render()
    }

    _render() {}

    // Event handler for when the dropdown value changes
    _setSelectedResult(event) {
        if (event.detail.value) {
            this.$codeMirror.value = event.detail.value
            this.$download.style.visibility = 'visible'
            this.$copy.style.visibility = 'visible'
        } else {
            this.$download.style.visibility = 'hidden'
            this.$copy.style.visibility = 'hidden'
        }
    }

    _downloadSelectedResult() {
        downloadHelper.download(this.$dropdown.selectedOption.key + '.sql', this.$dropdown.selectedOption.value)
    }

    _copySelectedResult() {
        clipboardHelper.copyToClipboard(this.$dropdown.selectedOption.value)
    }

    // Setter for the server result, the server must be a json dictionary of parsed templates
    set results(results) {
        this._results = []
        this._processResults(results)
        this.$dropdown.options = this._results
        if (this._results.length) {
            this.$dropdown.selectedOption = this._results[0]
        }
    }

    _processResults(result, prefix = '') {
        if (result) {
            Object.keys(result).forEach(key => {
                if (typeof result[key] === 'object') {
                    this._processResults(result[key], prefix + key + '.')
                } else {

                    this._results.push({
                        key: prefix + key,
                        value: result[key]
                    })
                }
            })
        }
    }
}