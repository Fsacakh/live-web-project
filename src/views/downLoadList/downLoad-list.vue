<template>
  <div>
    <b-modal hide-footer title="导出中心" ref="myModel" size="lg" id="emp-insert2" @show="reload">
      <div class="row">
        <div class="col-md-3">
          <b-form-fieldset horizontal label="筛选" :label-cols="3" class="text-right">
            <b-form-select v-model="query.searchState" :options="filterTypeOptions" class="mb-3" />
          </b-form-fieldset>
        </div>
        <div class="col-md-4">
          <b-form-fieldset horizontal label="导出时间" :label-cols="4" class="text-right">
            <el-date-picker v-model="exportTime" @change="searchTime" type="date" align="right" placeholder="选择日期" :picker-options="pickerOptions">
            </el-date-picker>
          </b-form-fieldset>
        </div>
        <div class="col-md-3">
          <b-form-fieldset>
            <b-form-input class="mb-3" v-model="query.fileName" />
          </b-form-fieldset>
        </div>
        <div class="col-md-2">
          <b-button size="sm" class="pull-left" style="margin-top: 3px" @click="search(1)">搜索</b-button>
        </div>
      </div>
      <div class="row">
        <b-list-group>
          <b-list-group-item v-for="(item,index) in list" :key="index">
            <span class="rank">{{ page.totalResult-(page.pageNo-1)*10-index }}</span>
            <span class="title">{{ item.fileName.length >= 10 ? item.fileName.slice(0,10) +'...' : item.fileName }}</span>
            <span class="downed" :class="item.fileState == 0 ? 'colorGreen' : item.fileState != 2 ? 'colorRed' : ''">
              <span class="fa fa-star-o star" v-show="item.fileFlag == 1 ? true : false "></span>
              {{item.fileState == 0 ? '生成中' : item.fileState == 1 ? '未下载' : item.fileState == -1 ? '失败' : '已下载' }}</span>
            <span class="export">导出时间: {{ item.fileExportTime.slice(0,19) }}</span>
            <span class="downLoad" @click="downLoadURL(item.fileDownloadPath,item.id,item.fileState)">{{item.fileState == 0 ? '删除' : item.fileState == -1 ? '删除' : '下载' }}</span><span v-show="item.fileState == 0 ? false : item.fileState == -1 ? false : true" class="gray">|</span>
            <span class="more" v-show="item.fileState == 0 ? false : item.fileState == -1 ? false : true">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  更多
                  <i class="el-icon-arrow-down el-icon--left"></i>
                </span>
                <el-dropdown-menu>
                  <el-dropdown-item>关闭</el-dropdown-item>
                  <el-dropdown-item v-show="item.fileState === 1? true : false" @click.native="alreadyDownload(item.id)">已下</el-dropdown-item>
                  <span v-show="item.fileState === 2 ? true : false ">
                    <el-dropdown-item v-show="item.fileFlag === 0? true : false" @click.native="clickFlag(item.id)">标记</el-dropdown-item>
                    <el-dropdown-item v-show="item.fileFlag === 1? true : false" @click.native="clearFlag(item.id)">除标</el-dropdown-item>
                  </span>
                  <el-dropdown-item @click.native="clickDelete(item.id)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </b-list-group-item>
        </b-list-group>
        <div class="hint" v-if="list.length <= 0">暂无更多数据</div>
      </div>

      <div class="row" style="margin-top: 20px">
        <b-button v-if="list.length" size="sm" type="text" @click="openMessage" style="margin-left: 10px">清空导出下载</b-button>
        <div v-if="list.length" class="col-md-9 pull-right">
          <pagination class="pull-right" @page-change="pageChange" :pageNo="page.pageNo" :pageSize="page.pageSize" :totalPages="page.totalPages" :totalResult="page.totalResult">
          </pagination>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import Vue from "vue";
import Pagination from "components/pagination/pagination";
import api from "common/api";
import config from "common/config";
import common from "common/common";
// import VueNativeSock from 'vue-native-websocket'
import { Message, DatePicker, MessageBox, Dropdown, DropdownMenu, DropdownItem } from "element-ui";
Vue.use(DatePicker);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

// Vue.use(Button);
Vue.prototype.$confirm = MessageBox.confirm;
export default {
  data() {
    return {
      dropshow: false,
      exportTime: "", //绑定导出查询时间
      query: {
        searchState: "", //筛选类型
        fileExportTime: "", //转化后导出时间
        searchState: "", //模糊匹配字段
        pageNums: 10
      },
      cloneQueryData: {},
      // 查询到的数据保存在这
      list: [],
      //筛选类型
      filterTypeOptions: [
        { text: "全部", value: "" },
        { text: "未操作", value: 1 },
        { text: "已标记", value: 2 },
        { text: "已下载", value: 4 }
      ],
      //分页器相关数据
      page: {
        pageNo: 1,
        pageSize: 10,
        totalPages: 10,
        totalResult: 10
      },
      //DatePicker禁用选择未来日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      }
    };
  },
  mounted() {},
  methods: {
    //查询时间
    searchTime() {
      if (this.exportTime) {
        this.query.fileExportTime = common
          .eleTimeFormatim2(this.exportTime)
          .slice(0, 10);
      } else {
        return (this.query.fileExportTime = "");
      }
    },
    //点击弹出层就显示模态框数据
    reload() {
      // 再次弹出模态框搜索信息初始化
      this.query = {
        searchState: "", //筛选类型
        fileExportTime: "", //导出时间
        searchState: "", //模糊匹配字段
        pageNums: 10
      };
      this.exportTime = "";
      this.search();
    },
    //搜索
    search(num) {
      this.query.pageStart = num;
      this.publicGetDate(this.query);
      this.cloneQueryData = JSON.parse(JSON.stringify(this.query));
      console.log(this.list);
      
    },
    //跳转下载路径
    downLoadURL(val, id, fileState) {
      if (fileState === 0 || fileState === -1) {
        // 当状态为0/生成中时(页面显示为删除)
        // 依据id名,删除当前列
        this.clickDelete(id);
        this.publicGetDate(this.query);
        return;
      }
      //点击下载跳转当前路径
      if (val !== undefined && val !== null && val.length > 0) {
        window.location.href = common.isDevFile() + val;
        console.log(common.isDevFile() + val);
        let options = {
          fileState: 2,
          id: id
        };
        //更改静态页面提示
        this.list = this.list.map(v => {
          if (v.id == id) {
            v.fileState = 2;
          }
          return v;
        });
        //点击下载后更改后台状态
        this.updateFileExportInfo(options);
      }
    },
    //标记
    clickFlag(id) {
      let options = {
        id: id,
        fileFlag: 1
      };
      // 点击标记静态页面显示标记
      this.list = this.list.map(v => {
        if (v.id == id) {
          v.fileFlag = 1;
        }
        return v;
      });
      //更改后台状态
      this.updateFileExportInfo(options);
    },
    //删除
    clickDelete(id) {
      let options = {
        id: id,
        isDeleted: 1
      };
      //静态页面删除
      this.list.map((v, index) => {
        if (v.id == id) {
          //序号是依据后台返回的总数计算生成的,静态页面删除时,所以总数要 -1
          this.page.totalResult -= 1;
          //删除当前列
          this.list.splice(index, 1);
          //后台数据删除
          this.updateFileExportInfo(options);
        }
      });
      //重新获取查询列表,刷新当前页条数
    },
    //已下
    alreadyDownload(id) {
      let options = {
        id: id,
        fileState: 2
      };
      // 静态页面点击一下,未下载变更为已下载
      this.list = this.list.map(v => {
        if (v.id == id) {
          v.fileState = 2;
        }
        return v;
      });
      //更改后台状态
      this.updateFileExportInfo(options);
    },
    //除标
    clearFlag(id) {
      let options = {
        id: id,
        fileFlag: 0
      };
      //点击 静态页面除标
      this.list = this.list.map(v => {
        if (v.id == id) {
          v.fileFlag = 0;
        }
        return v;
      });
      this.updateFileExportInfo(options);
    },
    //状态更新公用方法
    updateFileExportInfo(options) {
      api.downLoad.updateFileExportInfo(options, res => {
        if (res.data.code == "success") {
          // if(options.isDeleted){
          this.publicGetDate(this.cloneQueryData);
          // }
        }
      });
    },
    //模态框相关方法
    showModal() {
      this.$refs.myModel.show();
    },
    hideModal() {
      this.$refs.myModel.hide();
    },
    pageChange(num) {
      //初始化
      this.search(num);
    },
    //是否清空
    openMessage() {
      MessageBox.confirm("是否确定清空所有未标记的文件", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.downLoad.deleteFileExportInfo({ fileFlag: 0 }, res => {
            if (res.data.code == "success") {
              this.search();
              this.$emit("resetNum"); //清空数据条数
            }
          });
        })
        .catch(() => {
          // console.log("取消删除");
        });
    },
    //查询列表方法   将查询的数据保存在list & page中
    publicGetDate(data) {
      api.downLoad.queryFileExportInfo(data, res => {
        if (res.data.code == "success") {
          let obj = res.data.obj;
          this.list = res.data.obj.list;
          this.page = {
            pageNo: obj.pageNum,
            pageSize: obj.pageSize,
            totalPages: obj.pages,
            totalResult: obj.total
          };
        }
      });
    }
  },
  components: {
    Pagination
  }
};
</script>
<style lang="scss" scoped>
.list-group {
  width: 100%;
}
.list-group-item {
  border-left: 0px;
  border-right: 0px;
  height: 50px;
  .gray {
    color: #ccc;
  }
  .m-2 {
    margin: 0 !important;
  }
}
.list-group-item:focus,
.list-group-item:hover {
  background: #f3f9fe;
  & /deep/ .btn-primary {
    border: 1px solid #f3f9fe !important;
    background: #f3f9fe !important;
  }
}
.el-dropdown-link{
  color: #5badec;
}
.el-dropdown-menu{
  text-align: center;
  span{
     display: block;
  }

}
span {
  display: inline-block;
}
.rank {
  width: 5%;
}
.title {
  width: 25%;
}
.downed {
  width: 15%;
  position: relative;
  .star {
    position: absolute;
    left: -20px;
    top: 5px;
  }
  &::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #9d9d9d;
    border-radius: 50%;
    margin-right: 5px;
  }
}
.colorGreen {
  &::before {
    background: yellowgreen;
  }
}
.colorRed {
  &::before {
    background: red;
  }
}
.export {
  width: 35%;
}
.downLoad {
  width: 5%;
  color: #5badec;
  cursor: pointer;
}
.more {
  width: 10%;
}
.hint {
  margin-left: 20px;
  font-size: 18px;
}
</style>

