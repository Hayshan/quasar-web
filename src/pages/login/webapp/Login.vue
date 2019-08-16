<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { setToken } from '@/utils/token'

export default {
  name: 'Login',
  components: {},
  data () {
    return {
      left: false
    }
  },
  mounted () {},
  methods: {
    login () {
      setToken('')
      this.$router.push('/admin')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
