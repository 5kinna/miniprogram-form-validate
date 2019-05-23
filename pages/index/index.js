Page({
  data: {
    rules: {
      input: [
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
    },
    formData: {
      input: '',
      picker: ''
    },
    isAllRight: false,
    pickerDatas: [
      { id: 0, name: '选项1' },
      { id: 1, name: '选项2' },
      { id: 2, name: '选项3' },
      { id: 3, name: '选项4' }
    ]
  },
  onSyncAttrUpdate(e) {
    this.setData(e.detail)
  },
  ruleResult({ detail }) {
    this.setData({
      isAllRight: detail
    })
  },
  judgyRight() {
    if (!this.data.isAllRight) {
      const p = this.selectComponent('#_submitForm')
      p.validateAll()
    }
  },
  checkHandle() {
    this.judgyRight()
  }
})
