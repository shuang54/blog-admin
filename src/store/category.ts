import { defineStore } from 'pinia'
import { get, del, put, post } from '../utils/axios'
import { ElMessage as message } from 'element-plus'
export const useCategory = defineStore('category', {
  // 状态/数据
  state: () => {
    return {
      categoryList: [],
      categoryTotalData: [[], []],
    }
  },

  getters: {

  },

  actions: {
    //获取分类文章统计数据
    async getCategoryTotal() {
      const result: any = await get('getCategoryTotal')
      if (result.code == 200) {
        result.data.forEach((item: any, index) => {
          this.categoryTotalData[0].push(item.name)
          this.categoryTotalData[1].push({ 'value': item.value, 'name': item.name })
        })
      } else {
        message.error('查询文章提交统计失败')
      }
    },
    async getCategoryList() {
      let result: any = await get('category')
      this.categoryList = result.data
    },
    async delCategoryById(id: number) {
      let result: any = await del(`category/${id}`)
      if (result.data == 1) {
        this.getCategoryList()
        message.success('删除成功');
      } else {
        message.success('删除失败')
      }
      // let result = await axios.put(`http://127.0.0.1:8000/blog/category/5/12`)
    },
    async updateCategory(params) {
      let result: any = await put(`category/${params.id}/${params.categoryName}`)


      if (result.data == 1) {
        this.getCategoryList()
        message.success('更新成功');
      } else {
        this.getCategoryList()
        message.error('更新失败')
      }
    },
    async addCategory(params) {
      let result: any = await post(`category`, params)
      if (result.data != []) {
        this.getCategoryList()
        message.success('添加成功');
      } else {
        this.getCategoryList()
        message.error('添加失败')
      }
    },
  }
})