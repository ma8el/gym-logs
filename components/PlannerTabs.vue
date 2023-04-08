<script setup lang="ts">
  interface ItemData {
    id: number
    name: string
    description: string
    created_at: string
    updated_at: string
  }

  const supabase = useSupabaseClient()
  const props = defineProps(['sourceTable'])
  
  const items = ref()

  const deletionDialog = ref(false)
  const showModify = ref(true)
  const readonly = ref(true)

  const tab = ref('')
  
  const deleteItem = async (itemId: number) => {
    const { error } = await supabase
      .from(props.sourceTable)
      .delete()
      .eq('id', itemId)
    if (error) {
    } else {
      console.log(itemId)
      deletionDialog.value = false
    }
  }

  const handleModify = async (item: ItemData) => {
    if (showModify.value) {
      readonly.value = false
    } else {
      readonly.value = true
      await supabase
        .from(props.sourceTable)
        .update({ 
          description: item.description,
          updated_at: new Date()
        })
        .eq('id', item.id)
    }
    showModify.value = !showModify.value
  }

  onMounted(async () => {
    loadItems(props.sourceTable).then(data => {
      items.value = data
    })
  })

  onUpdated(async () => {
    loadItems(props.sourceTable).then(data => {
      items.value = data
    })
  })
</script>

<template>
  <div v-if="items" class="d-flex flex-row">
    <v-tabs
      v-model="tab"
      direction="vertical"
      color="orange"
    >
      <v-tab 
        v-for="item in items"
        :key="item.id"
        :value="item.name">
        {{  item.name }}
      </v-tab>
    </v-tabs>
    <div class="full-width-card">
    <v-card>
      <v-window
        v-for="item in items"
        :key="item.id"
        v-model="tab">
        <v-window-item :value="item.name">
          <v-card flat>
            <v-toolbar density="compact" color="orange">
              <v-toolbar-title>{{ item.name }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                icon="$delete"
                size="small"
                variant="text"
                @click="deletionDialog = true"
              ></v-btn>
              <v-dialog
                v-model="deletionDialog"
                width="auto"
              >
              <DeletionModal 
                @delete-item="deleteItem(item.id)"
                @close-form="deletionDialog = false"
              />
              </v-dialog>
            </v-toolbar>
            <v-card-text>
              <v-row>
                <v-col cols="8">
                  <v-text-field
                    v-model="item.description"
                    :append-icon="showModify? 'mdi-pencil': 'mdi-check'"
                    label="description"
                    counter="100"
                    :readonly="readonly"
                    @click:append="handleModify(item)"
                  >
                  </v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="4">
                  <v-row class="pt-2 mb-2">
                    <b>Created at:</b> {{ new Date(item.created_at).toLocaleString('en-US', {timeZone: 'UTC'}) }}
                  </v-row>
                  <v-row>
                    <b>Last modified:</b> {{ new Date(item.updated_at).toLocaleString('en-US', {timeZone: 'UTC'}) }}
                  </v-row>
                </v-col>
              </v-row>
              <slot :itemId="item.id"></slot> 
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>
    </div>
  </div>
</template>

<style scoped>
.full-width-card {
  width: 90%;
}
</style>