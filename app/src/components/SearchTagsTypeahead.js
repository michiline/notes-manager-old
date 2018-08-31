import React, { Component } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'

import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css'

export default class SearchTagsTypeahead extends Component {
  render () {
    const multiple = true
    return (
      <Typeahead
        clearButton
        labelKey='tag'
        multiple={multiple}
        options={this.props.existingTags}
        placeholder='Choose tags'
        onChange={e => this.props.saveSelectedTags(e)}
      />
    )
  }
}
