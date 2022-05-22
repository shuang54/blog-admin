<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useUser } from '../../store'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUser()
const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
  email: string
  name: string
  desc: string
}>({
  email: '',
  name: '',
  desc: '',
})




const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 修改头像对话框
const outerVisible = ref(false)
//上传头像
const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('头像不是JPG格式')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像大小大于2MB')
    return false
  }
  return true
}
// 修改密码对话框

const updatePwdDialog = ref(false)

const passwordRule = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输⼊密码"));
  } else if (!isvalidPass(value)) {
    callback(
      new Error("密码以字母开头长度在6~12之间只能包含字母、数字、下划线")
    );
  } else {
    callback();
  }
}
const newPasswordRule = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输⼊密码"));
  } else if (!isvalidPass(value)) {
    callback(
      new Error("密码以字母开头长度在6~12之间只能包含字母、数字、下划线")
    );
  } else if (value == pwdRuleForm.oldPwd) {
    callback(
      new Error("新密码与旧密码相同")
    );
  } else {
    callback();
  }
}
const pwdRuleFormRef = ref<FormInstance>()
// 将规则与数据进行邦定
const pwdRules = reactive({
  oldPwd: [{ validator: passwordRule, trigger: 'blur' }],
  newPwd: [{ validator: newPasswordRule, trigger: 'blur' }],
})
const pwdRuleForm = reactive({
  oldPwd: '',
  newPwd: ''
})
// 验证密码密码，以字母开头，长度在6~12之间，只能包含字母、数字和下划线
function isvalidPass(str) {
  const reg = /^[a-zA-Z]\w{6,12}$/;
  return reg.test(str);
}
const updatePwd = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const result = await userStore.updatePassword(pwdRuleForm)
      if (result == 'ok') {
        userStore.signOut()
        router.push('/login')
      }
    }
  })
}
</script>

<template>
  <div>

    <div class="user-box">
      <div class="user-display">
        <div class="d-header">
          <el-image
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7ad1e283fc93d4eea2e392eceedea69d8b33618019160-z1Va2S_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655734206&t=c996fce6d47701e5065d65a9017079f1"
            fit="fill"></el-image>
          <p class="name">admin</p>
          <p>注册日期:xxxx-xxxx-xx</p>
        </div>
        <div class="d-body">
          <el-button @click="outerVisible = true">修改头像</el-button>
          <el-button @click="updatePwdDialog = true">修改密码</el-button>
        </div>
      </div>
      <div class="user-info">
        <p>个人信息</p>
        <el-form ref="formRef" :model="dynamicValidateForm" label-width="120px" class="demo-dynamic">
          <el-form-item prop="name" label="姓名：" :rules="[
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur',
            },
            {
              min: 3, max: 7,
              message: '长度3-7位', trigger: 'blur'
            },
          ]">
            <el-input v-model="dynamicValidateForm.name" />
          </el-form-item>
          <el-form-item prop="email" label="邮箱：" :rules="[
            {
              required: true,
              message: '请输入邮箱',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: '请输入邮箱',
              trigger: ['blur', 'change'],
            },
          ]">
            <el-input v-model="dynamicValidateForm.email" />
          </el-form-item>

          <el-form-item label="描述：" prop="desc">
            <el-input v-model="dynamicValidateForm.desc" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)">保存</el-button>
            <el-button @click="resetForm(formRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 修改头像对话框 -->
    <el-dialog width="500px" center class="updateAvatar" v-model="outerVisible" title="修改头像">
      <el-upload class="avatar-uploader" action="http://upload-na0.qiniup.com" :show-file-list="false"
        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary">提交</el-button>
          <el-button @click="outerVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 修改密码对话框 -->
    <el-dialog width="500px" center class="updateAvatar " v-model="updatePwdDialog" title="修改密码">
      <el-form ref="pwdRuleFormRef" :model="pwdRuleForm" status-icon :rules="pwdRules" label-width="120px"
        class="updatePwd">
        <el-form-item prop="oldPwd" label="旧密码：">
          <el-input type="password" v-model="pwdRuleForm.oldPwd" show-password placeholder="请输入旧的密码"></el-input>
        </el-form-item>
        <el-form-item prop="newPwd" label="新密码：">
          <el-input type="password" v-model="pwdRuleForm.newPwd" show-password placeholder="请输入新的密码"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="updatePwd(pwdRuleFormRef)">修改密码</el-button>
          <el-button @click="updatePwdDialog = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>


</template>

<style  lang="less">
.user-box {
  width: 800px;
  height: 500px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background-color: white;
  box-shadow: 0px 0px 12px rgb(0 0 0 / 12%);

  .user-display {
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    border-right: 2px solid #ececec;

    .d-header {
      margin-top: 20px;
    }

    .d-body {
      border-top: 2px solid #ececec;
      height: 150px;
      width: 100%;
      padding-top: 30px;

    }

    .name {
      font-size: 30px;

    }

    .el-image {
      width: 200px;
      height: 200px;
      border-radius: 100px;
    }
  }

  .user-info {

    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;

    .el-form {
      width: 100%;
      padding-right: 40px;

      .el-button {
        width: 100px;
      }
    }

    p {
      text-align: center;
      height: 70px;
      line-height: 70px;
      font-size: 24px;
    }
  }
}

.el-dialog {
  width: 400px;
  height: 400px;
}

// 上传头像

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader {
  display: flex;
  justify-content: center;

  .el-upload {
    border: 1px solid #ccc;
  }
}



.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.updatePwd {
  .el-form-item {
    margin-bottom: 32px;
  }
}
</style>