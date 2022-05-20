<template>
  <div id="article-container">
    <el-row>
      <el-col :span="8"></el-col>
      <el-col :span="8">后台博客系统</el-col>
      <el-col :span="8">
        <a @click="signOut">退出登录</a>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useUser } from '../../store';
let route = useRoute()
let router = useRouter()
let userStore = useUser()

const signOut = () => {
  userStore.signOut()
  router.push('/login')
}
</script>
<style lang="less" scoped></style>
