import React, { Component } from 'react'
import 'react-day-picker/lib/style.css'

import '../css/App.css'

export default class DeleteModal extends Component {
  render () {
    const className = this.props.deleteNoteId !== '' ? 'delete-modal show-modal' : 'delete-modal hide-modal'
    return (
      <div className={className}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Delete note</h5>
              <button type='button' className='close' onClick={e => this.props.setDeleteNoteId('')}>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <p>Are you sure you want to delete this note?</p>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' onClick={e => this.props.setDeleteNoteId('')}>Close</button>
              <button type='button' className='btn btn-primary' onClick={this.props.deleteNote}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
