<template>
  <div class='top-category'>
    <div class="container">
      <!--分类-->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="cate in cateList" :key="cate.id">
            <a href="javascript:;">
              <img :src="cate.picture">
              <p>{{ cate.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="item in cateList" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }}-</h3>
          <XtxMore to="/"/>
        </div>
        <div class="body">
          <RouterLink to="/" class="goods-item" v-for="good in item.goods" :key="good.id">
            <img
              :src="good.picture"
              alt=""
            />
            <p class="name ellipsis">{{ good.name }}</p>
            <p class="desc ellipsis">{{ good.desc }}</p>
            <p class="price">&yen;{{ good.price }}</p>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { findAllCategoryAPI } from '@/api/category'
import { useRoute } from 'vue-router'

export default {
  name: 'TopCategory',
  setup () {
    // 1.定义一个空数组
    const cateList = ref([])
    // 2.获取分类数据
    const getCateList = async () => {
      const route = useRoute()
      const { data } = await findAllCategoryAPI(route.params.id)
      cateList.value = data.children
      console.log('分类数据', data)
    }
    onMounted(() => {
      getCateList()
    })
    return { cateList }
  }
}
</script>

<style lang="less" scoped>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }

    .goods-item {
      display: block;
      width: 220px;
      padding: 20px 30px;
      text-align: center;

      img {
        width: 160px;
        height: 160px;
      }

      p {
        padding-top: 10px;
      }

      .name {
        font-size: 16px;
      }

      .desc {
        color: #999;
        height: 29px;
      }

      .price {
        color: @priceColor;
        font-size: 20px;
      }
    }
  }
}
</style>
