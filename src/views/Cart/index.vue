<template>
  <div class="xtx-cart-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>购物车</XtxBreadItem>
      </XtxBread>
      <div class="cart">
        <table>
          <thead>
          <tr>
            <!--全选-->
            <th width="120">
              <XtxCheckbox
                :modelValue="isAll"
                @update:modelValue="selAll($event)"
              >全选
              </XtxCheckbox>
            </th>
            <th width="400">商品信息</th>
            <th width="220">单价</th>
            <th width="180">数量</th>
            <th width="180">小计</th>
            <th width="140">操作</th>
          </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
          <tr v-for="good in effectiveList" :key="good.skuId">
            <td>
              <XtxCheckbox
                :modelValue="good.selected"
                @update:modelValue="singleSel(good,$event)"
              />
            </td>
            <td>
              <div class="goods">
                <RouterLink to="/"><img :src="good.picture" alt=""></RouterLink>
                <div>
                  <p class="name ellipsis">{{ good.name }}</p>
                  <!-- 选择规格组件 -->
                </div>
              </div>
            </td>
            <td class="tc">
              <!--              现价-->
              <p>&yen;{{ good.nowPrice }}</p>
              <p>比加入时降价 <span class="red">&yen;{{ (good.price - good.nowPrice).toFixed(2) }}</span></p>
            </td>
            <td class="tc">
              <!--数量组件-->
              <Numbox
                :modelValue="good.count"
                :showLabel="false"
                @update:modelValue="editCount(good,$event)"
              />
            </td>
            <td class="tc"><p class="f16 red">&yen;{{ (good.nowPrice * good.count).toFixed(2) }}</p></td>
            <td class="tc">
              <p><a class="green" href="javascript:;" @click="delCart(good.skuId)">删除</a></p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          共{{ effectiveList.length }}件商品，已选择{{ selectedList.length }}件，商品合计：
          <span class="red">¥{{ allSelectedPrice.toFixed(2) }}</span>
        </div>
        <div class="total">
          <XtxButton type="primary" @click="pay">下单结算</XtxButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { msg } from 'rabbit-ui-core'

export default {
  name: 'XtxCartPage',
  // 通过计算属性映射vuex中的方法
  computed: {
    ...mapGetters('cart', ['effectiveList', 'selectedList', 'allSelectedPrice', 'isAll'])
  },
  setup () {
    const store = useStore()
    // good当前勾选商品，sel当前商品勾选状态
    // 单选实现
    const singleSel = (good, sel) => {
      console.log('当前选中的商品信息', good, sel)
      store.dispatch('cart/singleSelAction', {
        good,
        sel
      })
    }
    // 全选和取消全选
    const selAll = (isSelAll) => {
      // console.log(isSelAll)
      store.dispatch('cart/selAllAction', isSelAll)
    }
    // 删除功能
    const delCart = (skuId) => {
      console.log('要删除商品sku的id值', skuId)
      store.dispatch('cart/delCartAction', skuId)
    }
    // 修改数量，count修改数量形参
    const editCount = (good, count) => {
      console.log('要修改的商品名:' + good.name + '商品数量修改为:' + count)
      store.dispatch('cart/editCartAction', {
        good,
        count
      })
    }
    // 点击下单，跳转订单支付页面
    const router = useRouter()
    const pay = () => {
      // 判断登录和至少选择一件商品才能下单
      if (!store.state.user.profile.token) {
        return msg({ text: '请先登录，再下单' })
      }
      if (store.getters['cart/selectedList'].length === 0) {
        return msg({ text: '请至少选择一件商品，才能下单' })
      }
      // 执行下单跳转
      router.push('/order')
    }
    return {
      singleSel,
      selAll,
      delCart,
      editCount,
      pay
    }
  }
}
</script>
<style lang="less" scoped>
.tc {
  text-align: center;

  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}

.red {
  color: @priceColor;
}

.green {
  color: @xtxColor
}

.f16 {
  font-size: 16px;
}

.goods {
  display: flex;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
  }

  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;

    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}

.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;

  .xtx-checkbox {
    color: #999;
  }

  .batch {
    a {
      margin-left: 20px;
    }
  }

  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}

.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}

.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;

      th, td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }

      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
