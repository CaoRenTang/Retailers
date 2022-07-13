<template>
  <div class="account-box">
    <!--登录表单-->
    <Form
      ref="fm"
      v-slot="{ errors }"
      :validation-schema="rules"
      class="form">
      <!-- <p>{{ errors }}</p> -->
      <!-- 1. 用户名或手机号 -->
      <div class="form-item">
        <div class="input">
          <i class="iconfont icon-user"></i>
          <Field
            v-model="formData.account"
            :class="{ error: errors.account }"
            name="account"
            placeholder="请输入用户名或手机号"
            type="text"
          />
        </div>
        <!-- 表单验证错误信息提示 -->
        <div v-if="errors.account" class="error">
          <i class="iconfont icon-warning"/>{{ errors.account }}
        </div>
      </div>
      <!-- 2. 密码 -->
      <div class="form-item">
        <div class="input">
          <i class="iconfont icon-lock"></i>
          <Field
            v-model="formData.password"
            :class="{ error: errors.password }"
            name="password"
            placeholder="请输入密码"
            type="password"
          />
        </div>
        <div v-if="errors.password" class="error">
          <i class="iconfont icon-warning"/>{{ errors.password }}
        </div>
      </div>
      <!-- 3. 用户协议 -->
      <div class="form-item">
        <div class="agree">
          <!--选择框-->
          <Field
            v-model="formData.isAgree"
            as="XtxCheckbox"
            name="isAgree"
          />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <!--错误提示-->
        <div v-if="errors.isAgree" class="error">
          <i class="iconfont icon-warning"/>
          {{ errors.isAgree }}
        </div>
      </div>
      <a class="btn" href="javascript:;" @click="submit">登录</a>
    </Form>
    <div class="action">
      <img
        alt=""
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
      />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { Form, Field } from 'vee-validate'
import { reactive, ref } from 'vue'
import veeRules from '@/utils/rules'
import { useStore } from 'vuex'
import { msg } from 'rabbit-ui-core'
import { useRoute, useRouter } from 'vue-router'

export default {
  components: {
    // 注册组件
    Form,
    Field
  },
  setup () {
    // 1.定义表单数据对象
    const formData = reactive({
      account: null, // 账号
      password: null, // 密码
      isAgree: false // 是否同意协议
    })
    // 2.表单检验规则
    const rules = {
      // 检验用户名函数
      account: veeRules.account,
      // 检验密码函数
      password: veeRules.password,
      // 是否同意协议
      isAgree: veeRules.isAgree
    }
    // 3.表单兜底校验
    // 获取表单实例
    const fm = ref(null)
    // 获取store实例
    const store = useStore()
    // 获取路由实例
    const router = useRouter()
    // 获取路由参数
    const route = useRoute()
    const submit = async () => {
      const { valid } = await fm.value.validate()
      if (valid) {
        // console.log('检验通过', valid)
        // 调用vuex的登录方法
        await store.dispatch('user/loginAction', formData)
        // 消息提示
        msg({
          type: 'success',
          text: '登录成功'
        })
        // 判断是否跳回上一次访问的页面（401），正常访问跳转回首页
        // route.query.backPath为上一次登录返回的路由参数路径
        await router.replace(route.query.backPath || '/')
      }
    }
    return {
      formData,
      rules,
      fm,
      submit
    }
  }
}
</script>
<style lang="less" scoped>
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: @xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: @priceColor;
          }

          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
