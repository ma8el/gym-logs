<script setup lang="ts">
  watchEffect(() => {
    if (useSupabaseUser().value) {
      navigateTo('/')
    }
  })
</script>

<template>
    <div class="container">
      <div class="logo-container">
        <img src="../assets/logo.png" class="logo"/>
      </div>
      <Auth/>
    </div>  
</template>

<style scoped>
.logo {
  margin-left: auto;
  margin-right: auto;
  width: 30%;
  height: 30%;
}
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>