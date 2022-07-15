<template>
  <div class="xtx-numbox">
    <div class="label" v-if="showLabel">数量</div>
    <div class="numbox">
      <a href="javascript:;" @click="sub">-</a>
      <input type="text" readonly :value="num">
      <a href="javascript:;" @click="add">+</a>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { msg } from 'rabbit-ui-core'

export default {
  name: 'XtxNumbox',
  props: {
    showLabel: {
      type: Boolean,
      default: true
    },
    modelValue: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 10
    },
    min: {
      type: Number,
      default: 1
    }
  },
  emits: ['change', 'update:modelValue'],
  setup (props, { emit }) {
    const num = ref(1)
    // 数量-1
    const sub = () => {
      if (num.value === props.min) return
      num.value--
      // 1. 同步数据num到modelValue
      emit('update:modelValue', num.value)
    }
    // 数量+1
    const add = () => {
      if (num.value === props.max) return msg({ text: '超出最大购买数量' })
      num.value++
      emit('update:modelValue', num.value)
    }
    // 2. 同步数据modelValue到num
    watch(() => props.modelValue, (newVal) => {
      num.value = newVal
    }, { immediate: true })
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
