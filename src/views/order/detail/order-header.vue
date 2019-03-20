<template>
<div class="row">
<div class="col-md-12">
    <b-card>
        <!-- <div slot="header" >
            <strong>订单头信息</strong>
        </div>  -->
        <div class="row">
            <div class="col-md-4">
                <p>
                    <strong>订单号 : </strong>
                    <span>{{orderDetailObj.orderNo}}</span>                  
                </p>
            </div>
            <div class="col-md-4">
                <p>
                    <strong>门店 : </strong>
                    <span>{{orderDetailObj.storeName}}</span>                  
                </p>
            </div>
            <div class="col-md-4">
                <p>
                    <strong>销售顾问 : </strong>
                    <span>{{orderDetailObj.salesEmpName}}</span>                  
                </p>
            </div>
            <div class="col-md-4">
                <p>
                    <strong>销售类型 : </strong>
                    <span>{{salesType}}</span>                  
                </p>
            </div>
            <div class="col-md-4">
                <p>
                    <strong>订单客户 : </strong>
                    <span>{{orderDetailObj.custName}}</span>                  
                </p>
            </div>
            <div class="col-md-4">
                <p>
                    <strong>客户电话 : </strong>
                    <span>{{orderDetailObj.custMobile}}</span>                  
                </p>
            </div>
            <div class="col-md-4">
                <p>
                    <strong>订单总价 : </strong>
                    <span>{{ orderDetailObj.actualTotalPrice ?orderDetailObj.actualTotalPrice.toFixed(2) : '' }}</span>                  
                </p>
            </div>
            <div class="col-md-4">
                <p>
                    <strong>上牌类型 : </strong>
                    <span>{{plateType}}</span>                  
                </p>
            </div>
        </div>
        <div class="row"> 
            <div class="col-md-12 text-right">
                <b-button v-if="isShowPrint" size="sm" variant="success" @click="printBefore">文件打印</b-button>
            </div>
        </div>
    </b-card>
</div>
<!--打印列表弹层-->
<b-modal v-model="printModalShow" :title="modalTitle">
    <b-container fluid>
        <div v-if="filePrint">
            <div class="row">
                <div class="col-md-6" style="line-height: 40px;" v-for="(item, index) in refDetailSubInfo" :key="index">
                    <a href="javascript:;" @click="toPrintDefine(item)">{{item.refDetailName}}</a>
                </div>
            </div>
        </div>

        <div v-if="!filePrint">
            <div class="row">
                <div class="col-md-4" style="padding-left: 30px;">序号</div>
                <div class="col-md-4">注释</div>
                <div class="col-md-4">取值</div>
            </div>
            <div class="row">
                <div class="printDefine" v-for="(item,index) in printDefineList" :key="index" style="line-height: 40px;">
                    <div class="indexNo text-center">{{index + 1}}</div>
                    <div class="annotation text-center">{{item.value}}</div>
                    <div class="valueAvailble">
                        <b-form-input type="text" v-model="item.num" />&nbsp;&nbsp;天
                    </div>
                </div>
            </div>
            <div class="row" style="padding: 10px 0 0 10px;" >
                <b-form-checkbox v-model="pageCarStatus" id="checkbox1" :value="pageCar" unchecked-value="">
                    {{pageCar}}
                </b-form-checkbox>
                <b-form-checkbox v-model="brokenCarStatus" id="checkbox2" :value="brokenCar" unchecked-value="">
                    {{brokenCar}}
                </b-form-checkbox>
            </div>
            <div class="row" style="margin-top: 50px;"> 
                <div class="col-md-12 text-center">  
                    <b-button size="sm" variant="success" @click="printBeforeDefine">打印</b-button>
                </div>
            </div>
        </div>

    </b-container>
    <div slot="modal-footer" class="w-100">
    </div>
</b-modal>

</div>
</template>
<script>
import api from 'common/api'
import apiUls from 'common/api-url'
import { getRefDetail, getType } from 'common/com-api'
import { hasBtn } from 'common/com-api'
import {mapActions, mapGetters} from 'vuex'
import common from 'common/common'

const SALES_TYPE = 'orderAddInfoCarSalesSubKind',
      PLATE_TYPE = 'orderAddInfoPlateType',
      PAGE_CAR = '此车为打包价车辆，不予退补。',
      BROKEN_CAR = '此车为瑕疵车辆，甲方已经如实告知乙方关于车辆的实际状况，并已经在车价上予以折让，合同第二项是折让后的价格，乙方已经知晓实情并接受折让，且放弃今后对该车辆的一切主张。'

export default {
    computed: {
        ...mapGetters('order', [
            'orderDetailObj'
        ]),
        isShowPrint() {
            return hasBtn(apiUls.printTicket.contact)
        }
    },
    data() {
        return {
            refDetailSubInfo: [], //多合同数据
            printModalShow: false,  //控制打印列队弹层的显示隐藏状态
            filePrint: false,       //控制打印自定义弹窗的显示隐藏状态
            modalTitle: '合同打印',
            salesType: '',
            plateType: '',
            cutOffTime: '',
            orderTime: '',
            printItemDetail: '',
            show: true,
            printDefineList: [],
            pageCar: PAGE_CAR,       // ‘打印自定义’弹窗的多选框对应的内容
            brokenCar: BROKEN_CAR,
            pageCarStatus: '',       // ‘打印自定义’弹窗的多选框选中与否对应的值
            brokenCarStatus: ''    
        }
    },
    mounted() {
        this.getData()

    },
    methods: {
        hasBtn(url) {
            let userInfo = JSON.parse(common.getSession('userInfo'))
            if(!userInfo) {
                return false
            }
            if(userInfo.hasOwnProperty('menuUrls')) {
                const _urlMap = userInfo.menuUrls
                return _urlMap.hasOwnProperty(`/api${url}`) 
            }else {
                return false
            }

        },
        // 页面“文件打印”按钮
        printBefore(){
            getType('ContractPrintRelationInfo', (res) => {
                if(res.refDetailSubInfo === null){
                    this.print(this.$route.params.id, 'orderNo');
                }else{
                    this.refDetailSubInfo = res;
                    this.printModalShow = true;
                    this.filePrint = true;
                }
            })
        },
        // 在‘打印自定义’弹窗内点击打印按钮
        printBeforeDefine(){
            let addMap = {}
            this.printDefineList.map( (item)=>{
                addMap[item.code] = Number(item.num)
            })
            this.printItemDetail["addMap"] = addMap
            this.printItemDetail["addMap"].remark1 = this.pageCarStatus ? this.pageCarStatus : ''
            this.printItemDetail["addMap"].remark2 = this.brokenCarStatus ? this.brokenCarStatus : ''
            this.refDetailPrint(this.printItemDetail)
        },
        // 点击打印列表内某合同
        // 若addField2的值等于contractVersion时，是绿地合同；当orderAddInfos数组中的元素的addCode值等于orderAddApprovalNum时，判断其addValue是否大于1。大于1就取addCode值等于orderAddContractNo时对应的addValue值，并带入弹出的历史版本弹窗；反之不弹。
        toPrintDefine(data){
            if(data.addField2 == 'contractVersion'){  //绿地合同
                let test = [{code: '', num: '', value: ''},{code: '', num: '', value: ''}]
                this.orderDetailObj.orderAddInfos.forEach(ele => {
                    if(ele.addCode == 'orderAddContractNo' && ele.addValue && ele.addValue.length > 0){ 
                        test[0] = {code: ele.addCode, num: ele.addValue.split('-')[1], value: ele.addValue}
                    }
                    if(ele.addCode == 'orderAddApprovalNum' && ele.addValue && ele.addValue.length > 0){
                        test[1] = {code: ele.addCode, num: ele.addValue, value: ele.addValue}
                    }
                });
                // 判断是否有历史版本
                if(test[1].num && Number(test[1].num) > 1){     //有历史版本
                    let note = '该合同存在历史版本" ' + test[0].value + ' "，请确保收回已交付客户的合同文件并作废。'
                    this.$confirm( note , '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => { this.defineModalOut(data) })
                    .catch(() => {})
                }else{                                          //无历史版本
                    this.defineModalOut(data)
                }
               
            }else{                             //非绿地集团合同
                this.defineModalOut(data)
            }
        },
        // '打印自定义' 弹窗显隐控制
        defineModalOut(data){
            if(data.refDetailRemark){
                const obj = JSON.parse(data.refDetailRemark)
                let arr = [];
                for( let i in obj){
                    let o = {};
                    o.code = i;
                    o.value = obj[i];
                    o.num = 0;
                    this.orderDetailObj.orderAddInfos.map( (item,index)=>{   // 遍历该数组找到与o.code对应的字段code，取其值
                        if(o.code == item.addCode){
                            if(item.addValue){
                                o.num = item.addValue
                            }
                        }
                    })
                    arr.push(o);
                }
                this.printDefineList = arr;
                this.filePrint = false;
                this.modalTitle = '打印自定义'
                this.printItemDetail = data;
            }else{
                this.refDetailPrint(data)
            }
        },
        // 打印合同
        refDetailPrint(data){
            let options = {}
            if(data.addMap){
                options = {
                    orderNo: this.$route.params.id,
                    refDetailCode: data.refDetailCode,
                    addMap: data.addMap
                }
            }else{
                options = {
                    orderNo: this.$route.params.id,
                    refDetailCode: data.refDetailCode
                }
            }
            
            this.print(JSON.stringify(options), 'orderInfo');
        },
        print(data, name) {
            var temp_form = document.createElement("form");  
                temp_form.action = '/api' + apiUls.printTicket.contact;      
                temp_form.target = "_blank";
                temp_form.method = "post";      
                temp_form.style.display = "none"; 
                var opt = document.createElement("input");
                opt.type = 'hidden';
                opt.name = name;
                opt.value = data;
                temp_form.appendChild(opt);
                document.body.appendChild(temp_form);
                temp_form.submit();
        },
        getData() {
            const params = {
                orderNo: this.$route.params.id,
                allSubOrderFlag:  true
            }
            this.setDetailObj(params)
        },
        getTypes() {
            let addInfoList = this.orderDetailObj.orderAddInfos
            for(let i = 0, len = addInfoList.length; i < len; i ++ ) {
                if(addInfoList[i].addCode === SALES_TYPE) {
                    this.salesType = addInfoList[i].addValueName
                }else if(addInfoList[i].addCode === PLATE_TYPE) {
                    this.plateType = addInfoList[i].addValueName
                }
            }
        },
        ...mapActions({
            setDetailObj: 'order/setOrderDetailObj'
        })
    },
    watch: {
        orderDetailObj() {
            this.getTypes()
        }
    }
}
</script>

<style scoped>
    .printDefine{
        width: 100%;
        display: flex;
    }
    .printDefine>.indexNo{
        flex: 1;
    }
    .printDefine>.annotation{
        flex: 2;
    }
    .printDefine>.valueAvailble{
        flex: 2;
    }
    .printDefine>.valueAvailble>.form-control{
        width: 70%;
        display: inline-block;
    }
</style>

