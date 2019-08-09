<template>
  <q-layout view="hHh lpR lFf">

    <q-header elevated class="bg-white text-grey-8">
      <q-toolbar class="admin-toolbar">
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          后台管理系统
        </q-toolbar-title>

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>消息提醒</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <q-tooltip>登陆用户</q-tooltip>
            <q-menu anchor="bottom right" self="top right">
              <q-list class="text-grey-8" style="min-width: 100px">
                <q-item v-ripple clickable aria-hidden="true">
                  <q-item-section class="text-uppercase text-grey-7" style="font-size: 0.7rem">
                    修改密码
                  </q-item-section>
                </q-item>
                <q-item v-ripple clickable aria-hidden="true" to="/login">
                  <q-item-section class="text-uppercase text-grey-7" style="font-size: 0.7rem">
                    退出登陆
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" :width="240" bordered>
      <q-scroll-area class="fit">
        <q-list padding>

          <q-item-label header class="text-weight-bold text-uppercase">
            系统基础管理
          </q-item-label>
          <q-item v-for="menu in menus.basic" :key="menu.text" v-ripple clickable :to="menu.path">
            <q-item-section avatar>
              <q-icon color="grey" :name="menu.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ menu.text }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator class="q-mt-md q-mb-lg" />

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'Admin',
  components: {},
  data () {
    return {
      left: false,
      menus: {
        basic: [
          { icon: 'account_balance', text: '单位管理' },
          { icon: 'supervisor_account', text: '用户管理', path: '/admin/users' },
          { icon: 'menu', text: '菜单管理' },
          { icon: 'star', text: '权限管理' }
        ]
      }
    }
  },
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
  .admin-toolbar {
    height: 64px;
  }
</style>
