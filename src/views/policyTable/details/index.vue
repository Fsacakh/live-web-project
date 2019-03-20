<template>
    <div class="animated">
        <b-card :header="typeText">
            <div class="row">
                <div class="col-md-4">
                     <b-form-fieldset horizontal label="名称 *" :label-cols="4" class="text-right">
                        <b-form-input :state="policyTableNameStatus" :disabled="isEdit" v-model="policyTableName"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">  
                    <b-form-fieldset horizontal label="所属门店" :label-cols="4" label-text-align="right">
                        <areaqueryshop ref="areaShop" @select-change="selectStores"></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <div class="row">
                        <b-form-fieldset horizontal label="年/月 *" :label-cols="4" label-text-align="right">
                            <date-picker v-model="yearMonth" type="month" :disabled="isEdit">
                            </date-picker>
                        </b-form-fieldset>
                    </div>

                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <!-- 隐藏查询 -->
                    <!-- <div class="pull-right" v-if="!type">
                        <b-button size="sm" @click="clear">重置</b-button>
                        <b-button size="sm" variant="primary" @click="search">查询</b-button>
                    </div> -->
                    <div class="pull-right" v-if="type">
                        <b-button v-show="isShow" size="sm" @click="clear">取消</b-button>
                        <b-button v-if="newAddBtn && isShow" size="sm" variant="primary" @click="newAdd">保存</b-button>
                    </div>
                </div>
            </div>
        </b-card>

        <b-card v-if="isExpose">
            <div>
                <b-button v-if="!isEdit && editCrossDeptKpiInfoListBtn" size="sm" variant="primary" @click="editCrossDeptKpiInfoList()">保存</b-button>
                <b-button v-if="downloadBtn" size="sm"  @click="download()">导出</b-button>
            </div>
            <div class="table-scrollable private">

                <table aria-busy="false" class="table b-table table-bordered">
                    <thead class="">
                        <tr>
                            <th class=""><div></div></th>
                            <th class=""><div>业务目标</div></th>
                            <th class=""><div>业务目标上月实际</div></th>
                            <th class=""><div>业务KPI</div></th>
                            <th class=""><div>业务KPI上月表现</div></th>
                            <th class=""><div>业务KPI本月目标(%)</div></th>
                            <th class=""><div>业务目标本月预计</div></th>
                            <th class=""><div>本月初始线索数</div></th>
                            <th class=""><div>业务KPI本月实际</div></th>
                            <th class=""><div>业务目标本月实际</div></th>
                            <th class=""><div>结果</div></th>
                            <th class=""><div>结果责任部门</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowspan="5">展厅转化</td>
                            <td>交车数</td>
                            <td>{{allcrossDeptFinishCarCount}}</td>
                            <td rowspan="5" style="padding:0;">
                                <div class="td">
                                    订单交车率
                                </div>
                                <div class="td">
                                    报价订单率
                                </div>
                                <div class="td">
                                    进店线索报价率
                                </div>
                                <div class="td">线索进店率</div>
                            </td>
                            <td rowspan="5"  style="padding:0;">
                                <div class="td">
                                    {{allcrossDeptFinishCarCount/allcrossDeptCreateOrderCount | MathFloor2}}%
                                </div>
                                <div class="td">
                                    {{allcrossDeptCreateOrderCount/allcrossDeptCreateQuoteCount | MathFloor2}}%
                                </div>
                                <div class="td">
                                    {{ allcrossDeptCreateQuoteCount/allcrossDeptInStoreLeadCount | MathFloor2  }}%
                                </div>
                                <div class="td">
                                    {{allcrossDeptInStoreLeadCount/allcrossDeptLeadCount | MathFloor2}}%
                                </div>
                            </td>
                            <td rowspan="5"  style="padding:0;">
                                <div class="td">
                                    <input type="text" :disabled="isEdit" v-model="row1"> %
                                </div>
                                <div class="td">
                                    <input type="text" :disabled="isEdit" v-model="row2"> %
                                </div>
                                <div class="td">
                                    <input type="text" :disabled="isEdit" v-model="row3"> %
                                </div>
                                <div class="td">
                                   <input type="text" :disabled="true" v-model="row4"> %
                                </div>
                            </td>
                            <td><input type="text" :disabled="isEdit" v-model="rowA"></td>
                            <td rowspan="5"></td>
                            <td>{{currentallcrossDeptFinishCarCount}}</td>
                            <td rowspan="5"  style="padding:0;">
                                <div class="td">
                                    {{currentallcrossDeptFinishCarCount/currentallcrossDeptCreateOrderCount | MathFloor2}}%
                                </div>
                                <div class="td">
                                    {{currentallcrossDeptCreateOrderCount/currentallcrossDeptCreateQuoteCount | MathFloor2}}%
                                </div>
                                <div class="td">
                                    {{currentallcrossDeptCreateQuoteCount/currentallcrossDeptInStoreLeadCount | MathFloor2}}%
                                </div>
                                <div class="td">
                                    {{currentallcrossDeptInStoreLeadCount/currentallcrossDeptLeadCount | MathFloor2}}%
                                </div>
                            </td>
                            <td>交车数</td>
                            <td rowspan="5"  style="padding:0;">
                                <div class="td">
                                    <b-form-select :disabled="isEdit" v-model="responsibilityA" :options="positionOpton"></b-form-select>
                                </div>
                                <div class="td">
                                    <b-form-select :disabled="isEdit" v-model="responsibilityB" :options="positionOpton"></b-form-select>
                                </div>
                                <div class="td">
                                    <b-form-select :disabled="isEdit" v-model="responsibilityC" :options="positionOpton"></b-form-select>
                                </div>
                                <div class="td">
                                    <b-form-select :disabled="isEdit" v-model="responsibilityD" :options="positionOpton"></b-form-select>
                                </div>
                            </td>
                        </tr>
                        <tr>

                            <td>订单数</td>
                            <td>{{allcrossDeptCreateOrderCount}}</td>



                            <td>{{text1}}</td>

                            <td>{{currentallcrossDeptCreateOrderCount}}</td>

                            <td>订单数</td>

                        </tr>
                        <tr>

                            <td>报价数</td>
                            <td>{{allcrossDeptCreateQuoteCount}}</td>



                            <td>{{text2}}</td>

                            <td>{{currentallcrossDeptCreateQuoteCount}}</td>

                            <td>报价数</td>

                        </tr>
                        <tr>

                            <td>进店线索数</td>
                            <td>{{allcrossDeptInStoreLeadCount}}</td>



                            <td>{{text3}}</td>

                            <td>{{currentallcrossDeptInStoreLeadCount}}</td>

                            <td>进店线索数</td>

                        </tr>
                        <tr>

                            <td>线索数</td>
                            <td>{{allcrossDeptLeadCount}}</td>



                            <td>{{leadTotal}}</td>

                            <td>{{currentallcrossDeptLeadCount}}</td>

                            <td>线索数</td>

                        </tr>




                        <tr>
                            <!--活跃-->
                            <td rowspan="2">{{tableVerticalTitle.LeadsChannelActive}}</td>
                            <td>进店线索数</td>
                            <td>{{LeadsChannelActivecrossDeptInStoreLeadCount}}</td>
                            <td rowspan="2">活跃线索再次进店率</td>
                            <td rowspan="2">{{LeadsChannelActivecrossDeptInStoreLeadCount/LeadsChannelActivecrossDeptLeadCount | MathFloor2}}%</td>
                            <td rowspan="2"><input :disabled="isEdit" type="text" v-model="row5"> %</td>
                            <td>{{text4}}</td>
                            <td></td>
                            <td>{{currentLeadsChannelActivecrossDeptInStoreLeadCount}}</td>
                            <td rowspan="2">{{currentLeadsChannelActivecrossDeptInStoreLeadCount/currentLeadsChannelActivecrossDeptLeadCount | MathFloor2}}%</td>
                            <td>进店线索数</td>
                            <td><b-form-select :disabled="isEdit" v-model="responsibilityE" :options="positionOpton"></b-form-select></td>
                        </tr>
                        <tr>
                            <td>线索数</td>
                            <td>{{LeadsChannelActivecrossDeptLeadCount}}</td>
                            <td>{{beginningLeadsNum1}}</td>
                            <td>{{beginningLeadsNum1}}</td>
                             <td>{{currentLeadsChannelActivecrossDeptLeadCount}}</td>
                             <td>线索数</td>
                             <td><b-form-select :disabled="isEdit" v-model="responsibilityF" :options="positionOpton"></b-form-select></td>
                        </tr>


                        <tr>
                            <!--休眠-->
                            <td rowspan="2">{{tableVerticalTitle.LeadsChannelDormancy}}</td>
                            <td>进店线索数</td>
                            <td>{{LeadsChannelDormancycrossDeptInStoreLeadCount}}</td>
                            <td rowspan="2">休眠线索再次进店率</td>
                            <td rowspan="2">{{LeadsChannelDormancycrossDeptInStoreLeadCount/LeadsChannelDormancycrossDeptLeadCount | MathFloor2}}%</td>
                            <td rowspan="2"><input :disabled="isEdit" type="text" v-model="row6"> %</td>

                            <td>{{text5}}</td>
                            <td></td>
                            <td>{{currentLeadsChannelDormancycrossDeptInStoreLeadCount}}</td>
                            <td rowspan="2">{{currentLeadsChannelDormancycrossDeptInStoreLeadCount/currentLeadsChannelDormancycrossDeptLeadCount | MathFloor2}}%</td>
                            <td>进店线索数</td>
                            <td><b-form-select :disabled="isEdit" v-model="responsibilityG" :options="positionOpton"></b-form-select></td>
                        </tr>
                        <tr>
                            <td>线索数</td>
                            
                            <td>{{LeadsChannelDormancycrossDeptLeadCount}}</td>

                            <td>{{beginningLeadsNum2}}</td>

                            <td>{{beginningLeadsNum2}}</td>
                             <td>{{currentLeadsChannelDormancycrossDeptLeadCount}}</td>
                             <td>线索数</td>
                             <td><b-form-select :disabled="isEdit" v-model="responsibilityH" :options="positionOpton"></b-form-select></td>
                        </tr>

                        <tr>
                            <!--推荐-->
                            <td rowspan="2">{{tableVerticalTitle.LeadsChannelRecommend}}</td>
                            <td>进店线索数</td>
                            <td>{{LeadsChannelRecommendcrossDeptInStoreLeadCount}}</td>
                            <td rowspan="2">推荐线索进店率</td>
                            <td rowspan="2">{{LeadsChannelRecommendcrossDeptInStoreLeadCount/LeadsChannelRecommendcrossDeptLeadCount | MathFloor2}}%</td>
                            <td rowspan="2"><input :disabled="isEdit" type="text" v-model="row7"> %</td>

                            <td>{{rowB*row7/10000 | fixed}}</td>
                            <td></td>
                            <td>{{currentLeadsChannelRecommendcrossDeptInStoreLeadCount}}</td>
                            <td rowspan="2">{{currentLeadsChannelRecommendcrossDeptInStoreLeadCount/currentLeadsChannelRecommendcrossDeptLeadCount | MathFloor2}}%</td>
                            <td>进店线索数</td>
                            <td><b-form-select :disabled="isEdit" v-model="responsibilityI" :options="positionOpton"></b-form-select></td>
                        </tr>
                        <tr>
                            <td>线索数</td>
                            <td>{{LeadsChannelRecommendcrossDeptLeadCount}}</td>

                            <td><input :disabled="isEdit" type="text" v-model="rowB"></td>

                            <td>{{beginningLeadsNum3}}</td>
                             <td>{{currentLeadsChannelRecommendcrossDeptLeadCount}}</td>
                             <td>线索数</td>
                             <td><b-form-select :disabled="isEdit" v-model="responsibilityJ" :options="positionOpton"></b-form-select></td>
                        </tr>

                        <tr>
                            <!--再购-->
                            <td rowspan="2">{{tableVerticalTitle.LeadsChannelBuyAgain}}</td>
                            <td>进店线索数</td>
                            <td>{{LeadsChannelBuyAgaincrossDeptInStoreLeadCount}}</td>
                            <td rowspan="2">再购线索进店率</td>
                            <td rowspan="2">{{LeadsChannelBuyAgaincrossDeptInStoreLeadCount/LeadsChannelBuyAgaincrossDeptLeadCount | MathFloor2}}%</td>
                            <td rowspan="2"><input :disabled="isEdit" type="text" v-model="row8"> %</td>

                            <td>{{rowC*row8/10000 | fixed}}</td>
                            <td></td>
                            <td>{{currentLeadsChannelBuyAgaincrossDeptInStoreLeadCount}}</td>
                            <td rowspan="2">{{currentLeadsChannelBuyAgaincrossDeptInStoreLeadCount/currentLeadsChannelBuyAgaincrossDeptLeadCount | MathFloor2}}%</td>
                            <td>进店线索数</td>
                            <td><b-form-select :disabled="isEdit" v-model="responsibilityK" :options="positionOpton"></b-form-select></td>
                        </tr>
                        <tr>
                            <td>线索数</td>
                            <td>{{LeadsChannelBuyAgaincrossDeptLeadCount}}</td>

                            <td><input :disabled="isEdit" type="text" v-model="rowC"></td>

                            <td>{{beginningLeadsNum4}}</td>
                             <td>{{currentLeadsChannelBuyAgaincrossDeptLeadCount}}</td>
                             <td>线索数</td>
                             <td><b-form-select :disabled="isEdit" v-model="responsibilityL" :options="positionOpton"></b-form-select></td>
                        </tr>

                        <tr>
                            <!--散客-->
                            <td rowspan="2">{{tableVerticalTitle.LeadsChannelCustomer}}</td>
                            <td>留档数</td>
                            <td>{{LeadsChannelCustomercrossDeptInStoreLeadCount}}</td>
                            <td rowspan="2">散客线索留档率</td>
                            <td rowspan="2">{{LeadsChannelCustomercrossDeptInStoreLeadCount/LeadsChannelCustomercrossDeptLeadCount | MathFloor2}}%</td>
                            <td rowspan="2"><input :disabled="isEdit" type="text" v-model="row9"> %</td>

                            <td>{{rowD*row9/10000 | fixed}}</td>
                            <td></td>
                            <td>{{currentLeadsChannelCustomercrossDeptInStoreLeadCount}}</td>
                            <td rowspan="2">{{currentLeadsChannelCustomercrossDeptInStoreLeadCount/currentLeadsChannelCustomercrossDeptLeadCount | MathFloor2}}%</td>
                            <td>留档数</td>
                            <td><b-form-select :disabled="isEdit" v-model="responsibilityM" :options="positionOpton"></b-form-select></td>
                        </tr>
                        <tr>
                            <td>散客客流</td>
                            <td>{{LeadsChannelCustomercrossDeptLeadCount}}</td>

                            <td><input :disabled="isEdit" type="text" v-model="rowD"></td>

                            <td></td>
                             <td>{{currentLeadsChannelCustomercrossDeptLeadCount}}</td>
                             <td>散客客流</td>
                             <!-- <td><b-form-select :disabled="isEdit" v-model="responsibilityN" :options="positionOpton"></b-form-select></td> -->
                             <td><b-form-select disabled :options="specialoptions" v-model="marketSc"></b-form-select></td> 
                        </tr>


                        <tr>
                            <!--呼入-->
                            <td rowspan="2">{{tableVerticalTitle.LeadsChannelIncoming}}</td>
                            <td>进店线索数</td>
                            <td>{{LeadsChannelIncomingcrossDeptInStoreLeadCount}}</td>
                            <td rowspan="2">呼入线索进店率</td>
                            <td rowspan="2">{{LeadsChannelIncomingcrossDeptInStoreLeadCount/LeadsChannelIncomingcrossDeptLeadCount | MathFloor2}}%</td>
                            <td rowspan="2"><input :disabled="isEdit" type="text" v-model="row10"> %</td>

                            <td>{{rowE*row10/10000 | fixed}}</td>
                            <td></td>
                            <td>{{currentLeadsChannelIncomingcrossDeptInStoreLeadCount}}</td>
                            <td rowspan="2">{{currentLeadsChannelIncomingcrossDeptInStoreLeadCount/currentLeadsChannelIncomingcrossDeptLeadCount | MathFloor2}}%</td>
                            <td>进店线索数</td>
                            <td><b-form-select :disabled="isEdit" v-model="responsibilityO" :options="positionOpton"></b-form-select></td>
                        </tr>
                        <tr>
                            <td>线索数</td>
                            <td>{{LeadsChannelIncomingcrossDeptLeadCount}}</td>

                            <td><input :disabled="isEdit" type="text" v-model="rowE"></td>

                             <td>{{beginningLeadsNum5}}</td>
                             <td>{{currentLeadsChannelIncomingcrossDeptLeadCount}}</td>
                             <td>线索数</td>
                             <td><b-form-select :disabled="isEdit" v-model="responsibilityP" :options="positionOpton"></b-form-select></td>
                        </tr>


                        <tr>
                            <!--网络-->
                            <td rowspan="2">{{tableVerticalTitle.leadsSourceClassifyWeb}}</td>
                            <td>进店线索数</td>
                            <td>{{leadsSourceClassifyWebcrossDeptInStoreLeadCount}}</td>
                            <td rowspan="2">网络线索进店率</td>
                            <td rowspan="2">{{leadsSourceClassifyWebcrossDeptInStoreLeadCount/leadsSourceClassifyWebcrossDeptLeadCount | MathFloor2}}%</td>
                            <td rowspan="2"><input :disabled="isEdit" type="text" v-model="row11"> %</td>

                            <td>{{rowF*row11/10000 | fixed}}</td>
                            <td></td>
                            <td>{{currentleadsSourceClassifyWebcrossDeptInStoreLeadCount}}</td>
                            <td rowspan="2">{{currentleadsSourceClassifyWebcrossDeptInStoreLeadCount/currentleadsSourceClassifyWebcrossDeptLeadCount | MathFloor2}}%</td>
                            <td>进店线索数</td>
                            <td><b-form-select :disabled="isEdit" v-model="responsibilityQ" :options="positionOpton"></b-form-select></td>
                        </tr>
                        <tr>
                            <td>线索数</td>
                            <td>{{leadsSourceClassifyWebcrossDeptLeadCount}}</td>

                            <td><input :disabled="isEdit" type="text" v-model="rowF"></td>

                            <td>{{beginningLeadsNum6}}</td>
                             <td>{{currentleadsSourceClassifyWebcrossDeptLeadCount}}</td>
                             <td>线索数</td>
                             <td><b-form-select :disabled="isEdit" v-model="responsibilityR" :options="positionOpton"></b-form-select></td>
                        </tr>


                        <tr>
                            <!--主动集客-->
                            <td rowspan="2">{{tableVerticalTitle.leadsSourceClassifyActiveCollector}}</td>
                            <td>进店线索数</td>
                            <td>{{leadsSourceClassifyActiveCollectorcrossDeptInStoreLeadCount}}</td>
                            <td rowspan="2">主动集客线索进店率</td>
                            <td rowspan="2">{{leadsSourceClassifyActiveCollectorcrossDeptInStoreLeadCount/leadsSourceClassifyActiveCollectorcrossDeptLeadCount | MathFloor2}}%</td>
                            <td rowspan="2"><input :disabled="isEdit" type="text" v-model="row12"> %</td>

                            <td>{{rowG*row12/10000 | fixed}}</td>
                            <td></td>
                            <td>{{currentleadsSourceClassifyActiveCollectorcrossDeptInStoreLeadCount}}</td>
                            <td rowspan="2">{{currentleadsSourceClassifyActiveCollectorcrossDeptInStoreLeadCount/currentleadsSourceClassifyActiveCollectorcrossDeptLeadCount | MathFloor2}}%</td>
                            <td>进店线索数</td>
                            <td><b-form-select :disabled="isEdit" v-model="responsibilityS" :options="positionOpton"></b-form-select></td>
                        </tr>
                        <tr>
                            <td>线索数</td>
                            <td>{{leadsSourceClassifyActiveCollectorcrossDeptLeadCount}}</td>

                            <td><input :disabled="isEdit" type="text" v-model="rowG"></td>

                            <td>{{beginningLeadsNum7}}</td>
                             <td>{{currentleadsSourceClassifyActiveCollectorcrossDeptLeadCount}}</td>
                             <td>线索数</td>
                             <!-- <td><b-form-select :disabled="isEdit" v-model="responsibilityT" :options="positionOpton"></b-form-select></td> -->
                             <td><b-form-select disabled :options="specialoptions" v-model="marketSc"></b-form-select></td>                        
                        </tr>
                        <tr>
                            <td colspan="6">8个渠道进店线索数计划之和-进店线索目标数</td>
                            <td>{{total}}</td>
                            <td colspan="5"></td>
                        </tr>

                    </tbody>
                </table>

            </div>
        </b-card>
    </div>
</template>

<style scoped>
    .active{
        border: 1px solid #f86c6b!important;
    }
    .private td{padding:0!important; text-align: center;}
    .td{height:53.75px;line-height:53.75px;border-bottom:1px solid #c2cfd6; text-align: center;padding:0px;min-width:120px;}
    .td input,td input{height:20px; text-align: center; width: 50%;}
    .td:last-child{
        border-bottom: 0;
    }
</style>

<script>
    // import {
    //     mapState,
    //     mapGetters,
    //     mapActions
    // } from 'vuex'
    import api from "common/api";
    import config from '../../../common/config'
    import common from "common/common.js";
    import XLSX from "xlsx";
    import {
        MessageBox,
        Message,
        DatePicker
    } from 'element-ui'
    import upload from 'components/iris-upload'
    import Pagination from 'components/pagination/pagination'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import apiUrl from 'common/api-url'
    import {hasBtn} from 'common/com-api'
    export default {
        data: function() {
            return {
                isExpose: false,
                justShow: false,
                yearMonth:'',
                year:'',
                yearStatus:'',
                month:'',
                storeCode:'',
                type:'',
                isShow:true,
                pageData:'',
                pageCurrentData:'',
                managerCode:'',
                positionOpton:[],
                specialoptions: [{
                    text: '市场专员',
                    value: 'positionTypeMarketingSpecialist'
                }],
                marketSc: 'positionTypeMarketingSpecialist',
                isEdit:'',
                policyTableName:'',
                policyTableNameStatus:null,
                salesTargetPlan: {
                    storeCodeSet: [],
                    year: '',
                    month: '',
                    factoryCode: '',
                    brandCode: '',
                    seriesCode: '',
                    modelCode: '',
                    carCode: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                //交车
                allcrossDeptFinishCarCount:'',
                //订单数
                allcrossDeptCreateOrderCount:'',
                //报价数
                allcrossDeptCreateQuoteCount:'',
                //进店线索数
                allcrossDeptInStoreLeadCount:'',
                //线索数
                allcrossDeptLeadCount:'',

                //活跃 进店线索数
                LeadsChannelActivecrossDeptInStoreLeadCount:'',
                //活跃 线索数
                LeadsChannelActivecrossDeptLeadCount:'',
                //休眠 进店线索数
                LeadsChannelDormancycrossDeptInStoreLeadCount:'',
                //休眠 线索数
                LeadsChannelDormancycrossDeptLeadCount:'',
                //推荐 进店线索数
                LeadsChannelRecommendcrossDeptInStoreLeadCount:'',
                //推荐 线索数
                LeadsChannelRecommendcrossDeptLeadCount:'',
                //在购 进店线索数
                LeadsChannelBuyAgaincrossDeptInStoreLeadCount:'',
                //在购 线索数
                LeadsChannelBuyAgaincrossDeptLeadCount:'',
                //散客 进店线索数
                LeadsChannelCustomercrossDeptInStoreLeadCount:'',
                //散客 线索数
                LeadsChannelCustomercrossDeptLeadCount:'',
                //呼入 进店线索数
                LeadsChannelIncomingcrossDeptInStoreLeadCount:'',
                //呼入 线索数
                LeadsChannelIncomingcrossDeptLeadCount:'',
                //网络 进店线索数
                leadsSourceClassifyWebcrossDeptInStoreLeadCount:'',
                //网络 线索数
                leadsSourceClassifyWebcrossDeptLeadCount:'',
                //主动集客 进店线索数
                leadsSourceClassifyActiveCollectorcrossDeptInStoreLeadCount:'',
                //主动集客 线索数
                leadsSourceClassifyActiveCollectorcrossDeptLeadCount:'',


                //业务KPI本月
                //交车
                currentallcrossDeptFinishCarCount:'',
                //订单数
                currentallcrossDeptCreateOrderCount:'',
                //报价数
                currentallcrossDeptCreateQuoteCount:'',
                //进店线索数
                currentallcrossDeptInStoreLeadCount:'',
                //线索数
                currentallcrossDeptLeadCount:'',

                //活跃 进店线索数
                currentLeadsChannelActivecrossDeptInStoreLeadCount:'',
                //活跃 线索数
                currentLeadsChannelActivecrossDeptLeadCount:'',
                //休眠 进店线索数
                currentLeadsChannelDormancycrossDeptInStoreLeadCount:'',
                //休眠 线索数
                currentLeadsChannelDormancycrossDeptLeadCount:'',
                //推荐 进店线索数
                currentLeadsChannelRecommendcrossDeptInStoreLeadCount:'',
                //推荐 线索数
                currentLeadsChannelRecommendcrossDeptLeadCount:'',
                //在购 进店线索数
                currentLeadsChannelBuyAgaincrossDeptInStoreLeadCount:'',
                //在购 线索数
                currentLeadsChannelBuyAgaincrossDeptLeadCount:'',
                //散客 进店线索数
                currentLeadsChannelCustomercrossDeptInStoreLeadCount:'',
                //散客 线索数
                currentLeadsChannelCustomercrossDeptLeadCount:'',
                //呼入 进店线索数
                currentLeadsChannelIncomingcrossDeptInStoreLeadCount:'',
                //呼入 线索数
                currentLeadsChannelIncomingcrossDeptLeadCount:'',
                //网络 进店线索数
                currentleadsSourceClassifyWebcrossDeptInStoreLeadCount:'',
                //网络 线索数
                currentleadsSourceClassifyWebcrossDeptLeadCount:'',
                //主动集客 进店线索数
                currentleadsSourceClassifyActiveCollectorcrossDeptInStoreLeadCount:'',
                //主动集客 线索数
                currentleadsSourceClassifyActiveCollectorcrossDeptLeadCount:'',


                row1:0,
                row2:0,
                row3:0,
                // row4:0,
                row5:0,
                row6:0,
                row7:0,
                row8:0,
                row9:0,
                row10:0,
                row11:0,
                row12:0,
                rowA:0,
                rowB:0,
                rowC:0,
                rowD:0,
                rowE:0,
                rowF:0,
                rowG:0,

                beginningLeadsNum1:0,
                beginningLeadsNum2:0,
                beginningLeadsNum3:0,
                beginningLeadsNum4:0,
                beginningLeadsNum5:0,
                beginningLeadsNum6:0,
                beginningLeadsNum7:0,



                responsibilityA:'',
                responsibilityB:'',
                responsibilityC:'',
                responsibilityD:'',
                responsibilityE:'',
                responsibilityF:'',
                responsibilityG:'',
                responsibilityH:'',
                responsibilityI:'',
                responsibilityJ:'',
                responsibilityK:'',
                responsibilityL:'',
                responsibilityM:'',
                responsibilityN:'',
                responsibilityO:'',
                responsibilityP:'',
                responsibilityQ:'',
                responsibilityR:'',
                responsibilityS:'',
                responsibilityT:'',
                arr:['allcrossDeptFinishCarCount','allcrossDeptCreateOrderCount','allcrossDeptCreateQuoteCount','allcrossDeptInStoreLeadCount','allcrossDeptLeadCount','LeadsChannelActivecrossDeptInStoreLeadCount','LeadsChannelActivecrossDeptLeadCount','LeadsChannelDormancycrossDeptInStoreLeadCount','LeadsChannelDormancycrossDeptLeadCount','LeadsChannelRecommendcrossDeptInStoreLeadCount','LeadsChannelRecommendcrossDeptLeadCount','LeadsChannelBuyAgaincrossDeptInStoreLeadCount','LeadsChannelBuyAgaincrossDeptLeadCount','LeadsChannelCustomercrossDeptInStoreLeadCount','LeadsChannelCustomercrossDeptLeadCount','LeadsChannelIncomingcrossDeptInStoreLeadCount','LeadsChannelIncomingcrossDeptLeadCount','leadsSourceClassifyWebcrossDeptInStoreLeadCount','leadsSourceClassifyWebcrossDeptLeadCount','leadsSourceClassifyActiveCollectorcrossDeptInStoreLeadCount','leadsSourceClassifyActiveCollectorcrossDeptLeadCount'],
                mapArr:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T'],

                tableVerticalTitle:{
                    LeadsChannelActive: '',//活跃
                    LeadsChannelDormancy: '',//休眠
                    LeadsChannelRecommend: '',//推荐
                    LeadsChannelBuyAgain: '',//再购
                    LeadsChannelCustomer: '',//散客
                    LeadsChannelIncoming: '',//呼入
                    leadsSourceClassifyWeb: '',//网络
                    leadsSourceClassifyActiveCollector: ''//主动集客
                }

            }
        },
        created() {
            this.isExpose = this.$route.query.status === 'add' ? false : true
            //type 为true 则为新增，否则为修改
            var _this = this;
            this.type = this.$route.query.status == 'add'? true:false;
            this.isEdit = this.$route.query.status == 'check'? true:false;
            this.isShow = this.type;
            if(!this.type){   //修改操作
                this.managerCode = this.$route.query.managerCode;
                //this.search();
                api.policyTable.queryList({managerCode:this.managerCode}, function(res){
                    if(res.data.code == 'success'){
                        _this.yearMonth = res.data.obj.list[0].dateVersion;
                        _this.storeCode = res.data.obj.list[0].storeCode;
                        _this.policyTableName = res.data.obj.list[0].managerName;
                        _this.$refs.areaShop.setselect({value:_this.storeCode,text:res.data.obj.list[0].storeName});
                        _this.getDate();
                        _this.search();
                    }
                });
            }


            api.supplyChain.procurement.queryDictionaryDetails({
                "pageNums":config.maxPageNums,
                "pageStart":1,
                "refCode":"PositionType",
                "refDetailCode":"",
                "refDetailName":"",
                "isDeleted":0
            }, function(res){
                if(res.data.code =='success'){
                    const data = [];
                    res.data.obj.list.map((item)=>{
                        if(item.refDetailCode === 'positionTypeDCCSpecialist' || item.refDetailCode === 'positionTypeSC' || item.refDetailCode === 'positionTypeMarketingSpecialist'){
                            data.push(item)
                        }
                    })
                    _this.setOptionData(data, _this.positionOpton);
                }
            });
            //表格纵向第一列title获取
            this.getTableVerticalTitle();
        },
        computed: {
            downloadBtn(){
                return hasBtn(apiUrl.policyTable.output)
            },
            newAddBtn(){
                return hasBtn(apiUrl.policyTable.editCrossDeptManagerInfoList)
            },
            editCrossDeptKpiInfoListBtn(){
                return hasBtn(apiUrl.policyTable.editCrossDeptKpiInfoList)
            },
            typeText:function(){
                return '策略表';
            },
            text1:function(){
                return this.fixedNum(this.rowA/this.row1);
            },
            text2:function(){
                return this.fixedNum(this.text1/this.row2);
            },
            text3:function(){
                return this.fixedNum(this.text2/this.row3);
            },
            text4:function(){
                return this.MathFloor(this.row5/10000*this.beginningLeadsNum1);
            },
            text5:function(){
                return this.MathFloor(this.row6/10000*this.beginningLeadsNum2);
            },
            text6:function(){
                return this.MathFloor(this.rowB*this.row7/10000);
            },
            text7:function(){
                return this.MathFloor(this.rowC*this.row8/10000);
            },
            text8:function(){
                return this.MathFloor(this.rowD*this.row9/10000);
            },
            text9:function(){
                return this.MathFloor(this.rowE*this.row10/10000);
            },
            text10:function(){
                return this.MathFloor(this.rowF*this.row11/10000);
            },
            text11:function(){
                return this.MathFloor(this.rowG*this.row12/10000);
            },
            leadTotal:function(){
                return parseInt(this.beginningLeadsNum1) + parseInt(this.beginningLeadsNum2) + parseInt(this.rowB) + parseInt(this.rowC) + parseInt(this.MathFloor(this.rowD*this.row9/10000)) + parseInt(this.rowE) + parseInt(this.rowF) + parseInt(this.rowG);
            },
            row4:function(){
                return this.MathFloor4(this.text3/this.leadTotal);
            },
            total:function(){
                return parseInt(this.text6) + parseInt(this.text7) + parseInt(this.text8) + parseInt(this.text9) + parseInt(this.text10) + parseInt(this.text11) - parseInt(this.text3);
            }
        },
        filters: {
            MathFloor2(val){
                if(val == 'Infinity')return '*';
                if (!val) return 0;
                val = Math.round(Number(val)*100);
                return parseFloat(val).toFixed(0) || 0;
            },
        },
        methods: {
            //表格纵向第一列title获取
            getTableVerticalTitle(){
                api.ref.getDataDictionary({refCode: 'LeadsChannel'}).then((res) => {
                    if(res.data.code == "success"){
                        for(let item in this.tableVerticalTitle){
                            for(let i = 0; i < res.data.obj.referenceDetailInfos.length; i++){
                                if(item == res.data.obj.referenceDetailInfos[i].refDetailCode){
                                    this.tableVerticalTitle[item] = res.data.obj.referenceDetailInfos[i].refDetailName
                                }
                            }
                        }
                    }else{
                        console.log('#####getTableVerticalTitle请求接口失败');
                    }
                });
            },
            //  /v1/fileSys/export/exportCrossDeptReport
            download: function() {
                api.policyTable.output({
                        managerCode:this.managerCode,
                        dateVersion: this.yearMonth.slice(0, 10),
                        storeCode: this.storeCode
                    }, (res) => {
                        if(res.data.code == 'success') {
                            let path = res.data.obj.fileRelativePath
                            window.location.href = path
                        }
                    })
            },
            // //责任部门
            // department: function(code) {
            //     let name = ''
            //     this.positionOpton.forEach((item, index) => {
            //         if(item.value == code) {
            //             name = item.text
            //         }
            //     });
            //     return name
            // },
            //导出
            // download: function() {
            //     let _this = this;
            //     let worksheet = XLSX.utils.table_to_book(
            //         document.getElementById("policyTable")
            //     );
            //     var date = new Date();
            //     let year = date.getFullYear();
            //     let month = date.getMonth() + 1;
            //     let d = date.getDate();
            //     let day = new Array(
            //         "星期日",
            //         "星期一",
            //         "星期二",
            //         "星期三",
            //         "星期四",
            //         "星期五",
            //         "星期六"
            //     )[date.getDay()];
            //     let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            //     let minute =
            //         date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            //     let second =
            //         date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            //     let currentTimeStr =
            //         year + "-" + month + "-" + d + "-" + hour + ":" + minute + ":" + second;
            //     // console.log(currentTimeStr);
            //     XLSX.writeFile(worksheet, "跨部门策略表-" + currentTimeStr + ".xlsx");
            // },
            setOptionData(data, obj){
                for(var i = 0, len = data.length; i < len; i++){
                    obj.push({text:data[i].refDetailName,value:data[i].refDetailCode});
                }
            },
            getDate(){
                var _this = this;
                var date = new Date(_this.yearMonth);
                _this.year = date.getFullYear();
                _this.month = date.getMonth() + 1;
                _this.month = _this.month > 9?_this.month:'0'+_this.month;
            },
            MathFloor4(val){
                if(val == 'Infinity')return '*';
                if (!val) return 0;
                val = Math.round(val*100);
                return parseFloat(val).toFixed(0) || 0;
            },
            MathFloor(val){
                if(val == 'Infinity')return '*';
                if (!val) return 0;
                val = Math.round(val*100);
                return parseFloat(val).toFixed(2) || 0;
            },

            fixedNum(val){
                if(val == 'Infinity')return '*';
                if (!val) return 0;
                val = val*100;
                return val.toFixed(0) || 0;
            },
            checkIsAdd(){
                let _this = this;

                if(!_this.year || !_this.policyTableName){
                    if(!_this.year){
                        Message({
                            message: '请选择年月',
                            type: 'warning'
                        });
                        _this.yearStatus = false;
                    }else{
                        _this.yearStatus = null;
                    }
                    if(!_this.policyTableName){
                        _this.policyTableNameStatus = false;
                    }else{
                        _this.policyTableNameStatus = null;
                    }
                    return false;
                }else{
                    _this.policyTableNameStatus = null;
                    return true;
                }
            },
            newAdd(){
                var _this = this;
                _this.getDate();
                if(!_this.checkIsAdd())return;
                var params = [{
                    dateVersion:_this.year+'-'+_this.month,
                    saleaAreaCode:'',
                    storeCode:this.storeCode,
                    managerName:this.policyTableName,
                    crossDeptType: 0
                }]
                api.policyTable.editCrossDeptManagerInfoList(params, function(res){
                    if(res.data.code == 'success'){
                        _this.isExpose = true;
                        _this.isShow = false;
                        _this.managerCode = res.data.obj[0].managerCode;
                        var ymArr = _this.getPreYearMonth(_this.year, _this.month);
                        //上个月
                        _this.queryCrossDeptPolicyActualInfo({
                            dateVersion:ymArr.year+'-'+ymArr.month,
                            saleaAreaCode:'',
                            storeCode:_this.storeCode
                        }, function(respones){
                            if(respones.data.code == 'success'){
                                _this.pageData = respones.data.obj;
                                _this.getValue();
                            }
                        });

                        //当前月
                        _this.queryCrossDeptPolicyActualInfo({
                            dateVersion:_this.year+'-'+_this.month,
                            storeCode:_this.storeCode
                        }, function(res){
                            if(res.data.code == 'success'){
                                _this.pageCurrentData = res.data.obj;
                               _this.getValue('now');
                            }
                        });

                    }
                })
            },
            getValue(type){

                var arr = this.arr;

                for(var i =0, len = arr.length; i < len; i++){
                    if(this.pageData[arr[i]] && this.pageData[arr[i]].actualValue){
                        this[arr[i]] = this.pageData[arr[i]].actualValue;
                    }else{
                        this[arr[i]] = 0;
                    }

                }
                if(this.type){
                    this.row1 = this.MathFloor(this.allcrossDeptFinishCarCount/this.allcrossDeptCreateOrderCount);
                    this.row2 = this.MathFloor(this.allcrossDeptCreateOrderCount/this.allcrossDeptCreateQuoteCount);
                    this.row3 = this.MathFloor(this.allcrossDeptCreateQuoteCount/this.allcrossDeptInStoreLeadCount) == '*' ? 0 : this.MathFloor(this.allcrossDeptCreateQuoteCount/this.allcrossDeptInStoreLeadCount);
                    console.log(this.allcrossDeptCreateQuoteCount+'/'+this.allcrossDeptInStoreLeadCount)
                    //this.row4 = this.MathFloor(this.text3/this.leadTotal);

                    this.row5 = this.MathFloor(this.allcrossDeptInStoreLeadCount/this.LeadsChannelActivecrossDeptLeadCount);
                    this.row6 = this.MathFloor(this.LeadsChannelDormancycrossDeptInStoreLeadCount/this.LeadsChannelDormancycrossDeptLeadCount);
                    this.row7 = this.MathFloor(this.LeadsChannelRecommendcrossDeptInStoreLeadCount/this.LeadsChannelRecommendcrossDeptLeadCount);
                    this.row8 = this.MathFloor(this.LeadsChannelBuyAgaincrossDeptInStoreLeadCount/this.LeadsChannelBuyAgaincrossDeptLeadCount);
                    this.row9 = this.MathFloor(this.LeadsChannelCustomercrossDeptInStoreLeadCount/this.LeadsChannelCustomercrossDeptLeadCount);
                    this.row10 = this.MathFloor(this.LeadsChannelIncomingcrossDeptInStoreLeadCount/this.LeadsChannelIncomingcrossDeptLeadCount);
                    this.row11 = this.MathFloor(this.leadsSourceClassifyWebcrossDeptInStoreLeadCount/this.leadsSourceClassifyWebcrossDeptLeadCount);
                    this.row12 = this.MathFloor(this.leadsSourceClassifyActiveCollectorcrossDeptInStoreLeadCount/this.leadsSourceClassifyActiveCollectorcrossDeptLeadCount);
                }
                if(this.pageData){
                    if(this.pageData.LeadsChannelActivecrossDeptLeadCount && this.pageData.LeadsChannelActivecrossDeptLeadCount.beginningLeadsNum){
                        this.beginningLeadsNum1 = this.pageData.LeadsChannelActivecrossDeptLeadCount.beginningLeadsNum;
                    }

                    if(this.pageData.LeadsChannelDormancycrossDeptLeadCount && this.pageData.LeadsChannelDormancycrossDeptLeadCount.beginningLeadsNum){
                        this.beginningLeadsNum2 = this.pageData.LeadsChannelDormancycrossDeptLeadCount.beginningLeadsNum;
                    }

                    if(this.pageData.LeadsChannelRecommendcrossDeptLeadCount && this.pageData.LeadsChannelRecommendcrossDeptLeadCount.beginningLeadsNum){
                        this.beginningLeadsNum3 = this.pageData.LeadsChannelRecommendcrossDeptLeadCount.beginningLeadsNum;
                    }

                    if(this.pageData.LeadsChannelBuyAgaincrossDeptLeadCount && this.pageData.LeadsChannelBuyAgaincrossDeptLeadCount.beginningLeadsNum){
                        this.beginningLeadsNum4 = this.pageData.LeadsChannelBuyAgaincrossDeptLeadCount.beginningLeadsNum;
                    }

                    if(this.pageData.LeadsChannelIncomingcrossDeptLeadCount && this.pageData.LeadsChannelIncomingcrossDeptLeadCount.beginningLeadsNum){
                        this.beginningLeadsNum5 = this.pageData.LeadsChannelIncomingcrossDeptLeadCount.beginningLeadsNum;
                    }

                    if(this.pageData.leadsSourceClassifyWebcrossDeptLeadCount && this.pageData.leadsSourceClassifyWebcrossDeptLeadCount.beginningLeadsNum){
                        this.beginningLeadsNum6 = this.pageData.leadsSourceClassifyWebcrossDeptLeadCount.beginningLeadsNum;
                    }

                    if(this.pageData.leadsSourceClassifyActiveCollectorcrossDeptLeadCount && this.pageData.leadsSourceClassifyActiveCollectorcrossDeptLeadCount.beginningLeadsNum){
                        this.beginningLeadsNum7 = this.pageData.leadsSourceClassifyActiveCollectorcrossDeptLeadCount.beginningLeadsNum;
                    }
                    //this.beginningLeadsNum1 = this.pageData.LeadsChannelActivecrossDeptLeadCount.beginningLeadsNum;
                    //this.beginningLeadsNum2 = parseInt(this.pageData.LeadsChannelDormancycrossDeptLeadCount.beginningLeadsNum);
                    //this.beginningLeadsNum3 = parseInt(this.pageData.LeadsChannelRecommendcrossDeptLeadCount.beginningLeadsNum);
                    //this.beginningLeadsNum4 = parseInt(this.pageData.LeadsChannelBuyAgaincrossDeptLeadCount.beginningLeadsNum);
                    //this.beginningLeadsNum5 = this.pageData.LeadsChannelIncomingcrossDeptLeadCount.beginningLeadsNum;
                    //this.beginningLeadsNum6 = this.pageData.leadsSourceClassifyWebcrossDeptLeadCount.beginningLeadsNum;
                    //this.beginningLeadsNum7 = this.pageData.leadsSourceClassifyActiveCollectorcrossDeptLeadCount.beginningLeadsNum;
                }
                this.currentData(arr);
            },
            currentData(arr){
                for(var i =0, len = arr.length; i < len; i++){
                    if(this.pageCurrentData[arr[i]] && this.pageCurrentData[arr[i]].actualValue){
                        this['current'+arr[i]] = this.pageCurrentData[arr[i]].actualValue;
                    }else{
                        this['current'+arr[i]] = 0;
                    }

                }            },
            addDate(date, days) {
                if (days == undefined || days == '') {
                    days = 1;
                }
                var date = new Date(date);
                date.setDate(date.getDate() + days);
                var month = date.getMonth() + 1;
                return {year:date.getFullYear(),month:month}
            },
            getPreYearMonth(year, month){
                var month = parseInt(month),
                    year = parseInt(year),
                    m, y;
                if(month == 1){
                    m = 12;
                    y = year - 1;
                }else{
                    m = month - 1;
                    y = year;
                }
                m = m >9 ? m : '0' + m;
                return {'year':y, 'month':m}
            },
            selectStores:function(area, store){
                this.storeCode = store.value;
            },
            clear: function() {
                let _this = this
                _this.$data.salesTargetPlan = {
                    storeCodeSet: _this.$data.salesTargetPlan.storeCodeSet,
                    year: '',
                    month: '',
                    factoryCode: '',
                    brandCode: '',
                    seriesCode: '',
                    modelCode: '',
                    carCode: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                }
                _this.$data.year = ''
            },
            getTargetKpiValue(i){
                var map = ['A','','','','','','B','C','D','E','F','G'];
                return map[i];
            },
            editCrossDeptKpiInfoList(){
                var _this = this, params = [];
                _this.getDate();
                var keyMap = [{
                        businessKipCode:'crossDeptFinishCarRate',
                        channelCode:'all'
                    },
                    {
                        businessKipCode:'crossDeptCreateOrderRate',
                        channelCode:'all'
                    },
                    {
                        businessKipCode:'crossDeptCreateQuoteRate',
                        channelCode:'all'
                    },
                    {
                        businessKipCode:'crossDeptInStoreLeadRate',
                        channelCode:'all'
                    },
                    //活跃
                    {
                        businessKipCode:'crossDeptInStoreActiveRate',
                        channelCode:'LeadsChannelActive'
                    },
                    //休眠
                    {
                        businessKipCode:'crossDeptInStoreDormancyRate',
                        channelCode:'LeadsChannelDormancy'
                    },
                    //推荐
                    {
                        businessKipCode:'crossDeptInStoreRecommendRate',
                        channelCode:'LeadsChannelRecommend'
                    },
                    //在购
                    {
                        businessKipCode:'crossDeptInStoreBuyAgainRate',
                        channelCode:'LeadsChannelBuyAgain'
                    },
                    //散客
                    {
                        businessKipCode:'crossDeptInStoreCustomerRate',
                        channelCode:'LeadsChannelCustomer'
                    },
                    //呼入
                    {
                        businessKipCode:'crossDeptInStoreIncomingRate',
                        channelCode:'LeadsChannelIncoming'
                    },
                    //网络
                    {
                        businessKipCode:'crossDeptInStoreWebRate',
                        channelCode:'leadsSourceClassifyWeb'
                    },
                    //主动集客
                    {
                        businessKipCode:'crossDeptInStoreActiveCollectorRate',
                        channelCode:'leadsSourceClassifyActiveCollector'
                    }]

                for(var j = 0, len = keyMap.length; j < len; j++){

                    var key = {
                        targetKpiValueRate:_this['row'+(j+1)],
                        //业务kpi编码
                        businessKipCode:keyMap[j].businessKipCode,
                        //渠道编码
                        channelCode:keyMap[j].channelCode,
                        //时间版本
                        dateVersion:_this.year+'-'+_this.month,
                        //门店编码
                        storeCode:_this.storeCode,
                        //业务目标本月预计
                        targetKpiValue:_this.getTargetKpiValue(j)?_this['row'+_this.getTargetKpiValue(j)]:0,
                        //跨部门平台编码
                        managerCode:_this.managerCode  //_this.managerCode
                    }

                    params.push(key);

                }
                
                api.policyTable.editCrossDeptKpiInfoList(params, function(res){
                    if(res.data.code == 'success'){


                    }
                });

                var mapArr = _this.mapArr, paramsRelation = [];

                for(var k = 0,len = keyMap.length; k < len; k++){
                    if(_this.mapArr[k] === 'N' || _this.mapArr[k] === 'T'){
                        _this['responsibility'+mapArr[k]] = 'positionTypeMarketingSpecialist'
                    }
                    var keytwo = {
                        //businessTargetCode:keyMap[k].businessKipCode,
                        dateVersion:_this.year+'-'+_this.month,
                        positionTypeCode:_this['responsibility'+mapArr[k]],
                        storeCode:_this.storeCode,
                        managerCode:_this.managerCode,
                        channelAndBusinessTargetCode:_this.arr[k]
                    }

                    if( k >3){
                        
                        for(var l = 0; l < 2; l++){
                            if(_this.mapArr[k*2+l-4] === 'N' || _this.mapArr[k*2+l-4] === 'T'){
                                _this['responsibility'+mapArr[k*2+l-4]] = 'positionTypeMarketingSpecialist'
                            }
                            var keytwo = {
                                //businessTargetCode:_this.arr[k*2+l-3],
                                dateVersion:_this.year+'-'+_this.month,
                                positionTypeCode:_this['responsibility'+mapArr[k*2+l-4]],
                                storeCode:_this.storeCode,
                                managerCode:_this.managerCode,
                                channelAndBusinessTargetCode:_this.arr[k*2+l-3]
                            }
                            paramsRelation.push(keytwo);
                        }

                    }else{
                        paramsRelation.push(keytwo);
                    }
                }
                
                api.policyTable.editCrossDeptPostnRelationInfoList(paramsRelation, function(res){
                    if(res.data.code == 'success'){
                        console.info(res);
                    }
                })
            },
            search: function() {
                var _this = this;
                if(!this.type){
                    api.policyTable.queryCrossDeptKpiInfo({
                        managerCode:_this.managerCode,
                        pageNums: config.maxPageNums,
                        pageStart: 1
                    }, function(res){
                        if(res.data.code == 'success' && res.data.obj){
                            var dataObj = res.data.obj
                            _this.row1 = dataObj.allcrossDeptFinishCarRate.targetKpiValueRate;
                            _this.row2 = dataObj.allcrossDeptCreateOrderRate.targetKpiValueRate;
                            _this.row3 = dataObj.allcrossDeptCreateQuoteRate.targetKpiValueRate;
                            //_this.row4 = res.data.obj.allcrossDeptInStoreLeadRate.targetKpiValueRate;
                            _this.row5 = dataObj.LeadsChannelActivecrossDeptInStoreActiveRate.targetKpiValueRate;
                            _this.row6 = dataObj.LeadsChannelDormancycrossDeptInStoreDormancyRate.targetKpiValueRate;

                            _this.row7 = dataObj.LeadsChannelRecommendcrossDeptInStoreRecommendRate.targetKpiValueRate;
                            _this.row8 = dataObj.LeadsChannelBuyAgaincrossDeptInStoreBuyAgainRate.targetKpiValueRate;
                            _this.row9 = dataObj.LeadsChannelCustomercrossDeptInStoreCustomerRate.targetKpiValueRate;
                            _this.row10 = dataObj.LeadsChannelIncomingcrossDeptInStoreIncomingRate.targetKpiValueRate;
                            _this.row11 = dataObj.leadsSourceClassifyWebcrossDeptInStoreWebRate.targetKpiValueRate;
                            _this.row12 = dataObj.leadsSourceClassifyActiveCollectorcrossDeptInStoreActiveCollectorRate.targetKpiValueRate;

                            _this.rowA = dataObj.allcrossDeptFinishCarRate.targetKpiValue;
                            _this.rowB = dataObj.LeadsChannelRecommendcrossDeptInStoreRecommendRate.targetKpiValue;
                            _this.rowC = dataObj.LeadsChannelBuyAgaincrossDeptInStoreBuyAgainRate.targetKpiValue;
                            _this.rowD = dataObj.LeadsChannelCustomercrossDeptInStoreCustomerRate.targetKpiValue;
                            _this.rowE = dataObj.LeadsChannelIncomingcrossDeptInStoreIncomingRate.targetKpiValue;
                            _this.rowF = dataObj.leadsSourceClassifyWebcrossDeptInStoreWebRate.targetKpiValue;
                            _this.rowG = dataObj.leadsSourceClassifyActiveCollectorcrossDeptInStoreActiveCollectorRate.targetKpiValue;
                        }
                    });


                    api.policyTable.queryCrossDeptPostnRelationInfo({
                        managerCode:_this.managerCode
                    }, function(res){
                        console.info(res);
                       if(res.data.code == 'success' && res.data.obj){
                            for(var k = 0, len = _this.arr.length; k < len; k++){
                                if(k > 3 && _this.arr[k+1]){
                                    _this['responsibility'+_this.mapArr[k]] = res.data.obj[_this.arr[k+1]].positionTypeCode;

                                }else{
                                    _this['responsibility'+_this.mapArr[k]] = res.data.obj[_this.arr[k]].positionTypeCode;

                                }
                            }




                            // for(var k = 0; k < 12; k++){
                            //     if( k >3){
                            //         for(var l = 0; l < 2; l++){
                            //             var keytwo = {
                            //                 businessTargetCode:_this.arr[k*2+l-3],
                            //                 dateVersion:_this.year+'-'+_this.month,
                            //                 positionTypeCode:_this['responsibility'+mapArr[k*2+l-4]],
                            //                 storeCode:_this.storeCode,
                            //                 managerCode:_this.managerCode,
                            //                 channelCode:keyMap[k].channelCode
                            //             }
                            //             paramsRelation.push(keytwo);
                            //         }

                            //     }else{
                            //         paramsRelation.push(keytwo);
                            //     }
                            // }
                        }
                    })
                }



                var ymArr = _this.getPreYearMonth(_this.year, _this.month);
                 //当前月的上个月数据
                this.queryCrossDeptPolicyActualInfo({
                    dateVersion:ymArr.year+'-'+ymArr.month,
                    saleaAreaCode:'',
                    storeCode:_this.storeCode
                }, function(res){
                    if(res.data.code == 'success' && res.data.obj){
                        _this.pageData = res.data.obj;
                       _this.getValue();
                    }
                });

                //当前月
                this.queryCrossDeptPolicyActualInfo({
                    dateVersion:_this.year+'-'+_this.month,
                    saleaAreaCode:'',
                    storeCode:_this.storeCode
                }, function(res){
                    if(res.data.code == 'success' && res.data.obj){
                        _this.pageCurrentData = res.data.obj;
                       _this.getValue('now');
                    }
                });




                //let _this = this;
                //var YmArr = _this.addDate(new Date(_this.year).getFullYear()+'-'+_this.month, -30);
                //console.info(YmArr);
                //_this.getSalesTargetPlanList(_this.$data.salesTargetPlan)
                //_this.queryOrderStatistics({storeCodes:[_this.storeCode],yearStr:YmArr.year,monthStr:YmArr.month,postType:2});
                //_this.querySalesLeadsReport({storeCodes:[_this.storeCode],yearStr:YmArr.year,monthStr:YmArr.month,postType:2});
            },
            //查询跨部门策略表详情
            queryCrossDeptPolicyActualInfo(params,fn){
                let _this = this;
                api.policyTable.queryCrossDeptPolicyActualInfo(params, fn);
            },

        },
        components: {
            Pagination,
            upload,
            DatePicker,
            areaqueryshop
        }
    }
</script>
