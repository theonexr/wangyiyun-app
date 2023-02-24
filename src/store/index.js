import { createStore } from 'vuex'
import { useStore } from 'vuex'
import { getMusicLyric, getPhoneLogin } from '@/request/api/item'
export default createStore({
  state: {
    playList: [{//播放列表默认值
      al: {
        id: 148263031,
        name: "灵魂伴侣（Soul Mate）",
        pic: 109951167685725310,
        picUrl: "https://p2.music.126.net/LWBLDwHBK_5sGBteS0kZpg==/109951167685725308.jpg",
        pic_str: "109951167685725308",
      },
      id: 1964850254,
      name: "灵魂伴侣（Soul Mate）",
      ar: [{
        name: "3333"
      }]
    }],
    playListIndex: 0,//默认下标为0
    isbtnShow: true, //暂停
    detailShow: false, //歌曲详情页
    LyricList: {}, //歌词 
    currentTime: 0, //当前时间
    duration: 0, //歌曲总时长
    isLogin: false, //判断是否登录
    isFooterMusic: true, //判断底部组件是否显示
  },

  mutations: {
    updateIsbtnShow: function (state, value) {
      state.isbtnShow = value
    },
    updatePlayList: function (state, value) {
      state.playList = value
    },
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value
    },
    updatetailShow: function (state) {
      state.detailShow = !state.detailShow
    },
    updateLyricList: function (state, value) {
      state.LyricList = value
    },
    updatecurrentTime: function (state, value) {
      // console.log(state.currentTime);
      state.currentTime = value
    },
    updateDuration: function (state, value) {
      state.duration = value
    }
  },
  actions: {
    updatePlayList(context, value) {
      context.commit('updatePlayList', value)
      // console.log(playList);
    },
    updatePlayListIndex(context, value) {
      context.commit('updatePlayListIndex', value)
    },
    async getLyric(context, value) {
      let res = await getMusicLyric(value)
      context.commit('updateLyricList', res.lrc)
    },
    async getLogin(context, value) {
      let res = await getPhoneLogin(value)
      // console.log(res);
    }
  },
  getters: {
  },
  modules: {
  }

})
