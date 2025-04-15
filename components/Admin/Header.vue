<script lang="ts" setup>


const menu = {
  'Article': {
    'icon': 'tabler:pencil-code',
    'path': '/article',
  },
  'Memo': {
    'icon': 'tabler:book',
    'path': '/memo',
  },
  'Album': {
    'icon': 'tabler:image-in-picture',
    'path': '/album',
  },
  'Comment': {
    'icon': 'tabler:message',
    'path': '/comment',
  },
  'Link': {
    'icon': 'tabler:plug-connected',
    'path': '/link',
  },
  'Dashboard': {
    'icon': 'tabler:calendar-heart',
    'path': '/',
  },
}

</script>

<template>
  <header class="menu">
    <NuxtLink class="link" activeClass="active" v-for="(value, key) in menu" :to="`/admin${value.path}`" :alt="key"
      :title="key">
      <Icon class="icon" :name="value.icon" size="24" />
      <span class="title">{{ key }}</span>
    </NuxtLink>
  </header>
</template>

<style scoped>
.menu {
  width: 100%;
  max-width: 1280px;
  min-width: 280px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  background-color: rgba(100, 100, 100, .1);
  backdrop-filter: blur(10px);
  overflow: hidden;
  z-index: 10;
}

.link {
  user-select: none;
  cursor: pointer;
  display: inline-block;
  padding: 1em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: all .2s ease;
  color: var(--theme);
}

.link.active,
.link:hover {
  background-color: var(--theme);
  color: var(--major);
}

.icon,
.title {
  vertical-align: middle;
}

.title {
  padding-inline: 8px;
}


@media (max-width:480px) {
  .menu {
    justify-content: space-between;
  }

  .link {
    width: 100%;
  }

  .icon {
    display: block;
    margin-inline: auto;
  }

  .title {
    display: none;
  }
}
</style>