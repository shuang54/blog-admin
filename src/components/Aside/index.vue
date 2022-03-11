<template>
  <el-menu
    :uniqueOpened="true"
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item index="/">
      <el-icon>
        <location />
      </el-icon>
      <template #title>首页</template>
    </el-menu-item>

    <el-menu-item index="/admin/article">
      <el-icon>
        <icon-menu />
      </el-icon>
      <template #title>文章</template>
    </el-menu-item>

    <el-menu-item index="/admin/category">
      <el-icon>
        <document />
      </el-icon>
      <template #title>分类</template>
    </el-menu-item>
    <!-- <el-menu-item index="4">
      <el-icon>
        <setting />
      </el-icon>
      <template #title>设置</template>
    </el-menu-item>-->
  </el-menu>
</template>

<script setup lang="ts">
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
//获取
let activeIndex = route.path != '/' ? route.path : '/'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  console.log(route.path);

  activeIndex = route.path ? route.path : '/'
  console.log(activeIndex);


}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  height: 100%;
}
</style>