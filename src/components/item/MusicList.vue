<template>
  <div>
    <ul>
      <li v-for="(item, i) in searchList" :key="i" @click="playMusic(i)">
        <div class="index">{{ i + 1 }}</div>
        <div class="videoName">
          <div>{{ sliceStr(`${item.name}`, 10) }}</div>
          <span v-for="author in item.ar" :key="author.id">
            {{ author.name }}
          </span>
        </div>
        <div class="action">
          <svg class="icon" aria-hidden="true" v-if="item.mv != 0">
            <use xlink:href="#icon-shipin"></use>
          </svg>
        </div>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { sliceStr } from "../../util/index";
import { useStore } from "vuex";
const props = defineProps({
  searchList: Array,
  subscribedCount:Number
});
const store = useStore();
const playMusic = (i) => {
  // console.log(props.itemList, i);
  store.dispatch("updatePlayList", props.searchList);
  store.dispatch("updatePlayListIndex", i);
};
</script>

<style lang="less" scoped>
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
</style>