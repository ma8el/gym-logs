<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  const supabase = useSupabaseClient()
  const userStore = useUserStore()

  const emit = defineEmits(['closeWeightForm'])
  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      weight (value: string) {
        return isInteger(value)
      },
    },
  })

  const weight = useField('weight')

  const submit = handleSubmit(async values => {
    const { error } = await supabase
      .from('weights')
      .insert({
        user_id: userStore.user,
        weight: values.weight,
      })
    emit('closeWeightForm')
  })
</script>

<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Add weight</span>
    </v-card-title>
    <v-card-text>
      <v-form fast-fail @submit.prevent="submit">
      <v-text-field
        v-model="weight.value.value"
        :error-messages="weight.errorMessage.value"
        label="weight"
        suffix="kg"
      ></v-text-field>
      <v-row>
        <v-col cols="2">
          <v-btn
            class="me-4"
            type="submit"
            @click="submit"
          >
            submit
          </v-btn>
        </v-col>
        <v-col cols="2">
        <v-btn @click="handleReset">
            clear
        </v-btn>
        </v-col>
      </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>