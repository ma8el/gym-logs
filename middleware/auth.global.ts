export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser()
    const userStore = useUserStore()
    if (!user.value && to.path !== '/login') {
      return navigateTo('/login')
    }
    if (user.value && to.path == '/login') {
      return navigateTo('/')
    }
    if (!userStore.user) {
      userStore.fetchUser()
    }
})