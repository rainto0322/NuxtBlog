import jwt from "jsonwebtoken";
import { User } from '@/server/models';
import { SECRET, TokenName } from "@/config";


export const ConvertToken = (name: string, payload: string) => {
  return name + '.' + jwt.sign({ id: payload.toString() }, SECRET, { expiresIn: '7d' })
}

const SplitToken = (key: string) => {
  const arr = key.split('.')
  const name = arr[0],
    token = arr.slice(1).join(".")
  return { name, token }
}

export const VerifyToken = async (key: string) => {
  const { name, token } = SplitToken(key)

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

export async function Permission(event: any) {
  const token = getCookie(event, TokenName)
  if(!token) throw new Error('No permission')
  await VerifyToken(token)
}