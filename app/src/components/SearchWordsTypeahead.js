import React, { Component } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'

import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css'

export default class SearchWordsTypeahead extends Component {
  render () {
    const multiple = true
    return (
      <Typeahead
        clearButton
        labelKey='word'
        multiple={multiple}
        options={[]}
        placeholder='Choose words'
        onChange={e => this.props.saveWords(e)}
      />
    )
  }
}
