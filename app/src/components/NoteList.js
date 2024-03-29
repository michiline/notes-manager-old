import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import DeleteModal from './DeleteModal'
import DoneModal from './DoneModal'
import { prepareDates, cardClass } from '../utils/utils'
import '../css/App.css'

import updateImg from '../images/update.png'
import deleteImg from '../images/delete.png'
import doneImg from '../images/done.png'

class Home extends Component {
  constructor (props) {
    super(props)
    this.prepareNotes = this.prepareNotes.bind(this)
    this.prepareTags = this.prepareTags.bind(this)
    this.noteCard = this.noteCard.bind(this)
    this.tagLink = this.tagLink.bind(this)
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
        {Object.entries(this.props.notes).map((entry, index) => this.prepareNotes(entry, index))}
        <DeleteModal
          deleteNoteId={this.props.deleteNoteId}
          setDeleteNoteId={this.props.setDeleteNoteId}
          deleteNote={this.props.deleteNote} />
        <DoneModal
          doneNoteId={this.props.doneNoteId}
          setDoneNoteId={this.props.setDoneNoteId}
          markDone={this.props.markDone} />
      </div>
    )
  }
  prepareNotes (entry, index) {
    return (
      <div className='tab-content' id='nav-tabContent' key={index}>
        <div className={this.props.location.pathname === '/' && this.props.location.hash === '#' + entry[0] ? 'tab-pane fade show active' : 'tab-pane fade show'}>
          {entry[1].map((note, index) => this.noteCard(note, index))}
        </div>
      </div>
    )
  }
  prepareTags (tags) {
    const hashtags = tags.map((tag, index) => this.tagLink(tag, index))
    return (
      <div className='tags'>
        {hashtags}
      </div>
    )
  }

  tagLink (tag, index) {
    return (
      <NavLink
        className='tag'
        onClick={async () => this.props.getHashtagLinkNotes(tag)}
        to={'/#' + tag}
        key={index}>{'#' + tag }
      </NavLink>
    )
  }
  noteCard (note, index) {
    return (
      <div className={cardClass(note)} key={index}>
        <div className='card-body'>
          <h5 className='card-title note-title'>{note.title}
            <a data-toggle='tab' href={'/update/' + note.id}><img className='noteImg' src={updateImg} alt='edit' /></a>
            <img className='noteImg' src={deleteImg} alt='delete' onClick={e => this.props.setDeleteNoteId(note.id)} />
            {!note.done && <img className='noteImg' src={doneImg} alt='done' onClick={e => this.props.setDoneNoteId(note.id)} />}
          </h5>
          {this.prepareTags(note.tags)}
          <p className='card-text note-body'>{note.body}</p>
          <p className='card-text no-bot-margin'>{prepareDates(note)}</p>
        </div>
      </div>
    )
  }
}
export default withRouter(Home)
