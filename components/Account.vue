<script setup lang="ts">
const supabase = useSupabaseClient()

const loading = ref(true)
const username = ref('')
const website = ref('')
const avatar_path = ref('')

loading.value = true
const user = useSupabaseUser()

let { data } = await supabase
  .from('profiles')
  .select(`username, website, avatar_url`)
  .eq('id', user.value.id)
  .single()

if (data) {
  username.value = data.username
  website.value = data.website
  avatar_path.value = data.avatar_url
}

loading.value = false

async function updateProfile() {
  try {
    loading.value = true
    const user = useSupabaseUser()

    const updates = {
      id: user.value.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_path.value,
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

async function signOut() {
  try {
    loading.value = true
    let { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <NuxtLayout>
    <form  @submit.prevent="updateProfile">
      <Avatar v-model:path="avatar_path" @upload="updateProfile" />
      <div>
        <label for="email">Email</label>
        <v-text-field variant="outlined" id="email" type="text" :value="user.email" disabled />
      </div>
      <div>
        <label for="username">Name</label>
        <v-text-field variant="outlined" id="username" type="text" v-model="username" />
      </div>
      <div>
        <label for="website">Website</label>
        <v-text-field varinat="outlined" id="website" type="website" v-model="website" />
      </div>
  
      <div>
        <v-btn
          type="submit"
          class="button primary block"
          variant="outlined"
          :disabled="loading"
        >
          {{ loading ? 'Loading ...' : 'Update' }}
        </v-btn>
      </div>
  
      <div>
        <v-btn variant="outlined" class="button block" @click="signOut" :disabled="loading">Sign Out</v-btn>
      </div>
    </form>
  </NuxtLayout>
</template>
