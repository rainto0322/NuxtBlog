<script lang="ts" setup>
const form = ref({
  title: '文章',
  content: '123123',
  category: 'asdas',
  tags: [''],
})

async function submit() {
  await $fetch('/api/article', {
    method: 'POST',
    body: form.value
  }).then((data) => {
    console.log(data);

  }).catch((error)=>{
    console.log(error.data);
    
  })
}

</script>

<template>
  <NuxtLayout name="admin">
    <h1>Article</h1>
    <input type="text" v-model="form.title">
    <input type="text" v-model="form.category">
    <input type="text" v-model="form.tags">
    <button @click="submit">upload</button>
  </NuxtLayout>
</template>