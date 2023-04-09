export const useUserStore = defineStore('user', {
    state: () => ({
      user: null
    }),
  
    actions: {
      async fetchUser() {
        const supabaseUser = useSupabaseUser()
        this.user = supabaseUser.value?.id
      }
    }
  })