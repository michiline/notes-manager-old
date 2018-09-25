import Note from '../models/note-model'

export default {
  async create (data) {
    const note = new Note(data)
    return note.save()
  },
  async get (query) {
    let queries = []
    if (query.words) {
      const words = query.words.replace('/,/g', ' ')
      queries.push({ $match: { $text: { $search: words } } })
    }
    if (query.tags) {
      queries.push({ $match: { tags: { $all: query.tags.split(',') } } })
    }
    if (query.done && query.done === 'false') {
      queries.push({ $match: { done: false } })
    }
    queries.push({ $project: { _id: 0, id: '$_id', title: 1, tags: 1, body: 1, timeConstraint: 1, dueDate: 1, created: 1, updated: 1, done: 1 } })
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
    data.updated = Date.now()
    return Note.findByIdAndUpdate(id, data)
  },
  async delete (id) {
    return Note.findById(id).remove()
  }
}
