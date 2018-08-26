import React, { Component } from 'react'
import HomeTagsTypeAhead from './HomeTagsTypeahead'
import '../css/App.css'
import settingsImg from '../images/settings.png'

class Home extends Component {
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
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg'>
            <nav>
              <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                {this.props.favoriteTags.map((favoriteTag, index) => {
                  return <a className={this.props.tab === '#' + favoriteTag ? 'nav-item nav-link active' : 'nav-item nav-link'} key={index} data-toggle='tab' href={'#' + favoriteTag} >{favoriteTag}</a>
                })}
                <a className={this.props.tab === '#settings' ? 'nav-item nav-link active' : 'nav-item nav-link'} data-toggle='tab' href='#settings'><img src={settingsImg} alt='settings' /></a>
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
                            <h5 className='card-title'>{note.title}</h5>
                            <h6 className='card-subtitle mb-2 text-muted'>{prepareTags(note.tags)}</h6>
                            <p className='card-text'>{note.body}</p>
                            <p className='card-text'><small className='text-muted'>Created on: {note.created.toLocaleString('hr-HR', { timeZone: 'ETC/GMT-2' }) }</small></p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
            <div className='tab-content' id='nav-tabContent'>
              <div className={this.props.tab === '#settings' ? 'tab-pane fade show active' : 'tab-pane fade show'} id='nav-settings'>
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
      </div>
    )
  }
}

function prepareTags (tags) {
  const hashtags = tags.map(tag => '#' + tag)
  return hashtags.join(' ')
}

export default Home
