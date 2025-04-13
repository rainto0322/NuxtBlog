<script setup lang="ts">
useHead({
  title: "雨巷",
  link: [
    { rel: 'icon', href: '/favicon.svg' }
  ]
})
useSeoMeta({
  ogImage: '/favicon.png'
})
const menu = {
  '首頁': '/',
  '歸檔': '/',
  '標籤': '/',
  '碎語': '/',
  '關於': '/',
  '登陸': '/login',
}
onMounted(() => {
  const toast = useCue()
  toast.add({ title: '歡迎加入' })
})
</script>

<template>
  <div class="default" name="default">
    <header>
      <h1>雨巷(rainto.top)</h1>
      <p class="menu">
        <NuxtLink v-for="(value, key) in menu" :to="value">{{ key }}</NuxtLink>
      </p>
    </header>
    <slot />
  </div>
</template>
<style scoped>
.menu a {
  padding-right: 1em;
}
</style>