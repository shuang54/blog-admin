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
      <v-md-editor fontSize="20" v-model="markdown" height="800px"></v-md-editor>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AnyAaaaRecord } from 'dns';
import { computed, onBeforeMount, onMounted, reactive, ref, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCategory, useArticle } from '../../store';
import { ElMessage as Message } from 'element-plus'
let markdown = ref('')
let title = ref('')
let categoryId = ref('')
// 获取文章Sotre
const articleStore = useArticle()
// 获取分类Sotre
const categorySotre = useCategory()
categorySotre.getCategoryList()
let category = computed(() => {
  return categorySotre.categoryList
})
const router = useRouter()
const route = useRoute()

let oldMarkdown;
if (route.params.id) {
  articleStore.getArticle(route.params.id)
    .then(() => {
      let articleData: any = toRaw(articleStore.articleData)
      markdown.value = articleData.markdown
      title.value = articleData.title
      categoryId.value = articleData.categoryId
      oldMarkdown = articleData.markdown
    })
}


// 添加文章
const add = async () => {
  // 根据传递的路由参数判断 添加还是更新
  const id = route.params.id
  if (id) {
    if (oldMarkdown == markdown.value) {

    }
    let data = { id: id, markdown: markdown.value, title: title.value, categoryId: categoryId.value }
    useArticle().updateArticle(data)
    router.push({ name: 'article' })
  } else {
    let data = { markdown: markdown.value, title: title.value, categoryId: categoryId.value }
    useArticle().addArticle(data)
    router.push({ name: 'article' })
  }

}


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