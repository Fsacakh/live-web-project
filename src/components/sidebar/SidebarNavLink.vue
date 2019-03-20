<template>
  <div>
    <router-link v-if="isNative == 'livepro'" :to="url" class="nav-link">
      <i :class="levels == 3 ? 'SidebarNavLink iconfont icon-yuandianxiao' : 'SidebarNavLink'"></i> {{ name }}
    </router-link>
    <a v-else class="nav-link" @click="navLink(url)">
      <i :class="levels == 3 ? 'SidebarNavLink iconfont icon-yuandianxiao' : 'SidebarNavLink'"></i> {{ name }} </a>
  </div>
</template>

<script>
  export default {
    name: "sidebar-nav-link",
    props: {
      name: {
        type: String,
        default: ''
      },
      url: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      isNative:{
        type: String,
        default: 'livePro'      
      },
      levels: {
        type: Number,
        default: 1
      }
    },
    methods:{
      navLink(url) {
        const classify = this.isNative == 'live' ? 'web' : this.isNative
        window.location.href = `${window.location.origin}/${classify}${url}`
      }
    }
  }
</script>

<style scoped>
  .SidebarNavLink {
    display: inline !important;
    margin-left: 15px !important;
    margin-right: 0 !important;  
    color: aliceblue !important;
  }
  .second-link {
    text-indent: 15px;
  }
  .third-link {
    overflow: hidden;
  }
  .third-link .nav-link {
    display: block !important;
    line-height: 45px;
    height: 45px;
    padding: 0 10px 0 32px !important;
  }
</style>
