<template>
  <div class="search_wrap">
    <div class="search">
      <div>
         <input type="text" v-model='songSearch' @keydown.enter='activeTag(null,songSearch)' :placeholder="searchInfo" @click="getChoose()">
         <span></span>
      </div>
      <div class="search_cancle" v-if="flag1" @click="getCancle">取消</div>
    </div>
    <div class="hotSearch" v-if="!flag1">
      <h4>{{hotSearch}}</h4>
      <span v-for="(item,index) in hotKey" :key="index" @click="activeTag(index,item.first)" :class="[num==index? 'active':'']" >{{item.first}}</span>
    </div>
    <ul>
      <li v-for="(i,index) in songList" :key=index @click='toSong(i.id)' v-if='6>index'>{{i.name}}</li>
    </ul>
    <audio v-if="songUrl" :src="songUrl" autoplay controls></audio>
  </div>
</template>
<script>
import url from '../../common'
export default {
  data() {
    return {
      searchInfo: "搜索歌曲、歌单、专辑",
      hotSearch: "热门搜索",
      hotKey: '',
      num: 0,
      flag1: false,
      songList:'',
      songUrl:'',
      songSearch:''
    };
  },
  mounted(){
    this.$http({
      url:url.hotKeys
    }).then((res)=>{
      if(res.status == 200){
        this.hotKey = res.data.result.hots
        console.log(res,888)
      }else{
        return
      }
    })
  },
  methods: {
    activeTag(index,keyWord) {
      this.num = index;
      this.$http({
        url:url.hotSearch,
        params:{
          keywords:keyWord
        }
      }).then((res)=>{
        if(res.status == 200){
          this.songList = res.data.result.songs
          console.log(res,22222)
        }else{
          return
        }
      })
    },
    toSong(id){
      this.$http({
        url:url.songUrl,
        params:{
          id:id
        }
      }).then((res)=>{
        if(res.status == 200){
          this.songUrl = res.data.data[0].url
          console.log(res,5555555)
        }else{
          return
        }
      })
    },
    getChoose() {
      this.flag1 = true;
    },
    getCancle() {
      this.flag1 = false;
    }
  }
};
</script>
<style lang="" scoped>
.search_wrap {
  width: 100%;
}
.search {
  /* 弹性盒子 自动变化宽度 如果有插入子盒子*/
  display: flex;
  justify-content: space-between;
  height: 0.36rem;
  padding: 0.1rem;
  background-color: #f4f4f4;
  position: relative;
}
.search div:nth-of-type(1) {
  width: 100%;
  border-radius: 0.03rem;
  height: 0.2rem;
  background-color: #fff;
  padding: 0.08rem 0.12rem 0.08rem 0.35rem;
  font: 0.14rem/0.2rem "微软雅黑";
}
.search input {
  width: 100%;
  outline: none;
}
.search span {
  position: absolute;
  left: 0.2rem;
  top: 0.2rem;
  width: 0.18rem;
  height: 0.18rem;
  background: url("../../assets/image/down.png") no-repeat;
  background-size: 0.18rem;
}
.search_cancle {
  width: 11%;
  padding: 0 0.1rem;
  font: 0.14rem/0.36rem "微软雅黑";
  color: #555;
  cursor: pointer;
  text-align: center;
}
.hotSearch {
  width: 100%;
  background-color: #fff;
  padding: 0.15rem 0.15rem 0.8rem 0.15rem;
}
.hotSearch h4 {
  margin-bottom: 0.08rem;
  font: 0.14rem/0.2rem "微软雅黑";
  color: #555;
}
.hotSearch > span {
  display: inline-block;
  font: 0.14rem/0.3rem "微软雅黑";
  padding: 0 0.1rem;
  border: 1px solid rgba(0, 0, 0, 0.6);
  border-radius: 1rem;
  margin: 0 0.14rem 0.1rem 0;
}
.hotSearch .active {
  border-color: #fc4524;
  color: #fc4524;
}
</style>