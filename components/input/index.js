import { debounce } from '../../utils/utils'
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    value: {
      type: null,
    },
    placeholder: {
      type: String,
      value: '',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
  },
  relations: {
    '../form-item/index': {
      type: 'parent',
      linked() {},
    },
  },
  data: {
    elFormItem: null,
  },
  lifetimes: {
    ready() {
      this.initFormItem()
    },
  },
  methods: {
    // 初始化form-item实例
    initFormItem() {
      const elFormItem = this.getRelationNodes('../form-item/index')[0]
      this.setData({
        elFormItem,
      })
    },
    // input value
    onInput: debounce(function(e) {
      this.properties.syncAttrMap && this.setDataSmart('value', e.detail.value)
      this.checkRule(e.detail.value)
    }),
    // 校验
    checkRule(value) {
      this.data.elFormItem.validate(value)
    },
  },
})
