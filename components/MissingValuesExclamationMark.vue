<template>
  <v-tooltip
    start
    text="There are fields missing or invalid"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        icon
        size="x-small"
        v-bind="props"
        class="circle-exclamation"
      >
      <v-icon>
        mdi-alert-circle
      </v-icon>
      </v-btn>
    </template>
  </v-tooltip>
</template>

<style scoped>
.circle-exclamation {
  margin-right: 2rem;
  border-radius: 50%;
}
</style>