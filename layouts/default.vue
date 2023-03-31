<template>
    <v-card>
      <v-layout>
        <v-app-bar title="Application bar"></v-app-bar>
  
        <v-navigation-drawer>
          <v-list>
            <v-list-item title="Navigation drawer"></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <div class="container">
          <slot />
        </div>
      </v-layout>
    </v-card>
</template>

<style scoped>
 v-card {
    height: 100%;
  }
  
  v-layout {
    height: 100%;
  }
  
  .container {
    padding: 50px 0 100px 0;
 }

</style>