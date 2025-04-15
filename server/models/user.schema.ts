import { defineMongooseModel, options } from '@/utils/index'

// User Model 
export const User = defineMongooseModel('user', {
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  group: {
    type: String,
    default: ["tourist", "owner"]
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true
  }
}, options)
