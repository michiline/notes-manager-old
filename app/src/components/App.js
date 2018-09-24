import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import axios from 'axios'

import Api from '../api/Api'
import Toolbar from './Toolbar'
import NoteList from './NoteList'
import Create from './Create'
import Update from './Update'
import Search from './Search'

import '../css/App.css'

export default class App extends Component {
  constructor (props) {
    super(props)
    // localStorage.clear()
    this.api = new Api(axios.create())
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.search = this.search.bind(this)
    this.refreshNotes = this.refreshNotes.bind(this)
    this.getExistingTags = this.getExistingTags.bind(this)
    this.saveNewFavoriteTags = this.saveNewFavoriteTags.bind(this)
    this.homeTagTab = this.homeTagTab.bind(this)
    this.getHashtagLinkNotes = this.getHashtagLinkNotes.bind(this)
    this.prepareUpdateNote = this.prepareUpdateNote.bind(this)
    this.prepareTags = this.prepareTags.bind(this)
    this.setDeleteNoteId = this.setDeleteNoteId.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
    this.state = {
      notes: JSON.parse(localStorage.getItem('notes')),
      favoriteTags: JSON.parse(localStorage.getItem('favoriteTags')) || [],
      existingTags: [],
      updateNote: {},
      searchNotes: [],
      deleteNoteId: ''
    }
  }
  async componentDidMount () {
    this.refreshNotes()
    this.getExistingTags()
  }
  render () {
    return (
      <div className='App'>
        <Toolbar
          favoriteTags={this.state.favoriteTags}
          existingTags={this.state.existingTags}
          saveNewFavoriteTags={this.saveNewFavoriteTags} />
        <NoteList
          notes={this.state.notes}
          getHashtagLinkNotes={this.getHashtagLinkNotes}
          deleteNoteId={this.state.deleteNoteId}
          setDeleteNoteId={this.setDeleteNoteId}
          deleteNote={this.deleteNote} />
        <Switch>
          <Route exact path='/update/:id' component={(props) => {
            this.prepareUpdateNote(props.match.params.id)
            return (
              <Update
                updateNote={this.state.updateNote}
                favoriteTags={this.state.favoriteTags}
                existingTags={this.state.existingTags}
                history={props.history}
                update={this.update} />)
          }} />
          <Route exact path='/create' component={(props) =>
            <Create
              create={this.create}
              existingTags={this.state.existingTags}
              favoriteTags={this.state.favoriteTags}
              history={props.history}
            />}
          />
          <Route exact path='/search' component={(props) =>
            <Search
              search={this.search}
              existingTags={this.state.existingTags}
              searchNotes={this.state.searchNotes}
              prepareTags={this.prepareTags}
              history={props.history}
              deleteNoteId={this.state.deleteNoteId}
              setDeleteNoteId={this.setDeleteNoteId}
              deleteNote={this.deleteNote} />} />
        </Switch>
      </div>
    )
  }

  async create (data) {
    const res = await this.api.create(data)
    this.refreshNotes()
    this.getExistingTags()
    return res
  }

  async search (params) {
    const res = await this.api.get(params)
    this.setState({
      searchNotes: res.data
    })
  }

  async update (id, data) {
    const res = await this.api.update(id, data)
    this.refreshNotes()
    this.getExistingTags()
    return res
  }

  setDeleteNoteId (id) {
    this.setState({
      deleteNoteId: id
    })
  }

  async deleteNote () {
    await this.api.delete(this.state.deleteNoteId)
    this.setState({
      deleteNoteId: ''
    })
    this.refreshNotes()
    this.getExistingTags()
  }

  async getHashtagLinkNotes (tag) {
    console.log('get')
    const res = await this.api.get({
      tags: [tag]
    })
    let notes = this.state.notes
    notes[tag] = res.data
    this.setState({
      notes: notes
    })
  }

  async refreshNotes () {
    console.log('ref')
    let notesPromise = this.state.favoriteTags.map(tag => this.api.get({ tags: [tag] }))
    let notesArr = await Promise.all(notesPromise)
    let notes = {}
    this.state.favoriteTags.forEach((tag, index) => {
      notes[tag] = notesArr[index].data
    })
    localStorage.setItem('notes', JSON.stringify(notes))
    this.setState({
      notes: notes
    })
  }

  async getExistingTags () {
    const res = await this.api.getExistingTags()
    this.setState({
      existingTags: res.data
    })
  }

  async saveNewFavoriteTags (favoriteTags) {
    let notesPromise = favoriteTags.map(tag => this.api.get({ tags: [tag] }))
    let notesArr = await Promise.all(notesPromise)
    let notes = {}
    favoriteTags.forEach((tag, index) => {
      notes[tag] = notesArr[index].data
    })
    localStorage.setItem('favoriteTags', JSON.stringify(favoriteTags))
    localStorage.setItem('notes', JSON.stringify(notes))
    this.setState({
      favoriteTags: favoriteTags,
      notes: notes
    })
  }

  homeTagTab (props) {
    if (props.location.hash.length === 0) {
      if (this.state.favoriteTags.length > 0) {
        const url = `/#${this.state.favoriteTags[0]}`
        props.history.push(url)
        return '#' + this.state.favoriteTags[0]
      }
    }
    return props.location.hash
  }

  prepareUpdateNote (id) {
    if (this.state.updateNote && Object.entries(this.state.updateNote).length > 0) {
      return
    }
    let updateNote
    Object.entries(this.state.notes).forEach(entry => {
      const foundNote = entry[1].find(note => note.id === id)
      if (foundNote !== undefined) {
        updateNote = foundNote
      }
    })
    // ako note nije u favoriteTagsima onda ga nema, pa ga treba dohvatit
    this.setState({
      updateNote: updateNote
    })
  }

  prepareTags (tags) {
    const hashtags = tags.map((tag, index) => {
      return <NavLink onClick={async () => this.getHashtagLinkNotes(tag)} className='tag' to={'/#' + tag} key={index}>{'#' + tag }</NavLink>
    })
    return (
      <div className='tags'>
        {hashtags}
      </div>
    )
  }
}
