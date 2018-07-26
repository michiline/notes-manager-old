import express from 'express'

import config from './config/app-config'
import routes from './config/app-routes'

const app = express()
config(app)
routes(app)

app.listen(process.env.port, () => console.log('Server running on port ' + process.env.port))
