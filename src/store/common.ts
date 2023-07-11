import { defineStore } from 'pinia'

/**
 * @description 公共数据管理，cachePageList
 */
export default defineStore('common', {
  state: (): {
    cachePageList: Array<string>
  } => {
    return {
      cachePageList: []
    }
  },
  actions: {
    addKeepAlive(name: string) {
      let cachePageList = [...this.cachePageList]
      if (!cachePageList.includes(name)) {
        if (cachePageList.length >= 20) {
          cachePageList = cachePageList.slice(cachePageList.length - 19)
        }
        cachePageList.push(name)
      }
      this.cachePageList = cachePageList
    },
    removeKeepAlive(name: string) {
      const cachePageList = [...this.cachePageList]
      const index = cachePageList.findIndex(item => item === name)
      if (index > -1) {
        cachePageList.splice(index, 1)
      }
      this.cachePageList = cachePageList
    }
  }
})
