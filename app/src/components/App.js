import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'

import Api from '../api/Api'
import Home from './Home'
import Update from './Update'

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
    this.getHashtagNotes = this.getHashtagNotes.bind(this)
    this.prepareUpdateNote = this.prepareUpdateNote.bind(this)
    this.state = {
      notes: parseNotes(JSON.parse(localStorage.getItem('notes'))) || {},
      favoriteTags: JSON.parse(localStorage.getItem('favoriteTags')) || [],
      copyFavoriteTags: [],
      existingTags: [],
      updateNote: {},
      searchNotes: []
    }
  }
  async componentDidMount () {
    this.refreshNotes()
    this.getExistingTags()
  }
  render () {
    return (
      <div className='App'>
        <div className='row'>
          <div className='col-lg'>
            <Switch>
              <Route exact path='/' component={(props) => <Home tab={this.homeTagTab(props)} notes={this.state.notes} favoriteTags={this.state.favoriteTags} existingTags={this.state.existingTags} saveNewFavoriteTags={this.saveNewFavoriteTags} getHashtagNotes={this.getHashtagNotes} create={this.create} history={props.history} search={this.search} searchNotes={this.state.searchNotes} />} />
              <Route exact path='/update/:id' component={(props) => {
                this.prepareUpdateNote(props.match.params.id)
                return <Update data={this.state.updateNote} existingTags={this.state.existingTags} history={props.history} update={this.update} />
              }} />
            </Switch>
          </div>
        </div>
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

  async getHashtagNotes (tag) {
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
    if (Object.entries(this.state.updateNote).length > 0) {
      return
    }
    let updateNote
    Object.entries(this.state.notes).forEach(entry => {
      const foundNote = entry[1].find(note => note.id === id)
      if (foundNote !== undefined) {
        updateNote = foundNote
      }
    })
    this.setState({
      updateNote: updateNote
    })
  }
}

function parseNotes (notes) {
  const newNotes = Object.entries(notes).reduce((acc, entry) => {
    acc[entry[0]] = entry[1].map(note => parseDates(note))
    return acc
  }, {})
  return newNotes
}

function parseDates (note) {
  note.created = new Date(note.created.substr(0, note.created.length - 5))
  note.updated = new Date(note.updated.substr(0, note.updated.length - 5))
  note.dueDate = new Date(note.dueDate.substr(0, note.dueDate.length - 5))
  return note
}
