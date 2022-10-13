<template>
  <div id="BlogHome">
    <el-scrollbar :always="false">
      <nav id="home-nav">

      </nav>

      <section id="home-section">
        <div id="section-top">
          <div class="blog-name"><span :style="[isBlogNameFontSize,{'--fontSize': blogNameFontSize}]"
                                       class="init-animation">{{ blogName }}</span></div>
          <type-writer :text="motto" v-show="isHide"/>
          <div class="head-bg" :style="[{backgroundImage: 'url('+HeadImage+')'}]"></div>
          <div class="flip-down" @click="flipDown">
            <el-icon color="white" :size="26">
              <ArrowDownBold/>
            </el-icon>
          </div>
        </div>

        <div id="section-center">

        </div>
      </section>

      <footer id="home-footer"></footer>
    </el-scrollbar>
  </div>
</template>


<script lang="ts">
/**
 * @author: tanxiang
 * @projectName: client-blog
 * @createTime: 2022/10/11 21:46
 */

//@ts-ignore
import HeadImage from '@/assets/img/e00dbfe7082c9c50a9aaa8158dc426f1.jpeg'

import {defineComponent, ref} from 'vue'
import {useToggle} from '@vueuse/shared'
import {useDark} from '@vueuse/core'

export default defineComponent({
  setup() {
    let blogName = ref('Fingertip Runout')
    let isHideMotto = ref<boolean>(true);
    let blogNameFontSize = ref<string>('4em');
    let theme = ref<boolean>(false)

    const isDark = useDark({
      // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
      storageKey: 'theme',
      // 暗黑class名字
      valueDark: 'dark',
      // 高亮class名字
      valueLight: 'light',
    })

    const motto = 'The future is in your own hands, and the world is at your feet!'
    const toggle = useToggle(isDark);
    return {
      theme,
      motto,
      toggle,
      HeadImage,
      blogName,
      isHideMotto,
      blogNameFontSize
    }
  },
  computed: {
    isHide() {
      return this.isHideMotto
    },
    isBlogNameFontSize() {
      return {fontSize: this.blogNameFontSize, transition: '0.1s'}
    }
  },
  methods: {
    windowResize(width: number) {
      if (width < 550 && this.isHideMotto) {
        // 当网页可视宽度小于750且isHideMotto为true，即座右铭显示时，置反
        this.isHideMotto = false;
      } else if (width >= 550 && !this.isHideMotto) {
        this.isHideMotto = true;
      }

      if (width < 550) {
        // 将博客名称大小降低
        this.blogNameFontSize = '3em'
      } else {
        this.blogNameFontSize = '4em'
      }
    },
    flipDown() {
      // 获取可视页面高度
      let height = document.documentElement.clientHeight;
      const center = document.getElementById('section-center');
      if (center) {
        center.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }
  },
  mounted() {
    // 挂载之后根据页面的大小，进行相应的改变
    this.windowResize(document.documentElement.clientWidth)
    // 并增加一个监听窗口大小的变化
    window.addEventListener('resize', (event: any) => {
      // 可视窗口的高度
      this.windowResize(event.currentTarget.innerWidth)
    })
  }
})


</script>

<style scoped lang="scss">
@import "src/common";

#BlogHome {
  min-width: $min-width;
  width: $window-width;
  height: $window-height;
}

#home-nav {
  width: 100%;
  background: white;

}

#home-section {
  width: 100%;
  height: 100%;
  min-width: $min-width;

  #section-top {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: $window-height;

    .blog-name {
      position: absolute;
      margin-bottom: 200px;
      font-family: 'pacifico', cursive;
      color: white;


      .init-animation {
        animation: initBlogName 0.85s;
      }
    }

    .head-bg {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    .flip-down {
      position: absolute;
      bottom: 25px;
      animation: swing 0.85s infinite;
      animation-direction: alternate;
      animation-timing-function: ease-out;
      cursor: pointer;
    }
  }

  #section-center {
    width: 100%;
    height: 1000px;
  }
}

@keyframes initBlogName {
  from {
    font-size: 0;
  }
  to {
    font-size: var(--fontSize);
  }
}

@keyframes swing {
  0% {
    bottom: 20px;
    opacity: 0.3;
  }
  100% {
    bottom: 30px;
    opacity: 1;
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