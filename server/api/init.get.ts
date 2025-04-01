import { User } from "@/server/models";

export default defineEventHandler(async (event) => {
  try {
    const empty = await User.findOne({ group: "admin" })
    
  } catch (error) {
    return new Response(error as string, { status: 409 })
  }
})