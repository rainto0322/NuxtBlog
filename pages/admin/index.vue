<template>

  <NuxtLayout name="admin">
    <div>
      <h1>Admin Page</h1>
      <button @click="logout">logout</button>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
async function logout() {
  await $fetch('/api/user/logout').then(({ ok }) => {
    if (ok) {
      useRouter().push('/login')
      useCue().done({ title: 'Logout successful' });
    }
  })
}
</script>

<style></style>