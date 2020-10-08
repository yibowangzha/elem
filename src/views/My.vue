<template>
<div>
    <div class="top">
        <div class="s">
            <span @click="go()">返回</span>
            <h4>我的</h4>
            <span></span>
        </div>
        <div class="x">
            <div>
            <img :src="'//elm.cangdu.org/img/'+arr.avatar" alt="">
            <div>
               <h3>{{arr.username}}</h3>
               <h3>暂无绑定手机号</h3>
            </div>
            </div>
            <div>
                详情
            </div>
        </div>
    </div>
    <div class="bottom">
        <div>
            <div>
                <span><h1>{{arr.current_address_id}}</h1><span>元</span></span>
                <span>我的余额</span>
            </div>
            <div>
                <span><h1>{{arr.gift_amount}}</h1>个</span>
                <span>我的优惠</span>
            </div>
            <div>
                <span><h1>{{arr.current_address_id}}</h1>分</span>
                <span>我的积分</span>
            </div>
        </div>
        <ul>
            <li>我的订单</li>
            <li>积分商城</li>
            <li>我的饿了么会员</li>
            <li>积分商城</li>
        </ul>
    </div>
</div>
</template>

<script>
import { ajaxdenglu } from '../utils/api'
export default {
 // 组件名称
 name: 'My',
 // 组件参数 接收来自父组件的数据
 props: [],
 // 局部注册的组件
 components: {},
 // 组件状态值
 data () {
 return {
     arr:{},
     id:''
 }
 },
 // 计算属性
 computed: {},
 // 侦听器
 watch: {},
 // 组件方法
 methods: {
     async ajax(){
         this.id =  localStorage.getItem("id");
         console.log(this.id)
         let {data} = await ajaxdenglu(this.id)
         console.log(data)
         this.arr = data
     },
     go(){
         this.$router.go(-1)
     }
 },
 /**
 * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
 */
 created () {
 },
 /**
 /**
 * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
 * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
 */
 mounted () {
     this.ajax()
 },
 /**
 * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
 * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
 */
 updated () {
 },
 /**
 * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
 */
 activated () {
 },
 /**
 * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
 */
 deactivated () {
 },
}
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="scss">
.top{
    width: 100%;
    height: 200px;
    background: cyan;
    color:white;
}
.s{
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 10px;
    align-items: center;
    font-size: 20px;
}
.x{
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    box-sizing: border-box;
    padding:0 30px;
    >div{
        display: flex;
        align-items: center;
    }
    img{
        width: 70px;
        border-radius: 50%;
        margin-right: 20px;
    }
}
.bottom{
    width: 100%;
    >div{
        width: 100%;
        height: 100px;
        display: flex;
        >div{
            width: 33%;
            display: flex;
          justify-content: center;
            flex-direction: column;
            align-items: center;
            span{
                display: flex;
               align-items: center;
            }
        }
    }
    ul{
        width: 100%;
        li{
            box-sizing: border-box;
            padding: 0 30px;
            font-size: 20px;
            height: 40px;
            display: flex;
            align-items: center;
        }
    }
}
</style>
