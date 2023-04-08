<template>
  <v-row class="header-row">
    <v-col cols="8">
      <slot name="header"></slot>
    </v-col>
    <v-spacer></v-spacer>
    <v-col justify="end">
      <slot name="form"></slot>
    </v-col>
  </v-row>
  <slot name="tabs"></slot>
</template>

<style scoped>
.header-row {
  flex: 0 0 auto;
  margin-bottom: 1rem;
}

</style>