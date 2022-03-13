<template>
  <div id="article-container">
    <!-- 搜索框 -->
    <el-row justify="center">
      <el-col :md="10" :lg="12" :xl="14">
        <div>
          <el-input v-model="input" placeholder="请输入需要搜索的内容" clearable size="large" />
        </div>
      </el-col>
      <el-col :md="6" :lg="5" :xl="3" class="search-btn">
        <div>
          <el-button @click="search" type="primary" size="large">
            <el-icon size="small">
              <Search />
            </el-icon>查询
          </el-button>
          <el-button type="primary" size="large" @click="dialogFormVisible = true">
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
          size="large"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="index" width="120" />
          <el-table-column label="分类" show-overflow-tooltip>
            <template #default="scope">
              <el-input v-model="scope.row.categoryName" placeholder="Please input" clearable />
            </template>
          </el-table-column>
          <el-table-column label="Operations">
            <template #default="scope">
              <el-button
                type="primary"
                :icon="Edit"
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
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
        <el-button type="danger" :icon="Minus" @click="batchDeletion()">批量删除</el-button>
      </el-col>
    </el-row>
    <!-- 分页器 -->
    <el-row justify="center">
      <el-col :span="24">
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[4, 8, 12, 16]"
          :small="small"
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
    <!-- 弹出框 -->
    <el-dialog v-model="dialogFormVisible" title="Shipping address">
      <el-row>
        <el-col>
          <span>分类名称：</span>
          <el-input v-model="addCategoryName" autocomplete="off"></el-input>
        </el-col>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addCategory">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { Search, Plus, Minus, Edit } from '@element-plus/icons-vue'
import { ElTable, ElMessage } from 'element-plus'
import { useCategory } from '../../store';
import { log } from 'console';

// 获取仓库
const categoryStore = useCategory()
categoryStore.getCategoryList()
// 要搜索的值
const input = ref('')
let searchData = reactive([])
const search = () => {
  if (input.value == '') {
    return;
  } else {
    let result = categoryStore.categoryList.filter((item) => {
      return item.categoryName.indexOf(input.value) != -1 ? true : false
    })
    searchData = result

  }
}
// 获取分类的数据

const categoryData = computed({
  get: () => {
    return input.value != '' ? categoryStore.categoryList.filter((item) => {
      return item.categoryName.indexOf(input.value) != -1 ? true : false
    }) : categoryStore.categoryList
  },
  set: () => {

  }
})
//表格---->
interface Category {
  id: number,
  categoryName: string
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Category[]>([])
const toggleSelection = (rows?: Category[]) => {

  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value!.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const handleSelectionChange = (val: Category[]) => {
  multipleSelection.value = val
}
// 表格数据
const tableData = computed(() => {
  let page = pageSize.value * (currentPage.value - 1)

  return categoryData.value.slice(page, page + pageSize.value)

})
// 编辑按钮
const handleEdit = async (index: number, row: Category) => {
  await categoryStore.updateCategory({ id: row.id, categoryName: row.categoryName })
  // console.log(index, row)
  // let oldName;
  // for (const { id, categoryName } of tableData.value) {
  //   if (id == row.id) {
  //     oldName = categoryName
  //   }
  // }
  // console.log(row.categoryName, oldName);
  // if (oldName !== row.categoryName) {
  // }
}
/**
 * 删除按钮
 * 
 */
const handleDelete = async (index: number, row: Category) => {
  await categoryStore.delCategoryById(row.id)

}
//批量删除
const batchDeletion = () => {
  multipleSelection.value.forEach(async (item) => {
    await categoryStore.delCategoryById(item.id)
  })

}
// <-------------表格
// 分页

const currentPage = ref(1)
// 每页的数量
const pageSize = ref(8)
const small = ref(false)
const background = ref(true)
const disabled = ref(false)
// 总数
const total = computed(() => {
  return input.value != '' ? categoryStore.categoryList.filter((item) => {
    return item.categoryName.indexOf(input.value) != -1 ? true : false
  }).length : categoryData.value.length
})


const handleSizeChange = (val: number) => {
  // console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  // console.log(`current page: ${val}`)

}
// 弹出框------------->
const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const addCategoryName = ref('')
// 点击确定按钮 添加分类
const addCategory = () => {
  categoryStore.addCategory({ categoryName: addCategoryName.value })
  addCategoryName.value = ''
  dialogFormVisible.value = false
}

</script>
 <style lang="less" scoped >
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
// 弹出框
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
