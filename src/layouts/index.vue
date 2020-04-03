<template>
  <q-layout view="hHh lpR lFf" class="bg-grey-1">
    <navbar />

    <sidebar />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

export default {
  name: 'Layout',
  components: {
    Navbar, Sidebar
  }
}
</script>

<style lang="scss" scoped>
</style>
