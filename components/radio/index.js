import bindData from '../../behaviors/bindData'
Component({
  behaviors: [bindData],
  properties: {
    data: {
      type: Array
    },
    labelkey: {
      type: String,
      value: 'id'
    },
    valuekey: {
      type: String,
      value: 'value'
    },
    checkedkey: {
      type: String,
      value: 'checked'
    }
  }
})
