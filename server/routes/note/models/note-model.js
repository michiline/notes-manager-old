import mongoose from 'mongoose'

const Schema = mongoose.Schema
const noteSchema = new Schema({
  header: String,
  tags: [String],
  body: String,
  created: {
    type: Date,
    default: Date.now()
  }
}
)

export default mongoose.model('Note', noteSchema)
