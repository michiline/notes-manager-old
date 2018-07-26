import express from 'express'

import note from '../routes/note/note-index'

export default function route (app) {
  const router = express.Router()
  app.use('/api/note', note)
  app.use(router)
}
