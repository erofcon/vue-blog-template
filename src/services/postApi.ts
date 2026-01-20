import type { Post } from '@/types.ts'

let MOCK_POSTS: Post[] = Array.from(
  { length: 25 }).map((_, i) => (
    {
      id: i + 1,
      title: `Post ${i + 1}`,
      description: `Описание для поста #${i + 1}. Это тестовый контент.`,
      createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString()
    }
  )
)


function delay<T>(result: T, ms = 600): Promise<T> {

  return new Promise(resolve => setTimeout(() => resolve(result), ms))
}


export type Sort = 'newest' | 'oldest' | 'title'


export function fetchPosts(
  {
    page = 1,
    perPage = 5,
    search = '',
    sort = 'newest'
  }: {

    page?: number;
    perPage?: number;
    search?: string;
    sort?: Sort
  } = {}) {

  // фильтрация
  let arr = [...MOCK_POSTS]

  if (search && search.trim()) {

    const s = search.trim().toLowerCase()

    arr = arr.filter(p => p.title.toLowerCase().includes(s) || p.description.toLowerCase().includes(s))
  }

  // сортировка
  if (sort === 'newest') arr.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
  if (sort === 'oldest') arr.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt))
  if (sort === 'title') arr.sort((a, b) => a.title.localeCompare(b.title))


  const total = arr.length
  const start = (page - 1) * perPage
  const items = arr.slice(start, start + perPage)

  return delay({ items, total, page, perPage }, 600)

}


export function fetchPost(id: number) {

  const p = MOCK_POSTS.find(x => x.id === id) || null

  return delay(p, 350)
}


export function createPost(
  payload: {
    title: string;
    description: string
  }
) {

  const id = (MOCK_POSTS.length ? Math.max(...MOCK_POSTS.map(p => p.id)) : 0) + 1

  const newP: Post = {
    id,
    title: payload.title,
    description: payload.description,
    createdAt: new Date().toISOString()
  }

  MOCK_POSTS.unshift(newP)

  return delay(newP, 400)
}


export function updatePost(id: number, payload: { title: string; description: string }) {

  const idx = MOCK_POSTS.findIndex(p => p.id === id)

  if (idx === -1) return delay(null, 300)

  MOCK_POSTS[idx] = { ...MOCK_POSTS[idx], ...payload }

  return delay(MOCK_POSTS[idx], 300)
}


export function deletePost(id: number) {

  MOCK_POSTS = MOCK_POSTS.filter(p => p.id !== id)

  return delay({ success: true }, 250)
}
