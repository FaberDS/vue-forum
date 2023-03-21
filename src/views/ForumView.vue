<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForumStore } from '@/stores/forumStore'
import DateDisplay from '@/components/Utility/DateDisplay.vue'

import type { Forum } from '@/types/Forum'

const forumStore = useForumStore()
const forum = ref<Forum | undefined>(undefined)
const router = useRouter()
const route = useRoute()
onMounted(() => {
  const id = route.params.id as string
  forum.value = forumStore.getForumById(id)
})

const createdAt = computed<Date | null>(() => {
  if (forum.value) {
    return new Date(forum.value.createdAt)
  } else {
    return null
  }
})
const updatedAt = computed<Date | null>(() => {
  if (forum.value && forum.value.updatedAt) {
    return new Date(forum.value.updatedAt)
  } else {
    return null
  }
})

const updated = computed<boolean>(() => forum.value?.createdAt != forum.value?.updatedAt)
const handleBack = () => {
  router.go(-1)
}
</script>

<template>
  <button class="btn btn-round" @click="handleBack">◀︎</button>
  Forum
  <div class="forum card-rounded" v-if="forum">
    <h2>{{ forum.name }}</h2>
    <p>{{ forum.description }}</p>
    <div class="dates">
      <div v-if="updated && updatedAt">updated: <DateDisplay :date="updatedAt" class="mr-2" /></div>
      <div v-if="createdAt">created: <DateDisplay :date="createdAt" class="mr-2" /></div>
    </div>
  </div>
</template>

<style scoped>
.forum {
  margin-top: 20px;
  border: 1px solid rgba(0.1, 0.1, 0.1, 0.1);
  padding: 30px;
}
.dates {
  float: right;
  display: flex;
  gap: 20px;
}
</style>
