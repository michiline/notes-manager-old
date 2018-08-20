import React, { Component } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'

import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css'

class HomeTagsTypeAhead extends Component {
  render () {
    const multiple = true
    return (
      <Typeahead
        clearButton
        labelKey='tag'
        defaultSelected={this.props.favoriteTags}
        multiple={multiple}
        options={this.props.existingTags}
        placeholder='Choose tags'
        onChange={e => this.props.saveNewFavoriteTags(e)}
      />
    )
  }
}

export default HomeTagsTypeAhead
