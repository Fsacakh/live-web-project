<template>
    <div>
        <b-card>
            <div class="row">
                <div class="col-md-4"  v-show="isShow">
                    <b-form-fieldset horizontal label="销售区域" label-text-align="right" :label-cols="4">
                        <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop >
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="时间范围" label-text-align="right" :label-cols="4">
                        <el-date-picker
                        v-model="exportTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                    <div class="col-md-12">
                        <b-form-fieldset horizontal>
                            <b-button class=" pull-right" size="sm" variant="btn btn-success" @click="exportTab">导出</b-button>
                        </b-form-fieldset>
                    </div>
                </div>
        </b-card>
    </div>
</template>
<script>
import areaqueryshop from 'components/iris-areaqueryshop'
import common from '../../../common/common'
import api from '../../../common/api'
import config from '../../../common/config'
import { DatePicker, MessageBox, Message } from 'element-ui'
export default {
    data () {
        return {
            isShow: true,
            exportTime: '',
            storeCode: ''
        }
    },
    methods:{
        selectStores: function(sales, stores) {
            let _this = this;
            if (stores.hasOwnProperty("value")) {
            _this.storeCode = stores.value === 0 ? '' : stores.value;
            }else{
                _this.storeCode = '';
            }
        },
        //导出方法
        exportTab(){
            if(this.storeCode && common.eleTimeFormat(this.exportTime[0])){
                api.ordinalInfo.getSequence({serviceCode: 'FILEEXPORTSEQ'}, res => {
                    if(res.data.code === 'success'){
                        var fileExportType = res.data.obj
                        let options = {
                            fileExportType: config.fileExportType.FileExportTypeSkuOrder,
                            fileExportCode: fileExportType,
                            fileRelactionCode: 'FileExportTypeSkuOrder',
                            parameters: {
                                storeCode: this.storeCode,
                                dateStart: common.eleTimeFormat(this.exportTime[0]),
                                dateEnd: common.eleTimeFormat(this.exportTime[1]),
                                exportFileStatus: 1    //新增字段,后台用于异步下载
                            }
                        }

                        api.downLoad.insertFileExportInfo(options, (res) => {
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
            }else{
                Message({
                    message: '门店信息或时间为空',
                    type: 'info'
                });
            }
            
        }
    },
    components: {
        areaqueryshop
    }
}
</script>
<style lang="scss" scoped>

</style>


