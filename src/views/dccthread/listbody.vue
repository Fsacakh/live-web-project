<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <b-card header="查询">
                    <div class="row">
                          <div class="col-md-4">
                              <b-form-fieldset horizontal label="线索编码" :label-cols="4" class="text-right">
                                  <b-form-input v-model="queryParams.leadCode"/>
                              </b-form-fieldset>
                          </div>
                          <div class="col-md-4">
                              <b-form-fieldset horizontal label="客户姓名" :label-cols="4" class="text-right">
                                  <b-form-input v-model="queryParams.customName"/>
                              </b-form-fieldset>
                          </div>
                          <div class="col-md-4">
                              <b-form-fieldset horizontal label="客户电话" :label-cols="4" class="text-right">
                                  <b-form-input v-model="queryParams.mobilePhone"/>
                              </b-form-fieldset>
                          </div>
                          <div class="col-md-4">
                              <b-form-fieldset label="经销商店" :label-cols="4" :horizontal="true" class="text-right">
                                  <areaqueryshop :storeAll="true" :readonly="false" @select-change="selectedfun"></areaqueryshop>
                              </b-form-fieldset>
                          </div>
                          <div class="col-md-4">
                              <b-form-fieldset horizontal label="所属销售顾问" :label-cols="4" class="text-right">
                                  <b-form-select v-model="queryParams.scCode" :options="appointmentInfoOption"></b-form-select>
                              </b-form-fieldset>
                          </div>
                          <div class="col-md-4">
                              <b-form-fieldset horizontal label="渠道" :label-cols="4" class="text-right">
                                  <b-form-select v-model="queryParams.channelCode" :options="channelMode"></b-form-select>
                              </b-form-fieldset>
                          </div>
                          <div class="col-md-4">
                              <b-form-fieldset horizontal label="意向级别" :label-cols="4" class="text-right">
                                  <b-form-select v-model="queryParams.intentionLevelCode" :options="intentionLeveOption"></b-form-select>
                              </b-form-fieldset>
                          </div>
                          <div class="col-md-4">
                              <b-form-fieldset horizontal label="名单状态" :label-cols="4" class="text-right">
                                  <b-form-select v-model="queryParams.leadType" :options="[{text:'无效名单',value:0},{text:'线索',value:1},{text:'待甄别',value:-2}]">
                                  </b-form-select>
                              </b-form-fieldset>
                          </div>
                          <div class="col-md-4">
                              <b-form-fieldset horizontal label="是否预约" :label-cols="4" class="text-right">
                                  <b-form-select v-model="queryParams.appointment" :options="[{text:'未预约',value:0},{text:'已预约',value:1}]">
                                  </b-form-select>
                              </b-form-fieldset>
                          </div>
                          <div class="col-md-4">
                              <b-form-fieldset horizontal label="线索状态" :label-cols="4" class="text-right">
                                  <b-form-select v-model="queryParams.leadsStstusCode" :options="clueStatusList">
                                  </b-form-select>
                              </b-form-fieldset>
                          </div>
                          <div class="col-md-4">
                            <b-form-fieldset horizontal label="销售状态" :label-cols="4" class="text-right">
                                <b-form-select v-model="queryParams.salesStstusCode" :options="salesStatusList">
                                </b-form-select>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-4">
                            <b-form-fieldset horizontal label="预约时间" :label-cols="4" class="text-right">
                                <el-date-picker
                                  v-model="queryParams.appointmentTime"
                                  type="date"
                                  placeholder="选择日期"
                                  start-placeholder="">
                                </el-date-picker>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-4">
                            <b-form-fieldset horizontal label="跟进时间" :label-cols="4" class="text-right">
                                <el-date-picker
                                  v-model="queryParams.followUp"
                                  type="date"
                                  placeholder="选择日期"
                                  start-placeholder="">
                                </el-date-picker>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-4">
                            <b-form-fieldset horizontal label="跟进状态" :label-cols="4" class="text-right">
                                <b-form-select v-model="queryParams.followStatus" :options="followStatus"></b-form-select>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-4">
                            <b-form-fieldset horizontal label="DCC专员" :label-cols="4" class="text-right">
                                <b-form-select v-model="queryParams.dccCode" :options="dccOption" :disabled="_isDcc"></b-form-select>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-4">
                            <b-form-fieldset horizontal label="市场活动" :label-cols="4" class="text-right">
                                <b-form-input v-model="queryParams.marketName"/>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <iris-car :showCar="false" :col="3" :initData="intentionCarInfoVos[0]" ref="dccCar" @callBack="backSkuCar" @validete="validateCar"></iris-car>
                    <div class="row">
                        <div class="col-md-4">
                            <b-form-fieldset horizontal label="创建日期" :label-cols="4" class="text-right">
                                <el-date-picker
                                  v-model="timeStep"
                                  type="daterange"
                                  placeholder="选择日期"
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期">
                                </el-date-picker>
                            </b-form-fieldset>
                        </div>
                        <!-- 客户类型选择 -->
                        <div class="col-md-4">
                            <b-form-fieldset horizontal label="客户类型" :label-cols="4" class="text-right">
                                <b-form-select v-model="queryParams.customType" :options="customTypeOpts"/>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <search-btn @reset="reset" @query="query(1)"></search-btn>
                </b-card>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <b-card>
                    <div class="row">
                        <div class="col-md-12">
                            <router-link to="/dccthread/addclientmain">
                                <b-button size="sm" variant="success" v-b-modal.insert>新增</b-button>
                            </router-link>
                            <v-upload
                                :disabled= "false"
                                :addParams="addParams"
                                :buttonName='buttonName'
                                :analysisExcel="analysisExcel"
                                :url="analysisUrl"
                                :showBack="showBack"
                                >
                            </v-upload>
                            <b-button size="sm" variant="" @click="downLoadData">导出</b-button>
                            <b-button size="sm" variant="" @click="downLoad">预设模板导出</b-button>
                        </div>
                    </div>
                    <div class="table-scrollable mb-2">
                        <!-- min-width: 1400px  这里不折行     min-width: 1300px 折行 -->
                        <table class="table table-striped table-bordered" style="min-width: 1400px">
                            <thead>
                                <tr class="text-center">
                                    <th class="text-center">序号</th>
                                    <th class="text-center">线索编码</th>
                                    <th class="text-center">用户名</th>
                                    <th class="text-center">客户来源</th>
                                    <th class="text-center">客户类型</th>
                                    <th class="text-center">手机号</th>
                                    <th class="text-center">销售顾问</th>
                                    <th class="text-center">所属DCC</th>
                                    <th class="text-center">品牌</th>
                                    <th class="text-center">车系</th>
                                    <th class="text-center">车型</th>
                                    <th class="text-center">意向级别</th>
                                    <th class="text-center">创建时间</th>
                                    <th class="text-center">指派时间</th>
                                </tr>
                            </thead>
                            <tbody class="text-center">
                                <tr v-for="(item, index) in datalist" class="text-center" :key="item.leadCode">
                                    <td class="text-center">{{index+startRow}}</td>
                                    <td class="text-center">
                                        <a href="#" @click.stop.prevent="toPage(item.leadCode)">{{item.leadCode}}</a>
                                    </td>
                                    <td class="text-center">
                                        {{item.customName}}
                                    </td>
                                    <td class="text-center">{{item.channelName}}</td>
                                    <td class="text-center">{{customFilter(item.customType)}}</td>
                                    <td class="text-center">{{item.mobilePhone}}</td>
                                    <td class="text-center">{{item.scName}}</td>
                                    <td class="text-center">{{item.createByName}}</td>
                                    <td class="text-center">{{item.intentionCarInfoVos?(item.intentionCarInfoVos[0] ? item.intentionCarInfoVos[0].brandName : ''):''}}</td>
                                    <td class="text-center">{{item.intentionCarInfoVos?(item.intentionCarInfoVos[0] ? item.intentionCarInfoVos[0].seriesName : ''):''}}</td>
                                    <td class="text-center">{{item.intentionCarInfoVos?(item.intentionCarInfoVos[0] ? item.intentionCarInfoVos[0].modelName : ''):''}}</td>
                                    <td class="text-center">{{item.intentionLevelName}}</td>
                                    <td class="text-center">{{item.createTimeStr}}</td>
                                    <td class="text-center">{{item.assignmentTime | dateRemoveMs}}</td>
                                </tr>
                                <tr v-if="datalist.length==0">
                                    <td colspan='14' class="text-left">暂无数据...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                          <pagination class="pull-right" @page-change="pageChange" :page-no="pageNo" :page-size="pageSize" :total-result="totalResult" :total-pages="totalPages">
                          </pagination>
                        </div>
                    </div>
                </b-card>
            </div>
        </div>
        <b-modal id="dcc" ref="dcc" size="lg" hide-footer :title="'线索导入状态提示'">
            <div class="text-center">
                {{statusInfo}}
            </div>
            <div class="mb-2 mt-5 text-right">
                <b-button variant="info" size="sm" @click="hide">确定</b-button>
                <b-button variant="success" size="sm" @click="downLoadErrorInfo" v-if="statusInfo">下载未导入的信息</b-button>
            </div>
        </b-modal>
    </div>
</template>
<script>
    import Vue from 'vue'
    import Pagination from 'components/pagination/pagination'
    import api from 'common/api'
    import config from "common/config";
    import common from 'common/common'
    import SearchBtn from 'components/searchBtn/searchBtn'
    import areaqueryshop from '../../components/iris-areaqueryshop'
    import VUpload from 'components/iris-upload'
    import IrisCar from 'components/iris-car'
    import {
        MessageBox,
        Message,
        DatePicker
    } from 'element-ui'
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    Vue.component(MessageBox.name, MessageBox,DatePicker)
    Vue.use(DatePicker);
    //用use会在页面一加载的时候弹出一个框来
    export default {
        components: {
            Pagination,
            SearchBtn,
            areaqueryshop,
            VUpload,
            IrisCar
        },
        data() {
            return {
                //客户类型选项
                customTypeOpts: [],
                followStatus: [
                    {
                        text: '全部',
                        value: ''
                    },
                    {
                        text: '已逾期',
                        value: 1
                    },
                    {
                        text: '未逾期',
                        value: 0
                    }
                ],
                startRow: '1',
                salesStatusList: config.addclientmain.salesList,
                clueStatusList: config.addclientmain.clueList,
                intentionCarInfoVos: [],
                statusInfo: '',
                downLoadErrorParams: {
                    status: 0,
                    importBatchNo: ''
                },
                showBack: {},
                buttonName: '导入',
                addParams: {
                    relationCode: "",
                    singleFlag: '1',
                    businessType: ''
                },
                analysisUrl: config.addclientmain.analysisUrl,
                //名单状态选择项
                status:config.addclientmain.status,
                datalist: [],
                datalistobj: {},
                intentionLeveOption:[],
                channelMode:[{text:'请选择',value:''}],
                //dcc
                dccOption: [],
                //sc
                appointmentInfoOption:[],
                queryParams: {
                    customType: '', //客户类型
                    followStatus: '', //跟进状态
                    leadsStstusCode:'',
                    leadType:'',
                    appointment:'', //是否预约,
                    followUp:'',    //跟进时间
                    querySalesLeadsInfoList: '', //跟进状态
                    appointmentTime:'',  //预约时间
                    mobilePhone: '', //手机号
                    customName: '',//客户名字
                    // staticPhone: '',// 固定电话
                    salesStstusCode: '',
                    dccCode:'',
                    marketName: '',
                    brandCode: '',
                    seriesCode:'',
					          modelCode:'',
                    carCode: '',
                    relationTypeCode: config.addclientmain.relationTypeCode,
                    salesAreaCodes:[],
                    storeCodes:[],
                    leadCode:'',
                    scCode:'',
                    channelCode:'',
                    intentionLevelCode:'',
                    pageNums:config.pageNums,
                    pageStart:1
                },
                checkeddata: false,
                pageNo: 1,
                pageSize: 1,
                totalResult: 0,
                totalPages: 0,
                downLoadDataParams: '',
                timeStep: [],
                empInfo: {
                    postnTypes: []
                }
            }
        },
        created(){
            //debugger;
            var $this = this;
            //级别
            api.ref.getDataDictionary({refCode:config.addclientmain.intentonLevel}).then(function(res){
                if(res.data.code = 'success' && res.data.obj){
                    $this.setOptionData(res.data.obj.referenceDetailInfos, $this.intentionLeveOption);
                    $this.intentionLeveOption.sort(common.by("text"));
                    $this.intentionLeveOption.unshift({text:'请选择',value:''});
                }
            });
            //客户类型
            api.ref.getDataDictionary({refCode:config.client.clienttypecode}).then(function(res){
                if(res.data.code = 'success' && res.data.obj){
                    $this.setOptionData(res.data.obj.referenceDetailInfos, $this.customTypeOpts);
                    $this.customTypeOpts.sort(common.by("text"));
                    $this.customTypeOpts.unshift({text:'请选择',value:''});
                }
            });
            //渠道
            api.ref.getDataDictionary({
                refCode:config.addclientmain.channelCode}).then(function(res){
                if(res.data.code == "success" && res.data.obj){
                    $this.setOptionData(res.data.obj.referenceDetailInfos, $this.channelMode);
                }
            });
            // 用户登录信息
            api.toLogin.getLoginInfo({})
               .then(res => {
                   if (res.data.code === 'success') {
                       $this.empInfo = res.data.obj
                       if (this.empInfo.postnTypes.indexOf(config.postnTypeCode.dcc) >= 0) {
                           $this.queryParams.dccCode = $this.empInfo.empVo.empCode
                       }
                   }
               })
        },
        watch:{
            _storeCode:function(val){
                this.getScList(val);
                this.getDccList(val);
            }
        },
        methods: {
            // 点击某条线索打开新页面
            toPage(code){
                let url = process.env.NODE_ENV === 'development' ? window.location.origin + `/dccthread/addclientmain/${code}` : window.location.origin + `/livepro/dccthread/addclientmain/${code}`
                window.open(url)
            },
            // 过滤客户类型
            customFilter(val){
              let result;
              if(this.customTypeOpts.length > 0){
                result = this.customTypeOpts.filter((item) => {
                  return item.value === val
                })
              }
              return result[0]?result[0].text:'';
            },
            //dcc二期新需求
            backSkuCar(val) {
                const $this = this
                for (let i in val) {
                    $this.queryParams[i] = val[i]
                }
            },
            validateCar() {},
            hide() {
                this.$refs.dcc.hide()
            },
            //下载模板
            downLoad: function() {
                api.receptionist.downLoad({relationCode: config.addclientmain.relationCode}, (res) => {
                    window.location.href = res.data.obj[0].fileRelativePath
                })
            },
            //下载未上传的数据
            downLoadErrorInfo: function() {
                api.receptionist.downLoadErrorInfo(this.downLoadErrorParams, (res) => {
                    window.location.href = res.data.obj.fileRelativePath

                })
            },
            //解析数据
            analysisExcel: function(res) {
                if (res.data.obj === null) {
                    Message({
                        type: "success",
                        message: "解析成功"
                    });
                } else {
                    this.statusInfo = res.data.message
                    this.downLoadErrorParams.importBatchNo = res.data.obj
                    this.$refs.dcc.show()
                }
            },
            // showBack: function() {},
            setOptionData(data, obj){
                for(var i = 0, len = data.length; i < len; i++){
                    obj.push({text:data[i].refDetailName,value:data[i].refDetailCode});
                }
            },
            selectedfun(area, store){
                this.queryParams.storeCodes.length = 0;
                this.queryParams.salesAreaCodes.length = 0;
                if(!Array.isArray( store )){
                    var store = [store];
                }
                if(store.length == 1){
                    //this.getScList(store[0].value);
                }
                for(var i = 0, len = store.length; i<len; i++){
                    if(store[i].value){
                        this.queryParams.storeCodes.push(store[i].value);
                    }
                }
                for(var i = 0, len = area.length; i < len;i++){
                    this.queryParams.salesAreaCodes.push(area[i].code);
                }
            },
            getDccList: function(val) {
                var $this = this;
                if(!val)return;
                api.receptionist.queryWorkList({
                    storeCode: val,
                    postnTypeCode: config.postnTypeCode.dcc
                }).then(function(res){
                    if(res.data.code == 'success'){
                        var data = res.data.obj;
                        $this.dccOption = []
                        $this.dccOption.push({text:'请选择',value:''});
                        for(var i = 0, len = data.length; i < len; i++){
                            $this.dccOption.push({text:data[i].empCnName,value:data[i].empCode});
                        }
                    }
                })
            },
            getScList(val){
                var $this = this;
                if(!val)return;
                api.receptionist.queryWorkList({
                    storeCode: val,
                    postnTypeCode: config.postnTypeCode.sc
                }).then(function(res){
                    if(res.data.code == 'success'){
                        var data = res.data.obj;
                        $this.appointmentInfoOption = []
                        $this.appointmentInfoOption.push({text:'请选择',value:''});
                        for(var i = 0, len = data.length; i < len; i++){
                            $this.appointmentInfoOption.push({text:data[i].empCnName,value:data[i].empCode});
                        }
                    }
                })
            },
            update() {},
            // 查询
            query(arg) {
                if(!common.isTel(this.queryParams.mobilePhone)){
                    Message.error(config.messInfo.mobileFail);
                    return;
                }
                var $this = this;
                this.queryParams.pageStart = arg ? 1 : this.queryParams.pageStart;
                $this.datalist = [];
                this.queryParams.followUp = common.eleTimeFormat(this.queryParams.followUp);
                this.queryParams.appointmentTime = common.eleTimeFormat(this.queryParams.appointmentTime);
                this.downLoadDataParams = Object.assign({}, this.queryParams);
                if ($this.timeStep && $this.timeStep[0] && $this.timeStep[1] && $this.timeStep.length > 0) {
                   let timeOne = $this.timeStep[0]
                   let timeTwo = $this.timeStep[1]
                   $this.$data.queryParams.createStartDate = timeOne.getFullYear() + '-' + (timeOne.getMonth() + 1) + '-' + timeOne.getDate()
                   $this.$data.queryParams.createEndDate = timeTwo.getFullYear() + '-' + (timeTwo.getMonth() + 1) + '-' + timeTwo.getDate()
               } else {
                   $this.$data.queryParams.createStartDate = ''
                   $this.$data.queryParams.createEndDate = ''
               }
                // 调取查询接口
                api.CustomType.querySalesLeadsInfoList($this.queryParams,res => {
                      if(res.data.code === 'success') {
                          console.log(res.data.obj.list);
                        var list = res.data.obj.list;
                        $this.datalist = res.data.obj.list;
                        $this.pageNo = res.data.obj.pageNum;
                        $this.totalPages = res.data.obj.pages;
                        $this.pageSize = res.data.obj.pageSize;
                        $this.totalResult = res.data.obj.total;
                        $this.startRow = res.data.obj.startRow;
                    }
                })
            },
            reset() {
                this.$refs.dccCar.clear()
                this.$refs.dccCar.once();
                this.queryParams.brandCode = '';
                this.queryParams.salesStstusCode = '';
                this.queryParams.marketName = '';
                this.queryParams.leadType = '';
                this.queryParams.appointment = '';
                this.queryParams.followUp = '';
                this.queryParams.appointmentTime = '';
                this.queryParams.leadsStstusCode = '';
                this.queryParams.mobilePhone = '';
                this.queryParams.customName = '';
                this.queryParams.followStatus = '';
                this.queryParams.customType = '';
                if (!this._isDcc) {
                   this.queryParams.dccCode = ''
                }
                this.queryParams.salesAreaCodes = [];
                this.queryParams.storeCodes = [];
                this.queryParams.leadCode = '';
                this.queryParams.channelCode = '';
                this.queryParams.intentionLevelCode = '';
                this.queryParams.scCode = '';
                this.timeStep = []
                this.queryParams.pageNums = config.pageNums;
                this.queryParams.pageStart = 1;
            },
            pageChange(page) {
                this.queryParams.pageStart = page
                this.query();
            },
            removeTree(item) {},
            checked(item) {},
            downLoadData() {
               if(this.downLoadDataParams === '') {
                   Message({
                        type: "warning",
                        message: "请查询线索！"
                    });
                    return;
               }
                //导出表格
                //   api.addclientmain.downLoadData(this.queryParams,function(res){
                //     if(res.data.code == 'success'){
                //         if(res.data.obj === null ) {
                //             Message({
                //                 type: "warning",
                //                 message: "未查询到数据！"
                //             });
                //             return;
                //         }else {
                //             let url =common.getOrigin() + res.data.obj;
                //             location.href = url;
                //         }
                //     }
                // })
                //新增数据到导出中心
                api.ordinalInfo.getSequence({ serviceCode: 'FILEEXPORTSEQ' }, res => {
                    if(res.data.code == 'success'){
                        console.log(res.data.obj);
                        let fileExportType = res.data.obj
                        this.queryParams.exportFileStatus = 1
                        let options = {
                            fileExportCode: fileExportType,
                            fileExportType: config.fileExportType.fileExportTypeLeads,
                            fileRelactionCode: 'ExportTemplateSalesLeadsList',
                            parameters: this.queryParams
                        }
                        api.downLoad.insertFileExportInfo(options, res => {
                            if(res.data.code == 'success'){
                                MessageBox.confirm("请在导出中心下载生成的文件", "提示", {
                                confirmButtonText: "确定",
                                cancelButtonText: "取消",
                                type: "warning"
                                })
                            }
                        })
                    }
                })


            },
            cusTomList() {

            }
        },
        computed: {
            _storeCode(val){
                return this.queryParams.storeCodes[0];
            },
            _isDcc() {
                return (this.empInfo.postnTypes.indexOf(config.postnTypeCode.dcc) >= 0)
            }
        },
        mounted() {
            let _this = this
            if(_this.$route.query.from){
                api.toLogin
               .getLoginInfo({})
               .then(res => {
                   if (res.data.code === 'success') {
                       _this.empInfo = res.data.obj
                       if (_this.empInfo.postnTypes.indexOf(config.postnTypeCode.dcc) >= 0) {
                           _this.queryParams.dccCode = _this.empInfo.empVo.empCode
                       }
                       _this.query()
                   }
               })
            }

        }
    }
</script>
<style lang="css" scoped>
</style>
