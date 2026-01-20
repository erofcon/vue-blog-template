<script setup lang="ts">
import MainLayout from '@/components/MainLayout.vue'
import ArticleComponent from '@/components/ArticleComponent.vue'
</script>

<template>
  <MainLayout>
    <section class="py-8">
      <h1 class="font-bold text-3xl">Мой блог</h1>
      <span class="text-lg">Блог посвященный технологиям, кодингу и другим вещам</span>
    </section>

    <section class="py-4">
      <h1 class="text-xl font-bold">Последние посты</h1>
    </section>

    <section class="py-4">
      <ArticleComponent/>
    </section>

  </MainLayout>


</template>

<style scoped>

</style>
