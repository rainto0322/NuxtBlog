<script lang="ts" setup>
let props = defineProps<{
  value: boolean,
  left?: string,
}>();


const emit = defineEmits(['update:value']);

const toggleMode = () => {
  emit('update:value', !props.value);
}
</script>

<template>
  <div class="tog-btn" @click="toggleMode">
    <span class="toggle" v-bind:class="value ? 'on' : ''"></span>
  </div>
</template>

<style>
/* toggle button */
.tog-btn {
  position: relative;
  height: 24px;
  width: 44px;
  border-radius: 1.5em;
  display: inline-block;
  margin-inline: 5px;
  padding: 5px;
  border: 2px solid var(--theme);
  vertical-align: middle;
  user-select: none;
  cursor: pointer;
}

.toggle::before {
  content: '';
  position: absolute;
  top: 0;
  left: -1px;
  right: 0;
  width: 20px;
  height: 20px;
  border: 1px solid var(--theme);
  background: var(--theme);
  border-radius: 50%;
  transition: all .2s;
}

.toggle.on::before {
  left: 21px;
}
</style>