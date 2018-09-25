import mongoose from 'mongoose'

const Schema = mongoose.Schema
const noteSchema = new Schema({
  title: String,
  tags: [String],
  body: String,
  timeConstraint: Boolean,
  dueDate: {
    type: Number,
    default: 0
  },
  created: {
    type: Number,
    default: () => {
      return Date.now()
    }
  },
  updated: {
    type: Number,
    default: () => {
      return Date.now()
    }
  },
  done: {
    type: Boolean,
    default: false
  }
})

noteSchema.index({
  title: 'text',
  body: 'text'
})

noteSchema.pre('update', () => {
  this.updated = Date.now()
})

export default mongoose.model('Note', noteSchema)
