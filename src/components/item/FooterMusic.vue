<template>
  <div class="FooterMusic">
    <div class="FooterLeft" @click="updatetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <p>{{ playList[playListIndex].name }}</p>
        <span>横滑切换上下首哦</span>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" v-if="isbtnShow" @click="play">
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="detailShow"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <music-detail
        :musicList="playList[playListIndex]"
        :isbtnShow="isbtnShow"
        :play="play"
        :addDuration="addDuration"
      />
    </van-popup>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { mapMutations, mapState } from "vuex";
import MusicDetail from "../../components/item/MusicDetail.vue";
export default {
  data() {
    return {
      interVal: 0,
    };
  },
  components: {
    MusicDetail,
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isbtnShow", "detailShow"]),
  },
  created() {
    // console.log(this.playList);
  },
  mounted() {
    // 初始进入页面派发一次
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.updateTime();
  },
  updated() {
    // 切换歌曲重新派发一次
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.addDuration();
  },
  watch: {
    // playListIndex() {
    //   //监听下标发生改变
    //   this.$refs.audio.autoplay = true;
    //   // 切换歌曲
    //   if (this.$refs.audio.paused) {
    //     this.updateIsbtnShow(false);
    //   }
    // },
    playList() {
      if (this.isbtnShow) {
        // 解决下标为0时
        this.$refs.audio.autoplay = true;
        this.updateIsbtnShow(false);
      }
    },
  },
  methods: {
    play() {
      // 播放/暂停
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsbtnShow(false);
        this.updateTime(); //播放调用函数传值
      } else {
        this.$refs.audio.pause();
        this.updateIsbtnShow(true);
        clearInterval(this.interVal); //清除定时器
      }
    },
    addDuration() {
      this.updateDuration(this.$refs.audio.duration);
    },
    updateTime() {
      this.interVal = setInterval(() => {
        this.updatecurrentTime(this.$refs.audio.currentTime);
      }, 10);
    },
    ...mapMutations([
      "updateIsbtnShow",
      "updatetailShow",
      "updatecurrentTime",
      "updateDuration",
    ]),
  },
};
</script>

<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  padding: 0.2rem;
  justify-content: space-around;
  .FooterLeft {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>