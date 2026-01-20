<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticlesStore } from '@/stores/articles'
import type { Post } from '@/types.ts'


const route = useRoute()
const router = useRouter()
const store = useArticlesStore()
const post = ref<Post | null>(null)


onMounted(async () => {
  const id = Number(route.params.id)
  post.value = await store.getById(id)
})


function goEdit() {
  if (post.value) router.push({ name: 'edit_post', params: { id: post.value.id } })
}

function remove() {
  if (!post.value) return
  store.remove(post.value.id).then(() => router.push({ name: 'articles_list' }))
}

</script>


<template>
  <main class="max-w-4xl mx-auto py-8">
    <div v-if="post">
      <h1 class="text-3xl font-bold">{{ post.title }}</h1>
      <p class="text-gray-600 mt-4">{{ post.description }}</p>


      <div class="flex gap-3 mt-6">
        <button @click="goEdit" class="px-3 py-2 border rounded">Редактировать</button>
        <button @click="remove" class="px-3 py-2 border rounded hover:bg-red-100">Удалить</button>
      </div>
    </div>
    <div v-else class="text-center py-8 text-gray-500">Пост не найден</div>

    <svg v-if="store.loading"
         class="mx-auto size-8 animate-spin text-indigo-600 dark:text-indigo-300"
         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
              stroke-width="4"></circle>

      <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </main>
</template>
