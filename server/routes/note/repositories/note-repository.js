import Note from '../models/note-model'

export default {
  async create (data) {
    const note = new Note(data)
    return note.save()
  },
  async get (query) {
    let queries = []
    if (query.searchItems) {
      queries.push({ $match: { $text: { $search: query.searchItems.join(' ') } } })
    }
    if (query.tags) {
      queries.push({ $match: { tags: { $all: query.tags } } })
    }
    queries.push({ $project: { _id: 0, id: '$_id', title: 1, tags: 1, body: 1, _createdAt: 1 } })
    if (query.skip) {
      queries.push({ $skip: Number.parseInt(query.skip) })
    }
    if (query.limit) {
      queries.push({ $limit: Number.parseInt(query.limit) })
    }
    queries.push({ $sort: { _createdAt: -1 } })
    return Note.aggregate(queries)
  },
  async existingTags () {
    return Note.distinct('tags')
  }
}
