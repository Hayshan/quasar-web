<template>
  <q-drawer v-model="isCollapse" content-class="bg-white" show-if-above bordered :width="280">
    <q-scroll-area class="fit">
      <q-list padding class="text-grey-8">
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes () {
      return this.$router.options.routes
    },
    isCollapse () {
      return this.sidebar.opened
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
