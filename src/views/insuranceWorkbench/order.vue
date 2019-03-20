<template>
    <div class="animated fadeIn">
        <b-card header="客户信息">
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="姓名" :label-cols="4" class="text-right">
                        <b-form-input type="text" :disabled="true" v-model="insuranceWorkbenchInfo.customName">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="电话" :label-cols="4" class="text-right">
                        <b-form-input type="text" :disabled="true" v-model="insuranceWorkbenchInfo.mobilePhone">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="订单号" :label-cols="4" class="text-right">
                        <a href="#" class="pull-left" @click.prevent="goToOrder(insuranceWorkbenchInfo.orderNo)">{{ insuranceWorkbenchInfo.orderNo }}</a>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="门店" :label-cols="4" class="text-right">
                        <b-form-input type="text" :disabled="true" v-model="insuranceWorkbenchInfo.storeName">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="销售顾问" :label-cols="4" class="text-right">
                        <b-form-input type="text" :disabled="true" v-model="insuranceWorkbenchInfo.scName">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="订单状态" :label-cols="4" class="text-right">
                        <b-form-select :options="wfTypes" :disabled="true" v-model="insuranceWorkbenchInfo.wfType">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <b-form-fieldset horizontal label="车辆" :label-cols="2" class="text-right">
                        <b-form-input type="text" :disabled="true" v-model="insuranceWorkbenchInfo.carName">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="车辆销售价" :label-cols="4" class="text-right">
                        <b-form-input type="text" :disabled="true" v-model="insuranceWorkbenchInfo.salesPrice">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
        </b-card>
        <b-card class="mb-2" v-if="!isOut">
            <template slot="header">
                <span>保险订单</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <small class="text-muted">保险状态: {{ insuranceStatus }}</small>
                <div class="pull-right" v-if="!isOut">
                    <b-button size="sm" @click="clearInsuranceWorkbenchInfo">清空</b-button>
                </div>
            </template>
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="交强险机构" :label-cols="4" label-text-align="right">
                        <search v-model.trim="strongInsurance.insOrgCode" :dataList="insuranceOrgs" :searchValue="insuranceOrgName" :valueName="'coName'" :keyName="'coCode'" @dataChange="getInsuranceOrgs" @comScroll="getInsuranceOrgs" @clickShowBack="getInsuranceOrgs">
                        </search>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="投保期" :label-cols="4" label-text-align="right">
                        <div class="row">
                            <div class="col-md-10">
                                <b-form-input type="number" v-model="strongInsurance.insuranceMonth">
                                </b-form-input>
                            </div>
                            <label class="col-md-2">月</label>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="交强险总价" :label-cols="4" label-text-align="right">
                        <b-form-input type="number" v-model="strongInsurance.vvtaxPrice">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="交强险实价" :label-cols="4" label-text-align="right">
                        <b-form-input type="number" v-model="strongInsurance.vvtaxActualPrice">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="车船税总价" :label-cols="4" label-text-align="right">
                        <b-form-input type="number" v-model="strongInsurance.carTax">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="商业险机构" :label-cols="4" label-text-align="right">
                        <search v-model.trim="businessInsurance.insOrgCode" :dataList="insuranceOrgs" :searchValue="insuranceOrgName" :valueName="'coName'" :keyName="'coCode'" @dataChange="getInsuranceOrgs" @comScroll="getInsuranceOrgs" @clickShowBack="getInsuranceOrgs">
                        </search>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="投保期" :label-cols="4" label-text-align="right">
                        <div class="row">
                            <div class="col-md-10">
                                <b-form-input type="number" v-model.number="businessInsurance.insuranceMonth">
                                </b-form-input>
                            </div>
                            <label class="col-md-2">月</label>
                        </div>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4" style="text-align: center; line-height: 35px;">
                    <radio :label="0" v-model="insuranceWorkbenchInfo.businessPriceModelType">详细模式</radio>
                    <radio :label="1" v-model="insuranceWorkbenchInfo.businessPriceModelType">预估总价</radio>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="商业险预估总价" :label-cols="4" label-text-align="right">
                        <b-form-input type="number" v-model.number="commercialAllInsurance.actualPrice" :disabled="!isAllInsurance">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="商业险总价" :label-cols="4" label-text-align="right">
                        <b-form-input type="number" v-model="totalActualInsuranceLimit" disabled>
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="商业险实价" :label-cols="4" label-text-align="right">
                        <b-form-input type="number" v-model="totalActualPrice" disabled>
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="table-scrollable limit-height">
                        <table class="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th v-for="(field, index) in fields" :key="index">
                                        {{ field.label }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(insuranceDetail, index) in insuranceDetailList" :key="index">
                                    <td>
                                        {{ insuranceDetail.insTypeName }}
                                    </td>
                                    <td>
                                        <b-form-input type="number" v-model.number="insuranceDetail.actualInsuranceLimit" :disabled="isAllInsurance"></b-form-input>
                                    </td>
                                    <td>
                                        <b-form-input type="number" v-model.number="insuranceDetail.premium" :disabled="isAllInsurance"></b-form-input>
                                    </td>
                                    <td>
                                        <b-form-input type="number" v-model.number="insuranceDetail.actualSdewPrice" :disabled="isAllInsurance"></b-form-input>
                                    </td>
                                    <td>
                                        <b-form-input type="number" v-model.number="insuranceDetail.actualPrice" :disabled="isAllInsurance"></b-form-input>
                                    </td>
                                    <td>
                                        <b-form-select :options="accountTypes" v-model="insuranceDetail.accountTypeCode" disabled></b-form-select>
                                    </td>
                                </tr>
                                <tr v-if="insuranceDetailList.length == 0">
                                    <td colspan='10' class="text-left">暂无数据...</td>
                                </tr>
                            </tbody>
                         </table>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="是否保险战败" :label-cols="4" class="text-right">
                        <b-form-select :options="isDefeatList" v-model="insuranceWorkbenchInfo.isDefeat">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6" v-if="insuranceWorkbenchInfo.isDefeat == 1">
                    <b-form-fieldset horizontal label="保险战败原因" :label-cols="4" class="text-right">
                        <b-form-select :options="insuranceFailReasonTypes" v-model="insuranceWorkbenchInfo.defeatReason">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <span>最后更新时间: &nbsp;&nbsp;&nbsp; {{ insuranceWorkbenchInfo.updateTime | formatDate }} </span>
                </div>
            </div>
            <div class="row" v-if="canEdit">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" variant="primary" @click="editInsuranceWorkbenchInfo">保存</b-button>
                        <b-button size="sm" variant="warning" @click="synchinsuranceWorkbenchInfo">同步该方案到订单</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card class="mb-2" id="custom" v-if="isOut">
            <template slot="header">
                <span>被保车辆及被保人信息</span>
            </template>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车牌" :label-cols="4" class="text-right">
                        <b-form-input type="text" v-model.trim="insuranceWorkbenchInfo.customCarPlate">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="机动车种" :label-cols="4" class="text-right">
                        <b-form-select :options="motorVehicleSpecies" v-model.trim="insuranceWorkbenchInfo.customPlateTypeCode">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="*发动机号" :label-cols="4" class="text-right">
                        <b-form-input type="text" :state="customEngineNumberState"  v-model.trim="insuranceWorkbenchInfo.customEngineNumber">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车架号" :label-cols="4" class="text-right">
                        <b-form-input type="text" v-model.trim="insuranceWorkbenchInfo.vinNo" :disabled="true">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="初登日期" :label-cols="4" class="text-right">
                        <date-picker v-model.trim="insuranceWorkbenchInfo.firstRegisterTime">
                        </date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="使用性质" :label-cols="4" class="text-right">
                        <b-form-input type="text" v-model.trim="insuranceWorkbenchInfo.customUseCharacterCode">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="核定载客人数" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model="insuranceWorkbenchInfo.seatingCapacity">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="核定载客质量" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model="insuranceWorkbenchInfo.seatingQuality">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="排量" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model="insuranceWorkbenchInfo.carOpvCode">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="功率" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model="insuranceWorkbenchInfo.carCapacity">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="被保险人姓名" :label-cols="4" class="text-right">
                        <div class="row">
                            <div class="col-md-12">
                                <b-form-input type="text" v-model="insuranceWorkbenchInfo.insuranceWbCustomInfoVo.customName">
                                </b-form-input>
                            </div>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="联系电话" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model="insuranceWorkbenchInfo.insuranceWbCustomInfoVo.customMobilePhone">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="客户类型" :label-cols="4" class="text-right">
                        <b-form-select :options="customTypes" v-model="insuranceWorkbenchInfo.insuranceWbCustomInfoVo.customType">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="证件号" :label-cols="4" class="text-right">
                        <b-form-input type="text" v-model.trim="insuranceWorkbenchInfo.insuranceWbCustomInfoVo.customIdNum">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <b-form-fieldset horizontal label="联系地址" :label-cols="3" class="text-right">
                        <b-form-textarea :rows="3" v-model.trim="insuranceWorkbenchInfo.insuranceWbCustomInfoVo.customAddress">
                        </b-form-textarea>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row" v-if="canEdit">
                <div class="col-md-12">
                    <div class="pull-right">
                        <span v-if="customerState" class="btn btn-primary btn-sm" @click="editInsWbRecognizeeInfo">
                            保存
                        </span>
                        <span v-else class="btn btn-primary btn-sm">
                            <a href="#custom" class="color-white" target="_self">
                               保存
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card class="mb-2" id="outOrder" header="保险出单信息" v-if="isOut">
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="交强险单号" :label-cols="4" class="text-right">
                        <b-form-input type="text" v-model.trim="strongInsurance.outOrderNo" :state="strongOutOrderNoState">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="交强险出单日期" :label-cols="4" class="text-right" :class="{ 'input-box' : strongOutOrderTimeState }">
                        <date-picker v-model="strongInsurance.outOrderTime">
                        </date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="交强险有效期" :label-cols="4" class="text-right" :class="{ 'input-box' : strongVaildTimeState }">
                        <date-picker type="daterange"
                            format="yyyy-MM-dd"
                            @change="strongTimeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            v-model="strongTimeStep">
                        </date-picker>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="商业险单号" :label-cols="4" class="text-right">
                        <b-form-input type="text" v-model.trim="businessOutInsurance.outOrderNo" :state="businessOutOrderNoState">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="商业险出单日期" :label-cols="4" class="text-right" :class="{ 'input-box' : businessOutOrderTimeState }">
                        <date-picker v-model="businessOutInsurance.outOrderTime">
                        </date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="商业险有效期" :label-cols="4" class="text-right" :class="{ 'input-box' : businessVaildTimeState }">
                        <date-picker type="daterange"
                            @change="businessTimeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            v-model="businessTimeStep">
                        </date-picker>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="交强险机构" :label-cols="4" label-text-align="right">
                        <search v-model.trim="strongInsurance.insOrgCode" :dataList="insuranceOrgs" :searchValue="insuranceOrgName" :valueName="'coName'" :keyName="'coCode'" @dataChange="getInsuranceOrgs" @comScroll="getInsuranceOrgs" @clickShowBack="getInsuranceOrgs" disabled>
                        </search>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="投保期" :label-cols="4" label-text-align="right">
                        <div class="row">
                            <div class="col-md-10">
                                <b-form-input type="number" v-model.trim="strongInsurance.insuranceMonth" disabled>
                                </b-form-input>
                            </div>
                            <label class="col-md-2">月</label>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="交强险总价" :label-cols="4" label-text-align="right">
                        <b-form-input type="number" v-model="strongInsurance.vvtaxPrice" disabled>
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="交强险实价" :label-cols="4" label-text-align="right">
                        <b-form-input type="number" v-model="strongInsurance.vvtaxActualPrice" disabled>
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="车船税总价" :label-cols="4" label-text-align="right">
                        <b-form-input type="number" v-model="strongInsurance.carTax" disabled>
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="商业险预估总价" :label-cols="4" label-text-align="right">
                        <b-form-input type="number" v-model="commercialAllInsurance.actualPrice" disabled>
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="商业险机构" :label-cols="4" label-text-align="right">
                        <search v-model.trim="businessInsurance.insOrgCode" :dataList="insuranceOrgs" :searchValue="insuranceOrgName" :valueName="'coName'" :keyName="'coCode'" @dataChange="getInsuranceOrgs" @comScroll="getInsuranceOrgs" @clickShowBack="getInsuranceOrgs" disabled>
                        </search>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="投保期" :label-cols="4" label-text-align="right">
                        <div class="row">
                            <div class="col-md-10">
                                <b-form-input type="number" v-model.trim="businessInsurance.insuranceMonth" disabled>
                                </b-form-input>
                            </div>
                            <label class="col-md-2">月</label>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="商业险总价" :label-cols="4" label-text-align="right">
                        <b-form-input type="number" v-model="totalActualInsuranceLimit" disabled>
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="商业险实价" :label-cols="4" label-text-align="right">
                        <b-form-input type="number" v-model="totalActualPrice" disabled>
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="table-scrollable limit-height">
                        <table class="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th v-for="(field, index) in fields" :key="index">
                                        {{ field.label }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(insuranceDetail, index) in insuranceDetailList" :key="index">
                                    <td>
                                        {{ insuranceDetail.insTypeName }}
                                    </td>
                                    <td>
                                        <b-form-input type="number" v-model="insuranceDetail.actualInsuranceLimit" disabled></b-form-input>
                                    </td>
                                    <td>
                                        <b-form-input type="number" v-model="insuranceDetail.premium" disabled></b-form-input>
                                    </td>
                                    <td>
                                        <b-form-input type="number" v-model="insuranceDetail.actualSdewPrice" disabled></b-form-input>
                                    </td>
                                    <td>
                                        <b-form-input type="number" v-model="insuranceDetail.actualPrice" disabled></b-form-input>
                                    </td>
                                    <td>
                                        <b-form-select :options="accountTypes" v-model="insuranceDetail.accountTypeCode" disabled></b-form-select>
                                    </td>
                                </tr>
                                <tr v-if="insuranceDetailList.length == 0">
                                    <td colspan='10' class="text-left">暂无数据...</td>
                                </tr>
                            </tbody>
                         </table>
                    </div>
                </div>
            </div>
            <div class="row" v-if="canEdit">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="申请结果" :label-cols="4" class="text-right">
                        <b-form-select :options="applyTypes" v-model="insuranceWorkbenchInfo.applyType" :state="applyTypeState">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4" v-if="insuranceWorkbenchInfo.applyType != null && insuranceWorkbenchInfo.applyType != 3">
                    <b-form-fieldset v-if="insuranceWorkbenchInfo.applyType != -1 && insuranceWorkbenchInfo.applyType != 3" horizontal label="批单号" :label-cols="4" class="text-right">
                        <b-form-input type="text" v-model.trim="insuranceWbWorkbenchTrackInfo.outOrderNo" :state="outOrderNoState">
                        </b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset v-else horizontal label="批退原因" :label-cols="4" class="text-right">
                        <b-form-select :options="insuranceRetreatReasonTypes" v-model.trim="insuranceWbWorkbenchTrackInfo.retreatingReasonCode" :state="retreatReasonState">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4" v-if="insuranceWorkbenchInfo.applyType != null && insuranceWorkbenchInfo.applyType != 3">
                    <b-form-fieldset v-if="insuranceWorkbenchInfo.applyType != -1 && insuranceWorkbenchInfo.applyType != 3" horizontal label="批单日期" :label-cols="4"  :class="{ 'input-box' : outOrderTimeState }" class="text-right">
                        <date-picker v-model="insuranceWbWorkbenchTrackInfo.outOrderTime" format="yyyy-MM-dd">
                        </date-picker>
                    </b-form-fieldset>
                    <b-form-fieldset v-else horizontal label="保单终止日期" :label-cols="4" class="text-right" :class="{ 'input-box' : outOrderTimeState }">
                        <date-picker v-model="insuranceWbWorkbenchTrackInfo.outOrderTime" format="yyyy-MM-dd">
                        </date-picker>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row" v-if="insuranceWorkbenchInfo.applyType == 1 || insuranceWorkbenchInfo.applyType == 2">
                <div class="col-md-12">
                    <div class="table-scrollable limit-height">
                        <div class="mt-3 ml-3 mb-3">
                           <b-button size="sm" variant="success" @click="addInsuranceTrackVo">
                               新增
                           </b-button>
                        </div>
                        <table class="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th v-for="(field, index) in trackFields" :key="index">
                                        {{ field.label }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(insuranceDetail, index) in insuranceWbWorkbenchTrackInfoVos" :key="index">
                                    <td>
                                        <select class="form-control custom-select" v-model="insuranceDetail.insTypeCode">
                                            <option v-for="(insurance, index) in insuranceDetailList" :key="index" :value="insurance.insTypeCode">
                                                 {{ insurance.insTypeName }}
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <b-form-select :options="applyTypes" v-model="insuranceDetail.applyType" disabled></b-form-select>
                                    </td>
                                    <td>
                                        <b-form-input type="number" v-model.number="insuranceDetail.actualInsuranceLimit" autocomplete="off"></b-form-input>    <!-- 保额 -->
                                    </td>
                                    <td>
                                        <b-form-input type="number" v-model.number="insuranceDetail.premium" autocomplete="off"></b-form-input>     <!-- 保费 -->
                                    </td>
                                    <td>
                                        <b-button size="sm" variant="danger" @click="removeInsuranceTrackVo(index)">删除</b-button>
                                    </td>
                                </tr>
                                <tr v-if="insuranceWbWorkbenchTrackInfoVos.length == 0">
                                    <td colspan='10' class="text-left">暂无数据...</td>
                                </tr>
                            </tbody>
                         </table>
                    </div>
                </div>
            </div>
            <div class="row" v-if="canEdit">
                <div class="col-md-12">
                    <div class="pull-right">
                        <span v-if="orderCheckState" class="btn btn-primary btn-sm" @click="editInsWbOrderDetailInfo">
                            保存
                        </span>
                        <span v-else class="btn btn-primary btn-sm">
                            <a href="#outOrder" class="color-white" target="_self">
                               保存
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card class="mb-2" header="历史记录" v-if="isOut">
            <div class="row">
                <div class="col-md-12">
                    <div class="table-scrollable">
                        <b-table striped hover bordered show-empty :fields="historyFields" :items="insWbTrackInfoList">
                            <template slot="applyType" slot-scope="data">
                                {{ data.item.applyType | switchApplyType }}
                            </template>
                            <template slot="outOrderTime" slot-scope="data">
                                {{ data.item.outOrderTime | formatDate }}
                            </template>
                            <template slot="createTime" slot-scope="data">
                                {{ data.item.createTime | formatDate }}
                            </template>
                            <template slot="empty">
                                暂无数据
                            </template>
                         </b-table>
                    </div>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    import api from '../../common/api'
    import config from '../../common/config'
    import pagination from 'components/pagination/pagination'
    import treepicker from 'components/treepicker/treepicker'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import search from '../../components/search/search.vue'
    import {
        MessageBox,
        Message,
        DatePicker,
        Radio
    } from 'element-ui'
    import common from '../../common/common';
    export default {
        mounted() {
            let _this = this
            _this.getInsuranceWorkbenchInfo({
                'insuranceWbCode': _this.$route.params.insuranceWbCode
            })
            if (_this.isOut) {
                _this.getInsWbTrackInfoList({
                    'insuranceWbCode': _this.$route.params.insuranceWbCode
                })
            }
            _this.getAccountTypes()
            _this.getInsuranceOrgs()
            _this.getMotorVehicleSpecies()
            _this.getinsuranceFailReasonTypes()
            _this.getInsuranceRetreatingReasonTypes()
            _this.queryInsuranceTotalPriceByOrderNo()

        },
        destroyed() {
            let _this = this
        },
        data: function() {
            return {
                applyTypeState: null,
                customCarPlateState: null,
                customEngineNumberState: null,
                outOrderNoState: null,
                outOrderTimeState: false,
                retreatReasonState: null,
                businessOutOrderNoState: null,
                businessOutOrderTimeState: false,
                businessVaildTimeState: false,
                strongOutOrderNoState: null,
                strongOutOrderTimeState: false,
                strongVaildTimeState: false,
                customerState: true,
                orderCheckState: true,
                config: config,
                insuranceOrgName: '',
                strongTimeStep: [],
                businessTimeStep: [],
                fields: {
                    insTypeName: {
                        label: '商业险种'
                    },
                    actualInsuranceLimit: {
                        label: '保额'
                    },
                    premium: {
                        label: '保费'
                    },
                    actualSdewPrice: {
                        label: '不计免赔'
                    },
                    actualPrice: {
                        label: '实价'
                    },
                    accountTypeCode: {
                        label: '帐类'
                    }
                },
                trackFields: {
                    insTypeName: {
                        label: '商业险种'
                    },
                    actualInsuranceLimit1: {
                        label: '批单类型'
                    },
                    actualInsuranceLimit: {
                        label: '保额'
                    },
                    premium: {
                        label: '保费'
                    },
                    operate: {
                        label: '操作'
                    }
                },
                historyFields: {
                    applyType: {
                        label: '申请结果'
                    },
                    insTypeName: {
                        label: '险种'
                    },
                    outOrderNo: {
                        label: '批单号'
                    },
                    outOrderTime: {
                        label: '批单日期'
                    },
                    premium: {
                        label: '批单金额'
                    },
                    retreatingReasonName: {
                        label: '结果原因'
                    },
                    createTime: {
                        label: '保存时间'
                    }
                },
                insuranceWorkbenchInfo: {
                    insuranceWbCustomInfoVo: {},
                    insuranceWbWorkbenchTrackInfoVos: []
                },
                insWbRecognizeeInfo: {},
                insuranceWbWorkbenchTrackInfo: {},
                strongInsurance: {},
                vehicleAndVesselTaxInsurance: {},
                businessInsurance: {},
                businessOutInsurance: {},
                commercialAllInsurance: {},
                insuranceDetailList: [],
                insuranceWbWorkbenchTrackInfoVos: [],
                insuranceOrgs: [],
                customTypes: [{
                    value: 0,
                    text: "公司"
                }, {
                    value: 1,
                    text: "非营业个人"
                }],
                gender: [{
                    value: "1",
                    text: "男"
                }, {
                    value: "0",
                    text: "女"
                }],
                insuranceStatusList: [{
                        value: 0,
                        text: '待报价'
                    },
                    {
                        value: 1,
                        text: '销售顾问报价'
                    },
                    {
                        value: 2,
                        text: '保险专员报价'
                    },
                    {
                        value: 3,
                        text: '保险战败'
                    },
                ],
                isDefeatList: [{
                        value: 0,
                        text: '否'
                    },
                    {
                        value: 1,
                        text: '是'
                    }
                ],
                insuranceOrg: {
                    load: false,
                    totalPages: 0,
                    pageStart: 1,
                    coCode: '',
                    pageNums: config.maxPageNums,
                    onOffFlag: '0'
                },
                wfTypes: [{
                        value: 'NewCarIntentionOrderWfType',
                        text: '意向单'
                    },
                    {
                        value: 'NewCarOrderWfType',
                        text: '订单'
                    },
                    {
                        value: 'NewCarContractWfType',
                        text: '合同'
                    },
                    {
                        value: 'NewCarRefuseWfType',
                        text: '退订'
                    },
                    {
                        value: null,
                        text: '待提交'
                    }
                ],
                applyTypes: [{
                        value: 1,
                        text: '批增'
                    },
                    {
                        value: 2,
                        text: '批减'
                    },
                    {
                        value: 3,
                        text: '出单成功'
                    },
                    {
                        value: -1,
                        text: '批退'
                    }
                ],
                totalActualInsuranceLimit: null,
                totalActualPrice: null,
                estimateTotalPrice: null,
                insurancePolicyData: {}     // 保险出单信息card的部分数据
            }
        },
        computed: {
            ...mapState('financeWorkbench', [
                'financeWorkbenchData',
                'customData',
                'financeWorkTrackData',
                'authorizationOrgs',
                'financeTypes',
                'idTypes',
                'approvalResultTypes',
                'approvalResultReasonTypes',
                'financeFailReasonTypes',
                'getfinanceWorkbenchSucc',
            ]),
            ...mapState('insuranceWorkbench', [
                'accountTypes',
                'insWbTrackInfoList',
                'motorVehicleSpecies',
                'insuranceTypesList',
                'insuranceFailReasonTypes',
                'insuranceWorkbenchData',
                'insuranceRetreatReasonTypes'
            ]),
            ...mapGetters('insuranceWorkbench', [
                'insuranceStatus'
            ]),
            isOut: function() {    // 为true代表是保险出单页面，为false代表是协作报价页面
                let _this = this
                return (_this.$route.params.flag === config.insuranceWorkbench.outFlag)
            },
            canEdit: function() {
                let _this = this
                return (_this.$route.params.canEdit === config.insuranceWorkbench.editFlag)
            },
            isAllInsurance: function() {
                let _this = this
                return (_this.$data.insuranceWorkbenchInfo.businessPriceModelType === 1 || _this.$data.insuranceWorkbenchInfo.businessPriceModelType === '1')
            }
        },
        methods: {
            // 保险出单信息card的部分数据查询---从 交强险机构那一行 到 申请结果上面的表格
            queryInsuranceTotalPriceByOrderNo(){
                api.insuranceWorchBench.queryInsuranceOrderInfoByOrderNo( { orderNo: this.$route.params.orderNo }, res => {
                    if(res.data.code == 'success'){
                        const obj = res.data.obj
                    }
                })
            },
            goToOrder: function(orderNo) {
                let _this = this
                _this.$router.push('/order/detail/' + orderNo)
            },
            goBack: function() {
                this.$router.push('/insuranceWorkbench/quote')
            },
            goToOrder: function(orderNo) {
                let _this = this
                _this.$router.push('/order/detail/' + orderNo)
            },
            updateInsuranceWorkbenchInfo: function() {
                let _this = this
                let insuranceWbDetailInfos = []
                let businessInsOrgName = ''
                _this.insuranceWorkbenchInfo.insuranceWbCode = _this.$route.params.insuranceWbCode
                _this.$data.strongInsurance.insuranceWbCode = _this.$route.params.insuranceWbCode
                _this.$data.strongInsurance.orderNo = _this.$route.params.orderNo
                _this.$data.strongInsurance.insTypeCode = config.insurance.strongInsuranceType
                _this.$data.strongInsurance.insTypeName = '交强险'
                _this.$data.strongInsurance.insuranceMonth = _this.$data.strongInsurance.insuranceMonth ? _this.$data.strongInsurance.insuranceMonth: 0
                _this.$data.strongInsurance.vvtaxPrice = _this.$data.strongInsurance.vvtaxPrice ? _this.$data.strongInsurance.vvtaxPrice: 0
                _this.$data.strongInsurance.vvtaxActualPrice = _this.$data.strongInsurance.vvtaxActualPrice ? _this.$data.strongInsurance.vvtaxActualPrice: 0
                _this.$data.strongInsurance.carTax = _this.$data.strongInsurance.carTax ? _this.$data.strongInsurance.carTax: 0
                let index = _this.insuranceOrgs.findIndex((insuranceOrg) => {
                    return (insuranceOrg.coCode === _this.strongInsurance.insOrgCode)
                })
                if (index >= 0) {
                    _this.strongInsurance.insOrgName = _this.insuranceOrgs[index].coName
                }
                insuranceWbDetailInfos.push(_this.$data.strongInsurance)
                let vehicleAndVesselTax = JSON.parse(JSON.stringify(_this.$data.strongInsurance))
                vehicleAndVesselTax.insuranceWbCode = _this.$route.params.insuranceWbCode
                vehicleAndVesselTax.orderNo = _this.$route.params.orderNo
                vehicleAndVesselTax.insTypeCode = config.insurance.vehicleAndVesselTaxType
                vehicleAndVesselTax.insTypeName = '车船税'
                vehicleAndVesselTax.insuranceDetailCode = _this.vehicleAndVesselTaxInsurance.insuranceDetailCode
                vehicleAndVesselTax.id = _this.vehicleAndVesselTaxInsurance.id
                insuranceWbDetailInfos.push(vehicleAndVesselTax)
                index = _this.insuranceOrgs.findIndex((insuranceOrg) => {
                    return (insuranceOrg.coCode === _this.businessInsurance.insOrgCode)
                })
                if (index >= 0) {
                    businessInsOrgName = _this.insuranceOrgs[index].coName
                }
                _this.$data.insuranceDetailList.forEach((insuranceDetail) => {
                    insuranceDetail.insuranceWbCode = _this.$data.strongInsurance.insuranceWbCode
                    insuranceDetail.insuranceOrderNo = _this.$data.businessInsurance.insuranceOrderNo
                    insuranceDetail.insuranceMonth = _this.$data.businessInsurance.insuranceMonth ? _this.$data.businessInsurance.insuranceMonth: 0
                    insuranceDetail.outOrderNo = _this.$data.businessOutInsurance.outOrderNo
                    insuranceDetail.outOrderTime = _this.$data.businessOutInsurance.outOrderTime
                    insuranceDetail.validTimeEnd = _this.$data.businessOutInsurance.validTimeEnd
                    insuranceDetail.validTimeStart = _this.$data.businessOutInsurance.validTimeStart
                    insuranceDetail.insOrgName = businessInsOrgName
                    if (insuranceDetail.premium != null && insuranceDetail.premium > 0 &&
                        insuranceDetail.actualInsuranceLimit != null && insuranceDetail.actualInsuranceLimit > 0 ) {
                        insuranceWbDetailInfos.push(insuranceDetail)
                    }
                })
                if (_this.isAllInsurance) {
                    let commercialAllInsurance = _this.$data.commercialAllInsurance
                    commercialAllInsurance.insTypeCode = config.insurance.commercialAllInsuranceType
                    commercialAllInsurance.insTypeName = '商业险总维度'
                    commercialAllInsurance.orderNo = _this.$route.params.orderNo
                    commercialAllInsurance.insuranceWbCode = _this.$route.params.insuranceWbCode
                    commercialAllInsurance.insuranceOrderNo = _this.$data.businessInsurance.insuranceOrderNo
                    commercialAllInsurance.outOrderNo = _this.$data.businessOutInsurance.outOrderNo
                    commercialAllInsurance.outOrderTime = _this.$data.businessOutInsurance.outOrderTime
                    commercialAllInsurance.validTimeEnd = _this.$data.businessOutInsurance.validTimeEnd
                    commercialAllInsurance.validTimeStart = _this.$data.businessOutInsurance.validTimeStart
                    commercialAllInsurance.insuranceMonth = _this.$data.businessInsurance.insuranceMonth
                    commercialAllInsurance.insOrgCode = _this.$data.businessInsurance.insOrgCode
                    commercialAllInsurance.insOrgName = businessInsOrgName
                    if (!commercialAllInsurance.actualPrice) {
                        commercialAllInsurance.actualPrice = 0
                    }
                    insuranceWbDetailInfos.push(commercialAllInsurance)
                }
                _this.insuranceWorkbenchInfo.insuranceWbDetailInfoVos = insuranceWbDetailInfos
                if (_this.insuranceWorkbenchInfo.applyType == 1 || _this.insuranceWorkbenchInfo.applyType == 2) {
                    _this.insuranceWbWorkbenchTrackInfoVos.forEach((insuranceWbWorkbenchTrackInfo) => {
                        let index = _this.insuranceDetailList.findIndex((insurance) => {
                            return (insuranceWbWorkbenchTrackInfo.insTypeCode === insurance.insTypeCode)
                        })
                        if (index >= 0) {
                            insuranceWbWorkbenchTrackInfo.insTypeName = _this.insuranceDetailList[index].insTypeName
                        }
                        _this.insuranceWorkbenchInfo.insuranceWbWorkbenchTrackInfoVos.push(insuranceWbWorkbenchTrackInfo)
                    })
                } else if (_this.insuranceWorkbenchInfo.applyType == -1) {
                    let index = _this.insuranceRetreatReasonTypes.findIndex((insuranceRetreatReasonType) => {
                        return (insuranceRetreatReasonType.value === _this.insuranceWbWorkbenchTrackInfo.retreatingReasonCode)
                    })
                    if (index >= 0) {
                        _this.insuranceWbWorkbenchTrackInfo.retreatingReasonName = _this.insuranceRetreatReasonTypes[index].text
                    }
                    _this.insuranceWbWorkbenchTrackInfo.applyType = _this.insuranceWorkbenchInfo.applyType
                    _this.insuranceWbWorkbenchTrackInfo.insuranceLimit = _this.strongInsurance.insuranceLimit
                    _this.insuranceWbWorkbenchTrackInfo.actualInsuranceLimit = _this.strongInsurance.actualInsuranceLimit
                    _this.insuranceWorkbenchInfo.insuranceWbWorkbenchTrackInfoVos.push(_this.insuranceWbWorkbenchTrackInfo)
                } else if (_this.insuranceWorkbenchInfo.applyType != null) {
                    _this.insuranceWbWorkbenchTrackInfo.retreatingReasonCode = '',
                    _this.insuranceWbWorkbenchTrackInfo.retreatingReasonName = ''
                    _this.insuranceWbWorkbenchTrackInfo.applyType = _this.insuranceWorkbenchInfo.applyType
                    _this.insuranceWbWorkbenchTrackInfo.insuranceLimit = _this.strongInsurance.insuranceLimit
                    _this.insuranceWbWorkbenchTrackInfo.actualInsuranceLimit = _this.strongInsurance.actualInsuranceLimit
                    _this.insuranceWorkbenchInfo.insuranceWbWorkbenchTrackInfoVos.push(_this.insuranceWbWorkbenchTrackInfo)
                }
            },
            editInsWbRecognizeeInfo: function() {
                let _this = this
                if (_this.checkValues()) {
                    _this.insuranceWorkbenchInfo.insuranceWbCustomInfoVo.insuranceWbCode = _this.$route.params.insuranceWbCode
                    _this.updateInsWbRecognizeeInfo({
                        insuranceWorkbenchInfo: _this.insuranceWorkbenchInfo,
                        callback: () => {
                            Message({
                               type: 'success',
                               message: config.messInfo.updateInsWbRecognizeeSucc
                            })
                        }
                    })
                }
            },
            editInsuranceWorkbenchInfo: function() {
                let _this = this
                _this.updateInsuranceWorkbenchInfo()
                _this.insuranceWorkbenchInfo.pushOptType = null
                _this.editInsuranceWorkbenchInfoData({
                    insuranceWorkbenchInfo: _this.insuranceWorkbenchInfo,
                    callback: (insuranceWorkbenchInfo) => {
                        _this.insuranceWorkbenchInfo.insuranceWbCode = insuranceWorkbenchInfo.insuranceWbCode
                        _this.$router.push('/insuranceWorkbench/order/'+ insuranceWorkbenchInfo.wbRootCode + '/'+ insuranceWorkbenchInfo.insuranceWbCode + '/' + insuranceWorkbenchInfo.orderNo + '/' + _this.$route.params.flag  + '/' + config.insuranceWorkbench.editFlag)
                        Message({
                            type: 'success',
                            message: config.messInfo.updateInsuranceWbSucc
                        })
                        _this.getInsuranceWorkbenchInfo({
                           'insuranceWbCode': _this.$route.params.insuranceWbCode
                        })
                    }
                })
            },
            editInsWbOrderDetailInfo: function() {
                let _this = this
                if (_this.checkTrackValues() && _this.checkOutOrderValues()) {
                    _this.updateInsuranceWorkbenchInfo()
                    _this.updateInsWbOrderDetailInfo({
                        insuranceWorkbenchInfo: _this.insuranceWorkbenchInfo,
                        callback: () => {
                            _this.insuranceWbWorkbenchTrackInfoVos = []
                            _this.insuranceWorkbenchInfo.insuranceWbWorkbenchTrackInfoVos = []
                            _this.insuranceWbWorkbenchTrackInfo = {
                                outOrderTime: '',
                                insuranceOrderNo: _this.insuranceWbWorkbenchTrackInfo.insuranceOrderNo,
                                insuranceWbCode: _this.insuranceWbWorkbenchTrackInfo.insuranceWbCode,
                            }
                            _this.$data.insuranceWorkbenchInfo.applyType = null
                            Message({
                                type: 'success',
                                message: config.messInfo.updateOutInsuranceWbSucc
                            })
                            _this.getInsWbTrackInfoList({
                                'insuranceWbCode': _this.$route.params.insuranceWbCode
                            })

                        }
                    })
                }
            },
            synchinsuranceWorkbenchInfo: function() {
                let _this = this
                _this.updateInsuranceWorkbenchInfo()
                _this.insuranceWorkbenchInfo.pushOptType = 1
                _this.synchInsuranceWorkbenchInfo({
                    insuranceWorkbenchInfo: _this.insuranceWorkbenchInfo,
                    callback: (insuranceWorkbenchInfo) => {
                        //_this.goBack()
                        _this.insuranceWorkbenchInfo.insuranceWbCode = insuranceWorkbenchInfo.insuranceWbCode
                        _this.$router.push('/insuranceWorkbench/order/'+ insuranceWorkbenchInfo.wbRootCode + '/'+ insuranceWorkbenchInfo.insuranceWbCode + '/' + insuranceWorkbenchInfo.orderNo + '/' + _this.$route.params.flag + '/' + config.insuranceWorkbench.editFlag)
                        Message({
                            type: 'success',
                            message: config.messInfo.synchInsuranceWbSucc
                        })
                        _this.getInsuranceWorkbenchInfo({
                           'insuranceWbCode': _this.$route.params.insuranceWbCode
                        })
                    }
                })
            },
            getInsuranceOrgs() {
                var $this = this;
                if ($this.insuranceOrg.load || ($this.insuranceOrg.pageStart > $this.insuranceOrg.totalPages && $this.insuranceOrg.totalPages != 0)) return;
                //获取保险公司数据
                $this.insuranceOrg.load = true
                api.insurancePro.queryCompanyInfoByCodesAndPagination({
                    pageNums: $this.insuranceOrg.pageNums,
                    pageStart: this.insuranceOrg.pageStart,
                    onOffFlag: '0'
                }, function(res) {
                    $this.insuranceOrg.load = false
                    if (res.data.code == 'success') {
                        $this.insuranceOrg.pageStart++;
                        $this.insuranceOrg.totalPages = res.data.obj.pages;
                        for (var i = 0, len = res.data.obj.list.length; i < len; i++) {
                            $this.insuranceOrgs.push(res.data.obj.list[i]);
                        }
                    }
                })
            },
            clearInsuranceWorkbenchInfo: function() {
                let _this = this
                _this.$data.strongInsurance = {
                    orderNo: _this.$route.params.orderNo,
                    insuranceOrderNo: _this.$data.insuranceWorkbenchInfo.insOrderNo,
                    insuranceWbCode: _this.$route.params.insuranceWbCode,
                    insuranceLimit: 0,
                    actualInsuranceLimit: 0,
                    sdewPrice: 0
                }
                _this.$data.totalActualInsuranceLimit = null
                _this.$data.totalActualPrice = null
                _this.$data.businessInsurance = {}
                _this.$data.insuranceWorkbenchInfo.insuranceWbDetailInfoVos = []
                _this.$data.insuranceDetailList = []
            },
            strongTimeChange: function() {
                let _this = this
                if (_this.$data.strongTimeStep && _this.$data.strongTimeStep.length > 0) {
                    let timeOne = _this.strongTimeStep[0]
                    let timeTwo = _this.strongTimeStep[1]
                    _this.$data.strongInsurance.validTimeStart = timeOne.getFullYear() + '-' + (timeOne.getMonth() + 1) + '-' + timeOne.getDate()
                    _this.$data.strongInsurance.validTimeEnd = timeTwo.getFullYear() + '-' + (timeTwo.getMonth() + 1) + '-' + timeTwo.getDate()
                } else {
                    _this.$data.strongInsurance.validTimeStart = ''
                    _this.$data.strongInsurance.validTimeEnd = ''
                }
            },
            businessTimeChange: function() {
                let _this = this
                if (_this.$data.businessTimeStep && _this.$data.businessTimeStep.length > 0) {
                    let timeOne = _this.businessTimeStep[0]
                    let timeTwo = _this.businessTimeStep[1]
                    _this.$data.businessOutInsurance.validTimeStart = timeOne.getFullYear() + '-' + (timeOne.getMonth() + 1) + '-' + timeOne.getDate()
                    _this.$data.businessOutInsurance.validTimeEnd = timeTwo.getFullYear() + '-' + (timeTwo.getMonth() + 1) + '-' + timeTwo.getDate()
                } else {
                    _this.$data.businessOutInsurance.validTimeStart = ''
                    _this.$data.businessOutInsurance.validTimeEnd = ''
                }
            },
            addInsuranceTrackVo: function() {
                let _this = this
                _this.insuranceWbWorkbenchTrackInfoVos.push({
                    insuranceOrderNo: _this.insuranceWbWorkbenchTrackInfo.insuranceOrderNo,
                    insuranceWbCode: _this.insuranceWbWorkbenchTrackInfo.insuranceWbCode,
                    insOrgCode: _this.businessInsurance.insOrgCode,
                    outOrderNo: _this.insuranceWbWorkbenchTrackInfo.outOrderNo,
                    outOrderTime: _this.insuranceWbWorkbenchTrackInfo.outOrderTime,
                    applyType: _this.insuranceWorkbenchInfo.applyType,
                    insuranceLimit: _this.strongInsurance.insuranceLimit,
                    // actualInsuranceLimit: _this.strongInsurance.actualInsuranceLimit,
                    actualInsuranceLimit: null,
                    premium: null
                })
            },
            removeInsuranceTrackVo: function(index) {
                let _this = this
                _this.insuranceWbWorkbenchTrackInfoVos.splice(index, 1)
            },
            checkValues: function() {
                let _this = this
                let result = true
                if (!_this.insuranceWorkbenchInfo.customEngineNumber || (_this.insuranceWorkbenchInfo.customEngineNumber == '')) {
                    _this.customEngineNumberState = 'invalid'
                    result = false
                } else {
                    _this.customEngineNumberState = null
                }
                if (!result) {
                    Message.closeAll();
                    Message({
                        type: "warning",
                        message: "请填写必填信息"
                    })
                }
                return result
            },
            checkTrackValues: function() {
                let _this = this
                let result = true
                if (!_this.insuranceWorkbenchInfo.applyType) {
                   _this.applyTypeState = 'invalid'
                   result = false
                } else {
                    _this.applyTypeState = null
                }
                if (_this.insuranceWorkbenchInfo.applyType == 3) {
                    _this.$data.insuranceWbWorkbenchTrackInfo.outOrderNo = ''
                    _this.$data.insuranceWbWorkbenchTrackInfo.outOrderTime = ''

                    _this.$data.insuranceWbWorkbenchTrackInfo.retreatingReasonCode = ''
                    _this.$data.insuranceWbWorkbenchTrackInfo.retreatingReasonName = ''
                }
                if (_this.insuranceWorkbenchInfo.applyType == -1) {
                   _this.$data.insuranceWbWorkbenchTrackInfo.outOrderNo = ''
                }
                if (_this.insuranceWorkbenchInfo.applyType == 1 || _this.insuranceWorkbenchInfo.applyType == 2) {
                    if (!_this.$data.insuranceWbWorkbenchTrackInfo.outOrderNo || (_this.$data.insuranceWbWorkbenchTrackInfo.outOrderNo == '')) {
                        _this.outOrderNoState = 'invalid'
                        result = false
                    } else {
                        _this.outOrderNoState = null
                    }
                }
                if (_this.insuranceWorkbenchInfo.applyType == 1 || _this.insuranceWorkbenchInfo.applyType == 2 || _this.insuranceWorkbenchInfo.applyType == -1) {
                    if (!_this.$data.insuranceWbWorkbenchTrackInfo.outOrderTime || (_this.$data.insuranceWbWorkbenchTrackInfo.outOrderTime == '')) {
                        _this.outOrderTimeState = true
                        result = false
                    } else {
                        _this.outOrderTimeState = false
                    }
                }
                if (_this.insuranceWorkbenchInfo.applyType == -1) {
                    if (!_this.$data.insuranceWbWorkbenchTrackInfo.retreatingReasonCode || (_this.$data.insuranceWbWorkbenchTrackInfo.retreatingReasonCode == '')) {
                        _this.retreatReasonState = 'invalid'
                        result = false
                    } else {
                        _this.retreatReasonState = null
                    }
                }
                return result
            },
            checkOutOrderValues: function() {
                let _this = this
                let result = true
                if (_this.$data.strongInsurance.id && _this.$data.strongInsurance.id != null) {
                    if (!_this.strongInsurance.outOrderNo || (_this.strongInsurance.outOrderNo === '')) {
                        result = false
                        _this.$data.strongOutOrderNoState = 'invalid'
                    } else {
                        _this.$data.strongOutOrderNoState = null
                    }
                    if (!_this.strongInsurance.outOrderTime || (_this.strongInsurance.outOrderTime === '')) {
                        result = false
                        _this.$data.strongOutOrderTimeState = true
                    } else {
                        _this.$data.strongOutOrderTimeState = false
                    }
                    if (!_this.strongInsurance.validTimeStart || !_this.strongInsurance.validTimeEnd) {
                        result = false
                        _this.$data.strongVaildTimeState = true
                    } else {
                        _this.$data.strongVaildTimeState = false
                    }
                }
                if (_this.$data.businessInsurance.id && _this.$data.businessInsurance.id != null) {
                    if (!_this.businessOutInsurance.outOrderNo || (_this.businessOutInsurance.outOrderNo == '')) {
                        result = false
                        _this.$data.businessOutOrderNoState = 'invalid'
                    } else {
                        _this.$data.businessOutOrderNoState = null
                    }
                    if (!_this.businessOutInsurance.outOrderTime || (_this.businessOutInsurance.outOrderTime == '')) {
                        result = false
                        _this.$data.businessOutOrderTimeState = true
                    } else {
                        _this.$data.businessOutOrderTimeState = false
                    }
                    if (!_this.businessOutInsurance.validTimeStart || !_this.businessOutInsurance.validTimeEnd) {
                        result = false
                        _this.$data.businessVaildTimeState = true
                    } else {
                        _this.$data.businessVaildTimeState = false
                    }
                }
                if (!result) {
                    Message.closeAll();
                    Message({
                        type: "warning",
                        message: "请填写必填信息"
                    })
                }
                return result
            },
            ...mapActions('insuranceWorkbench', [
                'getAccountTypes',
                'getMotorVehicleSpecies',
                'getInsWbTrackInfoList',
                'updateInsWbRecognizeeInfo',
                'updateInsWbOrderDetailInfo',
                'editInsuranceWorkbenchInfoData',
                'synchInsuranceWorkbenchInfo',
                'getInsuranceWorkbenchInfo',
                'getinsuranceFailReasonTypes',
                'getInsuranceRetreatingReasonTypes',
                'getInsuranceTypesInfoVosByCoCode'
            ])
        },
        watch: {
            insuranceWorkbenchData: {
                handler(val) {
                    let _this = this
                    _this.$data.insuranceWorkbenchInfo = JSON.parse(JSON.stringify(val))
                    _this.$data.insuranceWbWorkbenchTrackInfo = {
                        orderNo: _this.$route.params.orderNo,
                        insuranceWbCode: _this.$route.params.insuranceWbCode,
                        insuranceOrderNo: _this.$data.insuranceWorkbenchInfo.insOrderNo
                    }
                    let index = _this.$data.insuranceWorkbenchInfo.insuranceWbDetailInfoVos.findIndex((insuranceWbDetailInfo) => {
                        return (insuranceWbDetailInfo.insTypeCode == config.insurance.strongInsuranceType)
                    })
                    if (index >= 0) {
                        _this.$data.strongInsurance = _this.$data.insuranceWorkbenchInfo.insuranceWbDetailInfoVos[index]
                        if (_this.$data.strongInsurance.validTimeStart && _this.$data.strongInsurance.validTimeEnd) {
                           _this.$data.strongTimeStep.push(new Date(_this.$data.strongInsurance.validTimeStart))
                           _this.$data.strongTimeStep.push(new Date(_this.$data.strongInsurance.validTimeEnd))
                        }
                    } else {
                        _this.$data.strongInsurance = {
                            orderNo: _this.$route.params.orderNo,
                            insuranceOrderNo: _this.$data.insuranceWorkbenchInfo.insOrderNo,
                            insuranceWbCode: _this.$route.params.insuranceWbCode,
                            insuranceLimit: 0,
                            actualInsuranceLimit: 0,
                            sdewPrice: 0
                        }
                    }
                    index = _this.$data.insuranceWorkbenchInfo.insuranceWbDetailInfoVos.findIndex((insuranceWbDetailInfo) => {
                        return (insuranceWbDetailInfo.insTypeCode == config.insurance.vehicleAndVesselTaxType)
                    })
                    if (index >= 0) {
                        _this.$data.vehicleAndVesselTaxInsurance = _this.$data.insuranceWorkbenchInfo.insuranceWbDetailInfoVos[index]
                        _this.$data.strongInsurance.carTax = _this.$data.insuranceWorkbenchInfo.insuranceWbDetailInfoVos[index].carTax
                    }
                    index = _this.$data.insuranceWorkbenchInfo.insuranceWbDetailInfoVos.findIndex((insuranceWbDetailInfo) => {
                        return ((insuranceWbDetailInfo.insTypeCode != config.insurance.strongInsuranceType) && (insuranceWbDetailInfo.insTypeCode != config.insurance.vehicleAndVesselTaxType))
                    })
                    if (index >= 0) {
                        _this.$data.businessInsurance = _this.$data.insuranceWorkbenchInfo.insuranceWbDetailInfoVos[index]
                        _this.$data.businessOutInsurance.outOrderNo = _this.$data.businessInsurance.outOrderNo
                        _this.$data.businessOutInsurance.outOrderTime = _this.$data.businessInsurance.outOrderTime
                        if (_this.$data.businessInsurance.validTimeStart && _this.$data.businessInsurance.validTimeEnd) {
                           _this.$data.businessTimeStep.push(new Date(_this.$data.businessInsurance.validTimeStart))
                           _this.$data.businessTimeStep.push(new Date(_this.$data.businessInsurance.validTimeEnd))
                        }
                    }
                    if (_this.$data.insuranceWorkbenchInfo.insuranceWbCustomInfoVo == null) {
                        _this.$data.insuranceWorkbenchInfo.insuranceWbCustomInfoVo = {}
                    }
                    if (_this.$data.insuranceWorkbenchInfo.insuranceWbWorkbenchTrackInfoVos == null) {
                        _this.$data.insuranceWorkbenchInfo.insuranceWbWorkbenchTrackInfoVos = []
                    }
                    index = _this.$data.insuranceWorkbenchInfo.insuranceWbDetailInfoVos.findIndex((insuranceWbDetailInfo) => {
                        return (insuranceWbDetailInfo.insTypeCode == config.insurance.commercialAllInsuranceType)
                    })
                    if (index >= 0) {
                        _this.$data.commercialAllInsurance = _this.$data.insuranceWorkbenchInfo.insuranceWbDetailInfoVos[index]
                        if (!_this.$data.commercialAllInsurance.actualPrice) {
                            _this.$data.commercialAllInsurance.actualPrice = null
                        }
                    }
                }
            },
            businessInsurance: {
                handler(value) {
                    let _this = this
                    if (value.insOrgCode && value.insOrgCode != '') {
                        _this.getInsuranceTypesInfoVosByCoCode({
                            coCode: value.insOrgCode,
                            callback: (insuranceTypes) => {
                                _this.$data.insuranceDetailList = []
                                let actualInsuranceLimit = 0
                                let actualPrice = 0
                                insuranceTypes.forEach((type) => {
                                    let index = _this.$data.insuranceWorkbenchInfo.insuranceWbDetailInfoVos.findIndex((insuranceWbDetailInfo) => {
                                        return (insuranceWbDetailInfo.insTypeCode === type.insTypeRefDetailCode)
                                    })
                                    if (index >= 0) {
                                        let val = _this.$data.insuranceWorkbenchInfo.insuranceWbDetailInfoVos[index]
                                        actualInsuranceLimit = actualInsuranceLimit + val.premium + val.actualSdewPrice
                                        actualPrice = actualPrice + val.actualPrice
                                        _this.$data.insuranceDetailList.push({
                                            id: val.id,
                                            insTypeCode: type.insTypeRefDetailCode,
                                            insTypeName: type.insTypeName,
                                            insOrgCode: _this.$data.businessInsurance.insOrgCode,
                                            premium: val.premium,
                                            actualInsuranceLimit: val.actualInsuranceLimit,
                                            insuranceLimit: val.insuranceLimit,
                                            actualPrice: val.actualPrice,
                                            actualSdewPrice: val.actualSdewPrice,
                                            sdewPrice: val.sdewPrice,
                                            accountTypeCode: config.insurance.normalAccountType,
                                            accountTypeName: val.accountTypeName,
                                            applyType: val.applyType,
                                            insuranceDetailCode: val.insuranceDetailCode,
                                            insuranceWbCode: val.insuranceWbCode,
                                            insuranceOrderNo: _this.$data.businessInsurance.insuranceOrderNo,
                                            validTimeStart: _this.$data.businessInsurance.validTimeStart,
                                            validTimeEnd: _this.$data.businessInsurance.validTimeEnd,
                                            outOrderNo: _this.$data.businessInsurance.outOrderNo,
                                            outOrderTime: _this.$data.businessInsurance.outOrderTime,
                                            orderNo: _this.$route.params.orderNo,
                                            insuranceMonth: _this.$data.businessInsurance.insuranceMonth,
                                        })
                                        _this.$data.totalActualInsuranceLimit = actualInsuranceLimit
                                        _this.$data.totalActualPrice = actualPrice.toFixed(2)
                                    } else {
                                        _this.$data.insuranceDetailList.push({
                                            insTypeCode: type.insTypeRefDetailCode,
                                            insTypeName: type.insTypeName,
                                            insOrgCode: _this.$data.businessInsurance.insOrgCode,
                                            premium: null,
                                            actualInsuranceLimit: null,
                                            actualPrice: null,
                                            actualSdewPrice: null,
                                            insuranceOrderNo: _this.$data.businessInsurance.insuranceOrderNo,
                                            validTimeStart: _this.$data.businessInsurance.validTimeStart,
                                            validTimeEnd: _this.$data.businessInsurance.validTimeEnd,
                                            outOrderNo: _this.$data.businessInsurance.outOrderNo,
                                            outOrderTime: _this.$data.businessInsurance.outOrderTime,
                                            accountTypeCode: config.insurance.normalAccountType,
                                            orderNo: _this.$route.params.orderNo,
                                            insuranceMonth: _this.$data.businessInsurance.insuranceMonth,
                                        })
                                    }
                                })
                            }
                        })
                    }
                },
                deep: true
            },
            insuranceWbWorkbenchTrackInfo: {
                handler(val) {
                    let _this = this
                    _this.insuranceWbWorkbenchTrackInfoVos.forEach((trackInfo) => {
                         trackInfo.outOrderNo = val.outOrderNo
                         trackInfo.outOrderTime = val.outOrderTime
                    })
                },
                deep: true
            }
        },
        components: {
            Radio,
            search,
            Message,
            MessageBox,
            pagination,
            treepicker,
            DatePicker,
            areaqueryshop
        }
    }
</script>

<style lang="scss" scoped>
    .limit-height {
        max-height: 510px !important;
        overflow: scroll;
    }
    .color-white {
        color: #fff !important;
    }
</style>
