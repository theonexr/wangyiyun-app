<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="150"
        class="my-swiper"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in state.musicList" :key="item.id">
          <router-link :to="{path:'/ItemMusic',query:{id:item.id}}">
            <img :src="item.picUrl" alt="" />
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-play"></use>
              </svg>
              {{ changeCount(item.playCount) }}
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup>
import { getMusicList } from "../../request/api/home";
import { reactive, onMounted } from "vue";
import { changeCount } from '../../util/index'
const state = reactive({
  musicList: [],
});

onMounted(async () => {
  let res = await getMusicList();
  state.musicList = res.result;
//   console.log(state.musicList);
});
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2em;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
}
.musicContent {
  width: 100%;
  height: 200px;
  .my-swiper {
    height: 100%;
    img {
      width: 100%;
      height: 3rem;
      border-radius: 15px;
      padding: 5px;
    }
    .playCount {
      position: absolute;
      color: #fff;
      left: 59px;
      top: 10px;
      font-size: 14px;
    }
  }
}
</style>