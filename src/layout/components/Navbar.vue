<!-- 右侧头像和设置 -->
<template>
  <div class="navbar">
    <!-- 菜单隐藏、展示标签 -->
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <!-- 面包屑导航 首页-系统管理...  -->
    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 头像改为内置 svg 图标 -->
          <svg-icon icon-class="user" class="user-avatar" />
          <!-- <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" /> -->

          <i class="el-icon-caret-bottom" />

        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item divided @click.native="resetPassword">
            <span style="display: block">重置密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改密码的弹框 -->
    <sys-dialog :title="dialog.title" :height="dialog.height" :width="dialog.width" :visible="dialog.visible"
      @onClose="onClose" @onConfirm="onConfirm">
      <template slot="content">
        <el-form :model="parms" ref="changeForm" :rules="rules" label-width="80px" :inline="true" size="small">
          <el-form-item prop="oldPassword" label="旧密码">
            <el-input v-model="parms.oldPassword"></el-input>
          </el-form-item>
          <el-form-item prop="newPassword" label="新密码">
            <el-input v-model="parms.newPassword"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </sys-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import SysDialog from "@/components/system/SysDialog.vue";
import { resetPasswordApi } from "@/api/user";
import { getUserId } from "@/utils/auth";
export default {
  components: {
    Breadcrumb,
    Hamburger,
    SysDialog,
  },
  data() {
    return {
      //表单验证规则
      rules: {
        oldPassword: [
          {
            trigger: "change",
            required: true,
            message: "请填写旧密码",
          },
        ],
        newPassword: [
          {
            trigger: "change",
            required: true,
            message: "请填写新密码",
          },
        ],
      },
      parms: {
        userId: getUserId(),
        oldPassword: "",
        newPassword: "",
      },
      dialog: {
        title: "修改密码",
        height: 150,
        width: 630,
        visible: false,
      },
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    onConfirm() {
      this.$refs.changeForm.validate(async (valid) => {
        if (valid) {
          let res = await resetPasswordApi(this.parms);
          if (res && res.code == 200) {
            this.dialog.visible = false;
            await this.$store.dispatch("user/logout");
            this.$router.push(`/login?redirect=${this.$route.fullPath}`);
          }
        }
      });
    },
    onClose() {
      this.dialog.visible = false;
    },
    //重置密码
    async resetPassword() {
      //信息提示
      let confirm = await this.$myconfirm("确定重置密吗？");
      if (confirm) {
        this.dialog.visible = true;
      }
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      //信息提示
      let confirm = await this.$myconfirm("确定退出吗？");
      if (confirm) {
        await this.$store.dispatch("user/logout");
        this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/mixin.scss";

.navbar {
  height: $navbarHeight;
  overflow: hidden;
  position: relative;
  background: white;
  box-shadow: $shadow-md;
  display: flex;
  align-items: center;
  padding: 0 $spacing-xl;
  border-bottom: 1px solid $gray-200;
  transition: all $transition-base;

  .hamburger-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 50px;
    cursor: pointer;
    transition: background $transition-base;
    -webkit-tap-highlight-color: transparent;
    border-radius: $radius-md;
    margin-right: $spacing-md;

    &:hover {
      background: $gray-100;
      color: $primary;
    }
  }

  .breadcrumb-container {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .right-menu {
    display: flex;
    align-items: center;
    height: 100%;
    gap: $spacing-lg;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: flex;
      align-items: center;
      padding: 0 $spacing-md;
      height: 100%;
      font-size: 16px;
      color: $gray-600;
      cursor: pointer;
      transition: all $transition-base;
      border-radius: $radius-md;

      &:hover {
        background: $gray-100;
        color: $primary;
      }
    }

    .avatar-container {
      position: relative;

      .avatar-wrapper {
        display: flex;
        align-items: center;
        gap: $spacing-sm;
        cursor: pointer;
        padding: $spacing-sm $spacing-md;
        border-radius: $radius-md;
        transition: all $transition-base;

        &:hover {
          background: $gray-100;

          .user-avatar {
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
            transform: scale(1.05);
          }
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: $radius-lg;
          border: 2px solid transparent;
          transition: all $transition-fast;
          object-fit: cover;
        }

        .el-icon-caret-bottom {
          font-size: 12px;
          color: $gray-400;
          transition: transform $transition-base;
        }

        &:hover .el-icon-caret-bottom {
          transform: rotate(-180deg);
          color: $primary;
        }
      }
    }
  }

  ::v-deep .el-dropdown-menu {
    border: none;
    box-shadow: $shadow-xl;
    border-radius: $radius-lg;

    .el-dropdown-menu__item {
      &:hover {
        background: $primary-lighter !important;
        color: white !important;
      }
    }
  }
}
</style>
