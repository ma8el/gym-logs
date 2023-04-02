<script setup lang="ts">
  interface Muscle {
    id: number,
    name: string,
  }

  interface Exercise {
    uuid?: string,
    name?: string,
    description?: string,
    muscles?: Muscle[],
    category?: {id: number, name: string},
    image?: string,
    language?: string,
    creation_date?: string,
//    author?: string,
  }

  const props = defineProps(['exercise'])
  const exercise = props.exercise

  const exerciseUUID = exercise.uuid ? exercise.uuid : 1
  const exerciseName = exercise.name ? exercise.name : 'No name set'

  const exerciseDescription = exercise.description ? exercise.description : 'No description'
  
  let exerciseMuscles = [{id: 0, name: 'No muscles defined'}]
  if (exercise.muscles.length != 0) {
    exerciseMuscles = exercise.muscles
  } 

  const exerciseCategory = exercise.category ? exercise.category : {id: 0, name: 'No category defined'}

  let exerciseImage = undefined
  if (exercise.images.length != 0) {
    if (exercise.images[0].image) {
      exerciseImage = exercise.images[0].image
    }
  }

  const exerciseLanguage = exercise.language.full_name ? exercise.language.full_name : 'No language set'
  const exerciseCreationDate = exercise.creation_date ? exercise.creation_date : 'No creation date set'

  const exerciseObj: Exercise = {
    uuid: exerciseUUID,
    name: exerciseName,
    description: exerciseDescription,
    muscles: exerciseMuscles,
    category: exerciseCategory,
    image: exerciseImage,
    language: exerciseLanguage,
    creation_date: exerciseCreationDate,
  }

  const show = ref(false)
</script>

<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img v-if="exerciseObj.image !== undefined"
      :src="exerciseObj.image"
      height="200px"
    ></v-img>
    <div class="no-image" v-else>
      <img
        src="../assets/no-image.png"
        height="200"
        width="200"
      />
    </div>
    <v-card-title>
      {{ exerciseObj.name }}
    </v-card-title>
    <v-table>
        <tbody>
            <tr>
                <td>Category</td>
                <td>{{ exerciseObj.category.name }}</td>
            </tr>
            <tr>
                <td>Muscles</td>
                <td>
                  <li v-for="muscle in exerciseObj.muscles" :key="muscle.id">
                    {{ muscle.name }}
                  </li>
                </td>
            </tr>
            <tr>
                <td>Creation Date</td>
                <td>{{ exerciseObj.creation_date }}</td>
            </tr>

        </tbody>
    </v-table>
    <v-card-actions>
      <v-btn
        color="orange-lighten-2"
        variant="text"
      >
        Description
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
          :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
        ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          {{ exerciseObj.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style scoped>
li {
    list-style-type: none;
}
.no-image {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>