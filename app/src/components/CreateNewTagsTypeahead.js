import React, { Component } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'

import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css'

class CreateNewTagsTypeAhead extends Component {
  render () {
    const multiple = true
    return (
      <Typeahead
        clearButton
        allowNew
        newSelectionPrefix='Add a new tag: '
        labelKey='tag'
        defaultSelected={this.props.selectedTags}
        multiple={multiple}
        options={[]}
        placeholder='Create new tags'
        onChange={e => this.props.saveSelectedTags(e)}
      />
    )
  }
}

export default CreateNewTagsTypeAhead
