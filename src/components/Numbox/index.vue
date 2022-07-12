<template>
  <div class="xtx-numbox">
    <div class="label">数量</div>
    <div class="numbox">
      <a href="javascript:;" @click="sub">-</a>
      <input type="text" readonly :value="num">
      <a href="javascript:;" @click="add">+</a>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { msg } from 'rabbit-ui-core'

export default {
  name: 'XtxNumbox',
  props: {
    max: {
      type: Number,
      default: 10
    },
    min: {
      type: Number,
      default: 1
    }
  },
  setup (props) {
    const num = ref(1)
    // 减
    const sub = () => {
      if (num.value === props.min) return
      num.value--
    }
    // 加
    const add = () => {
      if (num.value === props.max) return msg({ text: '超出最大购买数量' })
      num.value++
    }
    return {
      num,
      sub,
      add
    }
  }
}
</script>
<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;

  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }

  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;

    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;

      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }

      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }

    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
