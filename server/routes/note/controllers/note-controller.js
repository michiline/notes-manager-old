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
  }
}
