import { debounce } from '../../utils/utils'
import bindData from '../../behaviors/bindData'
Component({
  behaviors: [bindData],
  externalClasses: ['my-input'],
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  properties: {
    value: {
      type: String,
      value: '',
      observer(val) {
        this.judgyValue(val) && this.checkRule(val)
      },
    },
    type: {
      type: String,
      value: 'text',
    },
    placeholder: {
      type: String,
      value: '',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    password: {
      type: Boolean,
      value: false,
    },
  },
  relations: {
    '../form-item/index': {
      type: 'parent',
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
    judgyValue(value = this.properties.value) {
      return value !== undefined && value !== ''
    },
    // 初始化form-item实例
    initFormItem() {
      const elFormItem = this.getRelationNodes('../form-item/index')[0]
      elFormItem &&
        this.setData(
          {
            elFormItem,
          },
          () => {
            this.judgyValue() && this.checkRule(this.properties.value)
          },
        )
    },
    // input value
    onInput: debounce(function(e) {
      this.properties.syncAttrMap && this.setDataSmart('value', e.detail.value)
      this.checkRule(e.detail.value)
    }),
    // 校验
    checkRule(value) {
      const p =
        this.data.elFormItem || this.getRelationNodes('../form-item/index')[0]
      if (!p) return
      p.validate(value)
    },
  },
})
