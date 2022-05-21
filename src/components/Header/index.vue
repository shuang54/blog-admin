<template>
  <div id="article-container">
    <el-row>
      <el-col class="header-left" :span="8">
        <!-- <el-button @click="setIsCollapse">折叠</el-button> -->
        <el-icon @click="setIsCollapse" class="expand" :size="40">
          <Expand />
        </el-icon>
        <h1>博客后台管理系统</h1>
      </el-col>
      <el-col :span="8"></el-col>
      <el-col :span="8">
        <a @click="signOut">退出登录</a>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import {
  Expand
} from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useUser } from '../../store';
import { useSystem } from '../../store/system'
let route = useRoute()
let router = useRouter()
let userStore = useUser()
const { setIsCollapse } = useSystem()
const signOut = () => {
  userStore.signOut()
  router.push('/login')
}
</script>
<style lang="less" scoped>
.header-left {
  text-align: left;
  font-size: 16px;
  // font-weight: 400;
  color: white;
  display: flex;
  align-items: center;

  .expand {
    cursor: pointer;

    &:hover {
      color: #ffd04b;
    }
  }
}
</style>
