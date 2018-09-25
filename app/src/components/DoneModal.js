import React, { Component } from 'react'

import '../css/App.css'

export default class DoneModal extends Component {
  render () {
    const className = this.props.doneNoteId !== '' ? 'delete-modal show-modal' : 'delete-modal hide-modal'
    return (
      <div className={className}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Mark note as done</h5>
              <button type='button' className='close' onClick={e => this.props.setDoneNoteId('')}>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <p>Are you finished with this note?</p>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-primary' onClick={this.props.markDone}>Yes</button>
              <button type='button' className='btn btn-secondary' onClick={e => this.props.setDoneNoteId('')}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
