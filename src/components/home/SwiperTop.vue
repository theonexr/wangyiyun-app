<template>
  <div id="swiperTop">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="image in state.images" :key="image.id">
        <img :src="image.pic" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import axios from "axios";
import {getBanner} from '../../request/api/home'
import { reactive, onMounted } from "vue";
export default {
  setup() {
    const state = reactive({
      images: [],
    });
    onMounted(async ()=>{
      let res = await getBanner()
      // console.log(res);
      state.images = res.banners;
    }
      // axios.get("http://localhost:3000/banner?type=2").then((res) => {
      //   state.images = res.data.banners;
      //   console.log(state.images[0].pic);
      // });
    );
    return { state };
  },
};
</script>
<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 14px;

  img {
    width: 95%;
    height: 100%;
    border-radius: 14px;
  }
}
</style>