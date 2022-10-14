<template>
  <div id="blog-top">
    <div class="seat"></div>
    <!-- 顶部导航栏 -->
    <div class="blog-navigation-bar" :style="navigationBarStyle">
      <div class="blog-name"><span>{{ blogName }}</span></div>
      <div class="blog-top-options">

        <icon-text :hideArrowDown="true" :hideNavigationBar="hideNavigationBar">
          <template #icon>
            <Search/>
          </template>
          <template #text>搜索</template>
        </icon-text>

        <icon-text :hideNavigationBar="hideNavigationBar">
          <template #icon>
            <Memo/>
          </template>
          <template #text>文库</template>
        </icon-text>

        <icon-text :hideNavigationBar="hideNavigationBar">
          <template #icon>
            <Guide/>
          </template>
          <template #text>生活</template>
        </icon-text>

        <icon-text :hideNavigationBar="hideNavigationBar">
          <template #icon>
            <Odometer/>
          </template>
          <template #text>功能</template>
        </icon-text>

        <icon-text :hideArrowDown="true" :hideNavigationBar="hideNavigationBar">
          <template #icon>
            <Link/>
          </template>
          <template #text>友链</template>
        </icon-text>

        <icon-text :hideArrowDown="true" :hideNavigationBar="hideNavigationBar">
          <template #icon>
            <Warning/>
          </template>
          <template #text>本站</template>
        </icon-text>
      </div>
      <div>
        <el-switch
            v-model="status"
            size="default"
            :width="46"
            @change="changeToggleTheme"
            inline-prompt
            style="--el-switch-on-color: #555555; --el-switch-off-color: #d4d4d4;"
        >
        </el-switch>
      </div>
    </div>
    <!-- 顶部封面 -->
    <div class="blog-cover">
      <slot name="blogTop">
        <!-- 博客名称 -->
        <div class="blog-name" :style="[{'--fontSize': blogNameFontSize,'--marginBottom': marginBottom}]">
          {{ blogName }}
        </div>
        <!-- 打字机效果 -->
        <type-writer :text="motto" v-show="isHide"/>
        <!-- 向下滚动 -->
        <div class="flip-down" @click="flipDown">
          <el-icon color="white" :size="26">
            <ArrowDownBold/>
          </el-icon>
        </div>
      </slot>
    </div>

    <!-- 封面图片 -->
    <div class="head-bg"
         :style="[{backgroundImage: 'url('+HeadImage+')'},{'--filter': status ? 'brightness(0.55)' : 'brightness(1)'}]">
    </div>
  </div>
</template>

<script lang="ts">
/**
 * @author: tanxiang
 * @projectName: client-blog
 * @createTime: 2022/10/13 13:55
 * @description:
 */

//@ts-ignore
import HeadImage from '@/assets/img/e00dbfe7082c9c50a9aaa8158dc426f1.jpeg'
//@ts-ignore
import {svg} from '@/assets/ts/common.ts'

import {defineComponent, ref, inject} from 'vue'
import IconText from "./IconText.vue";

export default defineComponent({
  name: "BlogTop",
  components: {IconText},
  setup() {
    let marginBottom = ref<string>('200px');
    let isHideMotto = ref<boolean>(true);
    let blogNameFontSize = ref<string>('4em');

    const theme: any = inject('theme')
    const toggle: any = inject('toggle')
    const updateTheme: any = inject('updateTheme')

    let status = ref<boolean>(theme());

    const motto = 'The future is in your own hands, and the world is at your feet!'
    return {
      blogNameFontSize,
      motto,
      HeadImage,
      isHideMotto,
      marginBottom,
      toggle,
      updateTheme,
      status,
      theme
    }
  },
  props: {
    blogName: String,
    hideNavigationBar: Boolean
  },
  mounted() {
    // 挂载之后根据页面的大小，进行相应的改变
    this.windowResize(document.documentElement.clientWidth)

    document.getElementsByClassName('el-switch__action')[0].innerHTML = '<i class="el-icon theme">' + (this.status ? svg.moon : svg.sun) + '</i>'

    // 并增加一个监听窗口大小的变化
    window.addEventListener('resize', (event: any) => {
      // 可视窗口的高度
      this.windowResize(event.currentTarget.innerWidth)
    })
  },
  methods: {
    flipDown() {
      // 获取可视页面高度
      const center = document.getElementById('blog-home-center');

      if (center) {
        center.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    },
    windowResize(width: number) {
      if (width < 550 && this.isHideMotto) {
        // 当网页可视宽度小于750且isHideMotto为true，即座右铭显示时，置反
        this.isHideMotto = false;
      } else if (width >= 550 && !this.isHideMotto) {
        this.isHideMotto = true;
      }

      if (width < 550) {
        this.blogNameFontSize = '3em';
        this.marginBottom = '200px';
      } else {
        this.blogNameFontSize = '4em';
        this.marginBottom = '0';
      }
    },
    changeToggleTheme() {
      this.toggle()

      let theme: any = document.getElementsByClassName('theme')[0]
      if (!theme) return;
      theme.removeChild(theme.firstChild)

      if (this.theme) {
        theme.innerHTML = svg.moon
      } else {
        theme.innerHTML = svg.sun
      }
    },
    isOpenNavigationBar(theme: boolean, flag: boolean) {
      return theme ? (flag ? {backgroundColor: "#343434", zIndex: '1'} : {}) : (flag ? {
        backgroundColor: 'white',
        zIndex: '1',
        color: 'black'
      } : {})
    }
  },
  computed: {
    isHide() {
      return this.isHideMotto
    },
    navigationBarStyle() {
      return this.isOpenNavigationBar(this.status, !this.hideNavigationBar)
    }
  },
  watch: {
    status(data) {
      this.updateTheme(data)
    }
  }
})

</script>

<style scoped lang="scss">
@import "src/common.scss";

#blog-top {
  width: 100%;
  height: 100%;
  color: white;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: all 0.6s;
  min-width: 500px;

  .seat {
    width: 100%;
    height: 4.5em;
  }

  .blog-navigation-bar {
    width: 100%;
    height: 4.5em;
    padding: 0 25px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    min-width: $min-width;
    transition: background 0.25s, color 0.1s;

    .blog-name {
      font-size: 1.2em;
      display: flex;
      flex: 1;
      font-family: "pacifico", cursive;
      cursor: pointer;
      align-items: center;
      justify-content: flex-start;
    }

    .blog-top-options {
      display: flex;
      flex: 1;
      height: 100%;
      align-items: center;
      justify-content: flex-end;
    }
  }

  .blog-cover {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-height: 400px) and (min-width: 550px) {
      .blog-name {
        animation: initBlogName 0.85s forwards, HeightMarginBottomZero 0.85s forwards !important;
      }
    }

    @media (min-height: 400px) and (min-width: 550px) {
      .blog-name {
        animation: initBlogName 0.85s forwards, HeightMarginBottomNotZero 0.85s forwards !important;
      }
    }

    @media (min-height: 400px) and (max-width: 550px) {
      .blog-name {
        animation: initBlogName 0.85s forwards, HeightMarginBottomZero 0.85s forwards !important;
      }
    }

    .blog-name {
      position: absolute;
      font-family: 'pacifico', cursive;
      color: white;
      user-select: none;
      transition: all 0.65s;
      margin-bottom: var(--marginBottom);
      font-size: var(--fontSize) !important;
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

  .head-bg {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    transition: all 0.5s;
    filter: var(--filter);
  }
}

::v-deep(.theme) {
  color: black;
}

@keyframes HeightMarginBottomZero {
  from {
    margin-bottom: 200px;
  }
  to {
    margin-bottom: 40px;
  }
}

@keyframes HeightMarginBottomNotZero {
  from {
    margin-bottom: 40px;
  }
  to {
    margin-bottom: 200px;
  }
}

@keyframes initBlogName {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
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

</style>
