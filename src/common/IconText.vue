<template>
  <div class="options"
       :style="[{'--width': !hideArrowDown ? '75px' : '58px'}]"
       @mouseenter="mouseenter"
       @mouseleave="mouseleave">
    <el-icon class="icons">
      <slot name="icon"></slot>
    </el-icon>
    <span class="texts"><slot name="text"></slot></span>
    <el-icon class="drop" v-if="!hideArrowDown">
      <ArrowDownBold/>
    </el-icon>

    <ul class="option" v-if="!hideArrowDown" :style="openOption" :class="{'dark' : this.theme()}">
      <li>
        <el-icon class="li-icon">
          <Search/>
        </el-icon>
        文库
      </li>
      <li>
        <el-icon class="li-icon">
          <Search/>
        </el-icon>
        生活
      </li>
      <li>
        <el-icon class="li-icon">
          <Search/>
        </el-icon>
        本站
      </li>
      <li>
        <el-icon class="li-icon">
          <Search/>
        </el-icon>
        时光机
      </li>
      <li>
        <el-icon class="li-icon">
          <Search/>
        </el-icon>
        文库
      </li>
      <li>
        <el-icon class="li-icon">
          <Search/>
        </el-icon>
        生活
      </li>
      <li>
        <el-icon class="li-icon">
          <Search/>
        </el-icon>
        本站
      </li>
      <li>
        <el-icon class="li-icon">
          <Search/>
        </el-icon>
        时光机
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
/**
 * @author: tanxiang
 * @projectName: client-blog
 * @createTime: 2022/10/13 17:31
 * @description:
 */

import {defineComponent, ref, inject} from 'vue'

export default defineComponent({
  name: "IconText",
  setup() {
    let showOption = ref<boolean>(false);
    let timer = ref<any>(null)
    let theme: any = inject('theme');

    return {
      showOption,
      timer,
      theme
    }
  },
  props: {
    hideArrowDown: {
      type: Boolean,
      default: false
    },
    hideNavigationBar: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
  },
  methods: {
    mouseenter() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.showOption = true
    },
    mouseleave() {
      this.timer = setTimeout(() => {
        this.showOption = false
      }, 250)
    }
  },
  computed: {
    openOption() {
      return this.showOption ? {display: 'block'} : {display: 'none'}
    }
  }
})
</script>

<style scoped lang="scss">
@import "src/assets/css/theme-dark.scss";

@media (max-width: 810px) {
  .options {
    width: auto !important;
    max-width: 95px;

    .texts {
      display: none;
    }

    .drop {
      display: none;
    }
  }
}

.options {
  display: flex;
  padding: 0 10px;
  width: 95px;
  height: 100%;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  align-items: center;
  position: relative;

  .icons {
    position: relative;
    top: 0;
    stroke: white;
    stroke-width: 50px;
    margin-right: 3px;
  }

  .texts {
    font-size: 17px;
    font-family: cursive;
  }

  .drop {
    position: relative;
    top: 2px;
    transition: transform 0.5s;
    margin-left: 2px;
    transform: rotateZ(0);
  }

  .option[theme = 'dark'] {
    background: black;
  }

  .option {
    padding: 5px;
    box-sizing: border-box;
    width: 85px;
    position: absolute;
    background: white;
    top: 80px;
    transition: all 0.25s;
    color: black;
    border-radius: 5px;
    list-style-type: none;
    opacity: 0;
    left: 3px;
    display: none;
    box-shadow: 0 5px 20px -4px rgb(0 0 0 / 50%);

    @media (max-width: 810px) {
      left: -24px;
    }


    li {
      font-weight: 500;
      font-size: 15px;
      padding: 7px 5px 7px 5px;
    }

    li:first-child {
      padding-top: 5px;
    }

    li:last-child {
      padding-bottom: 5px;
    }

    .li-icon {
      position: relative;
      top: 2px;
      margin-right: -1px;
    }
  }
}

.options:hover {
  .drop {
    transform: rotateZ(-180deg);
  }

  .option {
    top: 60px;
    opacity: 1;
  }
}

.options:after {
  content: "";
  width: 0;
  bottom: 17px;
  height: 3px;
  background: #80c8f8;
  position: absolute;
  transition: width 0.4s;
  border-radius: 100px;
}

@media (min-width: 810px) {
  .options:hover::after {
    width: var(--width);
  }
}

@media (max-width: 810px) {
  .options:hover::after {
    width: 17px;
  }
}
</style>