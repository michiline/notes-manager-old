import message from '../../../config/app-message'

export default {
  create (req, res) {
    req.status = 200
    req.message = message.success.noteCreated
    req.data = mapNote(req.note)
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
    header: note.header,
    body: note.body,
    created: note.created
  }
}
