<script setup lang="ts">
const cue = useCue()
const router = useRouter()

const signupMode = ref(false)
const loading = ref(false)
const form = ref({
  name: 'admin',
  password: '12345678',
  email: 'rainto0322@foxmail.com',
})

// toggle between login and signup
function submit() {
  signupMode.value ? signup() : login()
}

// login function
async function login() {
  loading.value = true
  await $fetch<{
    ok: boolean
    msg?: string
  }>('/api/user/login', {
    method: 'POST',
    body: form.value
  }).then((data) => {
    const { ok, msg } = data
    if (ok) {
      cue.done({ title: msg })
      setTimeout(() => {
        router.push('/admin')
      }, 1000);
    }

    // login failed
  }).catch((error) => {
    if (error.status === 401) {
      cue.error({ title: error.data })
      form.value.name = ''
      form.value.password = ''
    } else {
      cue.error({ title: error.data })
    }
  })
  loading.value = false
}

// signup function
async function signup() {
  loading.value = true
  await $fetch<{
    msg?: string
  }>('/api/user/signup', {
    method: 'POST',
    body: form.value
  }).then((data) => {
    cue.done({ title: data.msg })
    signupMode.value = false
    form.value.password = ''

    //signup error
  }).catch((error) => {
    if (error.status === 409) {
      cue.error({ title: 'The username or email has already been registered.' })
    } else {
      cue.error({ title: error.data })
    }
    form.value.name = ''
  })
  loading.value = false
}

// Create the first admin
async function Init() {
  const { ok } = await $fetch('/api/init')
  if (ok) signupMode.value = true
}

const isFormValid = computed(() => {
  const { name, password, email } = form.value
  const empty = name.trim() !== '' &&
    password.trim() !== '' &&
    email.trim() !== ''
  if (empty && signupMode.value || !signupMode.value) return true
})

onMounted(() => {
  Init()
  const token = useCookie('rain_token').value
  console.log(token);
  
  if (token) login()
})


</script>

<template>
  <NuxtLayout name="login">
    <form @submit.prevent="submit">
      <div class="form-meta">
        <h1 class="show" v-if="signupMode">Signup</h1>
        <h1 class="show" v-else>Login</h1>
        <ToolToggleButton class="tog-btn" :value="signupMode" @update:value="signupMode = $event">
        </ToolToggleButton>
      </div>
      <div style="min-height: 180px;">
        <input placeholder="🙇‍♂️ Username" type="text" minlength="2" maxlength="10" pattern="[^.]*?"
          v-model="form.name">
        <input placeholder="🔑 Password" type="password" minlength="8" maxlength="20" v-model="form.password">
        <input class="show" placeholder="📧 Email" type="email" v-if="signupMode" v-model="form.email">
      </div>
      <button class="submit" :disabled="!isFormValid || loading">
        {{ loading ? 'loading...' : 'submit' }}
      </button>
    </form>
  </NuxtLayout>
</template>

<style scoped>
form {
  max-width: 300px;
  margin: 20vh auto 0;
  padding: 1em;
  transition: margin 0.2s;
}

input {
  padding: 1em;
}

input::before {
  content: "🙇‍♂️";
  display: inline-block;
}

.form-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

button:disabled {
  background-color: var(--gray);
}
</style>