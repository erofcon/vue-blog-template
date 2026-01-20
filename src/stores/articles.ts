import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Post } from '@/types.ts'
import type { Sort } from '@/services/postApi.ts'
import * as postApi from '@/services/postApi.ts'

export const useArticlesStore = defineStore('articles', () => {

  const items = ref<Post[]>([])
  const total = ref(0)
  const loading = ref(false)


  async function load({ page = 1, perPage = 5, search = '', sort = 'newest' as Sort } = {}) {

    loading.value = true

    try {
      const res = await postApi.fetchPosts({ page, perPage, search, sort })

      items.value = res.items
      total.value = res.total

    } finally {

      loading.value = false
    }

  }

  async function loadMore({ page = 1, perPage = 5, search = '', sort = 'newest' as Sort } = {}) {

    loading.value = true

    try {

      const res = await postApi.fetchPosts({ page, perPage, search, sort })

      // если page === 1, перезаписываем
      if (page === 1) items.value = res.items
      else items.value = items.value.concat(res.items)

      total.value = res.total

    } finally {
      loading.value = false

    }
  }

  async function getById(id: number) {

    loading.value = true

    try {

      return await postApi.fetchPost(id)

    } finally {

      loading.value = false
    }
  }


  async function create(payload: { title: string; description: string }) {

    loading.value = true

    try {

      const p = await postApi.createPost(payload)

      items.value.unshift(p)
      total.value++

      return p
    } finally {

      loading.value = false
    }
  }

  async function update(id: number, payload: { title: string; description: string }) {

    loading.value = true

    try {

      const p = await postApi.updatePost(id, payload)

      const idx = items.value.findIndex(x => x.id === id)

      if (idx !== -1 && p) items.value[idx] = p
      return p

    } finally {

      loading.value = false
    }
  }


  async function remove(id: number) {

    loading.value = true

    try {

      await postApi.deletePost(id)
      items.value = items.value.filter(x => x.id !== id)
      total.value = Math.max(0, total.value - 1)

    } finally {

      loading.value = false
    }
  }


  return { items, total, loading, load, loadMore, getById, create, update, remove }

})
