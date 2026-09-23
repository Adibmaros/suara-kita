export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn, user } = useUserSession()

  if (!loggedIn.value) {
    return navigateTo('/login')
  }

  if (user.value?.role !== 'ADMIN_INSTANSI') {
    if (user.value?.role === 'SUPER_ADMIN') {
      return navigateTo('/super-admin')
    }
    return navigateTo('/login')
  }
})
