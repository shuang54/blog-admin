<template>
  <el-menu :uniqueOpened="true" :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen"
    @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router
    :collapse="isCollapse">
    <el-menu-item index="/admin">
      <el-icon>
        <home-filled />
      </el-icon>
      <template #title>首页</template>
    </el-menu-item>

    <el-menu-item index="/article">
      <el-icon>
        <document />
      </el-icon>
      <template #title>文章管理</template>
    </el-menu-item>

    <el-menu-item index="/category">
      <el-icon>
        <icon-menu />
      </el-icon>
      <template #title>分类管理</template>
    </el-menu-item>
    <el-menu-item index="/personal">
      <el-icon>
        <user-filled />
      </el-icon>
      <template #title>个人信息管理</template>
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
  HomeFilled,
  Document,
  Menu as IconMenu,
  UserFilled,
} from '@element-plus/icons-vue'
import { watchEffect, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSystem } from '../../store/system';
const router = useRouter()
const route = useRoute()
const systemSotre = useSystem()
// 侧边栏是否折叠
const isCollapse = ref(true)

watchEffect(() => {
  isCollapse.value = systemSotre.isCollapse
})
//获取
let activeIndex = ref('/');
activeIndex.value = route.path != '/' ? route.path : '/'
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
  // console.log(route.path);

  activeIndex.value = route.path ? route.path : '/'
}
watchEffect(() => {
  activeIndex.value = route.path

})
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>
<style>
.el-menu {
  height: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  height: 100%;
}
</style>