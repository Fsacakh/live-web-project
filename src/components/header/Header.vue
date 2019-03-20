<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
    <b-link class="navbar-brand">        
      <!-- <img class="black" src="/static/image/irislogo.jpg" alt=""> -->
      <img class="white" :src="menuLogo" alt="">
      </b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarMinimize">&#9776;</button>
    
    <b-nav is-nav-bar class="ml-auto">

    <!-- 下载图标新增 -->
    <b-nav-item class="d-md-down-none mr-3"  @click="showdownLoadList">
      <i class="fa fa-download"></i>
      <b-badge v-show=" downLoadNum===0? false: true " pill variant="danger">{{ downLoadNum > 99 ? '...' :  downLoadNum }}</b-badge>
  	</b-nav-item>
    	
    <b-nav-item class="d-md-down-none mr-3"  @click="showApprovalList">
      <i class="icon-envelope fs20"></i>
      <b-badge pill variant="danger">{{ approvalNum }}</b-badge>
  	</b-nav-item>
  	
    <div id="now-time" class="now-time">
        <p class="time"><span class="iconfont icon-shijianicon"></span><span class="now-date">{{time}}</span><span class="MorningOrAfternoon">{{AMorPM}}</span></p>
        <p class="year">{{year}}<span>{{week}}</span></p>                
    </div>
      <!-- <b-nav-item class="d-md-down-none">
      <i class="icon-bell"></i>
      <b-badge pill variant="danger">5</b-badge>
      </b-nav-item>
       -->
      <!-- <b-nav-item-dropdown right class="margin-right-10">
        <template slot="button-content">
          <img :src="imgpath" class="img-avatar">
          <span class="d-md-down-none">{{orgName}}-{{empCnName}}</span>
        </template>
        <b-dropdown-item @click="Org()" v-show="flag"><i class="fa fa-users"></i> 切换组织</b-dropdown-item>
        <b-dropdown-item @click="changePwd()"><i class="fa fa-shield"></i> 修改密码</b-dropdown-item>
        <b-dropdown-item @click="loginOut()"><i class="fa fa-lock"></i> 退出</b-dropdown-item>
      </b-nav-item-dropdown> -->
    </b-nav>
    <div class="navbar-toggler"></div>
    <changeOrg ref="modal1" :title="orgTitle" :userInfo="userInfo" :size="size"></changeOrg>
    <downLoadingList @resetNum="resetNum" ref="downLoadModal"></downLoadingList>
    <approvalList ref="approvalModal" @sendNum = "getNum" @getNums = 'reloadNum'></approvalList>
  </header>
</template>
<script>
import Api from "../../common/api.js";
import common from "../../common/common.js";
import config from "../../common/config.js";
import changeOrg from "./changeOrg.vue";
// import VueNativeSock from 'vue-native-websocket'
import approvalList from "./../../views/approval-flow/approval-list.vue";
import downLoadingList from "./../../views/downLoadList/downLoad-list.vue"
import Vue from 'vue'
import { mapState, mapGetters, mapActions } from "vuex";
// Vue.use(VueNativeSock, config.wsUrl + common.getCookie('e_token'), {
//       reconnection: true,
//       reconnectionDelay: 3000
//   })
export default {
  data() {
    return {
      orgName: "",
      empEnName: "",
      empCnName: "",
      orgTitle: "切换组织",
      size: "",
      flag: false,
      imgpath: "/static/image/userimg.jpg",
      userInfo: {},
      defaultValue: "",
      year: "",
      time: "",
      AMorPM: "",
      week:"",
      menuLogo: (common.env() == 'development' ? config.menuLogoUrl: '/resources/image/menuLogo.png'),
      wrapperflag: false,
      approvalNum: null,
      downLoadNum: 0
    };
  },
  computed: {
    ...mapState("finance", ["organize"])
  },
  created() {
    let _this = this;
    var fn = () => {
      var now = new Date();
      var y = now.getFullYear();
      var m = now.getMonth() + 1;
      var d = now.getDate();
      var h = now.getHours();
      var mm = now.getMinutes();
      var s = now.getSeconds();
      var str;
      if (h > 12) {
        h -= 12;
        str = " PM";
      } else {
        str = " AM";
      }
      h = h < 10 ? "0" + h : h;
      d = d < 10 ? "0" + d : d;
      m = m < 10 ? "0" + m : m;
      mm = mm < 10 ? "0" + mm : mm;
      s = s < 10 ? "0" + s : s;
      var getWeek = now.getDay(); //注:0-6对应为星期日到星期六
      switch (getWeek) {
        case 0:
          this.week = "星期日";
          break;
        case 1:
          this.week = "星期一";
          break;
        case 2:
          this.week = "星期二";
          break;
        case 3:
          this.week = "星期三";
          break;
        case 4:
          this.week = "星期四";
          break;
        case 5:
          this.week = "星期五";
          break;
        case 6:
          this.week = "星期六";
          break;
        default:
          this.week = "系统错误！";
      }
      this.year = `${y}年${m}月${d}日`;
      this.time = `${h}:${mm}`;
      this.AMorPM = str;
    };
    fn();
    setInterval(fn, 30000);
    this.getNum()
    this.getDownloadNum()
    this.loopQuery()
    // this.$socket.onmessage = this.handleSocketMessage;    //调用socket方法
  },
  components: {
    changeOrg,
    approvalList,
    downLoadingList
  },
  methods: {
    resetNum(){
      this.downLoadNum = 0
    },
    //获取未下载及生成中数量
    loopQuery(){
      let _this= this
      window.setInterval(()=>{
        _this.getDownloadNum()
      },60000)
    },
    // 获取列表条数
    getDownloadNum(){
      let options = {
        fileStateSet : [0,1]
      }
      Api.downLoad.queryFileExportInfo(options, res => {
        if(res.data.code == 'success'){
          if(res.data.obj){
            let obj = res.data.obj
            this.downLoadNum = obj.total
          }
        }
      })
    },
    // websocket方法
    // handleSocketMessage: function(data) {
    //     console.log(data);
    //     let _this = this
    //     if (data.data.indexOf('file_message') >= 0 ) {
    //         _this.$data.downLoadNum = parseInt(JSON.parse(data.data).value)
    //         console.log('websocket:'+this.downLoadNum);
    //     }
    // },
    ...mapActions("login", ["getUserInfo"]),
    //显示审批流弹层
    showApprovalList(){
    	this.$refs.approvalModal.showModal()
    },
    //显示下载列表页面
    showdownLoadList(){
    	this.$refs.downLoadModal.showModal()
    },
    //获取推送消息的数量
    getNum(){
    	//this.$refs.approvalModal.getList()
    },
    //
    reloadNum(data){
    	this.approvalNum = data
    },
    sidebarToggle(e) {
      e.preventDefault();
      document.body.classList.toggle("sidebar-hidden");
    },
    sidebarMinimize(e) {
      // 存在一个问题, 不会自适应
      const NUM = 150
      let arr = this.$route.path.split('/')
      if(arr[1] === 'resourceUtilization' && arr[2] === 'detail') {
        let detail = this.$el.parentNode.children[1].children[1].children[1].children[0].children[1].children[0].children[0]
        let offsetWidth = detail.offsetWidth
        this.wrapperflag = !this.wrapperflag
        this.wrapperflag 
          ? detail.children[1].children[1].style.width  = offsetWidth + NUM + 'px'
          : detail.children[1].children[1].style.width  = offsetWidth - NUM + 'px'
      }
      
      e.preventDefault();
      document.body.classList.toggle("sidebar-minimized");
    },
    mobileSidebarToggle(e) {
      e.preventDefault();
      document.body.classList.toggle("sidebar-mobile-show");
    },
    asideToggle(e) {
      e.preventDefault();
      document.body.classList.toggle("aside-menu-hidden");
    },
    loginOut() {
      Api.toLogin.loginOut({}).then(res => {
        // console.info(res);
        if (res.status == 200) {
          common.clearSession();
          let neworigin = '';
          neworigin = common.env() == 'development' ? 'http://dev.iris.com' : window.location.origin
          window.location.href = neworigin + config.loginUrl;
        }
      });
    },
    Org() {
      this.$refs.modal1.showModal();
    },
    changePwd() {
      let url = window.location.href;
      this.$store.dispatch("login/getBackPage", url);
      this.$router.push({
        path: "/resetPassword"
      });
    },
    initpath() {
      this.imgpath = common.islivePro() + this.imgpath;
    }
  },
  watch: {
    organize() {
      this.Org()
    }
  }
};
</script>
<style scoped>
.navbar-brand {
  width: 200px;
}
.navbar-brand img {
  width: 121px;
}
.app-header.navbar .nav-item{margin-right: 1rem !important;}
.app-header.navbar .nav-item a{
	color: #20a8d8;
}
.app-header.navbar .nav-item a:hover {
    color: #167495;
}
.fs20{font-size: 20px;}
</style>
