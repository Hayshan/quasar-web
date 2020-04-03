<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page>
        登陆页
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      left: false
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    login () {
      this.$router.push({ path: this.redirect || '/' })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
