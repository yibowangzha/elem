<template>
  <div>
    <van-nav-bar
      :title="arr.name"
      left-text="返回"
      right-text="切换城市"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-form @submit="onSubmit">
      <input type="text" placeholder="输入学校地址楼" v-model="keyword" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <ul class="sou" v-show="arr1.length!=0">
      <li v-for="(item,index) in arr1" :key="index" @click="goto(item)">
        <span>{{item.name}}</span>
        <p>{{item.address}}</p>
      </li>
    </ul>
    
    <ul class="lishi" v-show="arr1.length == 0">
      <li><h3>历史记录</h3></li>
      <li v-for="(item,index) in arr2" :key="index" @click="goto(item)">
        <span>{{item.name}}</span>
        <p>{{item.address}}</p>
      </li>
      <li><h3 @click="del()">清空所有</h3></li>
    </ul>
  </div>
</template>

<script>
import { ajaxlist } from "../utils/api";
import { ajaxsousuo } from "../utils/api";
export default {
  // 组件名称
  name: "",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      arr: [],
      keyword: "", //搜索内容
      arr1: [], //匹配饿内容
      arr2: JSON.parse(localStorage.getItem("city")) || [],
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {
    //   arr2:{
    //       handler(newval){
    //   localStorage.setItem("city", JSON.stringify(newval));

    //       },
    //       deep:true
    //   }
  },
  // 组件方法
  methods: {
    async ajaxsear() {
      let { data } = await ajaxlist(this.$route.query.id);
      console.log(data);
      this.arr = data;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      Toast("按钮");
    },
    async onSubmit() {
      let { data: res } = await ajaxsousuo(this.arr.id, this.keyword);
      console.log(res);
      this.arr1 = res;
    },
    goto(data) {
      this.$router.push('/Waimai?geohash='+data.geohash)
      localStorage.setItem("geo", data.geohash);
      console.log(data.geohash)
      let index = this.arr2.some(item => {
        return item.name.includes(data.name);
      });
      if (!index) {
        if (this.arr2.length >= 5) {
          this.arr2.pop();
        }
        this.arr2.unshift(data);
      }
      localStorage.setItem("city", JSON.stringify(this.arr2));
    },
    del(){
        // alert(1)
        this.arr2 = []
        localStorage.setItem("city", JSON.stringify(this.arr2));
    }
  },
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  /**
 /**
 * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
 * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
 */
  mounted() {
    this.ajaxsear();
  },
  /**
   * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
   * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
   */
  updated() {},
  /**
   * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
   */
  activated() {},
  /**
   * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
   */
  deactivated() {}
};
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="scss">
.van-nav-bar {
  background: yellow;
  margin-bottom: 20px;
}
input {
  width: 80%;
  height: 40px;
  margin-left: 10%;
}
.lishi,
.sou {
  width: 100%;
  li {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding: 10px 20px;
    border: 1px solid #eee;
  }
}
</style>
