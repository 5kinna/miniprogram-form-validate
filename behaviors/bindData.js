module.exports = Behavior({
  behaviors: [],
  properties: {
    syncAttrMap: String,
  },
  data: {},
  attached() {},
  methods: {
    splitDataBySyncAttrMap(key, flagStr) {
      const fs = flagStr.split('&')
      const parentData = []
      for (let i = 0; i < fs.length; i++) {
        const arr = fs[i].split('=')
        if (arr[0] === key) {
          parentData.push(arr[1])
          continue
        }
      }
      return parentData
    },
    // 子组件更新数据时，只要调用此方法即可，而不是 `setData`
    setDataSmart(key, val) {
      const parentData = this.splitDataBySyncAttrMap(key, this.data.syncAttrMap)
      if (parentData.length) {
        parentData.forEach(i => {
          this.triggerEvent('syncAttrUpdate', { [i]: val })
        })
      } else {
        this.setData({ key: val })
      }
    },
  },
})
