<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
    <b-link class="navbar-brand" style="color:#fff;">iRIS 汽车智能服务平台</b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarMinimize">&#9776;</button>
<!--     <b-nav is-nav-bar class="d-md-down-none">
      <b-nav-item class="px-3">Dashboard</b-nav-item>
      <b-nav-item class="px-3">Users</b-nav-item>
      <b-nav-item class="px-3">Settings</b-nav-item>
    </b-nav> -->
    <b-nav is-nav-bar class="ml-auto">
<!--       <b-nav-item class="d-md-down-none">
        <i class="icon-bell"></i><span class="badge badge-pill badge-danger">5</span>
      </b-nav-item>
      <b-nav-item class="d-md-down-none">
        <i class="icon-list"></i>
      </b-nav-item>
      <b-nav-item class="d-md-down-none">
        <i class="icon-location-pin"></i>
      </b-nav-item> -->
      <b-nav-item-dropdown right class="margin-right-10">
        <template slot="button-content">          
          <img src="static/img/8.jpg" class="img-avatar">
          <span class="d-md-down-none">{{orgName}}-{{empEnName}}</span>
        </template>
<!--         <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
        <b-dropdown-item><i class="fa fa-bell-o"></i> Updates<span class="badge badge-info">42</span></b-dropdown-item>
        <b-dropdown-item><i class="fa fa-envelope-o"></i> Messages<span class="badge badge-success">42</span></b-dropdown-item>
        <b-dropdown-item><i class="fa fa-tasks"></i> Tasks<span class="badge badge-danger">42</span></b-dropdown-item>
        <b-dropdown-item><i class="fa fa-comments"></i> Comments<span class="badge badge-warning">42</span></b-dropdown-item> -->
<!--         <b-dropdown-header tag="div" class="text-center"><strong>Settings</strong></b-dropdown-header> -->
<!--         <b-dropdown-item><i class="fa fa-user"></i> Profile</b-dropdown-item>
        <b-dropdown-item><i class="fa fa-wrench"></i> Settings</b-dropdown-item>
        <b-dropdown-item><i class="fa fa-usd"></i> Payments<span class="badge badge-default">42</span></b-dropdown-item>
        <b-dropdown-item><i class="fa fa-file"></i> Projects<span class="badge badge-primary">42</span></b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider> -->
        <b-dropdown-item><i class="fa fa-users"></i> 切换组织</b-dropdown-item>
        <b-dropdown-item  @click="changePwd()"><i class="fa fa-shield"></i>修改密码</b-dropdown-item>
        <b-dropdown-item  @click="loginOut()"><i class="fa fa-lock"></i> 退出</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
    <div class="navbar-toggler"></div>
  </header>
</template>
<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import Api from '../../common/api.js'
import common from '../../common/common.js'
import config from '../../common/config.js'
export default {
  data(){
    return {
      orgName:'',
      empEnName:''
    }
  },
  created(){
    //获取用户信息
    this.getUserInfo({});

  },
  computed: {
    ...mapState('login', ['userInfo'])
  },
  methods: {
    ...mapActions('login', ['getUserInfo']),
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    },
    loginOut(){
      Api.toLogin.loginOut({}).then(function(res){
        console.info(res);
        if(res.status==200){
          window.location.href = common.protocol() + config.loginUrl;
        }
      })

    },
    changePwd(){
      this.$router.push({ 
          path: '/resetPassword'
      })
    }
  },
  watch:{
    userInfo(){
      this.orgName = this.userInfo.inCharegSubOrgVo.orgName;
      this.empEnName = this.userInfo.empVo.empEnName;
    }

  }
}
</script>
