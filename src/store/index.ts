import axios, { Axios } from 'axios'
import { defineStore } from 'pinia'
import { get, del, put, post } from '../utils/axios'
import { ElMessage as message } from 'element-plus'
import { useCookies } from 'vue3-cookies'
import * as nProgress from 'nprogress'
const { cookies } = useCookies()

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
      let result: any = await get('articlelist', data)
      this.articleList = result.data

    },
    async getArticle(id) {
      let result: any = await get(`article/${id}`)
      this.articleData = result.data
    },
    async addArticle(data) {
      let result: any = await post('article', data)
      if (result.data != []) {
        message.success('添加成功')
      } else {
        message.error('添加失败')
      }
    },
    async delArticle(id) {
      let result: any = await del(`article/${id}`)
      if (result.data == 1) {
        message.success('删除成功')
        return 'ok'
      } else {
        message.error('删除失败')
      }
    },
    async updateArticle(data) {
      let result: any = await put(`article?id=${data.id}&title=${data.title}&categoryid=${data.categoryId}&markdown=${data.markdown}`)
      if (result.data == 1 || result.data == 0) {
        message.success('更新成功')
      } else {
        message.error('更新失败')
      }
    },
    async getTotal(data = { search: '' }) {
      let result: any = await get('total', data)
      this.total = result.data
      if (result.data) {
        // message.success('更新成功')
      } else {
        message.error('更新失败')
      }
    },
    async delBatchArticle(data) {
      let result: any = await post('delarticle', data)

      if (result.data != 0) {
        message.success('删除成功')
      } else {
        message.error('删除失败')
      }
    }
  },

})
export const useUser = defineStore('user', {
  state: () => {
    return {
      isToken: window.localStorage.getItem('token'),
      name: '',
    }
  },
  actions: {
    //用户登录逻辑
    async login(data) {
      let result: any = await post('user/login', data)

      if (result.code == 200) {
        // cookies.set('token', result.token, 1000 * 60 * 60 * 24 * 15)
        window.localStorage.setItem('token', result.data.token)
        message.success('登录成功')
        this.token = result.data.token
        this.name = result.data.name
        return 'ok'
      }
      message.error('用户名或密码错误')
      return 'no'
    },
    //用户是否登录
    async getUserInfo() {
      this.token = window.localStorage.getItem('token')
      let result: any = await post('user/loginByToken', { 'token': this.token })

      if (result.code == 200) {
        this.name = result.data.name
        return;
      }
      return Promise.reject(new Error(''))
    },
    //退出登录
    signOut() {
      this.name = ''
      this.token = ''
      window.localStorage.removeItem('token')
    },
    // 修改密码
    async updatePassword(data) {
      let result: any = await post('user/setPassword', data)
      if (result.code == 200) {
        message.success('更新密码成功')
        return 'ok'
      }
      message.error('更新密码失败')
      return 'no'
    },
    // 忘记密码
    async forgotPassword(data) {
      let result: any = await post('user/forgotPassword', data)
      if (result.code == 200) {
        message.success('设置密码成功')
        return 'ok'
      }
      message.error('设置密码失败')
      return 'no'
    }

  },
  getters: {}


})