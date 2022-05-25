<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { useArticle, useCategory } from './store/index'
// 请求文章统计数据
onBeforeMount(async () => {
  await useArticle().getArticleTotal()
  await useCategory().getCategoryTotal()


})
</script>
<template>
  <router-view></router-view>
</template>

<style scoped lang="less">
</style>

