import React, { Component } from 'react'
import CreateExistingTagsTypeahead from './CreateExistingTagsTypeahead'
import CreateNewTagsTypeahead from './CreateNewTagsTypeahead'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

import '../css/App.css'

class Create extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      tags: [],
      newTags: [],
      body: '',
      date: {},
      time: ''
    }
    this.inputTitle = this.inputTitle.bind(this)
    this.inputBody = this.inputBody.bind(this)
    this.inputDate = this.inputDate.bind(this)
    this.inputTime = this.inputTime.bind(this)
    this.saveExistingSelectedTags = this.saveExistingSelectedTags.bind(this)
    this.saveNewSelectedTags = this.saveNewSelectedTags.bind(this)
    this.create = this.create.bind(this)
  }
  render () {
    return (
      <div className='container-fluid'>
        <div className='row headline text-center'>
          <div className='col-lg'>
            <h1 className='display-4'>Create new note</h1>
          </div>
        </div>
        <div className='row justify-content-md-center'>
          <div className='col-lg-8'>
            <form>
              <div className='form-group row'>
                <label className='col-lg-2 col-form-label'>Title</label>
                <div className='col-lg-10'>
                  <input value={this.state.title} onChange={e => this.inputTitle(e)} type='text' className='form-control' placeholder='Enter title' />
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-lg-2 col-form-label'>Tags</label>
                <div className='col-lg-10'>
                  <CreateExistingTagsTypeahead selectedTags={this.state.tags} existingTags={this.props.existingTags} saveSelectedTags={this.saveExistingSelectedTags} />
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-lg-2 col-form-label'>New Tags</label>
                <div className='col-lg-10'>
                  <CreateNewTagsTypeahead selectedTags={this.state.newTags} saveSelectedTags={this.saveNewSelectedTags} />
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-lg-2 col-form-label'>Body</label>
                <div className='col-lg-10'>
                  <textarea value={this.state.body} onChange={e => this.inputBody(e)} className='form-control' id='exampleFormControlTextarea1' rows='5' placeholder='Enter text' />
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-lg-2 col-form-label'>Due date</label>
                <div className='col-lg-10'>
                  <DayPickerInput onDayChange={date => this.inputDate(date)} />
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-lg-2 col-form-label'>Time</label>
                <div className='col-lg-3'>
                  <input value={this.state.time} onChange={e => this.inputTime(e)} type='text' className='form-control' placeholder='e.g. 16:30' />
                </div>
              </div>
              <div className='form-group row'>
                <div className='col-lg-10'>
                  <button onClick={this.create} type='submit' className='btn btn-primary'>Create</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
  inputTitle (e) {
    this.setState({
      title: e.target.value
    })
  }
  inputBody (e) {
    this.setState({
      body: e.target.value
    })
  }
  inputDate (date) {
    this.setState({
      date: date
    })
  }
  inputTime (e) {
    this.setState({
      time: e.target.value
    })
  }
  async saveExistingSelectedTags (tags) {
    this.setState({
      tags: tags
    })
  }
  async saveNewSelectedTags (tags) {
    const newTags = tags.map(tag => {
      if (typeof tag === 'object') {
        return tag.tag
      }
      return tag
    })
    this.setState({
      newTags: newTags
    })
  }
  async create (e) {
    e.preventDefault()
    try {
      await this.props.create({
        title: this.state.title,
        tags: this.state.tags.concat(this.state.newTags),
        body: this.state.body,
        dueDate: getMilliseconds(this.state.date, this.state.time)
      })
    } catch (err) {
      this.setState({
        title: '',
        tags: [],
        newTags: [],
        body: '',
        date: {},
        time: ''
      })
      console.log(err)
    }
  }
}

function getMilliseconds (date, time) {
  const split = date.toJSON().split('T')
  const newDate = new Date(`${split[0]}T${time}:00`)
  return newDate.getTime() + 7200000
  // console.log(newDate.toLocaleString('hr-HR', { timeZone: 'ETC/GMT-2' }))
}

export default Create
