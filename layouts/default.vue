<script setup lang="ts">
  const supabase = useSupabaseClient()
  const loading = ref(true)
  const username = ref('')
  const avatar_path = ref('')
  const src = ref('')
  
  loading.value = true
  const user = useSupabaseUser()
  
  let { data } = await supabase
    .from('profiles')
    .select(`username, avatar_url`)
    .eq('id', user.value.id)
    .single()
  
  if (data) {
    username.value = data.username
    avatar_path.value = data.avatar_url
  }
  
  loading.value = false

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
      <v-layout>
        <v-app-bar title="Performance Health">
          <template v-slot:prepend>
            <v-avatar>
              <img src="../assets/logo.png" width="40" height="40"/>
            </v-avatar>
          </template>

        </v-app-bar>
        <v-navigation-drawer class="bg-orange">
            <v-list density="compact" nav>
              <NuxtLink to="/" class="link">
                  <v-list-item prepend-icon="mdi-chart-box" title="Dashboard" nav></v-list-item>
              </NuxtLink>
              <NuxtLink to="/workout" class="link">
                  <v-list-item prepend-icon="mdi-weight-kilogram" title="Workout" nav></v-list-item>
              </NuxtLink>
               <NuxtLink to="/exercises" class="link">
                  <v-list-item prepend-icon="mdi-grid" title="Exercises" nav></v-list-item>
              </NuxtLink>
                <NuxtLink to="/nutrition" class="link">
                  <v-list-item prepend-icon="mdi-nutrition" title="Nutrition" nav></v-list-item>
              </NuxtLink>
              <NuxtLink to="/calendar" class="link">
                  <v-list-item prepend-icon="mdi-calendar" title="Calendar" nav></v-list-item>
              </NuxtLink>
              <NuxtLink to="/you" class="link">
                  <v-list-item prepend-icon="mdi-human-edit" title="You" nav></v-list-item>
              </NuxtLink>
            </v-list>
            <template v-slot:append>
              <div class="pa-2">
                <div class="user-settings">
                  <NuxtLink to="/user" class="link">
                      <v-list-item prepend-icon="mdi-account" :title="username" nav></v-list-item>
                  </NuxtLink> 
                </div>
                <button class="button block" @click="signOut" :disabled="loading">LOGOUT</button>
              </div>
            </template>
            <v-main style="height: 250px"></v-main>
        </v-navigation-drawer>
        <div class="container">
          <slot />
        </div>
      </v-layout>
</template>

<style scoped>
  .container {
    padding: 50px 0 100px 0;
 }
 .user-settings {
    margin-bottom: 5px;
 }
 v-card {
   height: 100%;
 }
 .link {
   text-decoration: none;
   color: #000;
 }

 nuxt-link-active {
  font-weight: bold;
}
 nuxt-link-exact-active {
  background: red;
 }

</style>