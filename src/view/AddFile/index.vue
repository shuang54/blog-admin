<template>
  <div id="add-file-container">
    <div class="file-name">
      <el-select v-model="categoryId" placeholder="请选择文章分类">
        <el-option
          v-for="item in category"
          :key="item.id"
          :label="item.categoryName"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-input v-model="title" placeholder="请输入标题"></el-input>
      <button type="button" class="btn" @click="add">提交</button>
    </div>
    <div class="box">
      <!-- <mavon-editor
        v-model="markdown"
        ref="md"
        @change="change"
        @imgAdd="$imgAdd"
        style="min-height: 800px"
      />-->
      <v-md-editor fontSize="20" v-model="markdown" height="800px"></v-md-editor>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue';
import router from '../../route';
import { useCategory, useArticle } from '../../store';
const html = ref('')
const markdown = ref('')
const title = ref('')
const categoryId = ref('')

// 添加文章
const add = async () => {
  let data = { markdown: markdown.value, title: title.value, categoryId: categoryId.value }
  useArticle().addArticle(data)
  router.push({ name: 'article' })
}


const categorySotre = useCategory()
categorySotre.getCategoryList()
let category = computed(() => {
  return categorySotre.categoryList
})

</script>

<style scoped lang="less">
#add-file-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: white;
  .file-name {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #ccc;
    line-height: 60px;
    margin-bottom: 10px;
    align-items: center;
    .btn {
      margin: 10px;
      width: 156px;
      height: 40px;
      border-radius: 5px;
      line-height: 40px;
    }
  }
}
</style>