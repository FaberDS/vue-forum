<script lang="ts" setup>
import type { Forum } from '@/types/Forum'
import { DisplayMode } from '@/types/DisplayMode'
import ForumCard from '@/components/Forum/ForumCard.vue'
import ForumListItem from '@/components/Forum/ForumListItem.vue'
import { ref, computed, onMounted } from 'vue'

// Props
const props = defineProps<{ foren: Forum[]; displayMode: DisplayMode }>()

// Emits
const emit = defineEmits<{
  (e: 'delete', forum: Forum): void
  (e: 'edit', forum: Forum): void
  (e: 'cancel'): void
}>()

const deleteForum = (forum: Forum) => {
  emit('delete', forum)
}
const editForum = (forum: Forum) => {
  emit('edit', forum)
}

// UI LOGIC
const showList = computed<boolean>(() => props.displayMode == DisplayMode.LIST)
</script>

<template>
  <div class="container" :class="showList ? 'container-list' : 'container-cards'">
    <div
      class="item"
      v-for="forum in props.foren"
      :key="forum.id"
      :class="showList ? 'centered-vertical' : ''"
    >
      <div v-if="showList" class="row">
        <ForumListItem
          :forum="forum"
          @deleteForum="deleteForum(forum)"
          @editForum="editForum(forum)"
        />
      </div>
      <div v-else>
        <ForumCard :forum="forum" @deleteForum="deleteForum(forum)" @editForum="editForum(forum)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}

.container-list {
  flex-direction: column;
}
h2 {
  width: 80%;
}

a {
  width: 80% !important;
  padding-left: 10px;
  display: block;
}
.row {
  min-height: 80px;
  padding: 16px;
}
a:hover {
  border-bottom: 1px solid hsla(160, 100%, 37%, 0.2);
  cursor: pointer;
}
a > div {
  display: flex;
  justify-content: space-between;
}
.item {
  display: flex;
  justify-content: center;
  width: 100%;
}
.item > div {
  width: 100%;
  min-width: 300px;
  display: flex;
  justify-content: space-between;
}
</style>
