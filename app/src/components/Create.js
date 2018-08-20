import React, { Component } from 'react'
import CreateExistingTagsTypeahead from './CreateExistingTagsTypeahead'
import CreateNewTagsTypeahead from './CreateNewTagsTypeahead'

import '../css/App.css'

class Create extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      tags: [],
      newTags: [],
      body: ''
    }
    this.inputTitle = this.inputTitle.bind(this)
    this.inputBody = this.inputBody.bind(this)
    this.saveExistingSelectedTags = this.saveExistingSelectedTags.bind(this)
    this.saveNewSelectedTags = this.saveNewSelectedTags.bind(this)
    this.create = this.create.bind(this)
  }
  render () {
    return (
      <div className='container-fluid'>
        <h3>Create new note</h3>
        <label>Title</label>
        <input value={this.state.title} onChange={e => this.inputTitle(e)} type='text' placeholder='Enter title' />
        <label>Tags</label>
        <CreateExistingTagsTypeahead selectedTags={this.state.tags} existingTags={this.props.existingTags} saveSelectedTags={this.saveExistingSelectedTags} />
        <CreateNewTagsTypeahead selectedTags={this.state.newTags} saveSelectedTags={this.saveNewSelectedTags} />
        <label>Body</label>
        <input value={this.state.body} onChange={e => this.inputBody(e)} type='text' placeholder='Enter body' />
        <button onClick={this.create} type='submit'>Create</button>
        <br />
      </div>
    )
  }
  inputTitle (e) {
    this.setState({
      title: e.target.value
    })
  }
  inputBody (e) {
    this.setState({
      body: e.target.value
    })
  }
  async saveExistingSelectedTags (tags) {
    this.setState({
      tags: tags
    })
  }
  async saveNewSelectedTags (tags) {
    const newTags = tags.map(tag => {
      if (typeof tag === 'object') {
        return tag.tag
      }
      return tag
    })
    this.setState({
      newTags: newTags
    })
  }
  async create (e) {
    e.preventDefault()
    try {
      await this.props.create({
        title: this.state.title,
        tags: this.state.tags.concat(this.state.newTags),
        body: this.state.body
      })
    } catch (err) {
      this.setState({
        title: '',
        tags: [],
        newTags: [],
        body: ''
      })
      console.log(err)
    }
  }
}

export default Create
