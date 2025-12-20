<!-- 侧边栏logo -->

<template>
  <div class="sidebar-logo-container" :class="{ 'collapse': collapse }">
    <router-link class="sidebar-logo-link" to="/">
      <transition name="logoFade">
        <svg-icon 
          v-show="!collapse" 
          icon-class="hero-user" 
          class="sidebar-logo" 
          :alt="title" 
        />
      </transition>
      <transition name="titleFade">
        <h1 v-show="!collapse" class="sidebar-title">{{ title }}</h1>
      </transition>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '社区智慧生活服务平台',
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/mixin.scss";

.logoFade-enter-active,
.logoFade-leave-active,
.titleFade-enter-active,
.titleFade-leave-active {
  transition: opacity $transition-base;
}

.logoFade-enter,
.logoFade-leave-to,
.titleFade-enter,
.titleFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: $navbarHeight;
  line-height: $navbarHeight;
  background: $menuBg;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all $transition-base;

  .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-md;
    text-decoration: none;
    transition: all $transition-base;
    position: relative;

    &:hover {
      background: $menuHover;
    }

    .sidebar-logo {
      width: 36px;
      height: 36px;
      border-radius: $radius-lg;
      object-fit: contain;
      transition: all $transition-base;
      flex-shrink: 0;
      
      &:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba($primary, 0.2);
      }
    }

    .sidebar-title {
      display: inline-block;
      margin: 0;
      color: $menuText;
      font-weight: 600;
      font-size: 16px;
      letter-spacing: 0.5px;
      white-space: nowrap;
      transition: all $transition-base;
    }
  }

  &.collapse {
    padding: 0;
    
    .sidebar-logo-link {
      justify-content: center;

      .sidebar-logo {
        margin: 0;
      }

      .sidebar-title {
        display: none;
      }
    }
  }
}
</style>
