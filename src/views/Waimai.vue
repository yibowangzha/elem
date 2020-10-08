<template>
  <div>
    <div class="s">
      <span>
        <van-icon name="search" />
      </span>
      <h4>{{arr.name}}</h4>
      <span @click="$router.push('/My')">
        <van-icon name="friends-o" />
      </span>
    </div>
    <van-swipe class="my-swipe" indicator-color="white">
      <van-swipe-item>
        <ul>
          <li v-for="(item,index) in arr1" :key="index" v-show="index<8">
            <img :src="'https://fuss10.elemecdn.com'+item.image_url" alt />
            {{item.title}}
          </li>
        </ul>
      </van-swipe-item>
      <van-swipe-item>
        <ul>
          <li v-for="(item,index) in arr1" :key="index" v-show="index>7">
            <img :src="'https://fuss10.elemecdn.com'+item.image_url" alt />
            {{item.title}}
          </li>
        </ul>
      </van-swipe-item>
    </van-swipe>
    <div class="xia">
      <van-card
        v-for="(item,index) in list"
        :key="index"
        :title="item.name"
        :thumb="'//elm.cangdu.org/img/'+item.image_path"
      >
        <template #tags>
          <div class="shang">
            <van type="danger">
              <van-rate v-model="value" />
            </van>
            <van type="danger" style="margin-right:50px;">月售{{item.recent_order_num}}单</van>
            <van type="danger" style="color:red;">{{item.delivery_mode.text}}</van>
          </div>
          <div class="xxxx">
            <van size="mini">{{item.distance}}公里</van>/
            <van size="mini" style="margin-right:10px;">{{item.order_lead_time}}</van>
            <van size="mini">￥{{item.float_minimum_order_amount}}起送</van>/
            <van size="mini" style="color:blue;">配送费约{{item.float_delivery_fee}}</van>
          </div>
        </template>
        <template #footer></template>
      </van-card>
    </div>
  </div>
</template>

<script>
import { ajaxjingwei } from "../utils/api";
import { ajaxjingwei2 } from "../utils/api";
import { ajaxjingwei3 } from "../utils/api";
export default {
  // 组件名称
  name: "Waimai",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      arr: "",
      arr1: [],
      geo: "",
      list: "",
      value: 3
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async ajax() {
      this.geo = localStorage.getItem("geo");
      console.log(this.geo);
      let { data } = await ajaxjingwei(this.geo);
      this.arr = data;
      console.log(data);
      let { data: res } = await ajaxjingwei2(this.geo);
      this.arr1 = res;
      console.log(res);
      let { data: res1 } = await ajaxjingwei3();
      this.list = res1;
      console.log(res1);
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
    this.ajax();
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
.s {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 10px;
  align-items: center;
  font-size: 20px;
  background: cornflowerblue;
  color: white;
}
.my-swipe .van-swipe-item {
  color: black;
  font-size: 20px;
  // line-height: 150px;
  text-align: center;
  // background-color: #39a9ed;
}
.van-swipe {
  width: 100%;
  height: 200px;

  ul {
    width: 100%;
    height: 200px;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 25%;
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      img {
        width: 50px;
      }
    }
  }
}
.shang {
  margin-top: 15px;
  margin-bottom: 15px;
}
.van-card {
  padding: 8px 10px;
}
</style>
