<template>
  <!-- <div id="article-container">
    <p>main视图</p>
  </div>-->
  <el-container>
    <!-- 头部 -->
    <el-header>
      <Header></Header>>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>
      <!-- 主体内容 -->
      <el-main>
   <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount } from "vue";
//异步导入组件
const Aside = defineAsyncComponent(() =>
  import('../Aside/index.vue')
)
const Header = defineAsyncComponent(() =>
  import('../Header/index.vue')

)
onBeforeMount(()=>{
  // document.getElementById("loader-wrapper").remove()
})
</script>
<style scoped lang="less">
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
  height:calc(100vh - 60px);
  overflow-x:hidden;
  width: auto;
}

.el-main {
  background-color: white;
  color: var(--el-text-color-primary);
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

</style>