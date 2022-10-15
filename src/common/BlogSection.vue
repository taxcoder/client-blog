<template>
  <div id="BlogSection" @scroll="scroll">
    <div id="admin">
      <div class="head">
        <img :src="head" alt="头像">
      </div>
      <div class="name"><span>北极光</span></div>
      <div class="say"><span>只要想做，就全力以赴！</span></div>

      <div class="total">
        <div class="archives"><span>32</span><span>文章</span></div>
        <div class="classifications"><span>32</span><span>文章</span></div>
        <div class="tags"><span>32</span><span>文章</span></div>
      </div>
      <div class="media">
        <div class="github">
          <el-icon v-html="svg.github"></el-icon>
        </div>
      </div>

      <div class="options">
        <div class="option active">
          <el-icon>
            <Memo/>
          </el-icon>
          <a href="#">文库</a>
        </div>
        <div class="option">
          <el-icon>
            <Guide/>
          </el-icon>
          <a href="#">生活</a>
        </div>
        <div class="option">
          <el-icon>
            <Odometer/>
          </el-icon>
          <a href="#">功能</a>
        </div>
        <div class="option">
          <el-icon>
            <Link/>
          </el-icon>
          <a href="#">友链</a>
        </div>
        <div class="option">
          <el-icon>
            <Warning/>
          </el-icon>
          <a href="#">本站</a>
        </div>
      </div>
    </div>
    <div id="main"></div>
  </div>
</template>

<script lang="ts">
/**
 * @author: tanxiang
 * @projectName: client-blog
 * @createTime: 2022/10/15 15:23
 * @description:
 */

//@ts-ignore
import head from '@/assets/img/head.webp';
import {defineComponent, ref, reactive, inject} from 'vue'
//@ts-ignore
import {svg} from '@/assets/ts/common.ts'
//@ts-ignore
import $ from 'jquery'

export default defineComponent({
  name: "BlogSection",
  setup() {
    let windowHeight: any = inject('windowHeight')
    return {head, svg, windowHeight}
  },
  props: {
    scrollTop: {
      type: Number,
      default: 0
    }
  },
  mounted() {

  },
  methods: {
    mouseleave() {
      console.log(1)
    },
    scroll() {
      console.log(2)
    }
  },
  computed: {},
  watch: {
    scrollTop(data) {
      let admin = $('#admin');
      if (admin.offset().top < 20) {
        admin.css('position', 'fixed').css('top', '0')
      }

      if (data <= this.windowHeight()) {
        admin.css('position', 'relative').css('top', 'auto')
      }
    }
  }
})
</script>

<style scoped lang="scss">
#BlogSection {
  width: 72.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 1000px;

  #admin {
    height: 100%;
    width: 15rem;
    padding: 15px 15px;
    box-sizing: border-box;

    .head {
      width: 100%;
      height: 160px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 65%;
        border-radius: 50%;
        border: .0625rem solid #f7f7f7;
        animation: blurAnimation 0.5s;
      }

      img:hover {
        animation: headAnimation 0.7s;
      }

    }

    .name, .say {
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .say {
      span {
        color: #8e8e8e;
      }
    }

    .total {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .archives, .classifications, .tags {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 40px;
        font-size: 16px;
        padding: 10px 7px;
        border-right: 1px solid #ccc;
        color: #616161;

        span:first-child {
          margin-bottom: 5px;
          font-size: 20px;
          color: #2d2d2d;
        }
      }

      .tags {
        border: none;
      }
    }

    .media {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 15px;
      font-size: 24px;
      cursor: pointer;
      box-sizing: border-box;

      .github {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
      }

      .github :hover {
        width: 34px;
        height: 34px;
        transition: 0.3s;
      }
    }

    .options {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;

      .option {
        margin-bottom: 10px;
        padding: 10px 15px;
        display: flex;
        width: 70%;
        color: #999;
        align-items: center;
        justify-content: center;
        font-size: 17px;
        border-radius: 10px;

        .el-icon {
          margin-right: 5px;
          font-size: 18px;
          position: relative;
          top: 1px;
        }

        a {
          color: #999;
        }
      }

      .active {
        background-image:  linear-gradient(to right,#ed6ea0 0,#ec8c69 100%);
        color: white;

        a{
          color: white;
        }
      }
    }
  }

  #main {
    height: 100%;
    width: calc(100% - 15rem);
  }
}

@keyframes headAnimation {
  0% {
    width: 50%;
  }
  10% {
    transform: rotateZ(5deg);
  }
  20% {
    transform: rotateZ(-5deg);
  }
  30% {
    transform: rotateZ(5deg);
  }
  40% {
    transform: rotateZ(-5deg);
  }
  50% {
    transform: rotateZ(5deg);
  }
  60% {
    transform: rotateZ(-5deg);
  }
  70% {
    transform: rotateZ(5deg);
  }
  80% {
    transform: rotateZ(-5deg);
  }
  90% {
    transform: rotateZ(5deg);
  }
  100% {
    width: 70%;
    transform: rotateZ(0deg);
  }
}

@keyframes blurAnimation {
  0% {
    filter: blur(0px);
  }
  100% {
    filter: blur(7px);
  }
}
</style>