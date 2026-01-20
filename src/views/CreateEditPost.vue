<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useArticlesStore } from '@/stores/articles'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'


const route = useRoute()
const router = useRouter()
const store = useArticlesStore()


const isEdit = ref(false)
const editingId = ref<number | null>(null)


const schema = yup.object({
  title: yup.string().required('Обязательное поле').max(12, 'Максимум 12 символов'),
  description: yup.string().required('Обязательное поле').max(50, 'Максимум 50 символов')
})


const { handleSubmit, errors, setValues } = useForm({ validationSchema: schema })
const { value: title } = useField<string>('title')
const { value: description } = useField<string>('description')


onMounted(async () => {
  if (route.name === 'edit_post') {
    isEdit.value = true
    const id = Number(route.params.id)
    editingId.value = id
    const p = await store.getById(id)
    if (p) setValues({ title: p.title, description: p.description })
  }
})


const onSubmit = handleSubmit(async (values) => {
  if (isEdit.value && editingId.value) {
    await store.update(editingId.value, values)
    router.push({ name: 'article_view', params: { id: editingId.value } })
  } else {
    const newP = await store.create(values)
    router.push({ name: 'article_view', params: { id: newP.id } })
  }
})
</script>


<template>
  <main class="max-w-2xl mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">{{ isEdit ? 'Редактирование поста' : 'Создать пост' }}</h1>


    <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
      <div>
        <label class="block text-sm font-medium">Заголовок</label>
        <input v-model="title" type="text" class="w-full px-3 py-2 border rounded" />
        <div v-if="errors.title" class="text-sm text-red-600">{{ errors.title }}</div>
        <div class="text-xs text-gray-400">Максимум 12 символов</div>
      </div>


      <div>
        <label class="block text-sm font-medium">Описание</label>
        <textarea v-model="description" rows="4" class="w-full px-3 py-2 border rounded"></textarea>
        <div v-if="errors.description" class="text-sm text-red-600">{{ errors.description }}</div>
        <div class="text-xs text-gray-400">Максимум 50 символов</div>
      </div>


      <div class="flex gap-3">
        <button type="submit" class="px-4 py-2 border rounded bg-blue-50">Сохранить</button>
        <RouterLink to="/articles-list" class="px-4 py-2 border rounded">Отмена</RouterLink>
      </div>
    </form>
  </main>
</template>
