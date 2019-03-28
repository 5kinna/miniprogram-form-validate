Component({
  properties: {
    rules: {
      type: Object,
      value: {},
    },
  },
  relations: {
    '../form-item/index': {
      type: 'child',
      linked(target) {
        // 将需要验证的form-item放到childList里
        target.dataset.prop &&
          this.setData({ [`childList[${this.data.childList.length}]`]: target })
        this._initChild(target)
      },
    },
  },
  data: {
    childList: [], //存放需要验证的form-item
  },

  methods: {
    // 设置form-properties
    _initChild(formItem) {
      const prop = formItem.dataset.prop
      const rule = this.properties.rules[prop]
      formItem.properties.rules = rule || []
      formItem.properties.prop = prop
    },

    // 默认验证回调
    validateCallBack(flag) {
      this.triggerEvent('ruleResult', flag)
    },

    // 验证
    validate(callback = this.validateCallBack.bind(this)) {
      // 如果需要验证的childList为空，调用验证时立刻返回callback
      if (this.data.childList.length === 0 && callback) callback(true)
      // 验证每一个form-item是否都输入正确
      callback(this.data.childList.every(i => !i.data.validateError))
    },
  },
})
