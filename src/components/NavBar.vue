<script setup lang="ts">

</script>

<template>
  <header class="border-b border-gray-300 bg-white">
    <div class="flex justify-between items-center max-w-4xl mx-auto h-16">
      <RouterLink
        to="/"
        class="font-bold text-2xl cursor-pointer hover:border-b border-black cursor-pointer pb-1"
      >
        Блог
      </RouterLink>
      <ul class="flex gap-6">
        <li>
          <RouterLink
            to="/"
            class="font-medium hover:border-b border-black cursor-pointer pb-1"
            active-class="border-b border-black"
          >
            Главная
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/articles-list"
            class="font-medium hover:border-b border-black cursor-pointer pb-1"
            active-class="border-b border-black"
          >
            Блог
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="#"
            class="font-medium hover:border-b border-black cursor-pointer pb-1"
          >
            Контакты
          </RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>

</style>
