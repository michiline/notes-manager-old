import React, { Component } from 'react'
import HomeTagsTypeAhead from './HomeTagsTypeahead'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'

import '../css/App.css'

import searchImg from '../images/search.png'
import settingsImg from '../images/settings.png'

class Toolbar extends Component {
  constructor (props) {
    super(props)
    this.prepareTags = this.prepareTags.bind(this)
    this.tagsToLinks = this.tagsToLinks.bind(this)
    this.linkTo = this.linkTo.bind(this)
  }
  componentDidMount () {
    if (this.props.location.pathname === '/' && this.props.location.hash.length === 0 && this.props.favoriteTags.length > 0) {
      this.props.history.push(`/#${this.props.favoriteTags[0]}`)
    }
  }
  render () {
    const hash = this.props.location.hash
    const pathname = this.props.location.pathname
    return (
      <div>
        <div className='row'>
          <div className='col-lg'>
            <nav>
              <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                <p className={pathname === '/create' ? 'nav-item nav-link active' : 'nav-item nav-link'} onClick={e => this.linkTo(e, '/create')}>+</p>
                {this.props.favoriteTags.map((tag, index) => this.tagsToLinks(tag, index))}
                <p className={pathname === '/search' ? 'nav-item nav-link active' : 'nav-item nav-link'} onClick={e => this.linkTo(e, '/search')}><img src={searchImg} alt='search' /></p>
                <p className={pathname === '/' && hash === '#settings' ? 'nav-item nav-link active' : 'nav-item nav-link'} onClick={e => this.linkTo(e, '/#settings')}><img src={settingsImg} alt='search' /></p>
              </div>
            </nav>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg'>
            <div className='tab-content'>
              <div className={pathname === '/' && hash === '#settings' ? 'tab-pane fade show active' : 'tab-pane fade show'}>
                <HomeTagsTypeAhead favoriteTags={this.props.favoriteTags} existingTags={this.props.existingTags} saveNewFavoriteTags={this.props.saveNewFavoriteTags} />
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
  linkTo (e, path) {
    e.preventDefault()
    this.props.history.push(path)
  }
  tagsToLinks (tag, index) {
    return (
      <p
        className={this.props.location.pathname === '/' && this.props.location.hash === `#${tag}` ? 'nav-item nav-link active' : 'nav-item nav-link'}
        onClick={e => this.linkTo(e, `/#${tag}`)}
        key={index}>{tag}
      </p>
    )
  }
}

export default withRouter(Toolbar)
