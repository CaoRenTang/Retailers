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
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <div class="goods-tabs">
            <!-- 详情图片列表 -->
            <img/>
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
    }
    onMounted(() => {
      getGoodDetails(route.params.id)
    })
    const getSku = (selSku) => {
      if (selSku.price) {
        goodDetail.value.price = selSku.price
        goodDetail.value.oldPrice = selSku.oldPrice
        goodDetail.value.inventory = selSku.inventory
      }
    }
    // 购买数量
    const buyNum = ref(1)
    const getNum = (num) => {
      console.log('购买数量：', num)
      buyNum.value = num
    }

    return {
      goodDetail,
      getSku,
      getNum,
      buyNum
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
