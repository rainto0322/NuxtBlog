import { defineMongooseModel, options } from '@/utils/index'

// Article Model
export const Article = defineMongooseModel('article', {
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  cover: {
    type: String,
  },
  content:{
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  tags: {
    type: [String],
  },
  view:{
    type: Number,
    default: 0,
  },
  like: {
    type: Number,
    default: 0,
  },
}, options)