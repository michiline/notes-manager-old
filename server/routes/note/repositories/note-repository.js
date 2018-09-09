import Note from '../models/note-model'

export default {
  async create (data) {
    const note = new Note(data)
    data.dueDate = new Date(Number.parseInt(data.dueTime))
    return note.save()
  },
  async get (query) {
    let queries = []
    if (query.words) {
      queries.push({ $match: { $text: { $search: query.words.join(' ') } } })
    }
    if (query.tags) {
      queries.push({ $match: { tags: { $all: query.tags } } })
    }
    queries.push({ $project: { _id: 0, id: '$_id', title: 1, tags: 1, body: 1, dueDate: 1, created: 1, updated: 1 } })
    if (query.skip) {
      queries.push({ $skip: Number.parseInt(query.skip) })
    }
    if (query.limit) {
      queries.push({ $limit: Number.parseInt(query.limit) })
    }
    queries.push({ $sort: { created: -1 } })
    return Note.aggregate(queries)
  },
  async existingTags () {
    return Note.distinct('tags')
  },
  async update (id, data) {
    if (data.dueDate) {
      data.dueDate = new Date(Number.parseInt(data.dueDate))
    }
    data.updated = new Date(Date.now() + 7200000)
    return Note.findByIdAndUpdate(id, data)
  },
  async delete (id) {
    return Note.findById(id).remove()
  }
}
