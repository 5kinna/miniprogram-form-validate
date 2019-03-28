Page({
  data: {
    rules: {
      contact: [
        // { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
      ],
    },
    formData: {
      contact: '',
    },
    isAllRight: false,
  },
  ruleResult({ detail }) {
    console.log(detail)
  },
})
