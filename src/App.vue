<template>
  <blog-home/>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'App',
  created() {
    let theme: any = localStorage.getItem('theme')
    // 如果主题为null，则直接取反，进入if
    if (!theme || (theme !== 'auto' && theme !== 'dark' && theme !== 'light')) {
      // 只有当第一次进入，本地没有theme数据时，才会获取当前的小时，判断是白天还是黑夜
      let date = new Date().getHours();
      localStorage.setItem('theme', date > 6 && date < 18 ? 'light' : 'dark')
    }
  }
});
</script>

<style scoped>

</style>
