<script setup lang="ts">
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({ email: email.value })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget login">
      <img src="../assets/logo.png" class="logo"/>
      <h1 class="header">Performance Health</h1>
      <p class="description">Sign in via magic link with your email below</p>
      <div>
        <v-text-field variant="outlined" class="inputField" type="email" placeholder="Your email" v-model="email" />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>

<style scoped>
.logo {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  height: 50%;
}

.login {
  text-align: center;
}
</style>