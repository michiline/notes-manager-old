export default class Api {
  constructor (axios) {
    this.axios = axios
    this.create = this.create.bind(this)
    this.get = this.get.bind(this)
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
      paramsString += '?searchItems[]=' + params.words[0]
      params.words.splice(0, 1)
    }
    if (params.words.length > 0) {
      paramsString = params.words.reduce((acc, word) => {
        return acc + '&searchItems[]=' + word
      }, paramsString)
    }
  }
  return paramsString
}
