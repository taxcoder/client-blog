<template>
  <div id="TypeWriter" :style="twinkle">
    {{ printText }}
  </div>
</template>

<script setup lang="ts">
/**
 * @author: tanxiang
 * @projectName: client-blog
 * @createTime: 2022/10/11 23:58
 * @description: 实现打字机效果
 */
import {computed, ref, onUnmounted, onMounted, Ref, watch} from 'vue'

let opacityCount: Ref<number> = ref(1)
let printTimer: any = ref(0)
let opacityTimer: any = ref(0)
let count = ref(0);
let message = ref('')

const {text} = defineProps<{ text: string }>();

const printText = computed(() => {
  return message.value;
});

//@ts-ignore
const twinkle = computed(() => {
  return {'--opacityCount': opacityCount.value}
});

/**
 * 网页跑起来，直接运行此JS代码
 */
const updateMessage = () => {
  // 使用帧动画保证画面不撕裂
  requestAnimationFrame(function print() {
    clearTimeout(printTimer.value);

    // 判断count是否大于等于显示内容的长度
    if (count.value >= text.length) {

      printTimer.value = setTimeout(() => {
        // 判断显示内容的长度是否为0，不为0则每次运行减去一个长度，为0则将count变成0，让其增加
        message.value.length > 1 ? message.value = message.value.substring(0, message.value.length - 1) : count.value = 1;
        requestAnimationFrame(print)
      }, message.value.length === text.length ? 3000 : 40)

    } else {
      setTimeout(() => {
        // 每次往显示内容增加一个位移
        message.value += text.charAt(count.value);
        count.value++;
        requestAnimationFrame(print)
      }, 135)
    }
  })
}

onMounted(() => {
  setTimeout(() => {
    updateMessage();
  }, 500)
})

onUnmounted(() => {
  clearTimeout(printTimer.value);
})

watch(() => message.value, (newValue) => {
  if (newValue.length !== text.length) {
    clearTimeout(opacityTimer.value)
    opacityCount.value = 1;
    return;
  }

  requestAnimationFrame(function count() {
    opacityCount.value === 0 ? opacityCount.value = 1 : opacityCount.value = 0;
    opacityTimer.value = setTimeout(() => {
      requestAnimationFrame(count)
    }, 800)
  })
})
</script>

<style scoped lang="scss">
@media (max-height: 400px) {
  #TypeWriter {
    animation: hideTypeWriter 0.5s 1 forwards;
  }
}

@media (min-height: 400px) {
  #TypeWriter {
    animation: showTypeWriter 0.5s 1 forwards;
  }
}

#TypeWriter {
  white-space: nowrap;
  font-size: 2em;
  position: relative;
  color: white;
  font-family: 'honglei',cursive;
  user-select: none;
}

#TypeWriter::before {
  content: "";
  position: absolute;
  height: 90%;
  width: 2px;
  bottom: 1px;
  right: -5px;
  background: white;
  opacity: var(--opacityCount);
}

@keyframes hideTypeWriter {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes showTypeWriter {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>