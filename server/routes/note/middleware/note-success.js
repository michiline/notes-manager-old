import message from '../../../config/app-message'

export default {
  create (req, res) {
    req.status = 200
    req.message = message.success.noteCreated
    req.data = mapNote(req.note)
    return sendResponse(req, res)
  },
  get (req, res) {
    req.status = 200
    req.data = req.notes
    return sendResponse(req, res)
  },
  update (req, res) {
    req.status = 200
    req.message = message.success.noteUpdated
    req.data = req.notes
    return sendResponse(req, res)
  },
  delete (req, res) {
    req.status = 200
    req.message = message.success.noteDeleted
    return sendResponse(req, res)
  },
  existingTags (req, res) {
    req.status = 200
    req.data = req.tags
    return sendResponse(req, res)
  }
}

function sendResponse (req, res) {
  return res.status(req.status).send({
    message: req.message,
    data: req.data
  })
}

function mapNote (note) {
  return {
    tags: note.tags,
    title: note.title,
    body: note.body,
    dueDate: note.dueDate,
    created: note.created,
    updated: note.updated
  }
}
