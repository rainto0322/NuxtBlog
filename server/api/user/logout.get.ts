import { TokenName } from "@/config";

// /api/user/logout
export default defineEventHandler(async (event) => {
    setCookie(event, TokenName, '', { sameSite:'lax' ,maxAge: 0 })
    return { ok: true, msg: "Logout successful." }
})