<script setup lang="ts">
  const supabse = useSupabaseClient()

  const username = ref()
  const height = ref()
  const gender = ref()
  const date_of_birth = ref()
  const weight = ref()

  const loadUserStats = async () => {
    const { data, error } = await supabse
      .from('profiles')
      .select('username, date_of_birth, height, gender')
      .single()
    if (error) {
      console.log(error)
    }
    if (data) {
      username.value = data.username
      height.value = data.height
      gender.value = data.gender
      date_of_birth.value = data.date_of_birth
    }
  }

  const age = computed(() => {
    const today = new Date()
    const birthDate = new Date(date_of_birth.value)
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  })

  onMounted(() => {
    loadUserStats()
  })

</script>

<template>
  <v-card>
    <v-card-title>
      <div class="text-h5">{{ username }}</div>
    </v-card-title>
    <v-card-text>
      <div class="text-subtitle-1">Gender: {{ gender }}</div>
      <div class="text-subtitle-1">Age: {{ age }} years</div>
      <div class="text-subtitle-1">Height: {{ height }}cm</div>
    </v-card-text>
  </v-card>
</template>