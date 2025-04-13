import jwt from "jsonwebtoken";
import { User } from '@/server/models';
import { SECRET } from "@/config";

export const ConvertToken = (name: string, payload: string) => {
  return name + '.' + jwt.sign({ id: payload.toString() }, SECRET, { expiresIn: '7d' })
}


export const VerifyToken = async (key: string) => {
  const arr = key.split('.')
  const name = arr[0],
    token = arr.slice(1).join(".")

  const user: any = await User.findOne({ name })
  if (!user) throw new Error("Token not legal.")

  const data: any = jwt.verify(token, SECRET, (err, decoded) => {
    if (err) throw new Error("Token has expired");
    return decoded
  })

  if (data.id) {
    const condition = data.id === user._id.toString()
    if (!condition) throw new Error('Token invalid')
  }
  return {
    user,
    token: ConvertToken(name, user._id)
  }
}