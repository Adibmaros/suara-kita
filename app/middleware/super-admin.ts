export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn, user } = useUserSession()

  if (!loggedIn.value) {
    return navigateTo('/login')
  }

  if (user.value?.role !== 'SUPER_ADMIN') {
    if (user.value?.role === 'ADMIN_INSTANSI') {
      return navigateTo('/admin')
    }
    return navigateTo('/login')
  }
})
