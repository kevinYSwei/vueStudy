const routerInter = 'http://localhost:3000'
//home页接口
const banner = routerInter + '/banner'
//home页 djprogram接口
const djprogram = routerInter + '/personalized/djprogram'
//rank页 接口
const rank = routerInter + '/toplist/detail'
//search页 hot关键词接口
const hotKeys = routerInter + '/search/hot'
//search页 关键词搜索接口
const hotSearch = routerInter + '/search'
//search页 单个音乐播放资源接口
const songUrl = routerInter + '/song/url'
//detail页 专辑下 歌曲列表接口
const songList = routerInter + '/playlist/detail'
//detail页 单个歌曲详情 接口
const songDetail = routerInter + ''

export default {
    banner,
    djprogram ,
    rank,
    hotKeys,
    hotSearch,
    songUrl,
    songList
}