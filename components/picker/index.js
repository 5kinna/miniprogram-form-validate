import bindData from '../../behaviors/bindData'
import { getInitCity, setStorage, getStorage } from '../../utils/utils'
Component({
  behaviors: [bindData],
  externalClasses: ['my-picker'],
  properties: {
    fields: {
      type: String,
      value: 'month',
    },
    value: {
      type: [Number, Array],
      observer(val) {
        this.judgyValue(val) && this.checkRule(val)
      },
    },
    cityId: {
      type: Array,
      value: [],
    },
    mode: {
      type: String,
      value: 'default',
    },
    icon: {
      type: String,
      value: 'myhr-downtriangle',
    },
    placeholder: {
      type: String,
      value: '',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    data: {
      type: Array,
      value: [],
    },
    valuekey: {
      type: String,
      value: 'value',
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
      this.initCityData()
      this.initFormItem()
    },
  },

  methods: {
    // 初始化城市数据
    initCityData() {
      if (this.properties.mode === 'city') {
        this.setData({
          cityList: this.properties.data,
        })
      }
    },
    // 初始化城市
    setCityData(data) {
      setStorage(data, 'CITY_TREE_DATA')
      this.setData({
        cityList: data,
      })
      if (this.properties.cityId.every(i => !+i))
        this.setDataSmart('cityId', getInitCity(data))
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
    judgyValue(value = this.properties.value) {
      const m = this.properties.mode
      return m !== 'city'
        ? value !== undefined && value !== ''
        : value.length >= 2
    },
    // 城市的选择
    onSelect(e) {
      if (this.properties.syncAttrMap) {
        this.setDataSmart('cityId', e.detail.code)
        this.setDataSmart('value', e.detail.value)
      }
      this.triggerEvent('change', {
        cityId: e.detail.code,
        value: e.detail.value,
      })
      this.checkRule(e.detail.value)
    },
    // 其他模式下的选择
    pickerChange(e) {
      const value =
        this.properties.mode === 'default'
          ? this.properties.data[e.detail.value].name
          : e.detail.value
      this.setDataSmart('value', e.detail.value)
      this.triggerEvent('change', { value, index: +e.detail.value })
      this.checkRule(+e.detail.value)
    },
    // 校验
    checkRule(value) {
      const p =
        this.data.elFormItem || this.getRelationNodes('../form-item/index')[0]
      if (!p) return
      p.validate(value)
    },
  },
})
