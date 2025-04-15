<script lang="ts" setup>
useHead({
  title: 'Control Panel',
  link: [
    { rel: 'icon', href: '/favicon.svg' }
  ]
})
</script>

<template>
  <div class="admin" name="admin">
    <AdminHeader class="menu" />
    <div class="content show">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.admin {
  padding: 10px;
  max-width: 1280px;
  margin-inline: auto;
  border-radius: 1em;
}


.content {
  margin-block: 4em;
  width: 100%;
  overflow: hidden;
}
</style>