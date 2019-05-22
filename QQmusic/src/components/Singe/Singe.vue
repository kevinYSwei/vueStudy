<template>
  <div class="singWrap">
      <div class="singleDta">
          <div class="singleCon">
            <div class="singleCover">
                <div class="rotateBox">
                    <div class="smallRotate">
                        <span class="toggle"></span>
                    </div>
                </div>
                <div id="sing_info">
                    <div class="singeName">
                        <strong>{{$route.query.song}}</strong>
                        <span>{{$route.query.singer}}</span>
                        <ul class="song_info"><!-- 这个相当于自定义 map集合的键值对 -->
                          <!-- <li v-for="(val,k) in lyricList" :key='k' :class="viewId === k ? 'greenFont' : ''">{{val}}</li> -->
                          <li v-for="(item,index) in lyricList" :key='index' :class="viewId === item[0]? 'greenFont' : ''">{{item[1]}}</li>
                        </ul>
                    </div>
                </div>
                <audio :src="songUrl" autoplay controls muted id="myAudio"></audio>
                <div class="findSong">
                      <p>查看完整歌词&gt;</p>
                      <span></span>
                </div>
                <ul class="footer">
                    <li>打开</li>
                    <li>下载</li>
                </ul>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import url from '../../common'
import $ from 'jquery'
export default {
  data() {
    return {
      lyricList: '',
      songUrl:'',
      start:'',
      viewId:'',
    }
  },
  methods:{
    transTime(tm){
      var minute = Math.floor(tm/60)
      var second = Math.floor(tm%60)
      if(minute < 10){
          minute = '0' + minute
      }
      if(second < 10){
          second = '0' + second
      }
      return minute + ':' + second
    }  //也可以将此函数 写在 methods里
  },
  mounted() {
    //获取歌曲详情 接口
    this.$http({
      url: "/api/song/url",
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      this.songUrl = res.data.data[0].url;
    })
    //获取 歌词接口
    this.$http({
      url:"/api/lyric",
      params: {
        id:this.$route.query.id
      }
    }).then(res=>{
      // this.lyric = res
      var oneLyric = res.data.lrc.lyric 
      var mapLyric = new Map()
      // var json = {}
      var reg = /\[(.*?)](.*)/g   /* 匹配全局 replace */
      oneLyric.replace(reg,function(a,b,c){//见我笔记本 记得更详细
        // console.log(a,"aaaaaaaaaaaaaaaa") //a代表当前正则匹配的数据
        //  console.log(b,"bbbbbbbbbbbbbbbb") //b代表当前出现的位置
          // console.log(c,"cccccccccccccccccc") //c代表全文
        b = b.slice(0,5)
        // console.log(b,7777)
        mapLyric.set(b,c)
          // json[b] = c
      })
      //将循环 替换后的 map 赋给lyricList
      // this.lyricList = json
      this.lyricList = Array.from(mapLyric)
      console.log(this.lyricList,4444)

      //获取音频对象
    let audio = document.querySelector('audio');
    //音频实时监听事件
      audio.ontimeupdate = ()=>{
        // console.log(audio.currentTime,33333) //音频当前所在时间点 秒单位   转换成 map集合中 键的形式
        //箭头函数中 保证this指向仍为原先对象
        this.start = this.transTime(audio.currentTime)
        // console.log(this.start ,666)
        //保证最开始的起始时间 即颜色的跳转时间
        /* if(this.start in this.lyricList){  //此时this.lyricList 是json 键值对对象
          //给实时音乐播放的时间处 同 map集合键的时间 相匹配时 加上颜色
          this.viewId = this.start
        } */
        //  console.log(this.lyricList,5656)
        this.lyricList.map((ele,index)=>{
            if(this.start == ele[0]){
                this.viewId = this.start
            }
        })
      }
    });
     
  },
  updated() { /* 当一些位置发生改变 比如说 offset translateX等距离 就要在更新之后 updated里 进行书写js代码 */
      let gap = 30*$('.singeName .greenFont').index()
      console.log(gap,8765)
      if(gap>-1){
        $('.song_info li').css({
        'transform':'translateY('+(-gap)+'px)'
      })
      }
  },
};
</script>
<style lang="stylus" scoped>
  ::-webkit-scrollbar
    height 0
    width  0
  .singWrap
      min-width .32rem
      height 100%
      overflow hidden
      .singleDta
        position absolute
        left 0
        top 0
        right 0
        overflow hidden
        width 100%
        min-height 100%
        background #000 url('../../assets/image/bg1.jpg') no-repeat 50% 5%
        background-size 300%
        .singleCon
            padding .1rem
            overflow hidden
            .rotateBox
                margin .7rem auto .25rem
                width 2.96rem
                height 2.96rem
                overflow hidden
                background url('../../assets/image/bg3.png') no-repeat 
                background-size contain
                position relative
                .smallRotate
                    width 1.84rem
                    height 1.84rem
                    position absolute
                    left 50%
                    top 50%
                    margin-left -.92rem
                    margin-top -.92rem
                    background url('../../assets/image/bg2.jpg') no-repeat
                    background-size contain
                    border-radius 50%
                    .toggle
                        position absolute
                        left 50%
                        top 50%
                        margin-left -.28rem
                        margin-top -.28rem
                        z-index 999
                        width .56rem
                        height .56rem
                        background url('../../assets/image/player.png') no-repeat
                        background-size contain
            #sing_info
                max-height 1.36rem
                margin .15rem .35rem .7rem
                overflow auto
                text-align center
                color #fff
                font .2rem/.3rem '微软雅黑'
                .singeName
                      span 
                        font-size .16rem
                .song_info
                    margin-top .14rem 
                    overflow hidden
                    li 
                      transition .4s all linear
                      color #999
                      font-size .16rem
                      height .3rem  
                    .greenFont
                      color green
            .findSong
                text-align center
                color #fff
                p   
                    font .14rem/.3rem '微软雅黑'
                    color #999
            .footer
                margin 0 .1rem
                position fixed
                bottom .1rem
                left 0
                right 0
                display flex
                justify-content space-between
                li 
                    flex 1 1 auto 
                    color #fff
                    margin-left .1rem
                    padding 0 .06rem
                    text-align center
                    // border 1px solid #adadad
                    border 1px solid #d33a31
                    border-radius .4rem
                    font .18rem/.4rem '微软雅黑'
                li:nth-child(2)
                    background-color #d33a31
                li:nth-child(1)
                    color #d33a31
                    


</style>
