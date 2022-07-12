<template>
  <div class='xtx-goods-page'>
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread separator="/" v-if="goodDetail.categories">
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/">{{ goodDetail.categories[1].name }}</XtxBreadItem>
        <XtxBreadItem to="/">{{ goodDetail.categories[0].name }}</XtxBreadItem>
        <XtxBreadItem to="/">{{ goodDetail.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info"></div>
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
import { onMounted, ref } from 'vue'
import { findGoodsDetailAPI } from '@/api/goods'
import { useRoute } from 'vue-router'

export default {
  name: 'XtxGoodsPage',
  setup () {
    const route = useRoute()
    const goodDetail = ref({})
    const getGoodDetails = async (id) => {
      const { data } = await findGoodsDetailAPI(id)
      goodDetail.value = data
      console.log('详情', data)
    }
    onMounted(() => {
      getGoodDetails(route.params.id)
    })
    return { goodDetail }
  }
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
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
