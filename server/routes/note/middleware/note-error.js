import message from '../../../config/app-message'

export default {
  create (err, req, res, next) {
    if (err.message === message.error.invalidData) {
      req.message = message.error.invalidData
      req.status = 400
    } else {
      generalError(req)
    }
    return sendResponse(req, res)
  },
  get (err, req, res, next) {
    if (err.message === message.error.invalidData) {
      req.message = message.error.invalidData
      req.status = 400
    } else {
      generalError(req)
    }
    return sendResponse(req, res)
  },
  existingTags (err, req, res, next) {
    if (err) {
      generalError(req)
    }
    return sendResponse(req, res)
  }
}

function sendResponse (req, res) {
  return res.status(req.status).send({
    message: req.message
  })
}

function generalError (req) {
  req.message = message.error.internalServerError
  req.status = 500
}
