<template>
  <Pannel ref="target" title="新鲜好物" sub="新鲜出炉 品质靠谱">
    <template #right>
      <xtx-more/>
    </template>
    <!--    商品列表-->
    <ul ref="pannel" class="goods-list">
      <li v-for="item in newList" :key="item.id">
        <RouterLink :to="`/goods/${item.id}`">
          <img v-imgLazy="item.picture" alt=""/>
          <p class="name">{{ item.name }}</p>
          <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
      </li>
    </ul>
  </Pannel>
</template>

<script>
import { ref } from 'vue'
import { findNewAPI } from '@/api/home'
import { useLazy } from '@/hooks'

export default {
  setup () {
    const newList = ref([])
    const getNew = async () => {
      const { data } = await findNewAPI()
      console.log('-------', data)
      newList.value = data
    }
    // onMounted(() => {
    //   getNew()
    // })
    const { target } = useLazy(getNew)
    return {
      newList,
      target
    }
  }
}
</script>

<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    // 激活效果
    transition: all 0.5s;

    &:hover {
      transform: translate3d(0, -6px, 0);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    }

    // end
    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: @priceColor;
    }
  }
}
</style>
