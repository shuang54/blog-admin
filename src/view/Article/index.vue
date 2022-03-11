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
          <el-button type="primary" size="large">
            <el-icon size="small">
              <Search />
            </el-icon>查询
          </el-button>
          <el-button type="primary" size="large">
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
          <el-table-column label="创建时间" width="120">
            <template #default="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column property="name" label="标题" width="120" />
          <el-table-column property="address" label="分类" show-overflow-tooltip />
          <el-table-column label="Operations">
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
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二行和第三行的选择状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button type="danger" :icon="Minus">批量删除</el-button>
      </el-col>
    </el-row>
    <!-- 分页器 -->
    <el-row justify="center">
      <el-col :span="24">
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[100, 200, 300, 400]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          class="pagination"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Search, Plus, Minus, Edit } from '@element-plus/icons-vue'
import type { ElTable } from 'element-plus'
// 要搜索的值
const input = ref('')
interface User {
  date: string
  name: string
  address: string
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])
const toggleSelection = (rows?: User[]) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value!.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}
// 表格数据
const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
// 编辑按钮
const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
// 删除按钮
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}
// 分页
const currentPage = ref(4)
const pageSize = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
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
