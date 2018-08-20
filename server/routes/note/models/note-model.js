import mongoose from 'mongoose'

const Schema = mongoose.Schema
const noteSchema = new Schema({
  title: String,
  tags: [String],
  body: String
},
{
  timestamps: { createdAt: '_createdAt', updatedAt: '_updatedAt' }
})

noteSchema.index({
  title: 'text',
  body: 'text'
})

export default mongoose.model('Note', noteSchema)
