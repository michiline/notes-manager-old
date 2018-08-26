import Note from '../models/note-model'

export default {
  async create (data) {
    console.log(data)
    const note = new Note(data)
    const date = Date.now()
    console.log(date.toLocaleString('hr-HR', { timeZone: 'ETC/GMT-2' }))
    data.dueTime = new Date(Number.parseInt(data.dueTime))
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
  }
}
