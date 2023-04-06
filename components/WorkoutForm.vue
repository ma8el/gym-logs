<script setup lang="ts"> 
  import { useField, useForm } from 'vee-validate'
  const supabase = useSupabaseClient()

  const emit = defineEmits(['closeWorkoutForm'])
  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      name (value: string) {
        return minLength(2)(value)
      },
      description (value: string) {
        return maxLength(100)(value)
      },
    },
  })

  const name = useField('name')
  const description = useField('description')

  const submit = handleSubmit(async values => {
    const user = useSupabaseUser()
    const { error } = await supabase
      .from('workouts')
      .insert({
        created_at: new Date(),
        updated_at: new Date(),
        user_id: user.value.id,
        name: values.name,
        description: values.description,
      })
    emit('closeWorkoutForm')
  })
</script>

<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Create your workout</span>
    </v-card-title>
    <v-card-text>
      <v-form fast-fail @submit.prevent="submit">
      <v-text-field
        v-model="name.value.value"
        :error-messages="name.errorMessage.value"
        label="Name"
      ></v-text-field>

      <v-text-field
        v-model="description.value.value"
        :counter="100"
        :error-messages="description.errorMessage.value"
        label="Description"
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