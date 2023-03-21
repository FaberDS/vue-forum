<script lang="ts" setup>
import type { Forum } from '@/types/Forum'
import CRUDButtons from '@/components/Utility/CRUDButtons.vue'

defineProps<{ forum: Forum }>()

defineEmits<{
  (e: 'deleteForum'): void
  (e: 'editForum'): void
}>()
</script>

<template>
  <h2>{{ forum.name }}</h2>
  <div class="card-footer">
    <CRUDButtons
      :path="`forum/${forum.id}`"
      @edit="$emit('editForum')"
      @delete="$emit('deleteForum')"
    />
  </div>
</template>
