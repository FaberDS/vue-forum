<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue'
import type { Forum } from '@/types/Forum'

// Properties
const props = defineProps<{
  forum: Forum
}>()
const RECOMMENDED_NAME_LENGTH = 30

let showedAlert = false

// Binding
const forum = ref<Forum | null>(null)
const name = ref<string>('')
const description = ref<string>('')

// Hooks
onMounted(() => {
  forum.value = props.forum
  name.value = props.forum.name
  description.value = props.forum.description
})

// Macros
const falidInput = computed<boolean>(() => {
  let isValid = true
  if (name.value.trim() === '') {
    isValid = false
  }
  if (description.value.trim() === '') {
    isValid = false
  }
  return isValid
})

const nameLength = computed<number>(() => name.value.length ?? 0)

const nameIsLongerThanRecommended = computed<boolean>(
  () => (name.value.length ?? 0) > RECOMMENDED_NAME_LENGTH
)

watch(name, (newName, oldName) => {
  if (nameIsLongerThanRecommended.value && !showedAlert) {
    showedAlert = true
    alert(`It is recommended to use a name less than ${RECOMMENDED_NAME_LENGTH}!`)
  }
})

// Emits
const emit = defineEmits<{
  (e: 'submit', forum: Forum): void
  (e: 'cancel'): void
}>()

const submit = () => {
  if (forum.value == null) return
  forum.value.name = name.value
  forum.value.description = description.value

  emit('submit', forum.value)
}
const cancel = () => {
  emit('cancel')
}
</script>

<template>
  <div class="submit-form" v-if="forum">
    <div class="row">
      <div class="col-25">
        <label for="name">Name</label>
      </div>
      <div class="col-75 row">
        <input
          type="text"
          class="form-control"
          :class="nameIsLongerThanRecommended ? 'error-input' : ''"
          id="name"
          required
          v-model="name"
          name="name"
          v-focus
        />
        <p class="input-postfix" :class="nameIsLongerThanRecommended ? 'error-label' : ''">
          {{ nameLength }} / {{ RECOMMENDED_NAME_LENGTH }}
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="description">Description</label>
      </div>
      <div class="col-75">
        <textarea
          type="text"
          class="form-control"
          id="description"
          required
          v-model="description"
          name="description"
        ></textarea>
      </div>
    </div>

    <div class="buttons">
      <button @click="cancel" class="btn">Cancel</button>
      <button @click="submit" :disabled="!falidInput" class="btn">Submit</button>
    </div>
  </div>
</template>

<style scoped>
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

input[type='text'],
select,
textarea {
  width: 100%;
  margin-top: 6px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

.row {
  display: flex;
  align-items: center;
}
.input-postfix {
  padding-left: 8px;
  padding-top: 4px;
  font-size: 0.7rem;
  width: 70px;
}
.error-input {
  border: 2px solid red !important;
}
.error-label {
  color: red !important;
}
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row::after {
  content: '';
  display: table;
  clear: both;
}
</style>
