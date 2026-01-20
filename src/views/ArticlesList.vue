<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import MainLayout from '@/components/MainLayout.vue'
import ArticleComponent from '@/components/ArticleComponent.vue'
import { useArticlesStore } from '@/stores/articles'
import { useRouter } from 'vue-router'


const store = useArticlesStore()
const router = useRouter()


const page = ref(1)
const perPage = 5
const search = ref('')
const sort = ref<'newest' | 'oldest' | 'title'>('newest')


onMounted(async () => {
  await store.load({ page: 1, perPage, search: search.value, sort: sort.value })
})


watch([search, sort], async () => {
  page.value = 1
  await store.load({ page: 1, perPage, search: search.value, sort: sort.value })

})


async function loadMore() {
  page.value++
  await store.loadMore({ page: page.value, perPage, search: search.value, sort: sort.value })

}


function onView(id: number) {
  router.push({ name: 'article_view', params: { id } })

}

function onEdit(id: number) {
  router.push({ name: 'edit_post', params: { id } })
}

function onDelete(id: number) {

  store.remove(id).then(() => {
    page.value = 1
    store.load({ page: 1, perPage, search: search.value, sort: sort.value })
  })
}

</script>


<template>
  <MainLayout>
    <div class="flex justify-between items-center my-6">
      <h1 class="font-bold text-2xl">Список постов</h1>
      <div class="flex gap-3">
        <input v-model="search" placeholder="Поиск..." class="px-3 py-2 border rounded" />
        <select v-model="sort" class="px-3 py-2 border rounded">
          <option value="newest">Сначала новые</option>
          <option value="oldest">Сначала старые</option>
          <option value="title">По заголовку</option>
        </select>
        <RouterLink to="/create" class="px-3 py-2 border rounded bg-blue-50">Создать</RouterLink>
      </div>
    </div>


    <div>
      <ArticleComponent v-for="p in store.items" :key="p.id" :post="p" :removable="true" @view="onView" @edit="onEdit"
                        @delete="onDelete" />
    </div>


    <div class="my-6 text-center">
      <button v-if="store.items.length < store.total" @click="loadMore"
              class="px-4 py-2 border rounded">Загрузить ещё
      </button>
      <div v-else class="text-sm text-gray-500">Больше нет постов</div>
    </div>
  </MainLayout>
</template>
