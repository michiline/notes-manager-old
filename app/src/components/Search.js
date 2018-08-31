import React, { Component } from 'react'
import SearchTagsTypeahead from './SearchTagsTypeahead'

import updateImg from '../images/update.png'

import '../css/App.css'

export default class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tags: [],
      words: ''
    }
    this.saveSelectedTags = this.saveSelectedTags.bind(this)
    this.inputWords = this.inputWords.bind(this)
    this.search = this.search.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  render () {
    return (
      <div>
        <div className='row headline text-center'>
          <div className='col-lg'>
            <h1 className='display-4'>Search notes</h1>
          </div>
        </div>
        <div className='row justify-content-md-center'>
          <div className='col-lg-8'>
            <form>
              <div className='form-group row'>
                <label className='col-lg-2 col-form-label'>Tags</label>
                <div className='col-lg-10'>
                  <SearchTagsTypeahead selectedTags={this.state.tags} existingTags={this.props.existingTags} saveSelectedTags={this.saveSelectedTags} />
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-lg-2 col-form-label'>Words</label>
                <div className='col-lg-10'>
                  <input className='form-control' value={this.state.words} onChange={e => this.inputWords(e)} type='text' placeholder='Enter words' />
                </div>
              </div>
              <div className='form-group row '>
                <div className='col-lg d-flex justify-content-end'>
                  <button className='btn btn-primary button' onClick={e => this.search(e)} >Search</button>
                  <button onClick={this.cancel} className='btn btn-secondary '>Cancel</button>
                </div>
              </div>
              {this.props.searchNotes && this.props.searchNotes.map((note, index) => {
                return (
                  <div className='card' key={index}>
                    <div className='card-body'>
                      <h5 className='card-title note-title'>{note.title} <a data-toggle='tab' href={'/update/' + note.id}><img className='updateImg' src={updateImg} alt='edit' /></a></h5>
                      {this.props.prepareTags(note.tags)}
                      <p className='card-text note-body'>{note.body}</p>
                      <p className='card-text no-bot-margin'><small className='text-muted'><strong>Created:</strong> {note.created.toLocaleString('hr-HR', { timeZone: 'ETC/GMT-2' }) } | <strong>Updated:</strong> {note.updated.toLocaleString('hr-HR', { timeZone: 'ETC/GMT-2' }) } | <strong>Due:</strong> {note.dueDate.toLocaleString('hr-HR', { timeZone: 'ETC/GMT-2' })} - <strong>{Math.floor((note.dueDate.getTime() - Date.now()) / 86400000)} days left</strong> </small></p>
                    </div>
                  </div>
                )
              })}
            </form>
          </div>
        </div>
      </div>
    )
  }

  inputWords (e) {
    this.setState({
      words: e.target.value
    })
  }

  async search (e) {
    e.preventDefault()
    try {
      await this.props.search({
        tags: this.state.tags,
        words: splitString(this.state.words)
      })
    } catch (err) {
      console.log(err)
    }
  }
  async cancel (e) {
    e.preventDefault()
    this.props.history.push('/')
  }
  async saveSelectedTags (tags) {
    this.setState({
      tags: tags
    })
  }
}

function splitString (s) {
  return s.length === 0 ? [] : s.split(' ')
}
