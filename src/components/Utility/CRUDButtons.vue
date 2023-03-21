<script lang="ts" setup>
const props = defineProps<{ path: string }>()

const emit = defineEmits<{
  (e: 'delete'): void
  (e: 'edit'): void
}>()
</script>

<template>
  <div class="buttons">
    <button class="btn btn-round" @click="$emit('delete')">
      <font-awesome-icon icon="trash" class="icon" />
    </button>
    <button class="btn btn-round" @click="$emit('edit')">
      <font-awesome-icon icon="pen" class="icon" />
    </button>
    <RouterLink :to="props.path" class="btn btn-round">
      <p class="info">i</p>
    </RouterLink>
  </div>
</template>

<style scoped>
.info {
  font-weight: 600;
  font-size: 1.5rem;
}
</style>
