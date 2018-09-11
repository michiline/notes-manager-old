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
router.get('/',
  noteValidate.get,
  noteController.get,
  log.success,
  log.error,
  success.get,
  error.get
)
router.patch('/:id',
  noteValidate.update,
  noteController.update,
  log.success,
  log.error,
  success.update,
  error.update
)
router.delete('/:id',
  noteValidate.delete,
  noteController.delete,
  log.success,
  log.error,
  success.delete,
  error.delete
)
router.get('/tags',
  noteValidate.existingTags,
  noteController.existingTags,
  log.success,
  log.error,
  success.existingTags,
  error.existingTags
)

export default router
