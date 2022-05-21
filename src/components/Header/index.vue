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
        <!-- <a @click="signOut">退出登录</a> -->
        <div class="user">
          <el-image style="width: 55px; height: 55px"
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7ad1e283fc93d4eea2e392eceedea69d8b33618019160-z1Va2S_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655734206&t=c996fce6d47701e5065d65a9017079f1"
            lazy fit="fill" />
          <el-dropdown>
            <span class="name">
              admin
              <el-icon :size="20" color="white">
                <caret-bottom />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <router-link to="/personal">个人中心</router-link>
                </el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item @click="signOut" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import {
  Expand,
  CaretBottom

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
a {
  &:hover {
    color: #409eff;
  }
}

.user {
  display: flex;
  align-items: center;
  justify-content: center;

  .name {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 20px;
    margin-left: 10px;
    color: white;





    span {
      font-size: 20px;
    }
  }

  .el-image {
    border-radius: 30px;
  }


}

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
