<script setup lang="ts">
const cue = useCue()
const list = ref(cue.cues)
function closeCue(id: string | number) {
  cue.remove(id)
}
</script>

<template>
  <div class="cue">
    <div :class='`cue-item ${item.type}`' v-for="item in list">
      <div class="cue-icon"><img :src="item.icon"></div>
      <div class="cue-cont">
        <div class="cue-title">{{ item.title }}</div>
        <div class="cue-msg">{{ item.msg }}</div>
      </div>
      <span class="cue-close" @click="closeCue(item.id)">
        <img src="/img/close.svg">
      </span>
    </div>
  </div>
</template>

<style>

@keyframes progress {
  from {
    width: 100%;
  }

  to {
    width: 0%;
  }
}

.cue {
  width: 250px;
  position: fixed;
  left: 0;
  bottom: 50px;
  z-index: 10;
}

.cue-item {
  margin: 1em;
  padding: 1em;
  border-radius: .5em;
  background-color: var(--major);
  border: 1px solid var(--theme);
  user-select: none;
  position: relative;
  align-items: center;
  display: flex;
  gap: 10px;
  overflow: hidden;
}

.cue-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: var(--theme);
  display: block;
  width: 100%;
  height: 3px;
  opacity: 1;
  animation: progress 2s linear forwards;
}

.cue-icon {
  min-width: 28px;
  width: 25px;
  height: 25px;
}

.cue-title {
  font-weight: bolder;
}

.cue-msg {
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cue-close {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>