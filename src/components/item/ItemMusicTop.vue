<template>
  <div class="itemMusicTop" v-if="playList.creator">
    <img :src="playList.coverImgUrl" alt="" class="bgImg" />
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
    <div class="synopsis">
      <div class="leftImg">
        <img :src="playList.coverImgUrl" alt="" />
      </div>
      <div class="rightSynopsis">
        <div class="name">{{ playList.name }}</div>
        <div class="avatar">
          <img :src="playList.creator.backgroundUrl" alt="" />
          <span>{{ playList.creator.nickname }}</span>
        </div>
        <div id="des">{{ sliceStr(`${playList.description}`, 20) }}</div>
      </div>
    </div>
    <div class="IconList">
      <div class="IconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
        </svg>
        <span>{{playList.commentCount}}</span>
      </div>
      <div class="IconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{playList.shareCount}}</span>
      </div>
      <div class="IconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
        </svg>
        <span>下载</span>
      </div>
      <div class="IconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-show_duoxuan"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import {sliceStr} from '../../util/index'
const { playList } = defineProps(["playList"]);
if(playList.creator=''){
  playList.creator=JSON.parse(sessionStorage.getItem().playList).creator
}
// 改写成工具类
// const sliceStr = computed(() => {
//   return function (val, len) {
//     return val.length > len ? val.slice(0, len) + "..." : val;
//   };
// });
onMounted(() => {
  // console.log(playList);
});

// const props = defineProps({
//     playList:{}
// })
</script>
<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //   padding: 0.2rem;
  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.2rem;
    span {
      font-size: 0.4rem;
      color: #fff;
    }
    .icon {
      fill: #fff;
    }
  }
  .bgImg {
    width: 100%;
    height: 12rem;
    position: fixed;
    z-index: -1;
    filter: blur(30px);
  }
  .synopsis {
    position: absolute;
    top: 80px;
    width: 100%;
    height: 3.3rem;
    background-color: transparent;
    align-items: center;
    display: flex;
    justify-content: space-around;
    .leftImg {
      width: 3rem;
      height: 3rem;
      background-color: transparent;
      border-radius: 12px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 12px;
      }
    }
    .rightSynopsis {
      width: 4rem;
      height: 3rem;
      background-color: transparent;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .name {
        font-size: 18px;
        font-weight: 900;
        color: #fff;
      }
      .avatar {
        height: 1rem;
        display: flex;
        background-color: transparent;
        align-items: center;
        img {
          height: 0.8rem;
          width: 0.8rem;
          border-radius: 50%;
          margin-right: 0.16rem;
        }
        span {
          font-size: 16px;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.4);
        }
      }
      #des {
        font-size: 16px;
        font-weight: 800;
        color: rgba(255, 255, 255, 0.555);
      }
    }
  }
  .IconList {
    position: absolute;
    top: 5rem;
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
    .IconItem {
      width: 25%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        width: .6rem;
        height: .6rem;
        fill:#fff
      }
      span{
        color: #fff;
      }
    }
  }
}
</style>