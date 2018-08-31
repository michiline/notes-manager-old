export default class Api {
  constructor (axios) {
    this.axios = axios
    this.create = this.create.bind(this)
    this.get = this.get.bind(this)
    this.update = this.update.bind(this)
    this.getExistingTags = this.getExistingTags.bind(this)
  }

  async create (data) {
    const res = await this.axios({
      method: 'post',
      url: '/api/note',
      data: data
    })
    return res.data
  }

  async get (params) {
    const res = await this.axios({
      method: 'get',
      url: '/api/note' + addParams(params)
    })
    res.data.data = res.data.data.map(note => parseDates(note))
    return res.data
  }

  async update (id, data) {
    const res = await this.axios({
      method: 'post',
      url: `/api/note/update/${id}`,
      data: data
    })
    return res.data
  }

  async getExistingTags () {
    const res = await this.axios({
      method: 'get',
      url: '/api/note/tags'
    })
    return res.data
  }
}

function addParams (params) {
  if (!params.tags && !params.words) {
    return ''
  }
  let paramsString = ''
  if (params.tags && params.tags.length > 0) {
    paramsString += '?tags[]=' + params.tags[0]
    params.tags.splice(0, 1)
    if (params.tags.length > 0) {
      paramsString = params.tags.reduce((acc, tag) => {
        return acc + '&tags[]=' + tag
      }, paramsString)
    }
  }
  if (params.words && params.words.length > 0) {
    if (paramsString.length === 0) {
      paramsString += '?words[]=' + params.words[0]
      params.words.splice(0, 1)
    }
    if (params.words.length > 0) {
      paramsString = params.words.reduce((acc, word) => {
        return acc + '&words[]=' + word
      }, paramsString)
    }
  }
  return paramsString
}

function parseDates (note) {
  note.created = new Date(note.created.substr(0, note.created.length - 5))
  note.updated = new Date(note.updated.substr(0, note.updated.length - 5))
  note.dueDate = new Date(note.dueDate.substr(0, note.dueDate.length - 5))
  return note
}
