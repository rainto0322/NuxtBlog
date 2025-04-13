import { defineMongooseModel } from '@/utils/index'

const options = {
  versionKey: false,
  virtuals: false,
  timestamps: false
}

// User Model
const User = defineMongooseModel('user', {
  name: { type: String, unique: true, trim: true, required: true },
  password: { type: String, trim: true },
  group: { type: String, default: ["tourist", "owner"] },
  email: { type: String, unique: true }
}, options)

// Memo Model
const Memos = defineMongooseModel('memo', {
  date: {
    type: String, default: Date.now()
  },
  body: { type: String },
  img: { type: Array, default: undefined }
}, options)

// Album Model
const Album = defineMongooseModel('album', {
  name: { type: String, unique: true, trim: true },
  base64: { type: String }
}, options)


export {
  User, Memos, Album
}
