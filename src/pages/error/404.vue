<template>
  <div class="fixed-center text-center">
    <p>
      <img src="~assets/sad.svg" style="width:30vw;max-width:150px;" />
    </p>
    <p class="text-faded">
      非常抱歉, 该页面暂时无法打开
      <strong>(404)</strong>
    </p>
    <q-btn color="secondary" style="width:200px;" @click="$router.push('/')">返回首页</q-btn>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
