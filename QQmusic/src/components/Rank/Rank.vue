<template>
  <div class="rankWrap">
    <ul class="clearfix rankContent">
      <li v-for="(list,index) in rankList" :key="index" v-if="4>index" @click="goDetail(list.id)">
        <b class="left_bg">
          <img :src="list.coverImgUrl" alt>
          <span>{{list.playerNum}}</span>
          <div class="left_cover"></div>
        </b>
        <div class="right_wrap">
          <div class="right_rank">
            <p>{{list.name}}</p>
            <ul class="list_rank">
              <li v-for="(item,index) in list.tracks" :key="index">
                <span>{{index+ 1}}</span>
                <a>
                  <strong>{{item.first}}</strong>
                  <span>{{item.second}}</span>
                </a>
              </li>
            </ul>
            <i></i>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import url from '../../common'
export default {
  data() {
    return {
      rankList: "" 
    };
  },
  mounted() {
    this.$http({
      url: url.rank
    }).then(res => {
      console.log(res, 333);
      if (res.status == 200) {
        this.rankList = res.data.list;
      } else {
        return;
      }
    });
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        path: "/detail",
        query: {
          id: id
        }
      });
    }
  }
};
</script>
<style lang="" >
.rankWrap {
  margin: 0.1rem;
}
.rankContent {
  padding-bottom: 1.18rem;
}
.rankContent > li {
  background-color: #fff;
  margin-bottom: 0.1rem;
  height: 1rem;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-start;
}
.left_bg {
  width: 1rem;
  position: relative;
  float: left;
}
.left_bg img {
  width: 1rem;
}
.left_bg span {
  position: absolute;
  left: 0.06rem;
  bottom: 0.06rem;
  padding-left: 0.2rem;
  background: url("../../assets/image/list_sprite.png") no-repeat 0 -0.75rem;
  background-size: 0.36rem;
  font: 0.09rem/0.14rem "微软雅黑";
  color: #fff;
}
/* 加遮罩层 */
/* .left_cover {
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 1rem;
  height: 1rem;
} */
.right_wrap {
  /* 这里 *****************重点观察********************* */
  float: left;
  overflow: hidden;
}
.right_rank {
  margin: 0 0.15rem;
}
.right_rank i {
  position: absolute;
  right: 0.1rem;
  top: 50%;
  width: 0.07rem;
  height: 0.07rem;
  border-right: 1px solid #b2b2b2;
  border-bottom: 1px solid #b2b2b2;
  transform: rotate(-45deg);
}
.right_rank p {
  font: 0.16rem/0.24rem "微软雅黑";
  color: #000;
  margin-bottom: 0.05rem;
}
.list_rank > li {
  font: 0.16rem/0.21rem "微软雅黑";
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.list_rank li span,
.list_rank li strong {
  display: inline-block;
}
.list_rank li span {
  color: #a1a1a1;
}
.list_rank li strong {
  color: #000;
  margin: 0 0.05rem 0 0;
}
</style>


