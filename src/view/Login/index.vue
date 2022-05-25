<template>
  <div class="login" id="login">
    <div class="log-bg">
      <div class="log-cloud cloud1"></div>
      <div class="log-cloud cloud2"></div>
      <div class="log-cloud cloud3"></div>
      <div class="log-cloud cloud4"></div>

      <div class="log-logo">Welcome!</div>
    </div>
    <div class="log-email">
      <!-- <input type="text" placeholder="请输入用户名" :class="'log-input'" v-model="name" />
      <input type="password" placeholder="请输入密码" :class="'log-input'" v-model="password" />-->
      <!-- 使用ElementUI组件库中的form组件，校验规则改为rules -->
      <el-form v-if="isShow" ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px"
        class="demo-ruleForm" size="default">
        <el-form-item class="el-i" label="用户名:" prop="name">
          <el-input type="text" v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item class="el-i" label="密码:" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" />
        </el-form-item>
        <el-form-item class="el-i verify" label="验证码:" prop="captcha">
          <el-input type="text" v-model="ruleForm.captcha" />
          <img @click="updateVerify" style="width: 130px;height: 45px;border-radius:3px;" :src="verifyUrl"
            alt="captcha" />
        </el-form-item>
        <el-form-item>
          <!-- 当用户输入的用户名和密码通过校验规则后发送请求，判断是否成功登录 -->
          <el-button class="sub" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        </el-form-item>
        <el-form-item class="reset">
          <!-- 重置表单 -->
          <el-button class="resetBtn" @click="resetForm(ruleFormRef)">重置</el-button>

          <!-- 当用户输入的用户名和密码通过校验规则后发送请求，判断是否成功登录 -->
          <el-button text type="warning" @click="updateIsShow">忘记密码?</el-button>
        </el-form-item>
      </el-form>
      <!-- <a href="javascript:;" class="log-btn" @click="login">登录</a> -->
      <el-form v-if="!isShow" ref="forgotPwdRef" :model="forgotPwdForm" :rules="forgotPwdRules" label-width="120px"
        class="demo-ruleForm" size="default">
        <el-form-item class="el-i" label="邮箱:" prop="email">
          <el-input type="text" v-model="forgotPwdForm.email" />
        </el-form-item>
        <el-form-item class="el-i" label="重置密码:" prop="password">
          <el-input type="password" v-model="forgotPwdForm.password" autocomplete="off" />
        </el-form-item>
        <el-form-item class="el-i verify" label="验证码:" prop="captcha">
          <el-input type="text" v-model="forgotPwdForm.captcha" />
          <img @click="updateVerify" style="width: 130px;height: 45px;border-radius:3px;" :src="verifyUrl"
            alt="captcha" />
        </el-form-item>
        <el-form-item>
          <!-- 当用户输入的用户名和密码通过校验规则后发送请求，判断是否成功登录 -->
          <el-button class="sub" type="primary" @click="submitForgotPwdForm(forgotPwdRef)">修改密码</el-button>
        </el-form-item>
        <el-form-item class="reset">
          <!-- 重置表单 -->
          <el-button class="resetBtn" @click="resetForgotPwdForm(forgotPwdRef)">重置</el-button>

          <el-button type="primary" @click="updateIsShow">登录界面</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { useUser } from '../../store';
import { ref, reactive } from 'vue';
import { rejects } from 'assert';
import FormInstance from 'element-plus'
import { storeToRefs } from 'pinia';
let router = useRouter()
let route = useRoute()
let userStore = useUser()


//表单验证
// 昵称格式：限16个字符，支持中英文、数字、减号或下划线
const regStr = /(^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{1,16}$)/;
//校验密码：只能输入6-20个字母、数字、下划线  
const regPass = /^(\w){6,20}$/
const ruleFormRef = ref()
const ruleForm = reactive({
  name: '',
  password: '',
  captcha: '',
})
const rules: any = reactive({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: regStr, message: '限16个字符，支持中英文、数字、减号或下划线', trigger: 'blur' },
  ],
  password: [{ required: true, message: '请输入密码', trigger: ['blur', 'change'] },
  {
    pattern: regPass,
    message: '只能输入6-20个字母、数字、下划线的密码', trigger: ['blur', 'change']
  },],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: regStr, message: '验证码格式错误', trigger: 'blur' },
  ],

})
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      let result = await userStore.login(ruleForm)
      if (result == 'ok') {
        router.push('/')
      }
    } else {
      console.log('登录错误')
      return false
    }
  })
}
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
// 图片验证码
userStore.getVerify()
const { verifyUrl } = storeToRefs(userStore)
// 刷新验证码
const updateVerify = () => {
  userStore.getVerify()
}

// 判断显示登录界面还是修改密码界面
const isShow = ref(true)
// 切换状态
const updateIsShow = () => {
  isShow.value = !isShow.value
}
// 忘记密码表单
//表单验证
const forgotPwdRef = ref()
const forgotPwdForm = reactive({
  email: '',
  password: '',
  captcha: '',
})
const forgotPwdRules: any = reactive({
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { pattern: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g, message: "请输入正确的邮箱", trigger: "blur" }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
    {
      pattern: regPass,
      message: '只能输入6-20个字母、数字、下划线的密码', trigger: ['blur', 'change']
    },],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: regStr, message: '验证码格式错误', trigger: 'blur' },
  ],

})
const submitForgotPwdForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      let result = await userStore.forgotPassword(forgotPwdForm)
      if (result == 'ok') {
        updateVerify()
      }
    } else {
      return false
    }
  })

}
const resetForgotPwdForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style scoped lang="less">
.el-i {
  // width: 80% !important;
}

/deep/.verify {

  .el-form-item__content {

    flex-wrap: nowrap !important;

    img {
      cursor: pointer;
    }
  }
}

.sub {
  width: 100%;
  border-radius: 40px;
  height: 40px;
}

.resetBtn {
  width: 100px;
}

/deep/.reset {

  .el-form-item__content {
    justify-content: space-between;
  }
}

.el-form {
  width: 80%;
}

.login {
  position: fixed;
  overflow: hidden;
  left: 50%;
  margin-left: -250px;
  top: 50%;
  margin-top: -350px;
  width: 500px;
  min-height: 555px;
  z-index: 10;
  right: 140px;
  background: #fff;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  -webkit-box-shadow: 0px 3px 16px -5px #070707;
  box-shadow: 0px 3px 16px -5px #070707;
}

.log-cloud {
  background-image: url(./images/login-cloud.png);
  width: 63px;
  height: 40px;
  position: absolute;
  z-index: 1;
}

.login .cloud1 {
  top: 21px;
  left: -30px;
  transform: scale(0.6);
  animation: cloud1 20s linear infinite;
}

.login .cloud2 {
  top: 87px;
  right: 20px;
  animation: cloud2 19s linear infinite;
}

.login .cloud3 {
  top: 160px;
  left: 5px;
  transform: scale(0.8);
  animation: cloud3 21s linear infinite;
}

.login .cloud4 {
  top: 150px;
  left: -40px;
  transform: scale(0.4);
  animation: cloud4 19s linear infinite;
}

.log-bg {
  background: url(./images/login-bg.jpg);
  width: 100%;
  height: 312px;
  overflow: hidden;
}

.log-logo {
  height: 80px;
  margin: 120px auto 25px;
  text-align: center;
  color: #1fcab3;
  font-weight: bold;
  font-size: 40px;
}

.log-text {
  color: #57d4c3;
  font-size: 13px;
  text-align: center;
  margin: 0 auto;
}

.log-logo,
.log-text {
  z-index: 2;
}

.icons {
  background: url(./images/icons.png) no-repeat;
  display: inline-block;
}

.close {
  height: 16px;
  width: 16px;
  background-position: -13px 0;
}

.login-email {
  height: 17px;
  width: 29px;
  background-position: -117px 0;
}

.log-btns {
  padding: 15px 0;
  margin: 0 auto;
}

.log-btn {
  width: 402px;
  display: block;
  text-align: left;
  line-height: 50px;
  margin: 0 auto 15px;
  height: 50px;
  color: #fff;
  font-size: 13px;
  -webkit-border-radius: 5px;
  background-color: #3b5999;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  position: relative;
}

.log-btn.tw {
  background-color: #13b4e9;
}

.log-btn.email {
  background-color: #50e3ce;
}

.log-btn:hover,
.log-btn:focus {
  color: #fff;
  opacity: 0.8;
}

.log-email {
  text-align: center;
  margin-top: 20px;
}

.log-email .log-btn {
  background-color: #50e3ce;
  text-align: center;
}

.log-input-empty {
  border: 1px solid #f37474 !important;
}

.isloading {
  background: #d6d6d6;
}

.log-btn .icons {
  margin-left: 30px;
  vertical-align: middle;
}

.log-btn .text {
  left: 95px;
  line-height: 50px;
  text-align: left;
  position: absolute;
}

.log-input {
  width: 370px;
  overflow: hidden;
  padding: 0 15px;
  font-size: 13px;
  border: 1px solid #ebebeb;
  margin: 0 auto 15px;
  height: 48px;
  line-height: 48px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
}

.log-input.warn {
  border: 1px solid #f88787;
}

@-webkit-keyframes cloud1 {
  0% {
    left: 200px;
  }

  100% {
    left: -130px;
  }
}

@keyframes cloud1 {
  0% {
    left: 200px;
  }

  100% {
    left: -130px;
  }
}

@-webkit-keyframes cloud2 {
  0% {
    left: 500px;
  }

  100% {
    left: -90px;
  }
}

@keyframes cloud2 {
  0% {
    left: 500px;
  }

  100% {
    left: -90px;
  }
}

@-webkit-keyframes cloud3 {
  0% {
    left: 620px;
  }

  100% {
    left: -70px;
  }
}

@keyframes cloud3 {
  0% {
    left: 620px;
  }

  100% {
    left: -70px;
  }
}

@-webkit-keyframes cloud4 {
  0% {
    left: 100px;
  }

  100% {
    left: -70px;
  }
}

@keyframes cloud4 {
  0% {
    left: 100px;
  }

  100% {
    left: -70px;
  }
}
</style>