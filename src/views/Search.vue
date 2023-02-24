<template>
  <div>
    <div class="searchTop">
      <svg class="icon" aria-hidden="true" @click="$router.push('/')">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <input
        type="text"
        v-model="state.searchKey"
        placeholder="陈奕迅"
        @keydown.enter="myKeydown"
      />
    </div>
    <div class="searchHistory">
      <span class="searchSpan">历史</span>
      <span
        v-for="item in state.keywordList"
        :key="item"
        class="spanKey"
        @click="SearchHistory()"
      >
        {{ item }}
      </span>
      <svg class="icon" aria-hidden="true" @click="delHistory">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>
    <MusicList :searchList="state.searchList" />
  </div>
</template>

<script setup>
import { onMounted, computed, reactive } from "vue";
import { getSearchMusic } from "@/request/api/item";
import MusicList from "@/components/item/MusicList";
const state = reactive({
  keywordList: [],
  searchKey: "",
  searchList: [],
});

// 删除历史信息
function delHistory() {
  localStorage.removeItem("keywordList");
  state.keywordList = [];
}
async function SearchHistory(item) {
  let res = await getSearchMusic(item);
  state.searchList = res.result.songs;
}
// 添加历史搜索信息
async function myKeydown() {
  if (state.searchKey.split("").join("").length != 0) {
    state.keywordList.unshift(state.searchKey);
    // 扩展运算符去重
    state.keywordList = [...new Set(state.keywordList)];
    // 固定长度
    if (state.keywordList.length > 10) {
      state.keywordList.splice(state.keywordList.length - 1, 1);
    }
    localStorage.setItem("keywordList", JSON.stringify(state.keywordList));
    let res = await getSearchMusic(state.searchKey);
    console.log(res);
    state.searchList = res.result.songs;
    state.searchKey = "";
  } else {
    console.log("请输入");
  }
}
onMounted(() => {
  state.keywordList = JSON.parse(localStorage.getItem("keywordList")) || [];
});
</script>

<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  input {
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: 0.1rem;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  .searchSpan {
    font-weight: 700;
  }
  .spanKey {
    padding: 0.1rem 0.2rem;
    background-color: rgb(185, 169, 169);
    border-radius: 0.4rem;
    margin: 0.1rem 0.2rem;
    display: inline-block;
  }
  .icon {
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    right: 0.2rem;
  }
}
</style>