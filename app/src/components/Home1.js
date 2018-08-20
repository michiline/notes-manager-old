import React, { Component } from 'react'
import BasicTypeahead from './BasicTypeahead'
import '../css/App.css'
import settingsImg from '../images/settings.png'

class Home extends Component {
  constructor (props) {
    super(props)
    // this.saveNewFavoriteTags = this.saveNewFavoriteTags.bind(this)
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
            <div className='tab-content' id='nav-tabContent'>
              <div className={this.props.tab === '#general' ? 'tab-pane fade show active' : 'tab-pane fade show'} id='nav-general'>
                {this.props.notes.map((note, index) => {
                  return (
                    <div className='card' key={index}>
                      <div className='card-body'>
                        <h5 className='card-title'>{note.title}</h5>
                        <h6 className='card-subtitle mb-2 text-muted'>{prepareTags(note.tags)}</h6>
                        <p className='card-text'>{note.body}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='tab-content' id='nav-tabContent'>
              <div className={this.props.tab === '#settings' ? 'tab-pane fade show active' : 'tab-pane fade show'} id='nav-settings'>
                <div className='container'>
                  <div className='row'>
                    <div className='col-lg'>
                      <form>
                        <BasicTypeahead favoriteTags={this.props.favoriteTags} existingTags={this.props.existingTags} saveNewFavoriteTags={this.props.saveNewFavoriteTags} />
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
  // saveNewFavoriteTags (e) {
  //   e.preventDefault()
  //   try {
  //     console.log(e.target)
  //     this.props.saveNewFavoriteTags(e)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
}

function prepareTags (tags) {
  const hashtags = tags.map(tag => '#' + tag)
  return hashtags.join(' ')
}

export default Home
