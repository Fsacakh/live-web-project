<template>
<div>
    <b-card>
        <div class="row">
            <div class="col-md-12">
                <div class="pull-left">
                    <upload buttonName="导入" :onlyExcel="true" :beforeUpload='beforeUpload' :analysisExcel="analysisExcel" :addParams="addParams" :url="uploadUrl"></upload>
                </div>
                <div class="pull-right">
                    <b-button size="sm" variant="primary" @click="queryExHallList">查询记录</b-button>
                </div>
            </div>
        </div>
        <div class="table-scrollable">
        <b-table striped hover bordered show-empty id="miWidth" :items="tableList" :fields="fields">
            <template slot="index" slot-scope="data">
                {{data.index + 1}}
            </template>
            <template slot="download" slot-scope="data">
                <a :href="data.item.filePath">下载</a>
            </template>
            <template slot="empty">
                暂无数据...
            </template>
        </b-table>
        </div>
        <div class="row mt-2">
            <div class="col-md-12">
                <pagination class="pull-right" @page-change="pageChange" :page-no="pageData.pageNum" :page-size="pageData.pageSize" :total-result="pageData.total" :total-pages="pageData.pages">
                </pagination>
            </div>
        </div>
    </b-card>
</div>
</template>
<script>
import { EX_HALL_PASSENGER_TO_CHANNEL } from 'common/ref-code'
import api from 'common/api';
import apiUrl from 'common/api-url'
import upload from 'components/iris-upload'
import Pagination from 'components/pagination/pagination'
import config from 'common/config'
import { Message } from "element-ui";
export default {
  components: {
    upload,
    Pagination
  },
  data() {
    return {
      uploadUrl: apiUrl.dataReport.exHallPassengerToChannel, //解析接口
      addParams:{
          relationCode: EX_HALL_PASSENGER_TO_CHANNEL,
          singleFlag: '0',
          businessType: ''
      },
      showBack:{},
      tableList: [],
      pageData:{},
      pageStart:1,
      fields:{
        index: {
            label: '序号'
        },
        fileCode: {
            label: '导入编号'
        },
        createTimeStr: {
            label: '导入时间'
        },
        createName: {
            label: '操作人'
        },
        download: {
            label: '操作'
        }
      }
    }
  },
  methods: {
    pageChange(val){
        this.pageStart = val;
        this.queryExHallList();
    },
    beforeUpload(){

    },
    analysisExcel(){
        Message({
          type: "success",
          message: "上传成功"
        });
    },
    queryExHallList(){
        api.dataReport.selectByRelationCode({
            relationCode: EX_HALL_PASSENGER_TO_CHANNEL,
            pageStart: this.pageStart,
            pageNums: config.pageNums
        }, (res) => {
            if(res.data.message == 'success'){
                this.tableList = res.data.obj.list;
                this.pageData = res.data.obj;
            }
        })
    }
  }
};
</script>