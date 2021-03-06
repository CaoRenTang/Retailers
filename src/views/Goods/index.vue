<template>
  <div class='xtx-goods-page'>
    <div class="container" v-if="goodDetail.categories">
      <!-- 面包屑 -->
      <XtxBread separator="/">
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/">{{ goodDetail.categories[1].name }}</XtxBreadItem>
        <XtxBreadItem to="/">{{ goodDetail.categories[0].name }}</XtxBreadItem>
        <XtxBreadItem to="/">{{ goodDetail.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 图片预览区 -->
        <div class="media">
          <XtxGoodViewer :imageList="goodDetail.mainPictures"/>
          <!-- 销量组件 -->
          <GoodsSales/>
        </div>
        <!-- 商品信息区 -->
        <div class="spec">
          <!-- 信息组件 -->
          <GoodsName/>
          <!-- 新增 sku -->
          <XtxSku :goods="goodDetail" @change="getSku"/>
          <Numbox :max="goodDetail.inventory" v-model="buyNum"/>
          <!-- 加入购物车 -->
          <XtxButton
            @click="addCart"
            style="margin-top: 20px"
            type="primary"
          >
            加入购物车
          </XtxButton>
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <div class="goods-tabs">
            <!-- 详情图片列表 -->
            <img v-for="url in goodDetail.details.pictures" v-imgLazy="url" :key="url"/>
          </div>
        </div>
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, provide } from 'vue'
import { findGoodsDetailAPI } from '@/api/goods'
import { useRoute } from 'vue-router'
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'
import XtxNumbox from '@/components/Numbox'
import { msg } from 'rabbit-ui-core'
import { useStore } from 'vuex'

export default {
  name: 'XtxGoodsPage',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    XtxNumbox,
    GoodsSales,
    GoodsName
  },
  setup () {
    const route = useRoute()
    const goodDetail = ref({})
    provide('detail', goodDetail)
    const getGoodDetails = async (id) => {
      const { data } = await findGoodsDetailAPI(id)
      goodDetail.value = data
      console.log('详情', data)
      console.log('数据', goodDetail)
    }
    onMounted(() => {
      getGoodDetails(route.params.id)
    })
    // 获取选中的sku（销售属性）信息
    // 说明❓：sku属性不同的组合，算作单独的一个商品
    // 存储选中的sku组合的商品信息
    const currSku = ref(null)
    const getSku = (selSku) => {
      if (selSku.price) {
        goodDetail.value.price = selSku.price
        goodDetail.value.oldPrice = selSku.oldPrice
        // 库存大于0才能购买
        goodDetail.value.inventory = selSku.inventory
        // 存储当前选中的sku的组合信息
        currSku.value = selSku
      } else {
        // 清空上次保存的选中的sku组合信息
        currSku.value = null
      }
      // 选择的商品组合sku信息
      // console.log(selSku)
    }
    // 购买数量
    const buyNum = ref(1)
    const store = useStore()
    // 点击添加到购物车
    const addCart = async () => {
      /**
       * 1. 选中了有效的sku组合的商品信息
       * 2. 有效的sku组合的商品库存大于0
       * 3. 执行vuex的action加入购物车
       */
      // 判断是否选择了商品规格
      if (!currSku.value) return msg({ text: '请选择完整的商品规格' })
      // 判断库存数量
      if (goodDetail.value.inventory === 0) return msg({ text: '商品库存不足' })
      // console.log(currSku.value)
      // 结合后台定义商品
      const addGood = {
        id: goodDetail.value.id, // 商品id
        name: goodDetail.value.name, // 商品名称
        picture: goodDetail.value.mainPictures[0], // 商品图片
        skuId: currSku.value.skuId, // sku组合id
        price: currSku.value.oldPrice, // 原价
        nowPrice: currSku.value.price, // 现价
        attrsText: currSku.value.specsText, // 规格文案
        stock: currSku.value.inventory, // 库存
        selected: true, // 商品加入购物车是否选中
        isEffective: true, // 是否有效商品
        count: buyNum.value // 购买数量
      }
      const res = await store.dispatch('cart/addCartAction', addGood)
      msg({
        text: res,
        type: 'success'
      })
    }
    const getNum = (num) => {
      console.log('购买数量：', num)
      buyNum.value = num
    }

    return {
      goodDetail,
      getSku,
      getNum,
      buyNum,
      addCart
    }
  }
}
</script>

<style lang='less' scoped>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  // 新增样式
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
    background: #fff;
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;

  img {
    width: 100%;
  }
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
