<script lang="ts" setup>
import type { Forum } from '@/types/Forum'
import CRUDButtons from '@/components/Utility/CRUDButtons.vue'
import { trimmedToLength } from '@/utilities/StringUtitily'
// Props
const props = defineProps<{ forum: Forum }>()

// Emits
defineEmits<{
  (e: 'deleteForum'): void
  (e: 'editForum'): void
}>()

const MAX_LENGTH_NAME = 200
const MAX_LENGTH_DESCRIPTION = 200

const trimmedDescription = (): string => {
  return trimmedToLength(props.forum.description, MAX_LENGTH_DESCRIPTION)
}
const trimmedTitle = (): string => {
  return trimmedToLength(props.forum.name, MAX_LENGTH_NAME)
}
</script>

<template>
  <div class="card card-rounded">
    <div class="card-header">
      <h2>{{ trimmedTitle() }}</h2>
    </div>
    <div class="card-content">
      <p class="description">{{ trimmedDescription() }}</p>
    </div>
    <div class="card-footer">
      <CRUDButtons
        :path="`forum/${forum.id}`"
        @edit="$emit('editForum')"
        @delete="$emit('deleteForum')"
      />
    </div>
  </div>
</template>

<style scoped>
.card {
  padding: 16px;
  width: 260px;
  min-height: 250px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.description {
  min-height: 100px;
}
</style>
