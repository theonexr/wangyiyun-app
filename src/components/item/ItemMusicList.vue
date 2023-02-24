<template>
  <div class="videoList">
    <div class="videoTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <div class="videoLength">
        播放全部<span>(共{{ itemList.length }}首)</span>
      </div>
      <button>+收藏({{ subscribedCount }})</button>
    </div>
    <MusicList :searchList="props.itemList" :subscribedCount="props.subscribedCount"/>
  </div>
</template>

<script setup>
import { onMounted, computed, reactive, watch, getCurrentInstance } from "vue";
import { mapMutations } from "vuex";
import { sliceStr } from "../../util/index";
import MusicList from "@/components/item/MusicList";
// const { itemList, subscribedCount } = defineProps([
//   itemList,
//   subscribedCount,
// ]);
const props = defineProps({
  itemList: Array,
  subscribedCount: Number,
});

watch(
  () => props.itemList,
  (newList, oldList) => {
    // console.log(oldList);
  }
);




onMounted(() => {
  // console.log(props.itemList);
});
</script>
<style lang="less" scoped>
.videoList {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 9.7rem;
  background-color: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  overflow: auto;
  .videoTop {
    width: 100%;
    height: 1rem;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      transform: translateX(0.2rem);
    }
    .videoLength {
      transform: translateX(-0.8rem);
      font-size: 18px;
      font-weight: 900;
      span {
        font-size: 15px;
        font-weight: 500;
        color: rgba(142, 140, 140, 0.5);
      }
    }

    button {
      height: 35px;
      transform: translateX(-0.2rem);
      border: rgba(255, 255, 255, 0.392);
      background-color: rgb(255, 22, 0);
      color: #fff;
      border-radius: 15px;
    }
  }
  ul {
    li {
      width: 100%;
      height: 80px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;
      .index {
        transform: translateX(0.2rem);
        font-size: 15px;
      }
      .videoName {
        position: absolute;
        left: 50px;
        font-size: 18px;
        font-weight: 900;
        span {
          font-size: 14px;
          font-weight: 300;
          color: rgb(216, 216, 216);
          margin-right: 10px;
        }
      }
      .action {
        transform: translateX(2.5rem);
      }
    }
  }
}
</style>