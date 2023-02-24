<template>
  <div>
    <img :src="musicList.al.picUrl" alt="" class="bgImg" />
    <div class="detailTop">
      <div class="detailTopLeft">
        <svg class="icon" aria-hidden="true" @click="updatetailShow">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="left">
          <Vue3Marquee>
            <p>{{ musicList.al.name }}</p>
          </Vue3Marquee>
          <div class="authorName">
            <div class="NameBox">
              <span v-for="item in musicList.ar" :key="item.id">
                {{ item.name }}
              </span>
            </div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-youjiantou1"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="detailTopRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div class="detailContent" v-show="!isLyricShow" @click="ChangePage">
      <img
        src="@/assets/needle-ab.png"
        alt=""
        :class="isbtnShow == true ? 'img_needle' : 'img_needle_active'"
      />
      <img src="@/assets/圆盘.png" alt="" class="img_cd" />
      <img
        :src="musicList.al.picUrl"
        alt=""
        class="img_ar"
        :class="isbtnShow == true ? 'img_ar_paused' : 'img_ar_active'"
      />
    </div>
    <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
      <p
        @click="ChangePage"
        v-for="item in lyric"
        :key="item"
        :class="{
          active:
            currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
        }"
      >
        {{ item.lrc }}
      </p>
    </div>
    <div class="detailFooter">
      <div class="footerTop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinlechangpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-"></use>
        </svg>
      </div>
      <div class="footerContent">
        <input
          type="range"
          class="range"
          min="0"
          :max="duration"
          v-model="currentTime"
          step="0.05"
        />
      </div>
      <div class="footer">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <div class="video">
          <svg class="icon" aria-hidden="true" v-if="isbtnShow" @click="play">
            <use xlink:href="#icon-bofang1"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-else @click="play">
            <use xlink:href="#icon-zanting"></use>
          </svg>
        </div>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      isLyricShow: false,
      // Lyric1: "",
    };
  },
  props: ["musicList", "play", "isbtnShow", "addDuration"],
  components: {
    Vue3Marquee,
  },
  created() {},
  computed: {
    ...mapState([
      "LyricList",
      "currentTime",
      "playListIndex",
      "playList",
      "duration",
    ]),
    lyric() {
      let arr;
      if (this.LyricList.lyric) {
        // 正则裁剪
        arr = this.LyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(item.indexOf(":") + 1, item.indexOf("."));
          let mill = item.slice(item.indexOf(".") + 1, item.indexOf("]"));
          let lrc = item.slice(item.indexOf("]") + 1, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 100000;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      // console.log(arr);

      return arr;
    },
  },
  watch: {
    // 当前播放进度时间
    currentTime(newValue) {
      let p = document.querySelector("p.active");
      // console.log([p]);
      // 判断获取到p，再进行下一步
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
        }
      }
      // 当前播放进度等于总时长时，切换下一曲
      if (newValue === this.duration) {
        // if (this.playListIndex === this.playList.length - 1) {
        //   this.updatePlayListIndex(0);
        // } else {
        //   this.updatePlayListIndex(this.playListIndex + 1);
        // }
        this.goPlay(1);
      }
    },
  },

  mounted() {
    // console.log(this.LyricList);
    // console.log(this.lyric);
    this.addDuration();
  },
  updated() {
    // 每次切换歌曲，获取一次歌曲总时长
    this.addDuration();
  },
  methods: {
    ...mapMutations(["updatetailShow", "updatePlayListIndex"]),
    // 切换图片与歌词
    ChangePage() {
      this.isLyricShow = !this.isLyricShow;
    },
    // 切换歌曲
    goPlay(num) {
      let index = this.playListIndex + num;
      // console.log(this.playList);
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      // 更新播放列表下标记
      this.updatePlayListIndex(index);
    },
  },
};
</script>
<style lang="less" scoped>
.bgImg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(20px);
}
.detailTop {
  display: flex;
  justify-content: space-between;
  height: 1.4rem;
  width: 100%;
  align-items: center;
  fill: white;
  .vue3-marquee {
    left: 10%;
    width: 120px;
  }
  .detailTopLeft,
  .detailTopRight {
    display: flex;
    justify-content: space-around;
    margin: 0 0.2rem;
    .icon {
      font-size: 14px;
    }
    .left {
      p {
        color: #fff;
        font-weight: 900;
        font-size: 18px;
      }
      .authorName {
        display: flex;
        align-items: center;
        font-size: 14px;
        .icon {
          fill: rgb(162, 151, 156);
        }
        .NameBox {
          display: flex;
          span {
            color: rgb(162, 151, 156);
          }
        }
      }
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-10deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
  }
  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 8s linear infinite;
  }
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_paused {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }
}
.musicLyric {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: auto;
  scroll-behavior: smooth;
  p {
    color: rgb(174, 169, 169);
    margin-bottom: 0.2rem;
  }
  .active {
    color: #fff;
    font-size: 25px;
  }
}
.detailFooter {
  position: absolute;
  width: 100%;
  height: 3.5rem;
  bottom: 0;
  fill: #fff;
  .footerTop {
    display: flex;
    justify-content: space-around;
  }
  .footerContent {
    .range {
      width: 100%;
      height: 0.06rem;
    }
  }
  .footer {
    position: relative;
    top: 1.2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .video {
      width: 1rem;
      height: 1rem;
      text-align: center;
      .icon {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>