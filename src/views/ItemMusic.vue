<template>
  <div>
    <ItemMusicTop :playList="state.playList" />
    <TtemMusicList
      :itemList="state.itemList"
      :subscribedCount="state.playList.subscribedCount"
    />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, reactive, ref, onBeforeMount } from "vue";
import { getMusicList, getMusicAllList } from "../request/api/item";
import ItemMusicTop from "../components/item/ItemMusicTop.vue";
import TtemMusicList from "../components/item/ItemMusicList.vue";
const state = reactive({
  playList: {}, //详情页数据
  itemList: [], //歌单歌曲
});

// let isGetData = false;
// 解构获取路由传递id
const {query: { id }} = useRoute();
// console.log(id);


  // let id = useRoute().query.id
  getMusicList(id).then((res) => {
    state.playList = res.playlist;
  });
  // console.log(state.playList);
  // sessionStorage.setItem('itemDetail',JSON.stringify(state))
  getMusicAllList(id).then((res) => {
    state.itemList = res.songs;
  });

  // isGetData = true;



</script>

<style>
</style>