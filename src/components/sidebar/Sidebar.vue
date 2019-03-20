<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <div class="user-info">
        <div class="user-avator">
          <div class="user-photo"><img :src="userImgPath" alt=""></div>
        </div>
        <div class="user-info-name">
          <div>
            <b-dropdown id="ddown1" :text="orgName+'-'+empCnName">
              <b-dropdown-item @click="Org()" v-show="flag">
                <i class="fa fa-users"></i> 切换组织
              </b-dropdown-item>
              <b-dropdown-item @click="changePwd()">
                <i class="fa fa-shield"></i> 修改密码
              </b-dropdown-item>
              <b-dropdown-item @click="loginOut()">
                <i class="fa fa-lock"></i> 退出
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
        <div class="search-menu" v-if="searchMenuList.length">
          <el-autocomplete
            popper-class="search-menu-list"
            placeholder="search..."
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            v-model="selectMenu"
            @select="handleSelect"
          />
        </div>
      </div>
      <ul class="nav">
        <li class="nav-item" v-for="(item, index) in menuList" :key="index">
          <template>
            <!-- 一级菜单并且有子菜单 -->
            <template v-if="item.children">
              <SidebarNavDropdown
                class="first-menu"
                :opened="firstMenuIndex == index ? 'open' : ''"
                :name="item.resourceName"
                :url="item.resourcePath"
                :icon="item.addField1"
                @handleSecondMenu="handleSecondMenu"
              >
                <!-- 二级菜单 -->
                <template v-for="(child, i) in item.children">
                  <SidebarNavDropdown
                    class="second-menu"
                    v-if="!child.resourcePath"
                    :opened="secondMenuIndex == i ? 'open' : ''"
                    :name="child.resourceName"
                    :url="child.resourcePath"
                    :icon="child.addField1"
                    :key="child.resourceCode"
                  >
                    <!-- 三级菜单 -->
                    <li
                      class="nav-item"
                      v-for="(grandson, j) in child.children"
                      :key="j"
                      @click="toGoMenu(grandson, index, i)"
                    >
                      <SidebarNavLink
                        class="third-link"
                        :class="{'nav-active': grandson.resourcePath === isCurrent}"
                        :name="grandson.resourceName"
                        :url="grandson.resourcePath"
                        :isNative="grandson.addField2"
                        :icon="grandson.addField1"
                        :title="grandson.resourceName"
                        :levels="grandson.levels"
                      />
                    </li>
                  </SidebarNavDropdown>
                  <li 
                    class="nav-item" 
                    v-else 
                    @click="toGoMenu(child, index, i)" 
                    :key="child.code"
                  >
                    <SidebarNavLink
                      class="second-link"
                      :class="{'nav-active': child.resourcePath === isCurrent}"
                      :name="child.resourceName"
                      :url="child.resourcePath"
                      :isNative="child.addField2"
                    />
                  </li>
                </template>
              </SidebarNavDropdown>
            </template>
            <!-- 一级菜单没有子菜单 -->
            <template v-else>
              <SidebarNavLink
                :class="{'nav-active':child.resourcePath === isCurrent}"
                :name="item.resourceName"
                :url="item.resourcePath"
                :isNative="item.addField2"
                :icon="item.addField1"
              />
            </template>
          </template>
        </li>
      </ul>
      <slot></slot>
      <div slot="footer"></div>
    </nav>
  </div>
</template>
<script>
import Vue from 'vue'
import { Autocomplete } from 'element-ui'
import SidebarNavDropdown from "./SidebarNavDropdown";
import SidebarNavLink from "./SidebarNavLink";
import SidebarNavTitle from "./SidebarNavTitle";
import Api from "../../common/api.js";
import common from "../../common/common.js";
import config from "../../common/config.js";
import menuData from "../../common/menuData.js";
import changeOrg from "../header/changeOrg.vue";
import { mapState, mapGetters, mapActions } from "vuex";
import { MENUFLAG } from 'common/ref-code.js'
import { jsonTree } from 'common/com-api'

Vue.use(Autocomplete)

export default {
  name: "sidebar",
  data() {
    return {
      firstMenuIndex: -1,
      secondMenuIndex: -1,
      selectMenu: '', // 被选中的菜单
      searchMenuList: [], // 菜单下拉列表
      menuList: [],
      parentIndex: 0,
      childIndex: 0,
      isCurrent: "",
      flag: false,
      userInfo: {},
      orgName: "",
      empEnName: "",
      empCnName: "",
      showModal: false,
      orgTitle: "切换组织",
      userImgPath: (common.env() == 'development' ? '/static/image/userimg.jpg': '/resources/image/userimg.jpg')
    };
  },
  props: {
    navItems: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  created() {
    this.initMenu()
  },
  mounted() {
    window.vue = this
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    if(this.userInfo) {
      this.defaultValue = this.userInfo.inCharegOrgVo.orgCode
    }
  },
  components: {
    SidebarNavDropdown,
    SidebarNavLink,
    SidebarNavTitle,
    changeOrg
  },
  watch: {
    userInfo() {
      if (this.userInfo) {
        this.orgName = this.userInfo.inCharegSubOrgVo.orgName
        this.empEnName = this.userInfo.empVo.empEnName
        this.empCnName = this.userInfo.empVo.empCnName
        this.flag = this.userInfo.orgCodes.length > 1 ? true : false
      }
    }
  },
  methods: {

    // 切换组织
    Org() {
      this.$store.dispatch("finance/organize", true)
    },

    // 更换密码
    changePwd() {
      let url = window.location.href
      this.$store.dispatch("login/getBackPage", url)
      window.location.href = window.location.origin + common.islivePro() + "/resetPassword"
    },

    // 退出
    loginOut() {
      Api.toLogin.loginOut({}).then(res => {
        if (res.status == 200) {
          common.clearSession()
          let neworigin = ''
          neworigin = common.env() == 'development' ? 'http://dev.iris.com' : window.location.origin
          window.location.href = neworigin + config.loginUrl
        }
      });
    },

    // 初始化菜单
    initMenu() {
      
      const userInfo = sessionStorage.getItem('userInfo') && JSON.parse(sessionStorage.getItem('userInfo'))
      const groupCode = userInfo.userAvailableInfo.orgCode
      const postCodes = userInfo.postnCodes
      const orgCode = userInfo.inCharegSubOrgVo.orgCode
      const params = { groupCode, postCodes, orgCode, resourceChannelCode: 'MenuPC' }

      Api.toLogin.queryPostUsableGroupResourceInfo(params, res => {
        if (res && res.data.code == 'success') {
          if (res.data.obj) {

            this.searchMenuList = []
            const menuList = res.data.obj.menu || []
            common.setSession('menuList', JSON.stringify(menuList))
            const config = { id: 'resourceCode', pid: 'fatherResourceCode' }
            this.menuList = jsonTree(menuList, config)

            menuList.forEach(item => {
              if (item.resourcePath) {
                item.value = item.resourceName
                this.searchMenuList.push(item)
              }
            })

            this.matchUrl(this.menuList)
          } {
            // this.$router.push('/index')
          }
        }
      })
    },

    // 点击一级菜单的时候，二级菜单默认都收起
    handleSecondMenu() {
      this.secondMenuIndex = -1
    },

    // 切换菜单
    toGoMenu(child, index, i) {
      this.isCurrent = child.resourcePath
      this.firstMenuIndex = index
      this.secondMenuIndex = i
    },

    // 跨项目跳转时 根据 url 匹配左侧菜单 
    matchUrl(menuList) {
      
      const pathName = window.location.pathname
      const isLocal = common.env() == 'development' ? true : false
      
      menuList.forEach((menu, i) => {
        ;(menu.children || []).forEach((secondMenu, j) => {
          const path = isLocal ? secondMenu.resourcePath : '/' + secondMenu.addField2 + secondMenu.resourcePath
          if (path == pathName)
            this.toGoMenu(secondMenu, i, j)
          else 
            ;(secondMenu.children || []).forEach(thirdMenu => {
              const path = isLocal ? thirdMenu.resourcePath : '/' + thirdMenu.addField2 + thirdMenu.resourcePath
              if (path == pathName)
                this.toGoMenu(thirdMenu, i, j)
            })
        })
      })
    },

    // 菜单搜索
    querySearch(queryString, cb) {
      var searchMenuList = this.searchMenuList
      var results = queryString ? searchMenuList.filter(this.createFilter(queryString)) : searchMenuList
      cb(results)
    },

    // 过滤未选中的菜单
    createFilter(queryString) {
      return (searchMenuList) => {
        return (searchMenuList.value.toLowerCase().includes(queryString.toLowerCase()))
      }
    },
    
    // 选择菜单
    handleSelect(item) {
      this.matchUrl(this.menuList, item.resourcePath)
      if (item.addField2 == 'livepro') this.$router.push(item.resourcePath)
      else {
        const classify = item.addField2 == 'live' ? 'web' : item.addField2
        window.location.href = `${window.location.origin}/${classify}${item.resourcePath}` 
      }
    }
  }
};
</script>

<style lang="scss">
  .search-menu-list {
    .el-autocomplete-suggestion__wrap {
      padding: 0;
      overflow: scroll;
    }
    .el-autocomplete-suggestion__list {
      li {
        line-height: 32px;
        color: #214A80;
      }
      li:hover {
        text-decoration: underline;
      }
    }
    .el-scrollbar__wrap {
      border-radius: 0;
      border: none;
    } 
  }
  .sidebar {
    .font-18 {
      font-size: 18px !important
    }
    .nav-item .nav-link {
      height: 45px;
      i {
        vertical-align: baseline !important;
      }
    }
    .user-avator, .user-info-name {
      padding-left: 20px;
    }
    .el-autocomplete {
      display: block;
      margin-top: 5px;
    }
    .el-input__inner {
      line-height: 32px;
    }
    .search-menu {
      box-sizing: border-box;
      padding: 0 10px 10px;
    }
    .el-input {
      background: url('../../../static/image/search.png') no-repeat right center;
      background-size: 12px;
      background-position: 160px 15px;
    }
    .el-input__inner {
      background: no-repeat bottom,50% calc(100%);
      background-size: 0 100%,100% 100%;
      transition: background 0s ease-out;
      background-image: linear-gradient(0deg,#B3504A 1px,rgba(156,39,176,0) 0),linear-gradient(0deg,#d2d2d2 1px,hsla(0,0%,82%,0) 0);
      color: #fff;
      border: none;
    }
    .el-input__inner:focus{
      background-size: 100% 100%,100% 100%;
      transition-duration: .3s;
      box-shadow: none;
    }
    ::-webkit-input-placeholder {
      color:#fff !important;
    }
    :-moz-placeholder {
      color:#fff !important;
    }
    ::-moz-placeholder { 
      color:#fff !important;
    }
    :-ms-input-placeholder { 
      color:#fff !important;
    }
  }
</style>