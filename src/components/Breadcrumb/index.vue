<!-- 面包屑导航栏
        首页/系统管理/员工管理
        首页/系统管理/角色管理
        ...
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{
          item.meta.title
        }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: '首页' } }].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.app-breadcrumb.el-breadcrumb {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  line-height: $navbarHeight;
  height: $navbarHeight;
  margin: 0;
  padding: 0 $spacing-lg;

  ::v-deep {
    .el-breadcrumb__inner {
      color: $gray-700;
      font-weight: 500;
      transition: all $transition-base;

      &:hover {
        color: $primary;
      }
    }

    .el-breadcrumb__separator {
      color: $gray-300;
    }

    a {
      color: $primary;
      transition: color $transition-base;

      &:hover {
        color: $primary-light;
      }
    }
  }

  .no-redirect {
    color: $gray-500;
    cursor: text;
    font-weight: 600;
  }
}
</style>
