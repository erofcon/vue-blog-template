<script setup lang="ts">
import MainLayout from '@/components/MainLayout.vue'
import ArticleComponent from '@/components/ArticleComponent.vue'
import { useArticlesStore } from '@/stores/articles'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Post } from '@/types.ts'


const store = useArticlesStore()
const items = ref<Post[]>([])
const router = useRouter()


onMounted(async () => {
  await store.load({ page: 1, perPage: 3, sort: 'newest' })
  items.value = store.items
})


function onView(id: number) {
  router.push({ name: 'article_view', params: { id } })
}

function onEdit(id: number) {
  router.push({ name: 'edit_post', params: { id } })
}

function onDelete(id: number) {
  store.remove(id).then(() => store.load({ page: 1, perPage: 3, sort: 'newest' }))
}
</script>


<template>
  <MainLayout>
    <section class="py-8">
      <h1 class="font-bold text-3xl">Мой блог</h1>
      <span class="text-lg">Блог посвященный технологиям, кодингу и другим вещам</span>
    </section>


    <section class="py-4">

      <h1 class="text-xl font-bold">Последние посты</h1>
      <div v-if="items" class="mt-4">
        <ArticleComponent v-for="p in items" :key="p.id" :post="p" @view="onView" @edit="onEdit"
                          @delete="onDelete" />
      </div>
      <div v-else class="text-center py-8 text-gray-500">Посты не найдены</div>

      <svg v-if="store.loading"
           class="mx-auto size-8 animate-spin text-indigo-600 dark:text-indigo-300"
           xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                stroke-width="4"></circle>

        <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>

    </section>
  </MainLayout>
</template>
