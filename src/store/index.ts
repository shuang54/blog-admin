import { defineStore } from 'pinia'

export const useHello = defineStore('hello', {
  // 状态/数据
  state: () => {
    return {
      helloWorld: 'helloWorld',
      count: 0
    }
  },

  getters: {

  },

  actions: {
    changeCount() {
      this.count++
    }
  }
})