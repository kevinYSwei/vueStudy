<template>
  <div>
    <div class="top_fixed">
      <a >
        <img :src="logoImg" alt="logo">
      </a>
      <a >
        <div class="download">{{downLoadTxt}}</div>
      </a>
    </div>
    <ul id="hd_nav">
      <li
        v-for="(item,index) in navList"
        :key="index"
        :class="[ num==index ? 'isShowNav' : '']"
        @click="showNav(index)"
      >
        <router-link class="nav_tab" :to="'/'+navLink[index]">{{item}}</router-link>
      </li>
    </ul>
    <router-view/>
    <div class="fixed_foot">
      <a href>{{fixInfo}}</a>
    </div>
  </div>
</template>
<script>
export default {
    data() {
      return {
        logoImg: require("../assets/image/logo_footer.png"),
        downLoadTxt: "下载app",
        navList: ["推荐", "排行榜", "搜索"],
        navLink: ["home", "rank", "search"],
        num: 0,
        fixInfo: "安装QQ音乐，发现更多精彩"
      };
  },
  methods: {
    showNav(index) {
      this.num = index;
    }
  }
};
</script>
<style lang="">
@import "../assets/css/public";
</style>
