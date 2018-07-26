import Note from '../models/note-model'

export default {
  async create (data) {
    const note = new Note(data)
    return note.save()
  },
  async get (query) {
    return Note.find(query)
  }
}
