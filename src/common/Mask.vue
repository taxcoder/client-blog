<template>
  <Teleport to="body" v-show="open">
    <div id="Mask"
         :style="{zIndex: zIndex,opacity: opacity}"
         :class="{'dark': theme()}"
         @click="close()"
    >
      <div id="search-archives"
           :class="[{'dark': theme()},{'close': closeSearch}]"
           @click.prevent.stop="stop()">
        <div class="tips">
          <span>站内搜索</span>
          <span @click="close()"></span>
        </div>
        <div class="input-container">
          <el-input v-model="value" :suffix-icon="Search" class="input-setting" placeholder="请输入关键词查询文章"
                    @input="searchArchives">

          </el-input>
        </div>
        <div class="result">
          <div class="result-options" :style="{'--width': activeIndex * 47 + 6 + 'px'}">
            <span class="result-option"
                  :class="[{active: index === activeIndex},{'dark': theme()}]"
                  v-for="(item,index) in ['文章','分类','标签']"
                  @click="changeSearchTip(index)">
              {{ item }}
            </span>
          </div>
        </div>


        <el-scrollbar :always="true" :height="calcHeight" v-show="openSearch">
          <!-- 查询出的文章信息 -->
          <ul class="list-items archive" v-if="activeIndex === 0">
            <li v-for="(item,index) in showArchives"
                v-show="archives_copy.length !== 0"
                class="list-item"
                :key="item.id">
              <i v-html="svg.round" class="i-icon"></i>
              <a href="#" :class="theme() ? 'dark' : ''">{{ item.name }}</a>
            </li>

            <div v-show="archives_copy.length === 0"
                 :style="{width: '100%',height: calcHeight + 'px'}"
                 v-loading="true"
                 element-loading-text="数据加载中"
            >
            </div>
          </ul>

          <!-- 所有的分类文件夹 -->
          <ul class="list-items classification" v-else-if="activeIndex === 1">
            <li v-for="(item,index) in classifications_copy"
                class="list-item"
                v-show="classifications_copy.length !== 0"
                :key="item.id"
            >
              <el-badge :value="item.total" class="item">
                <el-tag class="classification-tag" size="large" effect="dark">
                  <el-icon v-html="svg.folder" :size="20" class="folder-icon"></el-icon>
                  <a href="#"> {{ item.name }}</a>
                </el-tag>
              </el-badge>
            </li>
            <div v-show="classifications_copy.length === 0"
                 :style="{width: '100%',height: calcHeight + 'px'}"
                 v-loading="true"
                 element-loading-text="数据加载中"
            >
            </div>
          </ul>

          <!-- 所有的标签 -->
          <ul class="list-items tag" v-else>
            <li v-for="(item,index) in tags_copy"
                v-show="tags_copy.length !== 0"
                class="list-item"
                :key="item.id">
              <el-badge :value="item.total" class="item">
                <el-tag class="tag-tag" size="large" effect="dark" :color="getTagColor(index)">
                  <el-icon v-html="svg.tag" :size="16" color="white" class="tag-icon"></el-icon>
                  <a href="#">{{ item.name }}</a>
                </el-tag>
              </el-badge>
            </li>
            <div v-show="tags_copy.length === 0"
                 :style="{width: '100%',height: calcHeight + 'px'}"
                 v-loading="true"
                 element-loading-text="数据加载中"
            >
            </div>
          </ul>
        </el-scrollbar>

        <div class="pages" v-show="archives_copy.length !== 0 && openSearch"
             :class="activeIndex !== 0 ? 'close-page' : 'open-page'">
          <div class="page">
            <el-pagination :background="!theme()"
                           layout="prev, pager, next"
                           :total="archives.length"
                           v-model:pageSize="showDataLength"
                           v-model:currentPage="current"
                           hide-on-single-page
                           prev-icon="DArrowLeft" next-icon="DArrowRight"/>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
/**
 * @author: tanxiang
 * @projectName: client-blog
 * @createTime: 2022/10/14 9:10
 * @description:
 */

import {defineComponent, ref, watchEffect, inject, reactive} from 'vue'
import {Search} from '@element-plus/icons-vue'
//@ts-ignore
import {svg} from '@/assets/ts/common.ts'

export default defineComponent({
  name: "Mask",
  components: {
    Search
  },
  setup() {
    let value = ref<string>('');
    let closeSearch = ref<boolean>(false);
    let activeIndex = ref<number>(0);
    let current = ref<number>(1);
    let showDataLength = ref<number>(12);
    let colors: string[] = ['#409eff', '#67c23a', '#909399', '#f56c6c', '#e6a23c']
    let tagColors = reactive<string[]>([]);
    let openSearch = ref<boolean>(false);

    let archives: any = [
      {id: 1, name: '我是一个大帅哥1'},
      {id: 2, name: '我是一个大帅哥2'},
      {id: 3, name: '我是一个大帅哥3'},
      {id: 4, name: '我是一个大帅哥4'},
      {id: 5, name: '我是一个大帅哥5'},
      {id: 6, name: '我是一个大帅哥6'},
      {id: 7, name: '我是一个大帅哥7'},
      {id: 8, name: '我是一个大帅哥8'},
      {id: 9, name: '我是一个大帅哥9'},
      {id: 10, name: '我是一个大帅哥10'},
      {id: 11, name: '我是一个大帅哥11'},
      {id: 12, name: '我是一个大帅哥12'},
      {id: 13, name: '我是一个大帅哥13'},
      {id: 14, name: '我是一个大帅哥14'},
      {id: 15, name: '我是一个大帅哥15'},
      {id: 16, name: '我是一个大帅哥16'},
      {id: 17, name: '我是一个大帅哥17'},
      {id: 18, name: '我是一个大帅哥18'},
      {id: 19, name: '我是一个大帅哥19'},
      {id: 20, name: '我是一个大帅哥20'},
      {id: 21, name: '我是一个大帅哥21'},
      {id: 22, name: '我是一个大帅哥22'},
      {id: 23, name: '我是一个大帅哥23'},
      {id: 24, name: '我是一个大帅哥24'},
      {id: 25, name: '我是一个大帅哥25'},
      {id: 26, name: '我是一个大帅哥26'},
      {id: 27, name: '我是一个大帅哥27'}
    ]

    let archives_copy: any = reactive([]);

    let classifications: any = [
      {id: 1, name: '知识笔记', total: 36},
      {id: 2, name: '实用经验', total: 73},
      {id: 3, name: '干货分享', total: 152},
      {id: 4, name: '茶余饭后', total: 950},
      {id: 5, name: '优质转载', total: 736},
      {id: 6, name: '知识笔记', total: 36},
      {id: 7, name: '实用经验', total: 73},
      {id: 8, name: '干货分享', total: 152},
      {id: 9, name: '茶余饭后', total: 950},
      {id: 10, name: '优质转载', total: 736}
    ];

    let classifications_copy: any = reactive([]);

    let tags: any = [
      {id: 1, name: '美味佳肴', total: 5},
      {id: 2, name: '英语', total: 50},
      {id: 3, name: '拍摄', total: 1},
      {id: 4, name: '教育', total: 23},
      {id: 5, name: '青春', total: 56},
      {id: 6, name: '工作', total: 9},
      {id: 7, total: 19, name: '学习'},
      {id: 8, name: 'Butterfly', total: 42},
      {id: 9, name: '前端', total: 36},
      {id: 10, name: 'hexo', total: 44},
      {id: 11, name: 'github', total: 10},
      {id: 12, name: '音乐', total: 35},
      {id: 13, name: '说唱', total: 35},
      {id: 14, name: '图一乐', total: 30}
    ];

    let tags_copy: any = reactive([]);

    const theme: any = inject('theme')
    let windowWidth: any = inject('windowWidth');
    let windowHeight: any = inject('windowHeight');
    return {
      theme,
      Search,
      value,
      closeSearch,
      activeIndex,
      archives,
      svg,
      current,
      showDataLength,
      windowWidth,
      windowHeight,
      classifications,
      tags,
      classifications_copy,
      archives_copy,
      tags_copy,
      colors,
      openSearch,
      tagColors
    }
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: -999
    },
    opacity: {
      type: Number,
      default: 0
    }
  },
  emits: ['close'],
  mounted() {
  },
  methods: {
    stop() {
      return;
    },
    close() {
      this.closeSearch = true;
      this.openSearch = false;
      this.activeIndex = 0;
      this.value = '';
      setTimeout(() => this.$emit('close'), 400)
    },
    searchArchives(value: string) {

      if (value.trim().length === 0) return;

      this.openSearch = true;
    },
    changeSearchTip(index: number) {
      if (index === this.activeIndex) return;
      this.activeIndex = index;
    },
    getTagColor(index: number) {
       if(!this.tagColors[index]) {
        let count = parseInt((Math.random() * 5).toString());
        this.tagColors[index] = this.colors[count];
      }
      return this.tagColors[index];
    }
  },
  computed: {
    calcHeight() {
      let width = this.windowWidth()
      this.showDataLength = width <= 800 ? 18 : 12
      return width <= 500 ? this.windowHeight() - 176 - 10 : 34 * this.showDataLength + 20
    },
    showArchives() {
      return this.windowWidth() <= 500
          ? this.archives_copy
          : this.archives_copy.filter((data: any, index: number) => {
            return this.current === 1 ? index < this.current * this.showDataLength : index >= (this.current - 1) * this.showDataLength && index < this.current * this.showDataLength
          });
    }
  },
  watch: {
    open(data) {
      if (data) {
        this.closeSearch = false;
      }
    },
    activeIndex: {
      handler(index) {
        if (index === 0) {
          this.archives_copy.splice(0, this.archives_copy.length)
          // 发送请求查询数据数据
          setTimeout(() => {
            this.archives_copy.push(...this.archives)
          }, 3000)
        } else if (index === 1) {
          this.openSearch = true;
          this.classifications_copy.splice(0, this.classifications_copy.length);
          setTimeout(() => {
            this.classifications_copy.push(...this.classifications)
          }, 1000)
        } else {
          this.openSearch = true;
          this.tags_copy.splice(0, this.tags_copy.length);
          setTimeout(() => {
            this.tags_copy.push(...this.tags)
          }, 1000)
        }

        // 监听当前选项的改变，动态的隐藏和显示分页组件
        let pages: any = document.getElementsByClassName('pages')[0];
        if (!pages) return;
        let page: any = pages.firstChild
        requestAnimationFrame(() => {
          if (index === 0) {
            setTimeout(() => page.style.display = 'block', 300)
            pages.style.height = '50px';
          } else {
            setTimeout(() => page.style.display = 'none', 0)
            pages.style.height = 0;
          }
        })
      },
      immediate: true
    }
  }
})
</script>

<style scoped lang="scss">
@import 'src/assets/css/theme-dark.scss';

#Mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  backdrop-filter: blur(10px);
  top: 0;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.6);
  justify-content: center;
  filter: brightness(0.98);

  .close {
    animation: 0.5s ease 0s 1 normal forwards running titleScale;
  }

  @media (max-width: 800px) {
    #search-archives {
      border-radius: 0 !important;
      width: 100vw !important;
      height: 100vh;
      top: 0 !important;
      min-width: 380px !important;
      transition: top 0.5s !important;
    }
  }

  #search-archives {
    width: 700px;
    background: #fff;
    border-radius: 15px;
    position: absolute;
    top: 170px;
    transition: all 0.5s;
    border: 1px solid #cdd7f1;

    .tips {
      user-select: none;
      padding: 15px 23px 15px 23px;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        flex: 1;
        font-weight: 700;
      }

      span:first-child {
        color: #1fc7b6;
      }

      span:last-child {
        display: flex;
        align-content: center;
        justify-content: flex-end;
      }

      span:last-child:after {
        content: "×";
        cursor: pointer;
        color: #858585;
        font-size: 30px;
      }
    }

    .input-container {
      padding: 0 20px;

      .input-setting {
        padding: 4px 0 4px 2px;
        border-radius: 50px;
        box-sizing: border-box;
        border: 2px solid #1fc7b6;
      }
    }

    .result {
      padding: 20px 23px 15px 23px;

      .result-options {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .active {
          color: rgb(31, 199, 182) !important;
        }

        .result-option {
          position: relative;
          user-select: none;
          cursor: pointer;
          margin-right: 15px;
          font-size: 16px;
          font-weight: 700;
          color: #797979;
        }
      }

      .result-options:after {
        content: "";
        height: 3px;
        width: 18px;
        transform: translateX(var(--width));
        background: rgb(31, 199, 182);
        position: relative;
        left: -141px;
        transition: all 0.3s;
        bottom: -13px;
        border-radius: 100px;
      }
    }

    @media (max-width: 500px) {
      .list-items {
        max-height: none !important;
      }
    }

    .archive {
      .list-item:last-child {
        margin-bottom: 0;
      }

      .list-item {

        a {
          color: #191919;
          font-size: 14px;
          position: relative;
          top: -1px;
        }

        a:hover {
          color: #1fc7b6 !important;
        }
      }
    }

    .classification {
      display: flex;
      flex-flow: wrap;

      .list-item {
        padding: 0 8px;

        .classification-tag {
          border: none;
          background: #1b8aff;

          ::v-deep(.el-tag__content) {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .folder-icon {
            position: relative;
            top: 0;
            margin-right: 4px;
          }
        }

        .classification-tag:hover {
          background-color: #2b9052;
        }

        a {
          color: white !important;
        }
      }
    }

    .tag {
      transition: none;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: wrap;

      .list-item {
        display: inline-flex !important;
        flex-flow: wrap;
        padding: 0 10px;

        ::v-deep(.el-tag__content) {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        a {
          color: white !important;
        }

        .tag-tag {
          border: none;
        }

        .tag-tag:hover {
          background-color: #2b9052;
        }

        .tag-icon {
          position: relative;
          top: 0;
          margin-right: 6px;
        }
      }
    }

    .list-items {
      padding: 0 23px 20px 23px;
      max-height: 300px;

      .list-item {
        margin: 10px 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-weight: 700;
        font-size: 16px;
      }
    }

    @media (max-width: 500px) {
      .pages {
        display: none !important;
      }
    }

    .pages {
      width: 100%;
      height: 50px;
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: height 0.5s;
    }
  }

  @media (max-height: 500px) {
    #search-archives {
      top: auto;
    }
  }

  @media (max-height: 210px) {
    #search-archives {
      top: 5px;
    }
  }
}

::v-deep(.el-badge__content) {
  z-index: 999;
}

::v-deep(.el-scrollbar) {
  height: auto;
}

::v-deep(.i-icon .icon) {
  width: 14px;
  height: 14px;
  margin-right: 5px;
  stroke-width: 75px;
  stroke: #1fc7b6;
  position: relative;
  top: 1px;
}

::v-deep(.el-input__inner) {
  font-family: inherit;
  font-size: 1.1em;
  line-height: 1.15;
  margin: 0;
}

::v-deep(.el-input__wrapper) {
  border: none;
  box-shadow: none;
  border-radius: 50px !important;
}

::v-deep(.el-input__icon) {
  font-size: 21px;

  svg {
    stroke: #a8abb2;
    stroke-width: 30px;
  }
}

@keyframes titleScale {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.7);
    opacity: 0;
  }
}
</style>