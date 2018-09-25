export default class Api {
  constructor (axios) {
    this.axios = axios
    this.create = this.create.bind(this)
    this.get = this.get.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
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
      url: '/api/note' + queryUrl(params)
    })
    return res.data
  }

  async update (id, data) {
    const res = await this.axios({
      method: 'patch',
      url: `/api/note/${id}`,
      data: data
    })
    return res.data
  }

  async delete (id) {
    const res = await this.axios({
      method: 'delete',
      url: `/api/note/${id}`
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

function queryUrl (params) {
  let first = true
  const url = Object.entries(params).reduce((url, [key, value]) => {
    if (value.length === 0) {
      return url
    }
    if (first) {
      first = false
      url += `?${key}=${value}`
    } else {
      url += `&${key}=${value}`
    }
    return url
  }, '')
  return url
}
