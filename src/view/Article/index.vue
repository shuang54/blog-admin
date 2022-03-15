<template>
  <div id="article-container">
    <!-- 搜索框 -->
    <el-row justify="center">
      <el-col :md="10" :lg="12" :xl="14">
        <div>
          <el-input v-model="input" placeholder="请输入内容" clearable size="large" />
        </div>
      </el-col>
      <el-col :md="6" :lg="5" :xl="3" class="search-btn">
        <div>
          <el-button @click="search" type="primary" size="large">
            <el-icon size="small">
              <Search />
            </el-icon>查询
          </el-button>
          <el-button type="primary" @click="addArticle" size="large">
            <el-icon>
              <Plus />
            </el-icon>添加
          </el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 文章表格 -->
    <el-row justify="center">
      <el-col :span="22">
        <el-table
          ref="multipleTableRef"
          :data="tableData"
          style="width: 100%"
          class="table"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="index" width="120" />
          <el-table-column label="创建时间" min-width="180">
            <template #default="scope">{{ scope.row.createTime }}</template>
          </el-table-column>

          <el-table-column property="title" label="标题" min-width="180" />
          <el-table-column property="categoryName" label="分类" show-overflow-tooltip />
          <el-table-column label="最后一次修改时间" min-width="180">
            <template #default="scope">{{ scope.row.updateTime }}</template>
          </el-table-column>
          <el-table-column fixed="right" min-width="180" label="操作">
            <template #default="scope">
              <el-button :icon="Edit" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                :icon="Minus"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 删除..按钮 -->
    <el-row>
      <el-col :span="24" class="del-btn">
        <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
        <el-button @click="batchDeleteArticle()" type="danger" :icon="Minus">批量删除</el-button>
      </el-col>
    </el-row>
    <!-- 分页器 -->
    <el-row justify="center">
      <el-col :span="24">
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 15, 20]"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          class="pagination"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue';
import { Search, Plus, Minus, Edit } from '@element-plus/icons-vue'
import type { ElTable } from 'element-plus'
import { useArticle } from '../../store';
import { reactify } from '_@vueuse_shared@7.7.1@@vueuse/shared';
// import router from '../../route';
import { useRouter } from 'vue-router';

//获取仓库
const articleStore = useArticle()

// 要搜索的值
const input = ref('')
// 搜索文章
const search = async () => {
  await articleStore.getArticleList({ num: pageSize.value, page: page.value, search: input.value })
  await articleStore.getTotal({ search: input.value })
}


interface Article {
  id: number,
  categoryId: number,
  createTime: string,
  updateTime: string,
  title: string,
}
const router = useRouter()
// 添加文章
const addArticle = () => {
  router.push({ name: 'addArticle' })
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Article[]>([])
const toggleSelection = (rows?: Article[]) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value!.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const handleSelectionChange = (val: Article[]) => {
  multipleSelection.value = val
}
// 批量删除文章
const batchDeleteArticle = async () => {
  let data: any = []
  multipleSelection.value.forEach((item) => {
    // await articleStore.delArticle()
    // console.log(item.id);
    data.push(item.id)
  })
  data = JSON.stringify(data)


  await articleStore.delBatchArticle({ id: data })
  await articleStore.getArticleList({ num: pageSize.value, page: page.value })

}

// 编辑按钮
const handleEdit = (index: number, row: Article) => {
  router.push({ name: 'updateArticle', params: { id: row.id } })
}
// 删除按钮
const handleDelete = async (index: number, row: Article) => {
  let id = row.id
  await articleStore.delArticle(id)
  await articleStore.getArticleList({ num: pageSize.value, page: page.value })


}
// 分页器----------------------->
// 当前第几页
const currentPage = ref(1)
// 每页多少数据
const pageSize = ref(10)
const background = ref(true)
const disabled = ref(false)
// 获取文章总数
articleStore.getTotal()
const total = computed(() => {
  return articleStore.total
})

// 改变每页显示多少数据
const handleSizeChange = (val: number) => {
  pageSize.value = val
  articleStore.getArticleList({ num: pageSize.value, page: page.value })
}
// 改变页码
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  articleStore.getArticleList({ num: pageSize.value, page: page.value })
}

let page = computed(() => {
  return pageSize.value * (currentPage.value - 1)
})
articleStore.getArticleList({ num: pageSize.value, page: page.value })
const articleList = computed({
  get: () => {
    return articleStore.articleList
  },
  set: () => { }
})
// 表格数据
const tableData = computed(() => {
  return articleList.value
})
articleStore.getArticleList({ num: pageSize.value, page: page.value })

</script>
<style lang="less" scoped>
.search-btn {
  max-width: 200px;
}
.table {
  margin-top: 20px;
}
// 分页
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
.pagination {
  margin-top: 20px;
  justify-content: center;
}
// 批量删除
.del-btn {
  margin-top: 20px;
  padding-left: 40px;
  display: flex;
  justify-content: flex-start;
}
</style>
