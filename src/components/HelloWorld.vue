<template>
  <div class="hello">
    <!-- <van-button type="info">信息按钮</van-button>
    <van-button type="danger">危险按钮</van-button> -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in bannerList" :key="index">
        <img class="bannerimg" :src="item.picUrl" alt="">
      </van-swipe-item>
    </van-swipe>
    <!-- <van-list
      v-model="loading"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item">
        <img :src="item.pic" alt="">
      </van-cell>
    </van-list> -->

    <!-- <div class="infinite-list" v-infinite-scroll="load" infinite-scroll-distance="20">
      <p v-for="(i,index) in count" class="infinite-list-item" :key="index">{{ i }}</p>
    </div> -->
   
  </div>
</template>

<script>

export default {
  data() {
    return {
      bannerList:[],
      loading:false,
      count:0,
      list:[] // 商品数据
    }
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    // this.$http.get("https://api.it120.cc/maxinglong/banner/list").then((res)=>{
    //   console.log(res,111111)
    //   return this.$http.get("https://api.it120.cc/maxinglong/shop/goods/list")
    // }).then((res)=>{
    //   console.log(res,222222)
    // })
    this.ajaxBanner()
    // this.ajaxList()
  },
  methods:{
    // 请求banner列表
    async ajaxBanner() {
      let { data:res } = await this.$http.get("https://api.it120.cc/maxinglong/banner/list")
      this.bannerList = res.data
    },
    // list 数据获取
    async ajaxList() {
      let { data:res } = await this.$http.get("https://api.it120.cc/maxinglong/shop/goods/list")
      console.log(res)
      this.list.push(res.data[0])
      this.loading = false
      console.log(this.list)
    },
    // 加载更多的方法
    onLoad() {
      console.log("加载更多的方法")
      this.ajaxList()
    },
    load () {
      console.log(123456)
      this.count +=1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
  
}
/* ul {
  list-style-type: none;
  padding: 0;
  
} */

a {
  color: #42b983;
}
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    height:300px;
    text-align: center;
    background-color: #39a9ed;
  }
  .bannerimg{
    width:100%;
    height:100%;
  }
  .infinite-list{
    height:300px;
    list-style: none;
    background-color: #efefef;
    /* padding-bottom: 5px; */
    overflow: auto;
  }
  .infinite-list-item:last-child{
    /* display: block; */
    
  }
</style>
