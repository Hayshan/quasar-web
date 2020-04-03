<template>
  <div class="logo-container">
    <transition name="logoFade">
      <router-link class="logo-link" to="/">
        <q-avatar v-if="icon" class="logo-icon">
          <img :src="icon" />
        </q-avatar>
        <span class="logo-title q-ml-sm">{{ title }}</span>
      </router-link>
    </transition>
  </div>
</template>

<script>
import getPageTitle from '@/utils/get-page-title'

export default {
  name: 'Logo',
  data () {
    return {
      icon: 'https://cdn.quasar.dev/logo/svg/quasar-logo.svg'
    }
  },
  computed: {
    title () {
      return getPageTitle()
    }
  }
}
</script>

<style lang="scss" scoped>
.logoFade-enter-active {
  transition: opacity 1.5s;
}

.logoFade-enter,
.logoFade-leave-to {
  opacity: 0;
}

.logo-container {
  position: relative;
  width: auto;
  height: 100%;
  color: currentColor;
  overflow: hidden;

  & .logo-link {
    color: currentColor;
    text-decoration: none;
  }
}
</style>
