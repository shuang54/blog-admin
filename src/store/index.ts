import { defineStore } from 'pinia'
import { get, del, put, post } from '../utils/axios'
import { ElMessage as message } from 'element-plus'
import { createPinia } from 'pinia'
import { useCategory as category } from './category'
const store = createPinia()

export default store
export const useCategory = category
export const useArticle = defineStore('article', {
  state: () => {
    return {
      articleList: [],
      articleData: [],
      total: 0,
      articleTotalData: [[], []],
    }
  },
  getters: {

  },

  actions: {
    // 文章提交统计
    async getArticleTotal() {
      const result: any = await get('getArticleTotal')
      if (result.code == 200) {
        result.data.forEach((item: any, index) => {
          this.articleTotalData[0].push(item.dates)
          this.articleTotalData[1].push(item.value)
        })
      } else {
        message.error('查询文章提交统计失败')
      }
    },
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
      token: window.localStorage.getItem('token'),
      name: '',
      email: '',
      desc: '',
      imgUrl: '',
      created_at: '',
      verifyUrl: '',
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
        this.email = result.data.email
        this.desc = result.data.desc
        this.imgUrl = result.data.imgUrl
        this.created_at = result.data.created_at
        return 'ok'
      }
      this.getVerify()
      message.error(result.message)
      return 'no'
    },
    //用户是否登录
    async getUserInfo() {
      this.token = window.localStorage.getItem('token')
      let result: any = await post('user/loginByToken', { 'token': this.token })

      if (result.code == 200) {
        this.name = result.data.name
        this.email = result.data.email
        this.desc = result.data.desc
        this.imgUrl = result.data.imgUrl
        this.created_at = result.data.created_at
        return;
      }
      return Promise.reject(new Error(''))
    },
    //退出登录
    signOut() {
      this.name = ''
      this.token = ''
      this.desc = ''
      this.imgUrl = ''
      this.email = ''
      this.created_at = ''
      window.localStorage.removeItem('token')
    },
    // 修改密码
    async updatePassword(data) {
      let result: any = await post('user/setPassword', { name: this.name, email: this.email, oldpassword: data.oldPwd, newpassword: data.newPwd })

      if (result.code == 200) {
        message.success('更新密码成功')
        return 'ok'
      }
      message.error('更新密码失败')
      return 'no'
    },
    // 修改用户信息
    async updateUserInfo(data) {
      let result: any = await post('user/updateUserInfo', data)

      if (result.code == 200) {
        message.success('修改用户信息成功')
        this.name = data.name
        this.email = data.email
        this.desc = data.desc

        return 'ok'
      }
      message.error('修改用户信息失败')
      return 'no'
    },
    // 忘记密码
    async forgotPassword(data) {
      let result: any = await post('user/forgotPassword', data)
      if (result.code == 200) {
        message.success('修改密码成功')
        return 'ok'
      }
      message.error('修改密码失败')
      this.getVerify()
      return 'no'
    },
    async updateImg(data) {
      let result: any = await post('user/updateImg', data)
      if (result.code == 200) {
        message.success('更新头像成功')
        this.imgUrl = data.imgUrl
        return 'ok'
      }
      message.error('更新头像失败')
      return 'no'
    },
    // 获取验证码
    async getVerify() {
      let result: any = await get('verify')

      this.verifyUrl = result

    },
    // 

  },
  getters: {}


})