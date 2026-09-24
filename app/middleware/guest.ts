export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn, user } = useUserSession()

  if (loggedIn.value && user.value) {
    const role = (user.value as any).role
    if (role === 'SUPER_ADMIN') {
      return navigateTo('/super-admin')
    }
    return navigateTo('/admin')
  }
})
