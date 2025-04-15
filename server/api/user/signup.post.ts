import { User } from "@/server/models";
import bcrypt from "bcrypt";

// /api/user/signup
export default defineEventHandler(async (event) => {
  try {
    const { name, password, email } = await readBody(event)
    const empty = await User.findOne({ group: "admin" })
    const user = {
      name,
      password: bcrypt.hashSync(password, 8),
      email,
      group: 'user'
    }

    if (empty === null) user.group = "admin"
    const data = await new User(user).save()
    if (data) {
      return {
        ok: true,
        msg: `${user.group} <${user.name}> registered successfully.`,
        user: data
      }
    }
  } catch (error) {
    return new Response(error as string, { status: 409 })
  }
})