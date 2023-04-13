export const useUserStore = defineStore('user', {
    state: () => ({
      user: null
    }),
  
    actions: {
      fetchUser() {
        const supabaseUser = useSupabaseUser()
        this.user = supabaseUser.value?.id
      }
    }
  })

export const useWeightStore = defineStore('weight', {
  state: () => ({
    weights: []
  }),

  actions: {
    async fetchWeights() {
      const supabase = useSupabaseClient()
      const { data, error } = await supabase
        .from('weights')
        .select('weight, created_at')
        .order('created_at', { ascending: false })
      if (error) throw error
      this.weights = data
    },
    async sort() {
      this.weights = this.weights.sort((a, b) => {
        const dateA = new Date(a.created_at)
        const dateB = new Date(b.created_at)
        return dateA.getTime() - dateB.getTime()
      })
    }
  },
  getters : {
    getLatestWeight: (state) => async () => {
      if (state.weights.length === 0) {
        return null
      }
      const data = await state.weights.reduce((prev, current) => {
        const prevDate = new Date(prev.created_at);
        const currentDate = new Date(current.created_at);
        return (prevDate > currentDate) ? prev : current
      })
      return data
    },
    getSortedWeights: (state) => async () => {
      await state.sort()
      const data = state.weights.map((weight) => weight.weight)
      return data
      },
    getSortedDates: (state) => async () => {
      await state.sort()
      const data = state.weights.map((weight) => new Date(weight.created_at).toLocaleDateString())
      return data
    }
  }
})