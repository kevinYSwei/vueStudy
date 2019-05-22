<template>
    <div id="list">
        <div class="list_toper_wrap">
            <div class="list_toper">
                <img src="https://y.gtimg.cn/mediastyle/mod/mobile/img/logo.svg?max_age=2592000" alt="">
                <div class="top_content">
                    <h6>QQ音乐</h6> 
                    <p>打开APP收藏下载</p>
                </div>
                <a href="" class="down_app">下载APP</a>
            </div>
        </div>
        <div class="list_top_wrap">
            <a href="#" class="list_top_cover">
                <div class="list_top">
                    <div class="logo_bg" :style="{backgroundImage:'url('+albumImgUrl+')'}"></div>
                    <div class="logo_msg">
                        <p>专辑名称 : <span>{{albumName}}</span></p>    
                        <p>创建日期 : <span>{{albumTime | toDate}}</span></p>    
                        <p>专辑描述 : <br><span>{{albumInfo}}</span></p>  
                    </div> 
                </div>
            </a>
        </div>
        <!-- <h1>{{ $route.query }}</h1> -->
        <div class="listSong">
            <ul class="songContent">
                <li v-for="(song,index) in songList" :key="index" @click='oneSong(song)'>
                    <div class="song_wrap">
                        <div class="songNum" :class="[index<3 ? 'songRed' : '']">{{ index+1<10 ? '0'+(index+1):index+1}}</div>
                        <div class="songInfo">
                            <strong>{{song.name}}</strong>
                            <p><span></span>{{song.ar[0].name}}</p>
                            <i></i>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="webIntro">
            <h2>简介</h2>
            <p class="popularQQ">{{objList.creator.signature}}</p>
            <div class="detail_msg">
                <p>更新时间：每天更新</p>
                <p>更新数量：100首</p>
                <p>统计算法：QQ音乐库内全部歌曲，根据综合数据7天前的涨幅进行排序，取前100名</p>
                <p>综合数据：登录用户在QQ音乐播放/分享/下载数据</p>
                <div class="foot_logo">
                    <img src="https://y.gtimg.cn/mediastyle/mod/mobile/img/logo.svg?max_age=2592000" alt="">
                    <p>QQ音乐</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import url from '../../common'   /* 将路由封装起来 */
export default {
    data(){
        return{
            objList:'',
            songList:'',
            albumName:'',
            albumImgUrl:'',
            albumInfo:'',
            albumTime:'',
        }
    },
 /*    filters:{// 设置个局部过滤器 
        toDate(tm){
            let date = new Date(tm)
            // return  date.toLocaleDateString().replace(/\//g,' ')
            return  date.toLocaleDateString()
        }
    }, */
    mounted(){
        this.$http({
            url:url.songList,
            params:{
                id:this.$route.query.id
            }
        }).then(res=>{
            if(res.status == 200){
                console.log(res,'qqqqqq')
                this.objList = res.data.playlist
                //调取100首歌
                this.songList = this.objList.tracks
                //获取榜名
                this.albumName = this.objList.name
                //获取该榜 的封面图片
                this.albumImgUrl = this.objList.coverImgUrl
                //获取榜名描述
                this.albumInfo = this.objList.description
                //获取专辑创建时的 时间戳
                this.albumTime = this.objList.createTime
                console.log(this.objList,77777777)
            }else{
                alert('查询失败')
            }
        })
    },
    methods:{
        oneSong(song){
            this.$router.push({
                path:'/curSinge',
                query:{
                    id:song.id,
                    song:song.name,
                    singer:song.ar[0].name
                }
            })
        }
    }
}
</script>
<style lang="stylus" rel='sheet/stylus' scoped>
    #list
        width 100%
        overflow hidden
        .list_toper_wrap
            width 100%
            height .64rem
            overflow hidden
            background #d43c33
            position fixed
            top 0
            left 0
            z-index 999
            .list_toper
                color #fff
                margin 0 .1rem
                img 
                    margin .16rem 0 0 .1rem
                    width .35rem
                    height .35rem
                    float left
                .top_content
                    float left
                    margin .14rem 0 0 .12rem
                    h6 
                        font .18rem/.18rem '微软雅黑'
                    p 
                        margin-top .08rem
                        font .12rem/.12rem '微软雅黑'
                .down_app
                    float right
                    font .15rem/.26rem '微软雅黑'
                    margin-top .16rem
                    padding 0 .1rem
                    border 1px solid #fff
                    border-radius .28rem
                    color #fff
                    
        .list_top_wrap
            position relative
            margin-top .64rem
            height  1.46rem
            background url('../../assets/image/list_bg.jpg') no-repeat
            background-size 100%
            .list_top
                margin .23rem 0 .23rem .2rem
                height 1rem
                .logo_bg
                    float left
                    width 1rem
                    height 1rem
                    margin-right .2rem
                    background-repeat no-repeat
                    background-size 1rem 1rem
                .logo_msg
                    color yellowgreen
                    display flex
                    flex-direction column
                    p   
                        margin-top .08rem
                        align-items center
                        margin-right .2rem
                        font .14rem/.2rem '微软雅黑'
                        overflow hidden
                        text-overflow ellipsis
                        white-space nowrap
                        span 
                            display inline-block
                            color #ccc
                    p:nth-child(1)
                        margin-top 0
            .list_top_cover
                position absolute
                top 0
                left 0
                width 100%
                height 100%
                background-color rgba(0,0,0,.2)
        .listSong
            overflow hidden
            margin 0 .1rem
            .songContent
                width 100%
                overflow hidden
                li
                    width 100%
                    height .55rem
                    .song_wrap 
                        display flex
                        justify-content flex-start
                        position relative
                        .songRed
                            color #df3436
                        .songNum
                            width .28rem
                            font .17rem/.55rem '微软雅黑'
                        .songInfo
                            flex 1
                            padding .06rem .34rem .06rem .1rem
                            overflow hidden
                            strong
                                display block
                                font .17rem/.25rem '微软雅黑'
                                color #333
                                overflow hidden
                                white-space nowrap
                                text-overflow ellipsis
                            p 
                                font .12rem/.18rem '微软雅黑'
                                color #888
                                overflow hidden
                                white-space nowrap
                                text-overflow ellipsis
                                span 
                                    display inline-block
                                    background url('../../assets/image/list_bg.png') no-repeat 0 .025rem
                                    background-size 2.2rem
                                    width .16rem
                                    height .18rem
                                    margin-right .04rem
                                    vertical-align middle
                            i 
                                position absolute
                                top .16rem
                                right .1rem
                                width .24rem
                                height .24rem
                                background url('../../assets/image/list_bg.png') no-repeat -.26rem 0px
                                background-size 1.8rem
        .webIntro
            margin 0 .16rem .2rem
            h2 
                text-align center
                font .18rem/.55rem '微软雅黑'
                color #000
            .popularQQ,.detail_msg
                font .14rem/.21rem '微软雅黑'
                color #777
                margin-bottom .2rem
            .detail_msg
                .foot_logo 
                    padding .4rem 0 
                    overflow hidden
                    text-align center
                    img 
                        width .32rem
                        height .32rem
                    p   
                        color #000
                        margin-top .02rem
                        font .14rem/.21rem '微软雅黑'

</style>



