import axios, { Axios } from 'axios'
import { defineStore } from 'pinia'
import { get, del, put, post } from '../utils/axios'
import { ElMessage as message } from 'element-plus'
export const useCategory = defineStore('category', {
  // 状态/数据
  state: () => {
    return {
      categoryList: [],
    }
  },

  getters: {

  },

  actions: {
    async getCategoryList() {
      this.categoryList = await get('category')
    },
    async delCategoryById(id: number) {
      let result = await del(`category/${id}`)
      if (result == 1) {
        this.getCategoryList()
        message.success('删除成功');
      } else {
        message.success('删除失败')
      }
      // let result = await axios.put(`http://127.0.0.1:8000/blog/category/5/12`)
    },
    async updateCategory(params) {
      let result = await put(`category/${params.id}/${params.categoryName}`)
      if (result == 1) {
        this.getCategoryList()
        message.success('更新成功');
      } else {
        this.getCategoryList()
        message.error('更新失败')
      }
    },
    async addCategory(params) {
      let result = await post(`category`, params)
      if (result !== []) {
        this.getCategoryList()
        message.success('添加成功');
      } else {
        this.getCategoryList()
        message.error('添加失败')
      }
    },
  }
})
export const useArticle = defineStore('article', {
  state: () => {
    return {
      articleList: [],
      articleData: [],
      total: 0,
    }
  },
  getters: {

  },
  actions: {
    async getArticleList(data) {
      this.articleList = await get('articlelist', data)

    },
    async getArticle(id) {
      this.articleData = await get(`article/${id}`)
    },
    async addArticle(data) {
      let result = await post('article', data)
      if (result != []) {
        message.success('添加成功')
      } else {
        message.error('添加失败')
      }
    },
    async delArticle(id) {
      let result = await del(`article/${id}`)
      if (result == 1) {
        message.success('删除成功')
        return 'ok'
      } else {
        message.error('删除失败')
      }
    },
    async updateArticle(data) {
      let result = await put(`article?id=${data.id}&title=${data.title}&categoryid=${data.categoryId}&markdown=${data.markdown}`)
      if (result == 1 || result == 0) {
        message.success('更新成功')
      } else {
        message.error('更新失败')
      }
    },
    async getTotal(data = { search: '' }) {
      let result = await get('total', data)
      this.total = result
      if (result) {
        message.success('更新成功')
      } else {
        message.error('更新失败')
      }
    }
  },

})