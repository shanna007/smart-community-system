<template>
  <div class="login-container">
    <!-- 左侧装饰区域 -->
    <div class="login-left">
      <div class="login-left-content">
        <h1 class="login-brand">社区智慧生活服务平台</h1>
        <p class="login-brand-desc">智能化社区服务</p>
        <div class="login-features">
          <div class="feature-item">
            <i class="el-icon-success"></i>
            <span>专业高效</span>
          </div>
          <div class="feature-item">
            <i class="el-icon-circle-check"></i>
            <span>安全可靠</span>
          </div>
          <div class="feature-item">
            <i class="el-icon-star-on"></i>
            <span>易用体验</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧登录表单 -->
    <div class="login-form-box">
      <div class="form-header">
        <h2>欢迎回来</h2>
        <p>请登录您的账户</p>
      </div>

      <el-form 
        :model="loginForm" 
        ref="loginForm" 
        :rules="rules" 
        @keyup.enter="onSubmit"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input 
            v-model="loginForm.username" 
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input 
            type="password" 
            v-model="loginForm.password" 
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <el-form-item prop="userType" class="user-type-form">
          <el-radio-group v-model="loginForm.userType" class="user-type-group">
            <el-radio :label="0" class="custom-radio">社区居民</el-radio>
            <el-radio :label="1" class="custom-radio">社区服务专员</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button 
            type="primary" 
            class="login-btn" 
            @click="onSubmit"
            :loading="loading"
          >
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      // 登录表单绑定数据源
      loginForm: {
        username: "",
        password: "",
        userType: "", // 0：社区居民  1：社区服务专员
      },
      // 表单验证规则
      rules: {
        username: [
          {
            trigger: "change",
            required: true,
            message: "请输入用户名",
          },
        ],
        password: [
          {
            trigger: "change",
            required: true,
            message: "请输入密码",
          },
        ],
        userType: [
          {
            trigger: "change",
            required: true,
            message: "请选择用户类型",
          },
        ],
      },
    };
  },
  methods: {
    // 登录提交事件
    onSubmit() {
      // 表单验证
      this.$refs.loginForm.validate((valid) => {
        // 验证通过才提交表单
        if (valid) {
          this.loading = true;
          // 调用store里面的login方法
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              // 跳转路由
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  background: linear-gradient(135deg, $primary-dark 0%, $primary 50%, $info 100%);
}

// 左侧装饰区域
.login-left {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    top: -50px;
    right: -50px;
    animation: float 6s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    bottom: -30px;
    left: 50px;
    animation: float 8s ease-in-out infinite 1s;
  }
}

.login-left-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
}

.login-brand {
  font-size: 42px;
  font-weight: 700;
  margin: 0 0 16px 0;
  letter-spacing: 2px;
  animation: slideDown 0.6s ease-out;
}

.login-brand-desc {
  font-size: 18px;
  margin: 0 0 48px 0;
  opacity: 0.9;
  animation: slideDown 0.6s ease-out 0.1s backwards;
}

.login-features {
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: slideDown 0.6s ease-out 0.2s backwards;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  opacity: 0.95;
  transition: all 0.3s ease;

  i {
    font-size: 24px;
  }

  &:hover {
    transform: translateX(8px);
    opacity: 1;
  }
}

// 右侧登录表单
.login-form-box {
  width: 420px;
  padding: 48px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.1);
  animation: slideInRight 0.6s ease-out;
}

.form-header {
  margin-bottom: 40px;
  text-align: center;

  h2 {
    font-size: 28px;
    font-weight: 700;
    color: $gray-900;
    margin: 0 0 8px 0;
  }

  p {
    font-size: 14px;
    color: $gray-500;
    margin: 0;
  }
}

.login-form {
  width: 100%;

  ::v-deep .el-form-item {
    margin-bottom: 24px;

    .el-input {
      .el-input__inner {
        height: 44px;
        font-size: 14px;
        border: 1px solid $gray-300;
        border-radius: $radius-lg;
        transition: all 0.3s ease;

        &:hover {
          border-color: $primary-light;
        }

        &:focus {
          border-color: $primary;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
      }

      .el-input__prefix {
        color: $gray-400;
      }
    }
  }

  ::v-deep .el-input--prefix .el-input__inner {
    padding-left: 36px;
  }
}

.user-type-form {
  margin-bottom: 32px !important;
}

.user-type-group {
  width: 100%;
  display: flex;
  gap: 20px;
}

.custom-radio {
  flex: 1;

  ::v-deep .el-radio__input {
    margin-right: 8px;
  }

  ::v-deep .el-radio__label {
    font-size: 14px;
    color: $gray-700;
  }
}

.login-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  border: none;
  border-radius: $radius-lg;
  background: linear-gradient(135deg, $primary 0%, $primary-light 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(37, 99, 235, 0.3);
    background: linear-gradient(135deg, $primary-dark 0%, $primary 100%);
  }

  &:active {
    transform: translateY(0);
  }

  ::v-deep .el-icon-loading {
    margin-right: 8px;
  }
}

// 动画
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

// 响应式
@media (max-width: 1024px) {
  .login-left {
    display: none;
  }

  .login-form-box {
    width: 100%;
    box-shadow: none;
    border-radius: 0;
  }
}

@media (max-width: 600px) {
  .login-form-box {
    padding: 32px 20px;
    width: 100%;
  }

  .login-brand {
    font-size: 32px;
  }

  .feature-item {
    font-size: 14px;
  }
}
</style>
