<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{
              profile.account || profile.name || '----'
            }}</a>
          </li>
          <li><a href="javascript:;" @click="loginOut">退出登录</a></li>
        </template>
        <template v-else>
          <li>
            <router-link to="/login">请先登录</router-link>
          </li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li><a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a></li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapState, useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { msg, XtxConfirm } from 'rabbit-ui-core'

export default {
  name: 'AppTopnav',
  // 判断根据当前登录状态显示用户名和退出登录
  computed: {
    // 借用vuex中的数据进行映射，如果存在token值，则证明已经登录，显示用户名和退出登录，否则显示请先登录
    ...mapState('user', ['profile'])
  },
  setup () {
    // 获取store实例
    const store = useStore()
    // 获取路由实例
    const router = useRouter()
    const loginOut = () => {
      // 用户确认
      XtxConfirm({
        title: '警告',
        text: '确认退出吗？'
      }).then(() => {
        // 退出登录，调用vuex的方法
        store.dispatch('user/loginOutAction')
        // 跳转到登录页
        router.push('/login')
      }).catch(() => {
        msg({
          type: 'error',
          text: '已取消'
        })
      })
    }
    return {
      loginOut
    }
  }
}
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: @xtxColor;
        }
      }

      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
