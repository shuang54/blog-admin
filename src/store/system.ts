import { stat } from 'fs'
import { defineStore } from 'pinia'

export const useSystem = defineStore('system', {
  state: () => {
    return {
      isCollapse: false,
    }
  },
  actions: {
    setIsCollapse() {
      this.isCollapse = !this.isCollapse
      console.log(this.isCollapse);

    }
  },
  getters: {

  }
})