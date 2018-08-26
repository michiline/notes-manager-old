import mongoose from 'mongoose'

const Schema = mongoose.Schema
const noteSchema = new Schema({
  title: String,
  tags: [String],
  body: String,
  dueDate: Date,
  created: {
    type: Date,
    default: () => {
      return new Date(Date.now() + 7200000)
    }
  },
  updated: {
    type: Date,
    default: () => {
      return new Date(Date.now() + 7200000)
    }
  }
})

noteSchema.index({
  title: 'text',
  body: 'text'
})

noteSchema.pre('update', () => {
  this.updated = new Date(Date.now() + 7200000)
})

export default mongoose.model('Note', noteSchema)
