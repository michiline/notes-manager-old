import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import axios from 'axios'

import Api from '../api/Api'
import Home from './Home'
import Create from './Create'
import Search from './Search'

import '../css/App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.api = new Api(axios.create())
    this.create = this.create.bind(this)
    this.search = this.search.bind(this)
    this.refreshNotes = this.refreshNotes.bind(this)
    this.getExistingTags = this.getExistingTags.bind(this)
    this.saveNewFavoriteTags = this.saveNewFavoriteTags.bind(this)
    this.state = {
      notes: JSON.parse(localStorage.getItem('notes')) || {},
      favoriteTags: JSON.parse(localStorage.getItem('favoriteTags')) || [],
      copyFavoriteTags: [],
      existingTags: []
    }
  }
  async componentDidMount () {
    // this.refreshNotes()
    this.getExistingTags()
  }
  render () {
    return (
      <div className='App container-fluid'>
        <div className='row'>
          <div className='col-lg-2'>
            <div className='nav flex-column'>
              <NavLink className='nav-link' to='/' activeClassName='active-navlink'> Home </NavLink>
              <NavLink className='nav-link' to='/create' activeClassName='active-navlink'> Create </NavLink>
              <NavLink className='nav-link' to='/search' activeClassName='active-navlink'> Search </NavLink>
            </div>
          </div>
          <div className='col-lg'>
            <Switch>
              <Route exact path='/' component={(props) => <Home tab={props.location.hash} notes={this.state.notes} favoriteTags={this.state.favoriteTags} existingTags={this.state.existingTags} saveNewFavoriteTags={this.saveNewFavoriteTags} />} />
              <Route exact path='/create' component={() => <Create create={this.create} existingTags={this.state.existingTags} />} />
              <Route exact path='/search' component={() => <Search search={this.search} />} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }

  async create (data) {
    const res = await this.api.create(data)
    this.refreshNotes()
    return res
  }

  async search (params) {
    return this.api.get(params)
  }

  async refreshNotes () {
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
}

export default App
