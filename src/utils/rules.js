export default {
  // 校验account
  account (value) {
    if (!value) return '请输入用户名'
    if (!/^\w{4,10}$/.test(value)) return '长度是4-10个字符'
    return true
  },
  password (value) {
    if (!value) return '请输入密码'
    if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
    return true
  },
  isAgree (value) {
    if (!value) return '请勾选同意用户协议'
    return true
  }
}
