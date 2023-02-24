import requests from "..";
// 歌单详情页数据
export const getMusicList = (id) => requests({ url: `playlist/detail?id=${id}`, method: "GET" })

// 歌单列表
export const getMusicAllList = (data) => requests({ url: `playlist/track/all?id=${data}&limit=20&offset=0` })

// 获取歌曲的歌词
export const getMusicLyric = (data) => requests({ url: `/lyric?id=${data}`, method: 'GET' })

// 搜索功能
export const getSearchMusic = (data) => requests({ url: `/search?keywords=${data}`,method:'GET' })

// 手机登录
export const getPhoneLogin = (data) => requests({ url: `/login/cellphone?phone=${data.phone}&paeeword=${data.password}`,method:'post' })

