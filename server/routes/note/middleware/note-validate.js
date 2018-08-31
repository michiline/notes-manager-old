import message from '../../../config/app-message'

export default {
  create (req, res, next) {
    try {
      if (!req.body.title && !req.body.tags && !req.body.body) {
        throw new Error(message.error.invalidData)
      }
      return next()
    } catch (err) {
      return next(err)
    }
  },
  get (req, res, next) {
    try {
      return next()
    } catch (err) {
      return next(err)
    }
  },
  update (req, res, next) {
    try {
      return next()
    } catch (err) {
      return next(err)
    }
  },
  existingTags (req, res, next) {
    try {
      return next()
    } catch (err) {
      return next(err)
    }
  }
}
