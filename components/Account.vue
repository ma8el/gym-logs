<script setup lang="ts">
  import VueDatePicker from '@vuepic/vue-datepicker';
  const supabase = useSupabaseClient()
  
  const loading = ref(true)
  const username = ref('')
  const avatar_path = ref('')
  const dateOfBirth = ref('')
  const firstName = ref('')
  const lastName = ref('')
  const gender = ref()
  
  // TODO: Move this to a table
  const genders = ref(['male', 'female', 'other'])
  loading.value = true
  const user = useSupabaseUser()
  
  let { data } = await supabase
    .from('profiles')
    .select(`username, first_name, last_name, date_of_birth, avatar_url`)
    .eq('id', user.value.id)
    .single()
  
  if (data) {
    username.value = data.username
    avatar_path.value = data.avatar_url
    firstName.value = data.first_name
    lastName.value = data.last_name
    dateOfBirth.value = data.date_of_birth
    gender.value = data.gender
  }
  
  loading.value = false
  
  async function updateProfile() {
    try {
      loading.value = true
      const user = useSupabaseUser()
  
      const updates = {
        id: user.value.id,
        username: username.value,
        first_name: firstName.value,
        last_name: lastName.value,
        date_of_birth: dateOfBirth.value,
        avatar_url: avatar_path.value,
        gender: gender.value,
        updated_at: new Date(),
      }
  
      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })
  
      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <form  @submit.prevent="updateProfile">
    <div class="avatar-container">
      <Avatar v-model:path="avatar_path" @upload="updateProfile" />
    </div>
    <v-row justify="center">
      <v-col cols="6">
        <v-text-field 
          variant="outlined"
          v-model="user.email" disabled 
          label="Email"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <v-text-field
         variant="outlined"
         v-model="username"
         label="Username"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="3">
        <v-text-field 
          variant="outlined"
          v-model="firstName"
          label="First Name"
         />
      </v-col>
      <v-col cols="3">
        <v-text-field 
          variant="outlined"
          v-model="lastName"
          label="Last Name"
         />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="3">
        <v-select
         :items="genders"
         v-model="gender"
         variant="solo"
        />
      </v-col>
      <v-col cols="3">
        <VueDatePicker :enable-time-picker="false" :auto-apply="true" v-model="dateOfBirth" :teleport="true"/>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <input
          type="submit"
          class="button primary block"
          :value="loading ? 'Loading ...' : 'Update'"
          :disabled="loading"
        />
      </v-col>
    </v-row>
  </form>
</template>

<style scoped>
.avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
}
</style>