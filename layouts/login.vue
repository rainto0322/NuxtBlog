<script setup lang="ts">
useHead({
  title: 'Login',
  link: [
    { rel: 'icon', href: '/favicon.svg' }
  ]
})

</script>

<template>
  <div class="login" name="login">
    <slot />
  </div>
</template>