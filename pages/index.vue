<script lang="ts" setup>

async function submit() {
  const data = await $fetch('/api/user/signup', {
    method: 'POST',
    body: {
      name: 'admin',
      password: '123456',
      email: 'rainto0322@foxmail.com',
    }
  }).catch((err) => {
    if(err.status===409){
      console.log('用户已存在')
    }else{
      console.log(err)
    }
  });
}

</script>

<template>
  <h1>雨巷</h1>
  <button @click="submit">submit</button>
</template>