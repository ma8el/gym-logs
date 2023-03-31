<template>
      <v-layout>
        <v-app-bar title="Performance Health">
          <template v-slot:prepend>
            <v-avatar>
              <img src="../assets/logo.png" width="40" height="40"/>
            </v-avatar>
          </template>

        </v-app-bar>
        <v-navigation-drawer>
            <v-list density="compact" nav>
              <NuxtLink to="/" class="link">
                  <v-list-item prepend-icon="mdi-home" title="Dashboard" nav></v-list-item>
              </NuxtLink>
              <NuxtLink to="/workout" class="link">
                  <v-list-item prepend-icon="mdi-weight-kilogram" title="Workout" nav></v-list-item>
              </NuxtLink>
              <NuxtLink to="/calender" class="link">
                  <v-list-item prepend-icon="mdi-calendar" title="Calender" nav></v-list-item>
              </NuxtLink>
              <NuxtLink to="/user" class="link">
                  <v-list-item prepend-icon="mdi-account" title="User Settings" nav></v-list-item>
              </NuxtLink> 
              </v-list>
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