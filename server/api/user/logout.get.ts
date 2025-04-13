export default defineEventHandler(async (event) => {
    setCookie(event, 'rain_token', '', { sameSite:'lax' ,maxAge: 0 })
    return { ok: true, msg: "Logout successful." }
})