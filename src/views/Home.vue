<template>
  <div class="home" :style="{'margin-top':flag?'50px':'0'}">
    <app-header :class="flag?'xi':''">
      <div slot="left">
        elm.me
      </div>
      
      <div v-show="!flag" slot="title"></div>
      <div v-show="flag" @click="toJump('zd')" slot="title">置顶</div>
      <div slot="right" @click="jump('/login')" v-show="!id">登录|注册</div>
      <div slot="right" v-show="id" @click="$router.push('/My?id='+id)"><van-icon name="friends" /></div>
    </app-header>
    <!-- 右侧定位 -->
    <div class="cityPosition">
      <div v-for="(item,index) in zlist" :key="index">
        <span @click="toJump(item)">{{ item }}</span>
      </div>
    </div>
    <div class="guess">
      {{ guess.name }}
    </div>
    <div>
      <p>热门城市</p>
      <ul class="hot">
        <li v-for="(item,index) in hot" :key="index" @click="add(item.id)">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div>
      <!-- 写法1 -->
      <!-- <div v-for="(value,key) in group" :key="key"> 
        <p>{{ key }}</p>
        <ul class="hot">
          <li v-for="(t,i) in value" :key="i">
            {{ t.name }}
          </li>
        </ul>
      </div> -->

      <!-- 写法2 -->
      <div v-for="(item,index) in zlist" :key="index"> 
        <p :id="item" :ref="item">{{ item }}</p>
        <ul class="hot">
          <li v-for="(t,i) in group[item]" :key="i" @click="add(t.id)">
            {{ t.name }}
          </li>
        </ul>
      </div>
      
      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import appHeader from '../components/header'
import { ajaxCity } from '../utils/api'
import { ajaxlist } from '../utils/api'
import { ajaxdenglu } from '../utils/api'
export default {
  name: 'Home',
  data() {
    return {
      guess:{},  // 当前城市
      hot:[],     // 热门城市
      group:{},    // 分组城市
      zlist:[],      // 字母集合
      flag:false ,    // 默认false
      id:''
    }
  },
  // 挂载后
  mounted() {
    this.ajaxGuess()
    window.addEventListener('scroll', this.handleScrollx, true)
  },
  components: {
    appHeader
  },
  methods:{
    async add(id){
      let {data} = await ajaxlist(id)
      this.$router.push('/Search?id='+id)
     console.log(data)
    },
    async ajaxGuess() {
      // 请求当前城市
      let { data } = await ajaxCity("guess")
      // console.log(data)
      this.guess = data

      // 请求热门城市
      let { data:res } = await ajaxCity("hot")
      console.log(res)
      this.hot = res

      // 请求字母排序
      let { data:resgroup } = await ajaxCity("group")
      console.log(resgroup)
      // 写法1
      // Object.keys(resgroup).sort().map((item)=>{
      //   this.$set(this.group,item,resgroup[item])
      //   // this.group[item] = resgroup[item]
      // })
      // this.group = resgroup
      // console.log(this)
      // this.$set(this.group,1,1)
      // console.log(this.group)

      // 写法2
      this.group = resgroup
      this.zlist = Object.keys(resgroup).sort()

      // 登录过来的接口
      let {data:login} = await ajaxdenglu(this.$route.query.id)
      console.log(login)
      this.id = login.id
     localStorage.setItem("id", this.id);
    },
    // 跳转到指定位置
    toJump(z) {;
      if(z != "zd"){ // 点击的是字母
        document.body.scrollTop = document.documentElement.scrollTop = this.$refs[z][0].offsetTop - 50;
      } else {// 吸顶
        document.body.scrollTop = document.documentElement.scrollTop = 0
      }
      // console.log(this.$refs[z][0].offsetTop - 50)  // 获取元素距离顶部的高度 减去50 
      
    },
    handleScrollx() {
      console.log('滚动高度', window.pageYOffset)
      if(window.pageYOffset>50) {
        this.flag = true
      } else {
        this.flag = false
      }
      console.log(this.flag)
    },
    // 跳转方法
    jump(path,data) {
      this.$router.push({
        path,
        query:{
          data
        }
      })
    }
  }
}
</script>
<style scoped>
  .guess{
    padding:5px 5px 5px 10px;
    color: blue;
  }
  .hot{
    display: flex;
    /* justify-content: ; */
    flex-wrap: wrap;
    text-align: center;
    
  }
  .hot>li{
    width:25%;
    border:1px solid #efefef;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .cityPosition{
    position: fixed;
    right:0;
    top:20%;
    z-index: 1000;
    background: #fff;
    font-size: 16px;
  }
  .xi{
    position: fixed;
    top:0;
    left: 0;
    right:0;
    transition: all 1s;
  }
</style>
