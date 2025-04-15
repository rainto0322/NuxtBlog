import bcrypt from "bcrypt";
import { User } from "@/server/models";
import { ConvertToken, VerifyToken } from "@/utils/auth";
import { TokenName, CookieSetting } from "@/config";

// /api/user/login
export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, TokenName)

    // Token login
    if (token) {
      const data = await VerifyToken(token)
      // sure token then reflash
      setCookie(event, TokenName, token, CookieSetting)
      return { ok: true, msg: `${data.user.group} ${data.user.name} token login successful.` }

      // Password login
    } else {
      const { name, password } = await readBody(event)
      // sure name and password
      const user: any = await User.findOne({ name })
      if (!user) throw new Error("Not found this user.")
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) throw new Error("Password is incorrect.")

      const token = ConvertToken(user.name, user._id)
      setCookie(event, TokenName, token, CookieSetting)
      return { ok: true, msg: `${user.group} ${user.name} password login successful.`, user, token }
    }

  } catch (error) {
    setCookie(event, TokenName, '', { maxAge: 0 })
    return new Response(error as string, { status: 401 })
  }
})