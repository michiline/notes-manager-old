import message from '../../../config/app-message'

export default {
  create (req, res, next) {
    try {
      if (!req.body.header && !req.body.tags && !req.body.body) {
        throw new Error(message.error.invalidData)
      }
      return next()
    } catch (err) {
      return next(err)
    }
  }
}
