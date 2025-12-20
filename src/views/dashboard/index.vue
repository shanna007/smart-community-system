<!-- 主界面 -->
<template>
  <div class="dashboard-container">
    <!-- 最新公告 -->
    <el-card class="box-card notice-card">
      <div slot="header" class="clearfix card-header">
        <i class="el-icon-bell"></i>
        <span class="header-title">最新公告</span>
      </div>
      <div class="content" v-if="new_notices && new_notices.title">
        <div class="section-title">
          {{ new_notices.title }}
        </div>
        <div class="notice-content">
          {{ new_notices.noticeContent }}
        </div>
        <div class="time">
          <p class="time-zone">
            📅 {{ new_notices.createTime }}
          </p>
        </div>
      </div>
      <div class="empty-state" v-else>
        <i class="el-icon-document-copy"></i>
        <p>暂无公告信息</p>
      </div>
    </el-card>

    <!-- 欢迎卡片 -->
    <el-card class="box-card welcome-card">
      <div slot="header" class="clearfix card-header">
        <i class="el-icon-star-on"></i>
        <span class="header-title">欢迎来到物业管理系统</span>
      </div>
      <div class="content">
        <div class="section-title">
          <i class="el-icon-info"></i>
          系统简介
        </div>
        <div class="section-content">
          <p>欢迎使用我们的社区智慧生活服务平台，我们致力于为您提供便捷、高效的社区服务管理。无论您是社区居民还是社区服务专员，我们都将竭诚为您服务，为您的生活带来更多便利。</p>
        </div>

        <div class="section-title">
          <i class="el-icon-service"></i>
          核心功能
        </div>
        <div class="section-content">
          <div class="feature-grid">
            <div class="feature-item">
              <i class="el-icon-house"></i>
              <span>平台运营管理</span>
            </div>
            <div class="feature-item">
              <i class="el-icon-s-tools"></i>
              <span>便民服务工单</span>
            </div>
            <div class="feature-item">
              <i class="el-icon-message"></i>
              <span>居民信息服务</span>
            </div>
            <div class="feature-item">
              <i class="el-icon-money"></i>
              <span>生活缴费中心</span>
            </div>
          </div>
        </div>

        <div class="section-title">
          <i class="el-icon-success"></i>
          我们的使命
        </div>
        <div class="section-content">
          <p>我们的使命是确保您安心居住，我们的激情是为您创造舒适生活。在您的每一个需求后面，都有我们专业的团队为您守护。</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getOneApi } from "@/api/notice";
import { title } from "@/settings";

export default {
  name: "Dashboard",
  data() {
    return {
      new_notices: [],
      parms: {
        title: "",
        content: "",
        time: "",
      },
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  created() {
    this.getOne();
  },
  methods: {
    // 获取最新公告
    async getOne() {
      try {
        let res = await getOneApi(this.parms);
        if (res && res.code == 200) {
          this.new_notices = res.data;
          this.parms.total = res.data.total;
        }
      } catch (error) {
        console.error("获取公告失败:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/mixin.scss";

.dashboard-container {
  padding: $spacing-2xl;
  min-height: calc(100vh - 120px);
  background: linear-gradient(135deg, $gray-50 0%, $gray-100 100%);
  display: grid;
  gap: $spacing-xl;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    padding: $spacing-lg;
    gap: $spacing-lg;
  }
}

.box-card {
  border: none;
  border-radius: $radius-2xl;
  background: white;
  box-shadow: $shadow-lg;
  transition: all $transition-base;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: $shadow-2xl;
  }

  ::v-deep {
    .el-card__header {
      border-bottom: 2px solid $gray-100;
      padding: $spacing-2xl;
      background: linear-gradient(135deg, $gray-50 0%, transparent 100%);
    }

    .el-card__body {
      padding: $spacing-2xl;
      flex: 1;
      overflow-y: auto;
      @include scrollBar;
    }
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  font-weight: 600;

  i {
    font-size: 20px;
    color: $primary;
  }
}

.header-title {
  font-size: 18px;
  font-weight: 700;
  color: $gray-900;
  margin: 0;
}

.content {
  padding: 0;
}

// Section title
.section-title {
  font-size: 16px;
  font-weight: 700;
  color: $gray-900;
  margin: $spacing-2xl 0 $spacing-md 0;
  display: flex;
  align-items: center;
  gap: $spacing-md;
  position: relative;
  padding-left: 0;

  i {
    color: $primary;
    font-size: 18px;
  }

  &::before {
    display: none;
  }
}

// Section content
.section-content {
  font-size: 14px;
  line-height: 1.8;
  color: $gray-700;

  p {
    margin: 0 0 $spacing-md 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

// Feature grid
.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-lg;
  margin-top: $spacing-md;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-lg;
  background: $gray-50;
  border-radius: $radius-lg;
  text-align: center;
  transition: all $transition-base;
  border: 2px solid transparent;

  &:hover {
    background: $gray-100;
    border-color: $primary;
    transform: translateY(-4px);

    i {
      color: $primary;
      font-size: 28px;
    }
  }

  i {
    font-size: 24px;
    color: $gray-400;
    margin-bottom: $spacing-sm;
    transition: all $transition-base;
  }

  span {
    font-size: 13px;
    font-weight: 500;
    color: $gray-600;
  }
}

// Notice content
.notice-content {
  font-size: 14px;
  line-height: 1.8;
  color: $gray-700;
  margin-top: $spacing-md;
  padding: $spacing-lg;
  background: $gray-50;
  border-radius: $radius-lg;
  border-left: 4px solid $primary;
  max-height: 400px;
  overflow-y: auto;
  @include scrollBar;
  white-space: pre-wrap;
  word-break: break-word;
}

// Empty state
.empty-state {
  text-align: center;
  padding: $spacing-3xl $spacing-xl;
  color: $gray-400;

  i {
    font-size: 48px;
    margin-bottom: $spacing-lg;
    display: block;
  }

  p {
    margin: 0;
    font-size: 14px;
  }
}

// Time
.time {
  margin-top: $spacing-xl;
  text-align: right;
}

.time-zone {
  font-size: 12px;
  color: $gray-400;
  font-weight: 500;
  margin: 0;
}

// Responsive
@media (max-width: 600px) {
  .dashboard-container {
    padding: $spacing-lg;
    gap: $spacing-lg;
  }

  .box-card {
    ::v-deep {
      .el-card__header {
        padding: $spacing-lg;
      }

      .el-card__body {
        padding: $spacing-lg;
      }
    }
  }

  .card-header {
    i {
      font-size: 16px;
    }
  }

  .header-title {
    font-size: 16px;
  }

  .section-title {
    font-size: 14px;
  }

  .section-content {
    font-size: 13px;
  }

  .feature-grid {
    gap: $spacing-md;
  }

  .feature-item {
    padding: $spacing-md;

    i {
      font-size: 20px;
    }
  }
}
</style>
