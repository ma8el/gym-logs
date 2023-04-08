<script setup lang="ts">
  const emit = defineEmits(['close-form', 'delete-item'])

  const emitClose = () => {
    emit('close-form')
  }

  const emitDelete = () => {
    emit('delete-item')
  }
</script>

<template>
  <v-card>
    <v-card-title>
      Are you sure you want to delete this item?
    </v-card-title>
    <v-card-text>
      This action cannot be undone.
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        variant="text"
        @click="emitDelete"
      >
        Delete
      </v-btn>
      <v-btn
        color="primary"
        variant="text"
        @click="emitClose"
      >
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</template>