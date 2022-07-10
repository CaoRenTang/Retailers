<template>
  <Pannel title="人气推荐" sub="人气爆棚 不容小觑">
    <ul class="goods-list">
      <li v-for="item in hotList" :key="item.id">
        <RouterLink to="/">
          <img :src="item.picture" alt="">
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
    <template #right>
      <xtx-more/>
    </template>
  </Pannel>
</template>

<script>
import { onMounted, ref } from 'vue'
import { findHotAPI } from '@/api/home'

export default {
  setup () {
    const hotList = ref([])
    const getHotList = async () => {
      const { data } = await findHotAPI()
      // console.log('------', data)
      hotList.value = data.result
    }
    onMounted(() => {
      getHotList()
    })
    return { hotList }
  }
}
</script>
<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
