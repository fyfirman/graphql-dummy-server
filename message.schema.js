import mongoose from 'mongoose';

export const messageSchema = new mongoose.Schema({
  id: String,
  content: String,
  author: String,
  createdAt: Number,
  updatedAt: Number,
})

export const Message = new mongoose.model('Message', messageSchema);