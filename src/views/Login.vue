<template>
  <div>
    <app-header>
      <div slot="left">
        <i class="el-icon-back"></i>
      </div>
      <div slot="title">密码登录</div>
      <div slot="right"></div>
    </app-header>

    <div>
      <van-form>
        <van-field
          v-model="username"
          name="账号"
          label="账号"
          placeholder="账号"
          :rules="[{pattern:/^1[3|4|5|7|8][0-9]{9}$/, message: '请填写正确手机号' }]"
        />
      </van-form>
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{pattern:/^[a-zA-Z\d_]{8,}$/, message: '请填写密码' }]"
      />
      <div class="yan">
        <van-field
          style="width:50%"
          v-model="captcha_code"
          name="验证码"
          label="验证码"
          placeholder="验证码"
          :rules="[{required: true,message: '请填写验证码' }]"
        />
        <div class="zheng">
          <img :src="cap" alt />
          <span @click="ajaxCodeFn()">换一张</span>
        </div>
      </div>

      <div style="margin: 16px;">
        <van-button
          @click="submit"
          round
          block
          type="info"
          native-type="submit"
          :disabled="username ==''||password ==''||zheng ==''"
        >提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ajaxdenglu } from '../utils/api'
import appHeader from "../components/header";
import axios from "axios";
axios.defaults.withCredentials = true; //配置为true
export default {
  data() {
    return {
      cap: "", // 验证码
      username: "",
      password: "",
      captcha_code: "",
      id:''
    };
  },
  components: {
    appHeader
  },
  created() {},
  mounted() {
    this.ajaxCodeFn();
  },
  methods: {
    setCookie(key, value, t) {
      var oDate = new Date();
      oDate.setDate(oDate.getDate() + t);
      document.cookie = key + "=" + value + "; expires=" + oDate.toDateString();
    },
    // 获取验证码
    async ajaxCodeFn() {
      let { data: res } = await axios.post("/v1/captchas");
      // console.log(res)
      this.cap = res.code;
    },
    // 
    // 提交
    async submit() {
      this.setCookie("cap", this.captcha_code, 2);
      this.setCookie("SID", 100, 2);
      // let { data:res } = await ajaxLogin({
      //     username:this.username,
      //     password:this.password,
      //     captcha_code:this.captcha_code
      // })

      let { data: res } = await axios.post("/v2/login", {
        username: this.username,
        password: this.password,
        captcha_code: this.captcha_code
      });
      console.log(res);
     
      let{data:res1} = await ajaxdenglu(res.id)
      this.id = res1.id
       this.$router.push('/Home?id='+this.id)
    }
  }
};
</script>

<style scoped>
.yan {
  position: relative;
}
.zheng {
  position: absolute;
  top: 10px;
  right: 50px;
  display: flex;
  align-items: center;
}
</style>
