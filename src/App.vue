<template>
  <blog-home/>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    let windowWidth = ref<number>(document.documentElement.clientWidth);
    let windowHeight = ref<number>(document.documentElement.clientHeight);
    return {windowWidth, windowHeight}
  },
  provide() {
    return {
      windowWidth: () => this.windowWidth,
      windowHeight: () => this.windowHeight
    }
  },
  created() {
    let theme: any = localStorage.getItem('theme')
    // 如果主题为null，则直接取反，进入if
    if (!theme || (theme !== 'auto' && theme !== 'dark' && theme !== 'light')) {
      // 只有当第一次进入，本地没有theme数据时，才会获取当前的小时，判断是白天还是黑夜
      let date = new Date().getHours();
      localStorage.setItem('theme', date > 6 && date < 18 ? 'light' : 'dark')
    }
  },
  mounted() {
    window.addEventListener('resize', (event: any) => {
      this.windowWidth = event.currentTarget.innerWidth;
      this.windowHeight = event.currentTarget.innerHeight;
    })
  }
});
</script>

<style scoped>

</style>
