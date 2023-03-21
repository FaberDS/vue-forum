<script setup lang="ts">
import type { Forum } from '@/types/Forum'
import FormModal from '@/components/Utility/FormModal.vue'
import ForumForm from '@/components/Forum/ForumForm.vue'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import ForumComponent from '@/components/Forum/ForumComponent.vue'
import { FormMode } from '@/types/FormMode'
import { DisplayMode } from '@/types/DisplayMode'
import { useForumStore } from '@/stores/forumStore'
import { storeToRefs } from 'pinia'

// Binding
const selectedForum = ref<Forum | null>(null)
const forumFormMode = ref<FormMode>(FormMode.NEW)
const displayMode = ref<DisplayMode>(DisplayMode.LIST)

// Store
const { addForum, updateForum, removeForum } = useForumStore()
const forumStore = useForumStore()
const { forenCount, foren } = storeToRefs(forumStore)

// Macros
const showModal = computed<boolean>(() => selectedForum.value !== null)

// Functions

const closeModal = () => {
  selectedForum.value = null
}

const deleteForum = async (forum: Forum) => {
  removeForum(forum.id)
}

const editForum = async (forum: Forum) => {
  selectedForum.value = { ...forum }
  forumFormMode.value = FormMode.EDIT
}

const newForum = () => {
  forumFormMode.value = FormMode.NEW
  selectedForum.value = {
    id: uuidv4(),
    name: '',
    description: '',
    categoryId: 'c1',
    threads: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

const submitForum = async (forum: Forum) => {
  if (forumFormMode.value === FormMode.NEW) {
    addForum(forum)
  } else {
    forum.updatedAt = new Date()
    updateForum(forum)
  }
  closeModal()
}

// UI LOGIC
const toggleForenDisplayMode = (mode: DisplayMode) => {
  displayMode.value = mode
}

const showList = () => {
  toggleForenDisplayMode(DisplayMode.LIST)
}
const showCards = () => {
  toggleForenDisplayMode(DisplayMode.CARDS)
}
</script>

<template>
  <main>
    <div>
      <div class="header">
        <h1>Foren: {{ forenCount }}#</h1>
        <div class="buttons buttons-three">
          <button
            id="show-modal"
            @click="showList"
            class="btn btn-round"
            :class="displayMode === DisplayMode.LIST ? 'active' : ''"
          >
            <font-awesome-icon icon="list" class="icon" />
          </button>
          <button
            id="show-modal"
            @click="showCards"
            class="btn btn-round"
            :class="displayMode === DisplayMode.CARDS ? 'active' : ''"
          >
            <font-awesome-icon icon="square" class="icon" />
          </button>
          <button id="show-modal" @click="newForum" class="btn btn-round">
            <font-awesome-icon icon="add" class="icon" />
          </button>
        </div>
      </div>
      <div class="container">
        <ForumComponent
          :foren="foren"
          :displayMode="displayMode"
          @delete="deleteForum"
          @edit="editForum"
        />
      </div>
    </div>
  </main>

  <Teleport to="body">
    <FormModal :show="showModal" @close="closeModal" v-if="selectedForum">
      <template #header>
        <h3>Create new Forum</h3>
      </template>
      <template #body>
        <ForumForm :forum="selectedForum!" @submit="submitForum" @cancel="closeModal" />
      </template>
    </FormModal>
  </Teleport>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}
ul li {
  margin-top: 10px;
  list-style: none;
}
</style>
