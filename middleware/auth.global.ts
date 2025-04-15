// middleware/auth.js
// No token returned to login page
import { TokenName } from "@/config";
export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie(TokenName)
  if (to.path.includes('/admin')) {
    if (!token.value) {
      return navigateTo('/login');
    }
  }
})
