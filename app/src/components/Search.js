import React, { Component } from 'react'

import '../css/App.css'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tags: '',
      words: ''
    }
    this.inputTags = this.inputTags.bind(this)
    this.inputWords = this.inputWords.bind(this)
    this.search = this.search.bind(this)
  }

  render () {
    return (
      <div className='container-fluid'>
        <h3>Search notes</h3>
        <label>Tags</label>
        <input value={this.state.tags} onChange={e => this.inputTags(e)} type='text' placeholder='Enter tags' />
        <label>Words</label>
        <input value={this.state.words} onChange={e => this.inputWords(e)} type='text' placeholder='Enter words' />
        <button onClick={this.search} type='submit'>Search</button>
      </div>
    )
  }

  inputTags (e) {
    this.setState({
      tags: e.target.value
    })
  }

  inputWords (e) {
    this.setState({
      words: e.target.value
    })
  }

  async search (e) {
    e.preventDefault()
    try {
      const res = await this.props.search({
        tags: splitString(this.state.tags),
        words: splitString(this.state.words)
      })
      console.log(res.data)
    } catch (err) {
      this.setState({
        tags: '',
        words: ''
      })
      console.log(err)
    }
  }
}

function splitString (s) {
  return s.length === 0 ? [] : s.split(' ')
}

export default Search
