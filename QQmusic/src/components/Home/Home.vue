<template>
  <div>
    <!-- Swiper -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(banner,index) in bannerList " :key="index" v-if="4>index">
          <a href="#">
            <img :src="banner.imageUrl" alt="pic">
          </a>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
    <div class="swiper_tit">{{tit}}</div>
    <ul class="clearfix other_content">
      <li v-for="(item,index) in otherImg" :key="index" v-if="2>index">
        <div class="contentIte">
          <a href>
            <img :src="item.picUrl" alt="pic">
            <span></span>
          </a>
        </div>
        <p>{{item.name}}</p>
      </li>
    </ul>
    <div class="copyright">
      <h4>
        <a href="#">{{findPc}}</a>
      </h4>
      <span class="foot_logo"></span>
      <p>{{copyright}}</p>
    </div>
  </div>
</template>
<script>
// import "../../../node_modules/swiper/dist/js/swiper.min";
import Swiper from "swiper";
import url from '../../common'
export default {
  data() {
    return {
      bannerList:'',
      otherImg:"" ,
      tit: "电台",
      findPc: "查看电脑版网页",
      copyright: "Copyright © 1998 - 2019 Tencent. All Rights Reserved."
    };
  },
  methods: {
    mySwiper() {
      var swiper = new Swiper(".swiper-container", {
        //启动动态检查器(OB/观众/观看者)，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
        observer: true,
        observeParents: true,
        pagination: {
          el: ".swiper-pagination"
        },
        loop: true,
        speed: 2000,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
          waitForTransition: false
        }
      });
    }
  },
  mounted() {
    /* 生命周期 已经挂载后 */
    this.$http({
      url: url.banner
    }).then(res => {
      if (res.status == 200) {
        console.log(res, 111);
        this.bannerList = res.data.banners;
        this.$nextTick(() => {  /* ******************************** */
          //延迟加载异步 加载UI的下一帧
          this.mySwiper();
        });
      } else {
        return;
      }
    });
    this.$http({
      url: url.djprogram
    }).then(res => {
      if (res.status == 200) {
        this.otherImg = res.data.result;
        console.log(res, 777);
      } else {
        return;
      }
    });
  }
};
</script>
<style >
@import "../../../node_modules/swiper/dist/css/swiper.min";
.swiper-container {
  width: 100%;
  height: 1.5rem;
}
.swiper-slide {
  text-align: center;
  font-size: 0.18rem;
  background: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.swiper-pagination-bullet-active {
  background: #fff;
}
.swiper-wrapper img {
  height: 1.5rem;
  width: 3.75rem;
}
.swiper_tit {
  font: 0.15rem/0.49rem "微软雅黑";
  color: #000200;
  padding: 0 0.1rem;
  /* width: 100%; */
  background-color: #f4f4f4;
}
.other_content {
  margin: 0 .02rem 0 0.1rem;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.other_content li {
  margin-right: 0.08rem;
  cursor: pointer;
  overflow: hidden; /* 在这里 加上overflow hidden    保证超过50%的 自动改 */
  width: 50%;
}
.contentIte > a {
  display: block;
}
.other_content img {
  width: 100%;
}
.other_content p {
  padding-left: 0.07rem;
  padding-bottom: 0.18rem;
  font: 0.15rem/0.28rem "微软雅黑";
  color: #000200;
  background-color: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.contentIte {
  position: relative;
  padding-bottom: 0.05rem;
  background-color: #fff;
}
.contentIte span {
  position: absolute;
  bottom: 0.1rem;
  right: 0.1rem;
  width: 0.24rem;
  height: 0.24rem;
  background: url("../../assets/image/list_sprite.png") no-repeat;
  background-size: 0.24rem;
}
.copyright {
  height: 1.95rem;
  padding-top: 0.14rem;
  text-align: center;
}
.copyright h4 {
  font: 0.14rem/0.52rem "微软雅黑";
}
.copyright h4 a {
  color: #040301;
}
.foot_logo {
  display: inline-block;
  width: 0.82rem;
  height: 0.24rem;
  background: url("../../assets/image/logo_footer.png") no-repeat;
  background-size: 0.82rem;
}
.copyright p {
  font: 0.12rem/0.4rem "微软雅黑";
  color: #606060;
}
</style>


