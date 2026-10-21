export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn, user, fetch: fetchSession } = useUserSession()

  if (!loggedIn.value) {
    await fetchSession()
  }

  if (loggedIn.value && user.value) {
    const role = (user.value as any).role
    if (role === 'SUPER_ADMIN') {
      return navigateTo('/super-admin')
    }
    return navigateTo('/admin')
  }
})
