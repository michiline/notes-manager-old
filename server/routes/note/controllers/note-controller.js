import noteRepo from '../repositories/note-repository'

export default {
  async create (req, res, next) {
    try {
      req.note = await noteRepo.create(req.body)
      return next()
    } catch (err) {
      console.log(err)
      return next(err)
    }
  },
  async get (req, res, next) {
    try {
      req.notes = await noteRepo.get(req.query)
      return next()
    } catch (err) {
      console.log(err)
      return next(err)
    }
  },
  async update (req, res, next) {
    try {
      req.notes = await noteRepo.update(req.params.id, req.body)
      return next()
    } catch (err) {
      console.log(err)
      return next(err)
    }
  },
  async existingTags (req, res, next) {
    try {
      req.tags = await noteRepo.existingTags()
      return next()
    } catch (err) {
      console.log(err)
      return next(err)
    }
  }
}
