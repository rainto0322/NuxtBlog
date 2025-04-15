import { Article } from "@/server/models";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const id = event.context.params?.id

    const data = await Article.findOneAndUpdate({ id }, body)
    return { ok: true, data, msg: "Article update successfully" }
  } catch (error) {
    return new Response(error as string, { status: 400 })
  }
})
