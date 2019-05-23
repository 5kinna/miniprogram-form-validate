Component({
  externalClasses: ['my-checkbox-item'],
  relations: {
    '../checkbox/index': {
      type: 'parent'
    }
  },
  properties: {
    label: {
      type: String,
      value: ''
    },
    value: {
      type: null
    },
    checked: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    changeCurrent(current) {
      this.setData({ checked: current })
    },
    checkboxChange() {
      if (this.data.disabled) return
      const item = { current: !this.data.checked, value: this.data.value }
      const parent = this.getRelationNodes('../checkbox/index')[0]
      parent ? parent.emitEvent(item) : this.triggerEvent('change', item)
    }
  }
})
