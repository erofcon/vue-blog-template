<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { Post } from '@/types.ts'


const props = defineProps<{
  post: Post
  removable?: boolean
}>()

const emit = defineEmits<{
  (e: 'view', id: number): void
  (e: 'edit', id: number): void
  (e: 'delete', id: number): void
}>()


function onView() {
  emit('view', props.post.id)
}

function onEdit() {
  emit('edit', props.post.id)
}

function onDelete() {
  emit('delete', props.post.id)
}

</script>


<template>
  <div class="flex gap-6 items-start border-b pb-4 border-gray-300 py-3">
    <div class="w-20 flex-shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-full h-auto">
        <path
          d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm56-97h489L578-473 446-302l-93-127-117 152Zm-56 97v-600 600Z" />
      </svg>
    </div>


    <div class="flex-1">
      <h2 class="text-lg font-semibold cursor-pointer" @click="onView">{{ post.title }}</h2>
      <p class="py-1 text-sm">{{ post.description }}</p>
      <div class="flex gap-3 items-center mt-2">
        <button @click="onView" class="text-sm font-medium text-blue-900 hover:text-blue-500">
          Читать
        </button>
        <button v-if="removable" @click="onEdit" class="text-sm font-medium text-green-900 hover:text-green-700">
          Редактировать
        </button>
        <button v-if="removable" @click="onDelete" class="text-sm font-medium text-red-900 hover:text-red-500">
          Удалить
        </button>
      </div>
    </div>


    <div class="text-xs text-gray-400">{{ new Date(post.createdAt).toLocaleDateString() }}</div>
  </div>
</template>
