import express from 'express'

import noteValidate from './middleware/note-validate'
import noteController from './controllers/note-controller'
import success from './middleware/note-success'
import error from './middleware/note-error'
import log from '../../config/app-log'

const router = express.Router()

router.post('/',
  noteValidate.create,
  noteController.create,
  log.success,
  log.error,
  success.create,
  error.create
)

export default router
