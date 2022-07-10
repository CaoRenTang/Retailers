<template>
  <div class="home-product">
    <!-- 面板组件 -->
    <Pannel v-for="item in goodsList" :key="item.id" :title="item.name">
      <!--      右侧插槽数据渲染-->
      <template #right>
        <div class="sub">
          <RouterLink v-for="sub in item.children" :key="sub.id" to="/">{{ sub.name }}</RouterLink>
        </div>
        <XtxMore/>
      </template>
      <div class="box">
        <RouterLink class="cover" to="/">
          <img :src="item.picture" alt="">
          <strong class="label">
            <span>{{ item.name }}馆</span>
            <span>{{ item.saleInfo }}</span>
          </strong>
        </RouterLink>
        <!--内容区域的商品卡片渲染-->
        <ul class="goods-list">
          <li v-for="item in item.goods" :key="item.id">
            <!-- 商品组件 -->
            <HomeGoods :goods="item"/>
          </li>
        </ul>
      </div>
    </Pannel>
  </div>
</template>

<script>
import HomeGoods from './home-goods'
import { findGoodsAPI } from '@/api/home'
import { onMounted, ref } from 'vue'

export default {
  name: 'HomeProduct',
  components: { HomeGoods },
  setup () {
    const goodsList = ref([])

    // 定义方法获取数据
    async function getGoodsList () {
      const { data } = await findGoodsAPI()
      console.log('商品楼层数据', data)
      goodsList.value = data
    }

    onMounted(() => {
      getGoodsList()
    })
    return { goodsList }
  }
}
</script>

<style lang='less' scoped>
.home-product {
  background: #fff;
  height: 2900px;

  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: @xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, .9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, .7);
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n+4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
