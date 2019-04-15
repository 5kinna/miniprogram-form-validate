import AsyncValidator from '../../utils/async-validator/index'
Component({
  externalClasses: ['my-form-item', 'my-form-error'],
  properties: {
    prop: String,
    label: {
      type: String,
      value: '',
    },
    required: {
      type: Boolean,
    },
    rules: {
      type: Array,
      value: [],
    },
  },
  data: {
    validateError: true, //验证是否错误
    validateStatus: 'validating', //验证状态
    validateMessage: '', //错误提示
    elForm: null, //父组件form实例
  },
  relations: {
    '../form/index': {
      type: 'parent',
    },
    '../input/index': {
      type: 'child',
    },
    '../picker/index': {
      type: 'child',
    },
    '../upload/index': {
      type: 'child',
    },
  },
  lifetimes: {
    ready() {
      this._initForm()
    },
    // 组件被销毁时调用
    detached() {
      const p = this.data.elForm || this.getRelationNodes('../form/index')[0]
      p.destory(this)
    },
  },
  methods: {
    // 初始化form组件实例
    _initForm() {
      const elForm = this.getRelationNodes('../form/index')[0]
      elForm &&
        this.setData({
          elForm,
        })
    },

    // 合并规则
    getRules() {
      let formRules = this.properties.rules
      const requiredRule =
        this.properties.required !== undefined
          ? { required: !!this.properties.required, message: '请输入' }
          : []
      return [].concat(formRules || []).concat(requiredRule)
    },

    // 获取符合事件触发的规则
    getFilteredRule(trigger) {
      const rules = this.getRules()

      return rules.filter(rule =>
        !rule.trigger || trigger === '' ? true : rule.trigger === trigger,
      )
    },

    // 默认错误处理
    errorHandle(errorMessage) {
      this.setData({
        validateError: !!errorMessage,
        validateStatus: errorMessage ? 'error' : 'success',
        validateMessage: errorMessage,
      })
    },

    // 验证
    validate(value, trigger = '', callback = this.errorHandle.bind(this)) {
      const prop = this.properties.prop
      // 没有prop，不需要验证
      if (!prop) return
      const rules = this.getFilteredRule(trigger)
      const validator = new AsyncValidator({ [prop]: rules })

      validator.validate({ [prop]: value }, { firstFields: true }, errors => {
        // 不需要校验
        if (errors === undefined) return
        const errorMessage = errors ? errors[0].message : ''
        // 显示错误提示
        callback(errorMessage)
        // 调用form的validate方法判断是否全部正确
        this.data.elForm.validate()
      })
    },
  },
})
