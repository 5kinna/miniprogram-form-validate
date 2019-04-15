import { uploadImg } from '../../utils/utils'
import bindData from '../../behaviors/bindData'
Component({
  behaviors: [bindData],
  externalClasses: ['my-upload'],
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
      value: 'image',
    },
    required: {
      type: Boolean,
      value: false,
    },
    uploadtext: {
      // 图片上传相册提示文字
      type: String,
      value: '上传',
    },
    uploadurl: {
      // 图片上传接口如"/upload"
      type: String,
      value: '',
    },
    uploadkey: {
      // 图片上传formData对应的key
      type: String,
      value: 'id',
    },
    rest: {
      //其他参数
      type: Object,
      value: {},
    },
    disabled: {
      type: Boolean,
      value: false,
    },
  },
  relations: {
    '../form-item/index': {
      type: 'parent',
    },
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
    // 校验
    checkRule(value) {
      const p =
        this.data.elFormItem || this.getRelationNodes('../form-item/index')[0]
      if (!p) return
      p.validate(value)
    },
    previewImage(e) {
      const url = e.currentTarget.dataset.url
      if (!url) return
      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: [url], // 需要预览的图片http链接列表
      })
    },
    chooseImage(e) {
      const { uploadurl } = this.properties
      wx.chooseImage({
        success: res => {
          const tempFilePaths = res.tempFilePaths
          if (!uploadurl) {
            this.setDataSmart('value', tempFilePaths[0])
            this.triggerEvent('upload', tempFilePaths[0])
            this.checkRule(tempFilePaths[0])
            return
          }
          uploadImg(
            uploadurl,
            tempFilePaths[0],
            'file',
            () => {
              this.setDataSmart('value', tempFilePaths[0])
              this.triggerEvent('upload', tempFilePaths[0])
              this.checkRule(tempFilePaths[0])
            },
            { ...this.properties.rest },
          )
        },
      })
    },
  },
})
