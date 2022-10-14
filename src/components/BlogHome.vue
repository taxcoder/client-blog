<template>
  <div id="BlogHome">
    <el-scrollbar :always="true" @scroll="scroll">
      <nav id="blog-home-top">
        <blog-top :blogName="blogName" :hideNavigationBar="flag"/>
      </nav>
      <section id="blog-home-center">

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
import {useDark} from "@vueuse/core";
import {useToggle} from "@vueuse/shared";

export default defineComponent({
  components: {BlogTop},
  setup() {
    let blogName = ref('Fingertip Runout')
    let flag = ref<boolean>(true);

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
      blogName, flag, toggle, theme
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
    width: 100%;
    position: relative;
    min-height: 1000px;

    .head-bg {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      transition: all 0.5s;
    }
  }
}

::v-deep(.is-horizontal) {
  display: none;
}

::v-deep(.is-vertical) {
  width: 12px;
  right: 0;
}

::v-deep(.el-scrollbar__thumb) {
  border-radius: 50px;
  opacity: 1;
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .4) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .4) 50%, rgba(255, 255, 255, .4) 75%, transparent 75%, transparent);
}
</style>