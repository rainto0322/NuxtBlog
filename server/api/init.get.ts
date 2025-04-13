import { User } from "@/server/models";

export default defineEventHandler(async (event) => {
  try {
    const empty = await User.findOne({ group: "admin" })
    if (!empty) {
      return { ok: true }
    } else {
      return { ok: false }
    }
  } catch (error) {
    return new Response(error as string, { status: 400 })
  }
})