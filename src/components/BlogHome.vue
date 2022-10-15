<template>
  <div id="BlogHome">
    <el-scrollbar :always="true" @scroll="scroll">
      <nav id="blog-home-top">
        <blog-top :blogName="blogName" :hideNavigationBar="flag" :scrollTop="scrollTop"/>
      </nav>
      <section id="blog-home-center" :class="{'dark': theme}">
        <blog-section :scrollTop="scrollTop"/>
      </section>
      <footer id="blog-home-footer"></footer>
    </el-scrollbar>
  </div>
</template>


<script lang="ts">
/**
 * @author: tanxiang
 * @projectName: client-blog
 * @createTime: 2022/10/11 21:46
 */

import {defineComponent, ref} from 'vue'
import BlogTop from "@/common/BlogTop.vue";
import BlogSection from "@/common/BlogSection.vue";
import {useDark} from "@vueuse/core";
import {useToggle} from "@vueuse/shared";

export default defineComponent({
  components: {BlogTop, BlogSection},
  setup() {
    let blogName = ref('Fingertip Runout')
    let flag = ref<boolean>(true);
    let scrollTop = ref<number>(0);

    let theme = ref<boolean>(false);
    let status = localStorage.getItem("theme");
    if (localStorage.getItem("theme")) {
      theme.value = status === 'dark';
    } else {
      localStorage.setItem('theme', 'auto');
    }

    const isDark = useDark({
      // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
      storageKey: 'theme',
      // 暗黑class名字
      valueDark: 'dark',
      // 高亮class名字
      valueLight: 'light',
    })

    const toggle = useToggle(isDark);

    return {
      blogName, flag, toggle, theme, scrollTop
    }
  },
  provide() {
    return {
      theme: () => this.theme,
      toggle: this.toggle,
      updateTheme: this.updateTheme
    }
  },
  computed: {},
  methods: {
    scroll(event: any) {
      if (event.scrollTop !== 0 && this.flag) {
        this.flag = false;
      }

      if (event.scrollTop === 0) {
        this.flag = true;
      }

      this.scrollTop = event.scrollTop
    },
    updateTheme(data: boolean) {
      this.theme = data;
    }
  },
  mounted() {
  }
})


</script>

<style scoped lang="scss">
@import "src/common";

#BlogHome {
  min-width: $min-width;
  width: $window-width;
  height: $window-height;

  #blog-home-top {
    width: $window-width;
    height: $window-height;
  }

  #blog-home-center {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(253, 253, 253);

  }

  #blog-home-center.dark{
    background: rgb(33, 37, 43) !important;
  }
}
</style>