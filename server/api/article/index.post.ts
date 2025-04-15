import { Article } from "@/server/models";
import { Permission } from "@/utils/auth";

export default defineEventHandler(async (event) => {
  try {
    await Permission(event)
    const body = await readBody(event);
    const data = await new Article(body).save()
    return { ok: true, data, msg: "Article created successfully" }
  } catch (error) {
    return new Response(error as string, { status: 400 })
  }
})
