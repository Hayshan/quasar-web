<template>
  <q-header elevated class="bg-white text-grey-8" height-hint="64">
    <q-toolbar class="nav-toolbar">
      <q-btn dense flat round icon="menu" @click="toggleSideBar" />

      <q-toolbar-title shrink class="row items-center no-wrap">
        <logo />
      </q-toolbar-title>

      <q-space />

      <div class="q-gutter-sm row items-center no-wrap">
        <q-btn round dense flat color="grey-8" icon="notifications">
          <q-badge color="red" text-color="white" floating>2</q-badge>
          <q-tooltip>消息提醒</q-tooltip>
        </q-btn>
        <q-btn round flat>
          <q-avatar size="26px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <q-tooltip>登陆用户</q-tooltip>
          <q-menu anchor="bottom right" self="top right">
            <q-list class="text-grey-8" style="min-width: 100px">
              <q-item v-ripple clickable aria-hidden="true">
                <q-item-section class="text-uppercase text-grey-7" style="font-size: 0.7rem">修改密码</q-item-section>
              </q-item>
              <q-item v-ripple clickable aria-hidden="true" to="/login">
                <q-item-section class="text-uppercase text-grey-7" style="font-size: 0.7rem">退出登陆</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import Logo from 'components/Logo'

export default {
  name: 'Navbar',
  components: {
    Logo
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-toolbar {
  height: 64px;
}
</style>
