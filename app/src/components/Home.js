import React, { Component } from 'react'
import HomeTagsTypeAhead from './HomeTagsTypeahead'
import { NavLink } from 'react-router-dom'
import Create from './Create'
import Search from './Search'

import '../css/App.css'

import searchImg from '../images/search.png'
import settingsImg from '../images/settings.png'
import updateImg from '../images/update.png'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.prepareTags = this.prepareTags.bind(this)
  }
  render () {
    if (!this.props.notes) {
      return (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg'>
              Loading...
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <div className='row'>
          <div className='col-lg'>
            <nav>
              <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                <a className={this.props.tab === 'create' ? 'nav-item nav-link active' : 'nav-item nav-link'} data-toggle='tab' href='#create'>+</a>
                {this.props.favoriteTags.map((favoriteTag, index) => {
                  return <a className={this.props.tab === '#' + favoriteTag ? 'nav-item nav-link active' : 'nav-item nav-link'} key={index} data-toggle='tab' href={'#' + favoriteTag} >{favoriteTag}</a>
                })}
                <a className={this.props.tab === 'search' ? 'nav-item nav-link active' : 'nav-item nav-link'} data-toggle='tab' href='#search'><img src={searchImg} alt='search' /></a>
                <a className={this.props.tab === 'settings' ? 'nav-item nav-link active' : 'nav-item nav-link'} data-toggle='tab' href='#settings'><img src={settingsImg} alt='settings' /></a>
              </div>
            </nav>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg'>
            {Object.entries(this.props.notes).map((entry, index) => {
              return (
                <div className='tab-content' id='nav-tabContent' key={index}>
                  <div className={this.props.tab === '#' + entry[0] ? 'tab-pane fade show active' : 'tab-pane fade show'}>
                    {entry[1].map((note, index) => {
                      return (
                        <div className='card' key={index}>
                          <div className='card-body'>
                            <h5 className='card-title note-title'>{note.title} <a data-toggle='tab' href={'/update/' + note.id}><img className='updateImg' src={updateImg} alt='edit' /></a></h5>
                            {this.prepareTags(note.tags)}
                            <p className='card-text note-body'>{note.body}</p>
                            <p className='card-text no-bot-margin'><small className='text-muted'><strong>Created:</strong> {note.created.toLocaleString('hr-HR', { timeZone: 'ETC/GMT-2' }) } | <strong>Updated:</strong> {note.updated.toLocaleString('hr-HR', { timeZone: 'ETC/GMT-2' }) } | <strong>Due:</strong> {note.dueDate.toLocaleString('hr-HR', { timeZone: 'ETC/GMT-2' })} - <strong>{Math.floor((note.dueDate.getTime() - Date.now()) / 86400000)} days left</strong> </small></p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='row'>
          <div className='col-lg'>
            <div className='tab-content'>
              <div className={this.props.tab === '#settings' ? 'tab-pane fade show active' : 'tab-pane fade show'}>
                <div className='container'>
                  <div className='row'>
                    <div className='col-lg'>
                      <form>
                        <HomeTagsTypeAhead favoriteTags={this.props.favoriteTags} existingTags={this.props.existingTags} saveNewFavoriteTags={this.props.saveNewFavoriteTags} />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg'>
            <div className='tab-content'>
              <div className={this.props.tab === '#search' ? 'tab-pane fade show active' : 'tab-pane fade show'}>
                <div className='container'>
                  <div className='row'>
                    <div className='col-lg'>
                      <Search search={this.props.search} existingTags={this.props.existingTags} searchNotes={this.props.searchNotes} prepareTags={this.prepareTags} history={this.props.history} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg'>
            <div className='tab-content'>
              <div className={this.props.tab === '#create' ? 'tab-pane fade show active' : 'tab-pane fade show'}>
                <div className='container'>
                  <div className='row'>
                    <div className='col-lg'>
                      <Create create={this.props.create} existingTags={this.props.existingTags} history={this.props.history} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  prepareTags (tags) {
    const hashtags = tags.map((tag, index) => {
      return <NavLink onClick={async () => this.props.getHashtagNotes(tag)} className='tag' to={'/#' + tag} key={index}>{'#' + tag }</NavLink>
    })
    return (
      <div className='tags'>
        {hashtags}
      </div>
    )
  }
}
