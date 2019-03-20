<template>
    <div id="gross">
        <b-card>
            <div class="row">
                <!-- 门店区域 -->
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="销售区域" label-text-align="right" :label-cols="4">
                        <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <!-- 时间组件 -->
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="月份" :label-cols="4" label-text-align="right">
                          <el-date-picker
                              v-model="monthValue"
                              type="month"
                              placeholder="请选择月份">
                          </el-date-picker>
                    </b-form-fieldset>
                </div>
            </div>
            <!-- 车型组件 -->
            <IrisCar :col="2" @callBack="backSkuCar" ref="car" :showModel="false" :showCar="false"></IrisCar>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" variant="default" @click="clear()">重置</b-button>
                        <b-button size="sm" variant="primary" @click="queryData()">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <b-row>
                <b-col>
                    <div class="tgp">
                        <instrumentPanel :instrumentID="instrumentID"></instrumentPanel>
                        <div id="myChart" class="myChart"></div>
                    </div>
                </b-col>
                 <b-col class="12 tapDetail" md="8">
                    <div class="row">
                      <b-col class="tgpTitle">
                        <p>T.GP目标</p>
                          <input v-show="!editShow" type="number" v-model.trim="MaoriReportData.targetGpValue">
                          <span class="editShow" v-show="editShow"><span>{{ toPercentage(MaoriReportData.targetGpValue) || 0 }}</span><span class="unit" v-show="MaoriReportData.targetGpValue >= 10000 || MaoriReportData.targetGpValue <= -10000">k</span></span>
                      </b-col>
                      <b-col class="tgpTitle">
                        <p>运营成本</p>
                          <input v-show="!editShow" type="number" v-model.trim="MaoriReportData.operatingCosts">
                          <span class="editShow" v-show="editShow"><span>{{ toPercentage(MaoriReportData.operatingCosts) || 0 }}</span> <span class="unit" v-show="MaoriReportData.operatingCosts >= 10000 || MaoriReportData.operatingCosts <= -10000">k</span></span>
                      </b-col>
                      <b-col class="tgpTitle">
                        <p>所得税</p>
                          <input v-show="!editShow" type="number" v-model.trim="MaoriReportData.incomeTax">
                          <span class="editShow" v-show="editShow"><span>{{ toPercentage(MaoriReportData.incomeTax) || 0 }}</span> <span class="unit" v-show="MaoriReportData.incomeTax >= 10000 || MaoriReportData.incomeTax <= -10000">k</span></span>
                      </b-col>
                      <b-col class="tgpTitle">
                        <p>利息</p>
                          <input v-show="!editShow" type="number" v-model.trim="MaoriReportData.interest">
                          <span class="editShow" v-show="editShow"><span>{{ toPercentage(MaoriReportData.interest) || 0 }}</span><span class="unit" v-show="MaoriReportData.interest >= 10000 || MaoriReportData.interest <= -10000">k</span></span>
                      </b-col>
                    </div>

                    <div class="row tgpbottom">
                        <b-col class="tgpTitle">
                            <p>预计T.GP</p>
                            <span class="gpVal">{{ toPercentage(MaoriReportData.targetGpForecast) }}</span><span class="unit" v-show="MaoriReportData.targetGpForecast >=10000 || MaoriReportData.targetGpForecast<= -10000">k</span>
                        </b-col>
                        <b-col class="tgpTitle">
                            <p>预计息税后利润</p>
                            <span class="gpVal">{{ toPercentage(MaoriReportData.targetGpForecast - MaoriReportData.operatingCosts) }}</span><span class="unit" v-show="(MaoriReportData.targetGpForecast - MaoriReportData.operatingCosts) >= 10000 || (MaoriReportData.targetGpForecast - MaoriReportData.operatingCosts) <= -10000">k</span>
                        </b-col>
                        <b-col class="whiteTGP tgpTitle">

                        </b-col>
                        <b-col class="whiteTGP tgpTitle" v-show="editStoretarget">
                            <div class="modBtn"  v-show="isShow && editStoretarget" @click="modBtn">修改门店目标</div>
                            <div v-show="!isShow">
                                <b-button style="margin: 0px auto 20px; display: block" @click="preserve" type="button" variant="primary">保存</b-button>
                                <b-button style="margin: 0px auto; display: block" @click="close" type="button" variant="">取消</b-button>
                            </div>
                        </b-col>
                    </div>
                </b-col>
            </b-row>
        </b-card>
        <!-- 毛利预测表设置 -->
        <b-card>
            <div class="row">
                <div class="col-md-12 importList">
                    <div class="pull-left">
                        <div class="row">
                            <b-btn variant="primary" class="editModel" :disabled="showEditTable"  v-b-modal.modal1 @click="editTable()">预测设置</b-btn>
                            <b-modal v-show="grossShow" hide-header-close hide-footer hide-header id="modal1">
                                <div class="modal-table">
                                  <div class="row grossTitle">
                                    <div class="grossLeftTitle">
                                      <span>月T.GP目标预计达成率</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                      <span class="monthTgpRate">{{ monthTgpRate }}%</span>
                                    </div>
                                    <div class="grossCenterTitle">
                                      <span>月T.GP目标总值</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                      <span class="monthTgpNum">{{ (MaoriReportData.targetGpValue / 1000) | reservedDecimal(1) }}K</span>
                                    </div>
                                    <div class="grossRightTitle"></div>
                                  </div>
                                  <div class="row carInfoTitle">
                                    <div class="carLeftTitle">
                                      <span>已选车系：</span>
                                      <br>
                                      <span v-for="(item, index) in grossSetList" :key="index">
                                        <span class="carSeries">{{ item.seriesName }};&nbsp;</span>
                                      </span>
                                    </div>
                                    <div class="carRightTitle">
                                      <span class="tgpTotalTitle">所选车系车型T.GP合计：</span>
                                      <br>
                                      <span class="tgpTotal">{{ MaoriTGPTotalTarget | reservedDecimal(1)}}K</span>
                                    </div>
                                  </div>
                                  <div class="reportInfo">
                                      <div class="row">
                                          <div class="modal-left-table">
                                              <table class="table table-striped table-bordered">
                                                  <thead>
                                                      <th colspan="4">1.库存状态</th>
                                                  </thead>
                                                  <tbody>
                                                        <tr>
                                                            <td>上月在库可售库存</td>
                                                            <td>上月计划到库的在途库存</td>
                                                            <td>上月销售台数</td>
                                                            <td>上月批售台数</td>
                                                        </tr>
                                                        <tr class="modal-table-numTitle grossData">
                                                            <td>{{ MaoriLastMonthAvailableSaleInStock | upwardCeil }}</td>
                                                            <td>{{ MaoriLastMonthOnTheWayStock | upwardCeil }}</td>
                                                            <td>{{ MaoriLastMonthSalesNumber | upwardCeil }}</td>
                                                            <td>{{ MaoriLastMonthBatchSalesNumber | upwardCeil }}</td>
                                                        </tr>
                                                        <tr class="modal-table-title">
                                                            <td>月底库存台数</td>
                                                            <td>本月可售库存周转天数</td>
                                                            <td class="editableTitle">目标 本月可售库存周转天数</td>
                                                            <td>本月库存安全销售目标</td>
                                                        </tr>
                                                        <tr class="modal-table-numTitle monthStock">
                                                            <td>{{ MaoriExpectEndMonthAvailableSaleNumber | upwardCeil }}</td>
                                                            <td>{{ MaoriExpectCurrentMonthAvailableSaleStockCycle | upwardCeil }}</td>
                                                            <td>
                                                              <input class="table-bordered" type="text" @blur.prevent="inputInteger()"  v-model.trim="MaoriTargetCurrentMonthAvailableSaleStockCycle">
                                                            </td>
                                                            <td>{{ MaoriCurrentMonthStockSecuritySalesTarget | upwardCeil }}</td>
                                                        </tr>
                                                  </tbody>
                                              </table>
                                          </div>
                                          <div class="modal-right-table">
                                              <table class="table table-striped table-bordered">
                                                  <thead>
                                                    <th colspan="4">2.漏斗表现</th>
                                                  </thead>
                                                  <tbody>
                                                    <tr>
                                                      <td colspan="2">进店线索数</td>
                                                      <td colspan="2">进店线索订单率</td>
                                                    </tr>
                                                    <tr class="modal-table-numTitle">
                                                      <td>上月：{{ MaoriLastMonthInStoreLeadsNumber | reservedDecimal(0) }}</td>
                                                      <td>目标：<input class="editableNum table-bordered" type="text" @blur.prevent="inputInteger()" v-model.trim="MaoriCurrentMonthInStoreLeadsNumTarget"></td>
                                                      <td>上月：{{ MaoriLastMonthInStoreLeadsOrderRate | reservedDecimal(1) }}%</td>
                                                      <td>目标：<input class="editableNum table-bordered" type="text" @blur.prevent="inputInteger()" v-model.trim="MaoriCurrentMonthInStoreLeadsOrderRateTarget">%</td>
                                                    </tr>
                                                    <tr class="modal-table-title">
                                                      <td colspan="2">本月订单总数目标</td>
                                                      <td colspan="2">订单零售率</td>
                                                    </tr>
                                                    <tr class="modal-table-numTitle">
                                                      <td>上月留存：{{ MaoriLastMonthLeftOverOrderNum | reservedDecimal(1) }}</td>
                                                      <td>本月新增目标：{{ MaoriCurrentMonthAddOrderNumTarget | reservedDecimal(1) }}</td>
                                                      <td>上月：{{ MaoriLastMonthOrderRetailRate | reservedDecimal(1) }}%</td>
                                                      <td>目标：<input class="editableNum table-bordered" type="text" @blur.prevent="inputInteger()" v-model.trim="MaoriCurrentMonthOrderRetailRateTarget">%</td>
                                                    </tr>
                                                    <tr class="modal-table-title">
                                                      <td>展厅零售目标</td>
                                                      <td>厂家零售SI目标(台)</td>
                                                      <td>本月销售目标</td>
                                                      <td>二级批售配额</td>
                                                    </tr>
                                                    <tr class="modal-table-numTitle">
                                                      <td>{{ MaoriExhibitionHallRetailTarget | upwardCeil }}</td>
                                                      <td><input class="table-bordered" type="text" @blur.prevent="inputInteger()" v-model.trim="MaoriFactorSiSalesTarget"></td>
                                                      <td>{{ MaoriCurrentMonthSalesTarget | upwardCeil }}</td>
                                                      <td>{{ MaoriTwoLevelSales | upwardCeil }}</td>
                                                    </tr>
                                                  </tbody>
                                              </table>
                                          </div>
                                      </div>
                                      <div class="row">
                                          <div class="modal-left-table">
                                              <table class="table table-striped table-bordered">
                                                  <thead>
                                                      <tr>
                                                        <th colspan="6">3.销售毛利</th>
                                                      </tr>
                                                  </thead>
                                                  <tbody>
                                                      <tr>
                                                          <td colspan="2">平均进货成本</td>
                                                          <td>上月平均销售金额</td>
                                                          <td>目标零售限价金额/台</td>
                                                          <td>目标批售限价金额/台</td>
                                                      </tr>
                                                      <tr class="modal-table-numTitle">
                                                          <td colspan="2">{{ MaoriAveragePurchaseCost | reservedDecimal(1) }}K</td>
                                                          <td>{{ MaoriLastMonthAverageSaleAmount | reservedDecimal(1) }}K</td>
                                                          <td><input class="editableNum table-bordered" type="text" @blur.prevent="inputInteger()" v-model.trim="MaoriTargetRetailPrice">K</td>
                                                          <td><input class="editableNum table-bordered" type="text" @blur.prevent="inputInteger()" v-model.trim="MaoriTargetWholesalePrice">K</td>
                                                      </tr>
                                                      <tr class="modal-table-title">
                                                          <td colspan="2">本月第一档零售GP/台</td>
                                                          <td>本月第一档批售GP/台</td>
                                                          <td>本月第一档GP/台</td>
                                                          <td></td>
                                                      </tr>
                                                      <tr class="modal-table-numTitle grossData">
                                                          <td colspan="2">{{ MaoriExpectRetailGP1 | reservedDecimal(1) }}K</td>
                                                          <td>{{ MaoriExpectWholesaleGP1 | reservedDecimal(1) }}K</td>
                                                          <td>{{ MaoriExpectCurrentMonthGP1 | reservedDecimal(1) }}K</td>
                                                          <td></td>
                                                      </tr>
                                                      <tr class="modal-table-title">
                                                          <td colspan="2">赠品/台</td>
                                                          <td>本月第二档GP/台</td>
                                                          <td>预估厂家SI</td>
                                                          <td>预估年度返利</td>
                                                      </tr>
                                                      <tr class="modal-table-numTitle grossData">
                                                          <td>上月：{{ MaoriGiftLastMonth | reservedDecimal(1) }}</td>
                                                          <td>目标：<input class="editableNum table-bordered" type="text" @blur.prevent="inputInteger()" v-model.trim="MaoriGiftTarget"></td>
                                                          <td>{{ MaoriExpectCurrentMonthGP2 | reservedDecimal(1) }}K</td>
                                                          <td><input class="editableNum table-bordered" type="text" @blur.prevent="inputInteger()" v-model.trim="MaoriEstimateFactorySi">K</td>
                                                          <td><input class="editableNum table-bordered" type="text" @blur.prevent="inputInteger()" v-model.trim="MaoriEstimateYearRebate">K</td>
                                                      </tr>
                                                      <tr class="modal-table-title">
                                                        <td colspan="2">本月第三档GP/台</td>
                                                        <td>本月第三档GP%</td>
                                                        <td></td>
                                                        <td></td>
                                                      </tr>
                                                      <tr class="modal-table-numTitle">
                                                        <td colspan="2">{{ MaoriExpectCurrentMonthGP4 | reservedDecimal(1) }}K</td>
                                                        <td>{{ MaoriExpectCurrentMonthGP4Rate | reservedDecimal(1) }}%</td>
                                                        <td></td>
                                                        <td></td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                              <div class="row">
                                                <div class="pull-left keep tips">*上月指的是当前操作时间的上一个自然月</div>
                                              </div>
                                          </div>
                                          <div class="modal-right-table">
                                              <table class="table table-striped table-bordered">
                                                  <thead>
                                                    <tr>
                                                      <th colspan="6">4.衍生业务</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    <tr>
                                                      <td colspan="2">金融渗透率</td>
                                                      <td colspan="2">金融毛利/台</td>
                                                      <td colspan="2">金融毛利</td>
                                                    </tr>
                                                    <tr class="modal-table-numTitle">
                                                      <td>上月：{{ (MaoriFinancialPermeabilityLastMonth )  | reservedDecimal(1) }}%</td>
                                                      <td>目标：<input class="editableNum table-bordered" type="text" @blur.prevent="inputInteger()" v-model.trim="MaoriFinancialPermeabilityTarget">%</td>
                                                      <td>上月：{{ MaoriAvgFinancialProfiLastMonth | reservedDecimal(1) }}</td>
                                                      <td>目标：<input class="editableNum" type="text" @blur.prevent="inputInteger()" v-model.trim="MaoriAvgFinancialProfiTarget"></td>
                                                      <td>上月：{{ MaoriFinancialGPLastMonth | reservedDecimal(1) }}</td>
                                                      <td>目标：{{ MaoriFinancialGPTarget | reservedDecimal(1) }}</td>
                                                    </tr>
                                                    <tr class="modal-table-title">
                                                      <td colspan="2">保险渗透率</td>
                                                      <td colspan="2">保险毛利/台</td>
                                                      <td colspan="2">保险毛利</td>
                                                    </tr>
                                                    <tr class="modal-table-numTitle">
                                                      <td>上月：{{ (MaoriInsurancePermeabilityLastMonth ) | reservedDecimal(1) }}%</td>
                                                      <td>目标：<input class="editableNum table-bordered" type="text" @blur.prevent="inputInteger()" v-model.trim="MaoriInsurancePermeabilityTarget">%</td>
                                                      <td>上月：{{ MaoriAvgInsuranceProfiLastMonth | reservedDecimal(1) }}</td>
                                                      <td>目标：<input class="editableNum table-bordered" type="text" @blur.prevent="inputInteger()" v-model.trim="MaoriAvgInsuranceProfiTarget"></td>
                                                      <td>上月：{{ MaoriInsuranceGPLastMonth | reservedDecimal(1) }}</td>
                                                      <td>目标：{{ MaoriInsuranceGPTarget | reservedDecimal(1) }}</td>
                                                    </tr>
                                                    <tr class="modal-table-title">
                                                      <td colspan="2">精品渗透率</td>
                                                      <td colspan="2">精品毛利/台</td>
                                                      <td colspan="2">精品毛利</td>
                                                    </tr>
                                                    <tr class="modal-table-numTitle">
                                                      <td>上月：{{ (MaoriSkuPermeabilityLastMonth ) | reservedDecimal(1) }}%</td>
                                                      <td>目标：<input class="editableNum table-bordered" type="text" @blur.prevent="inputInteger()" v-model.trim="MaoriSkuPermeabilityTarget">%</td>
                                                      <td>上月：{{ MaoriSkuGPLastMonth | reservedDecimal(1) }}</td>
                                                      <td>目标：<input class="editableNum table-bordered" type="text" @blur.prevent="inputInteger()" v-model.trim="MaoriSkuGPTarget"></td>
                                                      <td>上月：{{ MaoriSkuGPTotalLastMonth | reservedDecimal(1) }}</td>
                                                      <td>目标：{{ MaoriSkuGPTotalTarget | reservedDecimal(1) }}</td>
                                                    </tr>
                                                    <tr class="modal-table-title">
                                                      <td colspan="2">新车延保渗透率</td>
                                                      <td colspan="2">新车延保毛利/台</td>
                                                      <td colspan="2">新车延保毛利</td>
                                                    </tr>
                                                    <tr class="modal-table-numTitle">
                                                      <td>上月：{{ (MaoriNewCarYBPermeabilityLastMonth ) | reservedDecimal(1) }}%</td>
                                                      <td>目标：<input class="editableNum table-bordered" type="text" @blur.prevent="inputInteger()" v-model.trim="MaoriNewCarYBPermeabilityTarget">%</td>
                                                      <td>上月：{{ MaoriYBGPLastMonth | reservedDecimal(1) }}</td>
                                                      <td>目标：<input class="editableNum table-bordered" type="text" @blur.prevent="inputInteger()" v-model.trim="MaoriYBGPTarget"></td>
                                                      <td>上月：{{ MaoriNewCarYBGPLastMonth | reservedDecimal(1) }}</td>
                                                      <td>目标：{{ MaoriNewCarYBGPTarget | reservedDecimal(1) }}</td>
                                                    </tr>
                                                    <tr class="modal-table-title">
                                                      <td colspan="2">其他毛利渗透率</td>
                                                      <td colspan="2">其他毛利/台</td>
                                                      <td colspan="2">其他毛利</td>
                                                    </tr>
                                                    <tr class="modal-table-numTitle">
                                                      <td>上月：{{ (MaoriOtherBusinessPermeabilityLastMonth ) | reservedDecimal(1) }}%</td>
                                                      <td>目标：<input class="editableNum table-bordered" type="text" @blur.prevent="inputInteger()" v-model.trim="MaoriOtherBusinessPermeabilityTarget">%</td>
                                                      <td>上月：{{ MaoriOtherGPLastMonth | reservedDecimal(1) }}</td>
                                                      <td>目标：<input class="editableNum table-bordered" type="text" @blur.prevent="inputInteger()" v-model.trim="MaoriOtherGPTarget"></td>
                                                      <td>上月：{{ MaoriOtherBusinessGPLastMonth | reservedDecimal(1) }}</td>
                                                      <td>目标：{{ MaoriOtherBusinessGPTarget | reservedDecimal(1) }}</td>
                                                    </tr>
                                                    <tr class="modal-table-title">
                                                      <td colspan="4">衍生业务毛利/台</td>
                                                      <td>上月：{{ MaoriDerivationBusinessGPLastMonth | reservedDecimal(1) }}K</td>
                                                      <td>目标：{{ MaoriDerivationBusinessGPTarget | reservedDecimal(1) }}K</td>
                                                    </tr>
                                                    <tr class="modal-table-title grossProfit">
                                                      <td colspan="4">衍生业务毛利</td>
                                                      <td>上月：{{ MaoriDerivationBusinessTotalGPLastMonth | reservedDecimal(1) }}K</td>
                                                      <td>目标：{{ MaoriDerivationBusinessTotalGPTarget | reservedDecimal(1) }}K</td>
                                                    </tr>
                                                  </tbody>
                                              </table>
                                          </div>
                                      </div>
                                  </div>
                                  <div class="row confirm">
                                    <div class="col-md-12">
                                        <div class="pull-right">
                                            <b-button v-b-modal.modal1 size="sm" variant="default" @click="cancle()">取消</b-button>
                                            <b-button v-b-modal.modal1 size="sm" variant="primary" @click="comfirm()">确定</b-button>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                            </b-modal>
                            <b-button class="exportData" size="sm" variant="success" @click="exportData()">导出</b-button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 列表 -->
            <div class="row tableList">
              <!-- 左边表格 -->
              <div class="left-table table">
                  <table class="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th></th>
                        <th class="profitTitle" colspan="3">{{ monthValues }}</th>
                      </tr>
                      <tr class="carSeries">
                        <th rowspan="1"></th>
                        <th colspan="3">品牌/车系/车型</th>
                      </tr>
                      <tr class="storeTotal">
                        <td></td>
                        <th colspan="3">门店总计</th>
                      </tr>
                    </thead>
                    <tbody  v-for="(item, index) in maoriForecastCarList" :key="index">
                      <tr class="carSeriesDrop">
                        <td><input type="checkbox" @click="setIndex(item, index)" :value="item" v-model="grossSetList"></td>
                        <td colspan="3" class="dropDownCar" @click.stop="carSeriesDrop(item, index)">
                          <div class="pull-left leftCarTitle">
                            <span :title="item.brandName + '/' + item.seriesName">{{ item.brandName.slice(0,5) }}/{{ item.seriesName.slice(0,8) }}</span>
                          </div>
                          <div class="pull-right">
                            <span>{{ item.updateTimeStr }}</span>&nbsp;
                            <i v-show="item.isShowIcon == 0" class="el-icon-arrow-right"></i>
                            <i v-show="item.isShowIcon == 1" class="el-icon-arrow-down"></i>
                          </div>
                        </td>
                      </tr>
                      <tr class="carSeriesDrop" v-for="(items,index) in item.detailSeries" :key="index" v-show="item.isShowIcon == 1">
                        <td ></td>
                        <td colspan="3" class="dropDownCar">
                          <div class="pull-left">
                            <span :title="items.brandName + items.seriesName + items.modelName" class="modelName">{{ items.brandName }}/{{ items.seriesName }}/{{items.modelName}}</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
              </div>
              <!-- 右边表格 -->
              <div class="right-table table">
                  <table class="table table-striped table-bordered">
                      <thead>
                          <tr class="grossProfitTitle">
                              <th colspan="8">库存管理</th>
                              <th colspan="12">漏斗管理</th>
                              <th colspan="14">新车毛利管理</th>
                              <th colspan="34">衍生业务毛利管理</th>
                              <th colspan="4">综合毛利</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr class="modal-table-title grossCarBigTitle">
                              <th rowspan="2">上月在库可售库存</th>
                              <th rowspan="2">上月计划到库的在途库存</th>
                              <th rowspan="2">上月销售台数</th>
                              <th rowspan="2">上月批售台数</th>
                              <th rowspan="2">预计月底库存台数</th>
                              <th rowspan="2">预计本月可售库存周转天数</th>
                              <th rowspan="2">目标&nbsp;本月可售库存周转天数</th>
                              <th rowspan="2">本月库存安全销售目标</th>
                              <th rowspan="2">上月进店线索数</th>
                              <th rowspan="2">本月进店线索数目标</th>
                              <th rowspan="2">上月进店线索订单率</th>
                              <th rowspan="2">本月进店线索订单率目标</th>
                              <th rowspan="2">本月新增订单数目标</th>
                              <th rowspan="2">上月留存订单数</th>
                              <th rowspan="2">上月订单零售率</th>
                              <th rowspan="2">本月订单零售率目标</th>
                              <th rowspan="2">展厅零售目标</th>
                              <th rowspan="2">厂家SI销售目标</th>
                              <th rowspan="2">本月销售目标</th>
                              <th rowspan="2">二级批售配额</th>
                              <th rowspan="2">平均进货成本(千)</th>
                              <th rowspan="2">上月平均销售金额(千)</th>
                              <th rowspan="2">目标零售限价金额/台(千)</th>
                              <th rowspan="2">目标批售限价金额/台(千)</th>
                              <th rowspan="2">预计本月第一档零售GP(千)</th>
                              <th rowspan="2">预计本月第一档批售GP(千)</th>
                              <th rowspan="2">预计本月第一档GP/台(千)</th>
                              <th colspan="2">赠品/台</th>
                              <th rowspan="2">预计本月第二档GP/(千)</th>
                              <th rowspan="2">预估厂家SI(千)</th>
                              <th rowspan="2">预估年度返利(千)</th>
                              <th rowspan="2">预计本月第三档GP/台(千)</th>
                              <th rowspan="2">预计本月第三档GP%</th>
                              <th colspan="2">金融渗透率</th>
                              <th colspan="2">金融毛利/台</th>
                              <th colspan="2">金融毛利</th>
                              <th colspan="2">保险渗透率</th>
                              <th colspan="2">保险毛利/台</th>
                              <th colspan="2">保险毛利</th>
                              <th colspan="2">精品渗透率</th>
                              <th colspan="2">精品毛利/台</th>
                              <th colspan="2">精品毛利</th>
                              <th colspan="2">新车延保渗透率</th>
                              <th colspan="2">延保毛利/台</th>
                              <th colspan="2">新车延保毛利总额</th>
                              <th colspan="2">其他业务渗透率</th>
                              <th colspan="2">其他毛利/台</th>
                              <th colspan="2">其他业务毛利</th>
                              <th colspan="2">衍生业务毛利/台(千)</th>
                              <th colspan="2">衍生业务毛利(千)</th>
                              <th colspan="2">T.GP/台(千)</th>
                              <th colspan="2">T.GP合计(千)</th>
                          </tr>
                          <tr class="modal-table-title">
                              <template v-for="(item, index) of 20">
                                <td>上月</td>
                                <td>目标</td>
                              </template>
                          </tr>
                          <tr class="modal-table-title">
                              <td>{{ MaoriReportAddTotal.MaoriLastMonthAvailableSaleInStockAll | upwardCeil }}</td>
                              <td>{{ MaoriReportAddTotal.MaoriLastMonthOnTheWayStockAll | upwardCeil }}</td>
                              <td>{{ MaoriReportAddTotal.MaoriLastMonthSalesNumberAll | upwardCeil }}</td>
                              <td>{{ MaoriReportAddTotal.MaoriLastMonthBatchSalesNumberAll | upwardCeil }}</td>
                              <td>{{ MaoriReportAddTotal.MaoriExpectEndMonthAvailableSaleNumberAll | upwardCeil }}</td>
                              <td>{{ MaoriReportAddTotal.MaoriExpectCurrentMonthAvailableSaleStockCycleAll | upwardCeil }}</td>
                              <td>{{ MaoriReportAddTotal.MaoriTargetCurrentMonthAvailableSaleStockCycleAll | upwardCeil }}</td>
                              <td>{{ MaoriReportAddTotal.MaoriCurrentMonthStockSecuritySalesTargetAll | upwardCeil }}</td>
                              <td>{{ MaoriReportAddTotal.MaoriLastMonthInStoreLeadsNumberAll | reservedDecimal(1) }}</td>
                              <td>{{ MaoriReportAddTotal.MaoriCurrentMonthInStoreLeadsNumTargetAll | reservedDecimal(1) }}</td>
                              <td>{{ (MaoriReportAddTotal.MaoriLastMonthInStoreLeadsOrderRateAll * 100) | reservedDecimal(1) }}%</td>
                              <td>{{ (MaoriReportAddTotal.MaoriCurrentMonthInStoreLeadsOrderRateTargetAll * 100) | reservedDecimal(1) }}%</td>
                              <td>{{ MaoriReportAddTotal.MaoriCurrentMonthAddOrderNumTargetAll | reservedDecimal(1) }}</td>
                              <td>{{ MaoriReportAddTotal.MaoriLastMonthLeftOverOrderNumAll | reservedDecimal(1) }}</td>
                              <td>{{ (MaoriReportAddTotal.MaoriLastMonthOrderRetailRateAll * 100) | reservedDecimal(1) }}%</td>
                              <td>{{ (MaoriReportAddTotal.MaoriCurrentMonthOrderRetailRateTargetAll * 100) | reservedDecimal(1) }}%</td>
                              <td>{{ MaoriReportAddTotal.MaoriExhibitionHallRetailTargetAll | upwardCeil }}</td>
                              <td>{{ MaoriReportAddTotal.MaoriFactorSiSalesTargetAll | upwardCeil }}</td>
                              <td>{{ MaoriReportAddTotal.MaoriCurrentMonthSalesTargetAll | upwardCeil }}</td>
                              <td>{{ MaoriReportAddTotal.MaoriTwoLevelSalesAll | upwardCeil }}</td>
                              <td>{{ (MaoriReportAddTotal.MaoriAveragePurchaseCostAll / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ (MaoriReportAddTotal.MaoriLastMonthAverageSaleAmountAll / 1000) | reservedDecimal(1) }}</td>
                              <template v-for="item in 5">
                                <td>--</td>
                              </template>
                              <td>{{ MaoriReportAddTotal.MaoriGiftLastMonthAll | reservedDecimal(1) }}</td>
                              <td>{{ MaoriReportAddTotal.MaoriGiftTargetAll | reservedDecimal(1) }}</td>
                              <td>--</td>
                              <td>{{ (MaoriReportAddTotal.MaoriEstimateFactorySiAll / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ (MaoriReportAddTotal.MaoriEstimateYearRebateAll / 1000) | reservedDecimal(1) }}</td>
                              <template v-for="item in 6">
                                <td>--</td>
                              </template>
                              <td>{{ MaoriReportAddTotal.MaoriFinancialGPLastMonthAll | reservedDecimal(1) }}</td>
                              <td>{{ MaoriReportAddTotal.MaoriFinancialGPTargetAll | reservedDecimal(1) }}</td>
                              <template v-for="item in 4">
                                <td>--</td>
                              </template>
                              <td>{{ MaoriReportAddTotal.MaoriInsuranceGPLastMonthAll | reservedDecimal(1) }}</td>
                              <td>{{ MaoriReportAddTotal.MaoriInsuranceGPTargetAll | reservedDecimal(1) }}</td>
                              <template v-for="item in 4">
                                <td>--</td>
                              </template>
                              <td>{{ MaoriReportAddTotal.MaoriSkuGPTotalLastMonthAll | reservedDecimal(1) }}</td>
                              <td>{{ MaoriReportAddTotal.MaoriSkuGPTotalTargetAll | reservedDecimal(1) }}</td>
                              <template v-for="item in 4">
                                <td>--</td>
                              </template>
                              <td>{{ MaoriReportAddTotal.MaoriNewCarYBGPLastMonthAll | reservedDecimal(1) }}</td>
                              <td>{{ MaoriReportAddTotal.MaoriNewCarYBGPTargetAll | reservedDecimal(1) }}</td>
                              <template v-for="item in 4">
                                <td>--</td>
                              </template>
                              <td>{{ MaoriReportAddTotal.MaoriOtherBusinessGPLastMonthAll | reservedDecimal(1) }}</td>
                              <td>{{ MaoriReportAddTotal.MaoriOtherBusinessGPTargetAll | reservedDecimal(1) }}</td>
                              <td>--</td>
                              <td>--</td>
                              <td>{{ (MaoriReportAddTotal.MaoriDerivationBusinessTotalGPLastMonthAll / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ (MaoriReportAddTotal.MaoriDerivationBusinessTotalGPTargetAll / 1000) | reservedDecimal(1) }}</td>
                              <td>--</td>
                              <td>--</td>
                              <td>{{ (MaoriReportAddTotal.MaoriTGPTotalLastMonthAll / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ (MaoriReportAddTotal.MaoriTGPTotalTargetAll / 1000) | reservedDecimal(1) }}</td>
                          </tr>
                          <template v-for="item in maoriForecastCarList">
                            <tr>
                              <td>{{ item.detailMap.MaoriLastMonthAvailableSaleInStock | upwardCeil }}</td>
                              <td>{{ item.detailMap.MaoriLastMonthOnTheWayStock | upwardCeil }}</td>
                              <td>{{ item.detailMap.MaoriLastMonthSalesNumber | upwardCeil }}</td>
                              <td>{{ item.detailMap.MaoriLastMonthBatchSalesNumber | upwardCeil }}</td>
                              <td>{{ item.detailMap.MaoriExpectEndMonthAvailableSaleNumber | upwardCeil }}</td>
                              <td>{{ item.detailMap.MaoriExpectCurrentMonthAvailableSaleStockCycle | upwardCeil }}</td>
                              <td>{{ item.detailMap.MaoriTargetCurrentMonthAvailableSaleStockCycle | upwardCeil }}</td>
                              <td>{{ item.detailMap.MaoriCurrentMonthStockSecuritySalesTarget | upwardCeil }}</td>
                              <td>{{ item.detailMap.MaoriLastMonthInStoreLeadsNumber | reservedDecimal(1) }}</td>
                              <td>{{ item.detailMap.MaoriCurrentMonthInStoreLeadsNumTarget | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriLastMonthInStoreLeadsOrderRate * 100) | reservedDecimal(1) }}%</td>
                              <td>{{ (item.detailMap.MaoriCurrentMonthInStoreLeadsOrderRateTarget * 100) | reservedDecimal(1) }}%</td>
                              <td>{{ item.detailMap.MaoriCurrentMonthAddOrderNumTarget | reservedDecimal(1) }}</td>
                              <td>{{ item.detailMap.MaoriLastMonthLeftOverOrderNum | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriLastMonthOrderRetailRate * 100) | reservedDecimal(1) }}%</td>
                              <td>{{ (item.detailMap.MaoriCurrentMonthOrderRetailRateTarget * 100) | reservedDecimal(1) }}%</td>
                              <td>{{ item.detailMap.MaoriExhibitionHallRetailTarget | upwardCeil }}</td>
                              <td>{{ item.detailMap.MaoriFactorSiSalesTarget | upwardCeil }}</td>
                              <td>{{ item.detailMap.MaoriCurrentMonthSalesTarget | upwardCeil }}</td>
                              <td>{{ item.detailMap.MaoriTwoLevelSales | upwardCeil }}</td>
                              <td>{{ (item.detailMap.MaoriAveragePurchaseCost / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriLastMonthAverageSaleAmount / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriTargetRetailPrice / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriTargetWholesalePrice / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriExpectRetailGP1 / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriExpectWholesaleGP1 / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriExpectCurrentMonthGP1 / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ item.detailMap.MaoriGiftLastMonth | reservedDecimal(1) }}</td>
                              <td>{{ item.detailMap.MaoriGiftTarget | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriExpectCurrentMonthGP2 / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriEstimateFactorySi / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriEstimateYearRebate / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriExpectCurrentMonthGP4 / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriExpectCurrentMonthGP4Rate * 100) | reservedDecimal(1) }}%</td>
                              <td>{{ (item.detailMap.MaoriFinancialPermeabilityLastMonth * 100) | reservedDecimal(1) }}%</td>
                              <td>{{ (item.detailMap.MaoriFinancialPermeabilityTarget * 100) | reservedDecimal(1) }}%</td>
                              <td>{{ item.detailMap.MaoriAvgFinancialProfiLastMonth | reservedDecimal(1) }}</td>
                              <td>{{ item.detailMap.MaoriAvgFinancialProfiTarget | reservedDecimal(1) }}</td>
                              <td>{{ item.detailMap.MaoriFinancialGPLastMonth | reservedDecimal(1) }}</td>
                              <td>{{ item.detailMap.MaoriFinancialGPTarget | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriInsurancePermeabilityLastMonth * 100) | reservedDecimal(1) }}%</td>
                              <td>{{ (item.detailMap.MaoriInsurancePermeabilityTarget * 100) | reservedDecimal(1) }}%</td>
                              <td>{{ item.detailMap.MaoriAvgInsuranceProfiLastMonth | reservedDecimal(1) }}</td>
                              <td>{{ item.detailMap.MaoriAvgInsuranceProfiTarget | reservedDecimal(1) }}</td>
                              <td>{{ item.detailMap.MaoriInsuranceGPLastMonth | reservedDecimal(1) }}</td>
                              <td>{{ item.detailMap.MaoriInsuranceGPTarget | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriSkuPermeabilityLastMonth * 100) | reservedDecimal(1) }}%</td>
                              <td>{{ (item.detailMap.MaoriSkuPermeabilityTarget * 100) | reservedDecimal(1) }}%</td>
                              <td>{{ item.detailMap.MaoriSkuGPLastMonth | reservedDecimal(1) }}</td>
                              <td>{{ item.detailMap.MaoriSkuGPTarget | reservedDecimal(1) }}</td>
                              <td>{{ item.detailMap.MaoriSkuGPTotalLastMonth | reservedDecimal(1) }}</td>
                              <td>{{ item.detailMap.MaoriSkuGPTotalTarget | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriNewCarYBPermeabilityLastMonth * 100) | reservedDecimal(1) }}%</td>
                              <td>{{ (item.detailMap.MaoriNewCarYBPermeabilityTarget * 100) | reservedDecimal(1) }}%</td>
                              <td>{{ item.detailMap.MaoriYBGPLastMonth | reservedDecimal(1) }}</td>
                              <td>{{ item.detailMap.MaoriYBGPTarget | reservedDecimal(1) }}</td>
                              <td>{{ item.detailMap.MaoriNewCarYBGPLastMonth | reservedDecimal(1) }}</td>
                              <td>{{ item.detailMap.MaoriNewCarYBGPTarget | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriOtherBusinessPermeabilityLastMonth * 100) | reservedDecimal(1) }}%</td>
                              <td>{{ (item.detailMap.MaoriOtherBusinessPermeabilityTarget * 100) | reservedDecimal(1) }}%</td>
                              <td>{{ item.detailMap.MaoriOtherGPLastMonth | reservedDecimal(1) }}</td>
                              <td>{{ item.detailMap.MaoriOtherGPTarget | reservedDecimal(1) }}</td>
                              <td>{{ item.detailMap.MaoriOtherBusinessGPLastMonth | reservedDecimal(1) }}</td>
                              <td>{{ item.detailMap.MaoriOtherBusinessGPTarget | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriDerivationBusinessGPLastMonth / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriDerivationBusinessGPTarget / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriDerivationBusinessTotalGPLastMonth / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriDerivationBusinessTotalGPTarget / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriTGPLastMonth / 1000) | reservedDecimal(1) }}</td>
                              <td>--</td>
                              <td>{{ (item.detailMap.MaoriTGPTotalLastMonth / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ (item.detailMap.MaoriTGPTotalTarget / 1000) | reservedDecimal(1) }}</td>
                            </tr>
                            <tr v-show="item.isShowIcon == 1" v-for="(items,index) in item.detailSeries" :key="index">
                              <td>{{ items.detailMap.MaoriLastMonthAvailableSaleInStock | reservedDecimal(1) }}</td>
                              <td>{{ items.detailMap.MaoriLastMonthOnTheWayStock | reservedDecimal(1) }}</td>
                              <td>{{ items.detailMap.MaoriLastMonthSalesNumber | reservedDecimal(1) }}</td>
                              <td>{{ items.detailMap.MaoriLastMonthBatchSalesNumber | reservedDecimal(1) }}</td>
                              <template v-for="item in 4">
                                <td>--</td>
                              </template>
                              <td>{{ items.detailMap.MaoriLastMonthInStoreLeadsNumber | reservedDecimal(0) }}</td>
                              <td>--</td>
                              <td>{{ (items.detailMap.MaoriLastMonthInStoreLeadsOrderRate * 100) | reservedDecimal(1) }}%</td>
                              <td>--</td>
                              <td>--</td>
                              <td>{{ items.detailMap.MaoriLastMonthLeftOverOrderNum | reservedDecimal(1) }}</td>
                              <td>{{ (items.detailMap.MaoriLastMonthOrderRetailRate * 100) | reservedDecimal(1) }}%</td>
                              <template v-for="item in 5">
                                <td>--</td>
                              </template>
                              <td>{{ (items.detailMap.MaoriAveragePurchaseCost / 1000) | reservedDecimal(1) }}</td>
                              <td>{{ (items.detailMap.MaoriLastMonthAverageSaleAmount / 1000) | reservedDecimal(1) }}</td>
                              <template v-for="item in 5">
                                <td>--</td>
                              </template>
                              <td>{{ items.detailMap.MaoriGiftLastMonth | reservedDecimal(1) }}</td>
                              <template v-for="item in 6">
                                <td>--</td>
                              </template>
                              <td>{{ (items.detailMap.MaoriFinancialPermeabilityLastMonth * 100) | reservedDecimal(1) }}%</td>
                              <td>--</td>
                              <td>{{ items.detailMap.MaoriAvgFinancialProfiLastMonth | reservedDecimal(1) }}</td>
                              <td>--</td>
                              <td>{{ items.detailMap.MaoriFinancialGPLastMonth | reservedDecimal(1) }}</td>
                              <td>--</td>
                              <td>{{ (items.detailMap.MaoriInsurancePermeabilityLastMonth * 100) | reservedDecimal(1) }}%</td>
                              <td>--</td>
                              <td>{{ items.detailMap.MaoriAvgInsuranceProfiLastMonth | reservedDecimal(1) }}</td>
                              <td>--</td>
                              <td>{{ items.detailMap.MaoriInsuranceGPLastMonth | reservedDecimal(1) }}</td>
                              <td>--</td>
                              <td>{{ (items.detailMap.MaoriSkuPermeabilityLastMonth * 100) | reservedDecimal(1) }}%</td>
                              <td>--</td>
                              <td>{{ items.detailMap.MaoriSkuGPLastMonth | reservedDecimal(1) }}</td>
                              <td>--</td>
                              <td>{{ items.detailMap.MaoriSkuGPTotalLastMonth | reservedDecimal(1) }}</td>
                              <td>--</td>
                              <td>{{ (items.detailMap.MaoriNewCarYBPermeabilityLastMonth * 100) | reservedDecimal(1) }}%</td>
                              <td>--</td>
                              <td>{{ items.detailMap.MaoriYBGPLastMonth | reservedDecimal(1) }}</td>
                              <td>--</td>
                              <td>{{ items.detailMap.MaoriNewCarYBGPLastMonth | reservedDecimal(1) }}</td>
                              <td>--</td>
                              <td>{{ (items.detailMap.MaoriOtherBusinessPermeabilityLastMonth * 100) | reservedDecimal(1) }}%</td>
                              <td>--</td>
                              <td>{{ items.detailMap.MaoriOtherGPLastMonth | reservedDecimal(1) }}</td>
                              <td>--</td>
                              <td>{{ items.detailMap.MaoriOtherBusinessGPLastMonth | reservedDecimal(1) }}</td>
                              <td>--</td>
                              <td>{{ (items.detailMap.MaoriDerivationBusinessGPLastMonth / 1000) | reservedDecimal(1) }}</td>
                              <td>--</td>
                              <td>{{ (items.detailMap.MaoriDerivationBusinessTotalGPLastMonth / 1000) | reservedDecimal(1) }}</td>
                              <td>--</td>
                              <td>{{ (items.detailMap.MaoriTGPLastMonth / 1000) | reservedDecimal(1) }}</td>
                              <td>--</td>
                              <td>{{ (items.detailMap.MaoriTGPTotalLastMonth / 1000) | reservedDecimal(1) }}</td>
                              <td>--</td>
                            </tr>
                          </template>
                      </tbody>
                  </table>
              </div>
            </div>
        </b-card>
    </div>
</template>

<script>
import Vue from 'vue'
import { DatePicker, Table, Icon, Message } from 'element-ui'
import common from 'common/common'
import api from 'common/api'
import config from 'common/config'
import {formatDate} from 'common/com-api'
import Areaqueryshop from 'components/iris-areaqueryshop/index'
import IrisCar from 'components/iris-car'
import Pagination from 'components/pagination/pagination'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/gauge'
import 'echarts/lib/component/tooltip'
import  instrumentPanel from './dashboard/instrumentPanel'

Vue.filter('reservedDecimal', function(value, num) {
    var val;
    if(value) {
      val = Number(value)
    }
    if(value == null || !value) {
      val = 0;
    }
    return val.toFixed(num);
})

export default {
    data() {
        return {
          monthValue: new Date(),                     //默认选择当前月份
          monthValues: '',                            //日期时间
          MaoriReportAddTotal: {},                    //门店总计
          grossShow: false,                           //弹层显示
          // monthTgpRate: 0,                            //月T.GP目标达成率
          // 查询
          query: {
              carFactoryCode: '',    //厂家
              carBrandCode: '',      //品牌
              carSeriesCode: '',     //车系
              carModelCode:  '',     //车型
              carCode: '',           //车款
              pageStart: 1,          //开始页
              storeCode: ''          //门店编码
          },
          MaoriReportData: {
            profitAfterInterest: 0
          },      //TGP相关数据
          copyMaoriReportData: {},
          maoriForecastList: [],     //毛利车辆数据信息
          maoriForecastInfoList: [], //毛利车辆车型详细数据
          maoriForecastCarList: [],  //毛利车辆信息
          carModelInfoList: [],      //车型详细信息
          carModelInfoListLength: 0, //车型数据的长度
          isShowIcon: 0,             //是否显示下拉
          index: null,                 //设置标识
          //fhf数据相关部分
          isShow: true,
          isEdit: true,
          editShow: true,
          //仪表盘数,
          instrumentID: {
            ID: "instrumentID",
            percent: 0, //数据实际值
            target: 0, //数据目标值
            title: 'T.GP目标预计达成率'
          },
          MaoriLastMonthAvailableSaleInStock: 0,                  //上月在库可售库存
          MaoriLastMonthOnTheWayStock: 0,                         //上月计划到库的在途库存
          MaoriLastMonthSalesNumber: 0,                           //上月销售台数
          MaoriLastMonthBatchSalesNumber: 0,                      //上月批售台数
          // MaoriExpectEndMonthAvailableSaleNumber: 0,              //预计月底库存台数
          // MaoriExpectCurrentMonthAvailableSaleStockCycle: 0,      //预计本月可售库存周转天数
          MaoriTargetCurrentMonthAvailableSaleStockCycle: 0,   //目标本月可售库存周转天数
          // MaoriCurrentMonthStockSecuritySalesTarget: 0,           //本月库存安全销售目标
          MaoriLastMonthInStoreLeadsNumber: 0,                    //上月进店线索数
          MaoriCurrentMonthInStoreLeadsNumTarget: 0,              //本月进店线索数目标
          MaoriLastMonthInStoreLeadsOrderRate: 0,                 //上月进店线索订单率
          MaoriCurrentMonthInStoreLeadsOrderRateTarget: 0,        //本月进店线索订单率目标
          MaoriLastMonthLeftOverOrderNum: 0,                      //上月留存订单数
          // MaoriCurrentMonthAddOrderNumTarget: 0,                  //本月新增订单数目标
          MaoriLastMonthOrderRetailRate: 0,                       //上月订单零售率
          MaoriCurrentMonthOrderRetailRateTarget: 0,              //本月订单零售率目标
          // MaoriExhibitionHallRetailTarget: 0,                     //展厅零售目标
          MaoriFactorSiSalesTarget: 0,                            //厂家SI销售目标
          // MaoriCurrentMonthSalesTarget: 0,                        //本月销售目标
          // MaoriTwoLevelSales: 0,                                  //二级批售配额
          MaoriAveragePurchaseCost: 0,                            //平均进货成本（千）
          MaoriLastMonthAverageSaleAmount: 0,                     //上月平均销售金额 (千）
          MaoriTargetRetailPrice: 0,                              //目标零售限价金额 / 台 (千）
          MaoriTargetWholesalePrice: 0,                           //目标批售限价金额 / 台 (千）
          // MaoriExpectRetailGP1: 0,                                //预计本月第一档零售GP（千）
          // MaoriExpectWholesaleGP1: 0,                             //预计本月第一档批售GP（千）
          // MaoriExpectCurrentMonthGP1: 0,                          //预计本月第一档GP/台（千）
          MaoriGiftLastMonth: 0,                                  //赠品(上月)
          MaoriGiftTarget: 0,                                     //赠品(目标)
          // MaoriExpectCurrentMonthGP2: 0,                          //预计本月第二档GP/台（千）
          MaoriEstimateFactorySi: 0,                              //预估厂家SI（千）
          MaoriEstimateYearRebate: 0,                             //预估年度返利（千）
          // MaoriExpectCurrentMonthGP4: 0,                          //预计本月第三档GP/台（千）
          // MaoriExpectCurrentMonthGP4Rate: 0,                      //预计本月第三档GP%
          MaoriFinancialPermeabilityLastMonth: 0,                 //金融渗透率(上月)
          MaoriFinancialPermeabilityTarget: 0,                    //金融渗透率(目标)
          MaoriAvgFinancialProfiLastMonth: 0,                     //金融毛利/台(上月)
          MaoriAvgFinancialProfiTarget: 0,                        //金融毛利/台(目标)
          MaoriFinancialGPLastMonth: 0,                           //金融毛利(上月)
          // MaoriFinancialGPTarget: 0,                              //金融毛利(目标)
          MaoriInsurancePermeabilityLastMonth: 0,                 //保险渗透率(上月)
          MaoriInsurancePermeabilityTarget: 0,                    //保险渗透率(目标)
          MaoriAvgInsuranceProfiLastMonth: 0,                     //保险毛利/台(上月)
          MaoriAvgInsuranceProfiTarget: 0,                        //保险毛利/台(目标)
          MaoriInsuranceGPLastMonth: 0,                           //保险毛利(上月)
          // MaoriInsuranceGPTarget: 0,                              //保险毛利(目标)
          MaoriSkuPermeabilityLastMonth: 0,                       //精品渗透率(上月)
          MaoriSkuPermeabilityTarget: 0,                          //精品渗透率(目标)
          MaoriSkuGPLastMonth: 0,                                 //精品毛利/台(上月)
          MaoriSkuGPTarget: 0,                                    //精品毛利/台(目标)
          MaoriSkuGPTotalLastMonth: 0,                            //精品毛利(上月)
          // MaoriSkuGPTotalTarget: 0,                               //精品毛利(目标)
          MaoriNewCarYBPermeabilityLastMonth: 0,                  //新车延保渗透率(上月)
          MaoriNewCarYBPermeabilityTarget: 0,                     //新车延保渗透率(目标)
          MaoriYBGPLastMonth: 0,                                  //延保毛利/台(上月)
          MaoriYBGPTarget: 0,                                     //延保毛利/台(目标)
          MaoriNewCarYBGPLastMonth: 0,                            //新车延保毛利(上月)
          // MaoriNewCarYBGPTarget : 0,                              //新车延保毛利(目标)
          MaoriOtherBusinessPermeabilityLastMonth: 0,             //其他业务渗透率(上月)
          MaoriOtherBusinessPermeabilityTarget : 0,               //其他业务渗透率(目标)
          MaoriOtherGPLastMonth : 0,                              //其他毛利/台(上月)
          MaoriOtherGPTarget: 0,                                  //其他毛利/台(目标)
          MaoriOtherBusinessGPLastMonth : 0,                      //其他毛利(上月)
          // MaoriOtherBusinessGPTarget: 0,                          //其他毛利(目标)
          MaoriDerivationBusinessGPLastMonth: 0,                  //衍生业务毛利/台(上月)
          // MaoriDerivationBusinessGPTarget: 0,                     //衍生业务毛利/台(目标)
          MaoriDerivationBusinessTotalGPLastMonth: 0,             //衍生业务毛利(上月)
          // MaoriDerivationBusinessTotalGPTarget: 0,                //衍生业务毛利(目标)
          // MaoriTGPTotalTarget: 0,
          oldMaoriTGPTotalTarget: 0,
          showEditTable: false,                                   //控制毛利设置是否可编辑状态
          editStoretarget: true,                                  //控制T.GP目标是否可以编辑
          seriesName: '',
          brandName: '',
          modelName: '',
          dateVersion: '',
          maoriCode: '',
          storeCode: '',
          grossSetList: [],
          maoRiRate: {},
          currentCarIndex: -1,
        }
    },
    methods: {
        // 校验输入框
        inputInteger() {
          // 本月可售库存周转天数
          if(parseInt(this.MaoriTargetCurrentMonthAvailableSaleStockCycle) !== Number(this.MaoriTargetCurrentMonthAvailableSaleStockCycle)) {
            Message({
                type: 'warning',
                message: '请输入整数'
            })
            return
          }
          // 厂家SI销售目标
          if(parseInt(this.MaoriFactorSiSalesTarget) !== Number(this.MaoriFactorSiSalesTarget)) {
            Message({
                type: 'warning',
                message: '请输入整数'
            })
            return
          }
          // 本月进店线索数目标
          if(parseInt(this.MaoriCurrentMonthInStoreLeadsNumTarget) !== Number(this.MaoriCurrentMonthInStoreLeadsNumTarget)) {
            Message({
                type: 'warning',
                message: '请输入整数'
            })
            return
          }
          // 本月进店线索订单率目标
          if((isNaN(this.MaoriCurrentMonthInStoreLeadsOrderRateTarget) == true) || this.MaoriCurrentMonthInStoreLeadsOrderRateTarget == '') {
            Message({
                type: 'warning',
                message: '请输入数字'
            })
            return
          }
          // 本月订单零售率
          if(isNaN(this.MaoriCurrentMonthOrderRetailRateTarget) == true || this.MaoriCurrentMonthOrderRetailRateTarget == '') {
            Message({
                type: 'warning',
                message: '请输入数字'
            })
            return
          }
          // 目标零售限价金额/台
          if(isNaN(this.MaoriTargetRetailPrice) == true) {
            Message({
                type: 'warning',
                message: '请输入数字'
            })
            return
          }
          // 目标批售限价金额
          if(isNaN(this.MaoriTargetWholesalePrice) == true) {
            Message({
                type: 'warning',
                message: '请输入数字'
            })
            return
          }
          // 赠品/台(目标)
          if(isNaN(this.MaoriGiftTarget) == true) {
            Message({
                type: 'warning',
                message: '请输入数字'
            })
            return
          }
          // 预估厂家SI
          if(isNaN(this.MaoriEstimateFactorySi) == true) {
            Message({
                type: 'warning',
                message: '请输入数字'
            })
            return
          }
          // 预估年度返利
          if(isNaN(this.MaoriEstimateYearRebate) == true || this.MaoriEstimateYearRebate == '') {
            Message({
                type: 'warning',
                message: '请输入数字'
            })
            return
          }
          // 金融渗透率目标
          if(isNaN(this.MaoriFinancialPermeabilityTarget) == true || this.MaoriFinancialPermeabilityTarget == '') {
            Message({
                type: 'warning',
                message: '请输入数字'
            })
            return
          }
          // 金融毛利/台目标
          if(isNaN(this.MaoriAvgFinancialProfiTarget) == true || this.MaoriAvgFinancialProfiTarget == '') {
            Message({
                type: 'warning',
                message: '请输入数字'
            })
            return
          }
          // 保险渗透率目标
          if(isNaN(this.MaoriInsurancePermeabilityTarget) == true || this.MaoriInsurancePermeabilityTarget == '') {
            Message({
                type: 'warning',
                message: '请输入数字'
            })
            return
          }
          // 保险毛利/台目标
          if(isNaN(this.MaoriAvgInsuranceProfiTarget) == true || this.MaoriAvgInsuranceProfiTarget == '') {
            Message({
                type: 'warning',
                message: '请输入数字'
            })
            return
          }
          // 精品渗透率目标
          if(isNaN(this.MaoriSkuPermeabilityTarget) == true || this.MaoriSkuPermeabilityTarget == '') {
            Message({
                type: 'warning',
                message: '请输入数字'
            })
            return
          }
          // 精品毛利/台目标
          if(isNaN(this.MaoriSkuGPTarget) == true || this.MaoriSkuGPTarget == '') {
            Message({
                type: 'warning',
                message: '请输入数字'
            })
            return
          }
          // 新车延保渗透率目标
          if(isNaN(this.MaoriNewCarYBPermeabilityTarget) == true || this.MaoriNewCarYBPermeabilityTarget == '') {
            Message({
                type: 'warning',
                message: '请输入数字'
            })
            return
          }
          // 新车延保毛利/台目标
          if(isNaN(this.MaoriYBGPTarget) == true || this.MaoriYBGPTarget == '') {
            Message({
                type: 'warning',
                message: '请输入数字'
            })
            return
          }
          // 其它业务渗透率目标
          if(isNaN(this.MaoriOtherBusinessPermeabilityTarget) == true || this.MaoriOtherBusinessPermeabilityTarget == '') {
            Message({
                type: 'warning',
                message: '请输入数字'
            })
            return
          }
          // 其它业务毛利/台目标
          if(isNaN(this.MaoriOtherGPTarget) == true || this.MaoriOtherGPTarget == '') {
            Message({
                type: 'warning',
                message: '请输入数字'
            })
            return
          }
        },
        // 取消按钮
        close(){
            this.isShow = !this.isShow
            this.isEdit = !this.isEdit
            this.editShow = !this.editShow
            this.MaoriReportData.targetGpValue = Number(this.copyMaoriReportData.targetGpValue)
            this.MaoriReportData.operatingCosts = this.copyMaoriReportData.operatingCosts
            this.MaoriReportData.incomeTax = this.copyMaoriReportData.incomeTax
            this.MaoriReportData.interest = this.copyMaoriReportData.interest
        },
        //保存按钮
        preserve(){
            this.editShow = !this.editShow
            this.isShow = !this.isShow;
            this.isEdit = !this.isEdit;
            this.instrumentID.percent = this.MaoriReportData.targetGpForecast
            this.instrumentID.target = this.MaoriReportData.targetGpValue              //TGP更新保存按钮
              let params = {
                maoriAddCode: this.MaoriReportData.maoriAddCode,
                targetGpValue: this.MaoriReportData.targetGpValue,
                operatingCosts: this.MaoriReportData.operatingCosts,
                interest: this.MaoriReportData.interest,
                incomeTax: this.MaoriReportData.incomeTax,
                profitAfterInterest: this.MaoriReportData.targetGpForecast - this.MaoriReportData.operatingCosts
              }
            api.MaoriForecast.updatemaoriForecastAddInfo(params, res =>{
              if(res.data.code == 'success'){
                this.copyMaoriReportData.targetGpValue = this.MaoriReportData.targetGpValue
                this.copyMaoriReportData.operatingCosts = this.MaoriReportData.operatingCosts
                this.copyMaoriReportData.interest = this.MaoriReportData.interest
                this.copyMaoriReportData.incomeTax = this.MaoriReportData.incomeTax
              }
            })
        },
        modBtn(){
           this.isEdit = false;
            this.isShow = false;
            this.editShow = !this.editShow;
        },
        //车型车款取值
        backSkuCar(val) {
            this.query.carFactoryCode = val.factoryCode     //厂家
            this.query.carBrandCode = val.brandCode         //品牌
            this.query.carSeriesCode = val.seriesCode       //车系
            this.query.carModelCode = val.modelCode         //车型
            this.query.carCode = val.carCode                //车款
        },
        // 重置(清空)
        clear() {
            // 清空车辆信息
            this.$refs.car.clear();
            this.query.carFactoryCode = '',    //厂家
            this.query.carBrandCode = '',      //品牌
            this.query.carSeriesCode = '',     //车系
            this.query.carModelCode = '',      //车型
            this.query.carCode = '',           //车款
            this.monthValue = new Date();      //重置还原为默认当前的月份
        },
        // 导出
        exportData() {
          let param = {
            dateVersion: this.monthValues,   //日期月份
            carConditionFlag: 2,             //维度标识为2
            storeCode: this.query.storeCode  //门店编码
          }
          api.MaoriForecast.maoLiReportExcelFile(param, (res) => {
              if (res.data.code === 'success') {
                  if(res.data.obj && res.data.obj.fileRelativePath) {
                    let path = res.data.obj.fileRelativePath;
                    window.location.href = path
                  }
              }
          })
        },
        // 批量更新毛利预测报表信息
        updateMaoriReportBatch() {
          // 判断是单车系入参还是多车系入参
          var param;
          var maoriCode;
          var maoRiRate = {};
          if(this.grossSetList.length == 1) {
            param = [{
              maoriCode: this.maoriCode,                                      //毛利预测头部编码
              dateVersion: this.monthValues,                                  //日期月份
              storeCode: this.query.storeCode,                                //门店编码
              targetGpForecast: String(this.MaoriReportData.targetGpValue) === 'NaN' ? '0' : String(this.MaoriReportData.targetGpValue),   //月T.GP目标总值
              targetGpCompleteRate: String(this.monthTgpRate) === 'NaN' ? '0' : String(this.monthTgpRate),                //T.GP目标预计达成率
              addMap: {
                MaoriLastMonthAvailableSaleInStock: String(this.MaoriLastMonthAvailableSaleInStock) === 'NaN' ? '0' : String(this.MaoriLastMonthAvailableSaleInStock), //上月在库可售库存
                MaoriLastMonthOnTheWayStock: String(this.MaoriLastMonthOnTheWayStock) === 'NaN' ? '0' : String(this.MaoriLastMonthOnTheWayStock), //上月计划到库的在途库存
                MaoriLastMonthSalesNumber: String(this.MaoriLastMonthSalesNumber) === 'NaN' ? '0' : String(this.MaoriLastMonthSalesNumber), //上月销售台数
                MaoriLastMonthBatchSalesNumber: String(this.MaoriLastMonthBatchSalesNumber) === 'NaN' ? '0' : String(this.MaoriLastMonthBatchSalesNumber), //上月批售台数
                MaoriExpectEndMonthAvailableSaleNumber: String(this.MaoriExpectEndMonthAvailableSaleNumber) === 'NaN' ? '0' : String(this.MaoriExpectEndMonthAvailableSaleNumber),//预计月底库存台数
                MaoriExpectCurrentMonthAvailableSaleStockCycle: String(this.MaoriExpectCurrentMonthAvailableSaleStockCycle) === 'NaN' ? '0' : String(this.MaoriExpectCurrentMonthAvailableSaleStockCycle), //预计本月可售库存周转天数
                MaoriTargetCurrentMonthAvailableSaleStockCycle: String(this.MaoriTargetCurrentMonthAvailableSaleStockCycle) === 'NaN' ? '0' : String(this.MaoriTargetCurrentMonthAvailableSaleStockCycle), //目标本月可售库存周转天数
                MaoriCurrentMonthStockSecuritySalesTarget: String(this.MaoriCurrentMonthStockSecuritySalesTarget) === 'NaN' ? '0' : String(this.MaoriCurrentMonthStockSecuritySalesTarget), //本月库存安全销售目标
                MaoriLastMonthInStoreLeadsNumber: String(this.MaoriLastMonthInStoreLeadsNumber) === 'NaN' ? '0' : String(this.MaoriLastMonthInStoreLeadsNumber), //上月进店线索数
                MaoriCurrentMonthInStoreLeadsNumTarget: String(this.MaoriCurrentMonthInStoreLeadsNumTarget) === 'NaN' ? '0' : String(this.MaoriCurrentMonthInStoreLeadsNumTarget), //本月进店线索数目标
                MaoriLastMonthInStoreLeadsOrderRate: String(this.MaoriLastMonthInStoreLeadsOrderRate) === 'NaN' ? '0' : String(this.MaoriLastMonthInStoreLeadsOrderRate), //上月进店线索订单率
                MaoriLastMonthLeftOverOrderNum: String(this.MaoriLastMonthLeftOverOrderNum) === 'NaN' ? '0' : String(this.MaoriLastMonthLeftOverOrderNum),             //上月留存订单数
                MaoriCurrentMonthAddOrderNumTarget: String(this.MaoriCurrentMonthAddOrderNumTarget) === 'NaN' ? '0' : String(this.MaoriCurrentMonthAddOrderNumTarget), //本月新增订单数目标
                MaoriLastMonthOrderRetailRate: String(this.MaoriLastMonthOrderRetailRate) === 'NaN' ? '0' : String(this.MaoriLastMonthOrderRetailRate),              //上月订单零售率
                MaoriExhibitionHallRetailTarget: String(this.MaoriExhibitionHallRetailTarget) === 'NaN' ? '0' : String(this.MaoriExhibitionHallRetailTarget),        //展厅零售目标
                MaoriCurrentMonthSalesTarget: String(this.MaoriCurrentMonthSalesTarget) === 'NaN' ? '0' : String(this.MaoriCurrentMonthSalesTarget),                 //本月销售目标
                MaoriTwoLevelSales: String(this.MaoriTwoLevelSales) === 'NaN' ? '0' : String(this.MaoriTwoLevelSales),                     //二级批售配额
                MaoriAveragePurchaseCost: String(this.MaoriAveragePurchaseCost) === 'NaN' ? '0' : String(this.MaoriAveragePurchaseCost),   //平均进货成本（千）
                MaoriLastMonthAverageSaleAmount: String(this.MaoriLastMonthAverageSaleAmount) === 'NaN' ? '0' : String(this.MaoriLastMonthAverageSaleAmount), //上月平均销售金额 (千）
                MaoriTargetRetailPrice: String(this.MaoriTargetRetailPrice) === 'NaN' ? '0' : String(this.MaoriTargetRetailPrice),              //目标零售限价金额 / 台 (千）
                MaoriExpectRetailGP1: String(this.MaoriExpectRetailGP1) === 'NaN' ? '0' : String(this.MaoriExpectRetailGP1),                    //预计本月第一档零售GP（千）
                MaoriExpectWholesaleGP1: String(this.MaoriExpectWholesaleGP1) === 'NaN' ? '0' : String(this.MaoriExpectWholesaleGP1),           //预计本月第一档批售GP（千）
                MaoriExpectCurrentMonthGP1: String(this.MaoriExpectCurrentMonthGP1) === 'NaN' ? '0' : String(this.MaoriExpectCurrentMonthGP1),  //预计本月第一档GP/台（千）
                MaoriGiftLastMonth: String(this.MaoriGiftLastMonth) === 'NaN' ? '0' : String(this.MaoriGiftLastMonth),  //赠品(上月)
                MaoriExpectCurrentMonthGP2: String(this.MaoriExpectCurrentMonthGP2) === 'NaN' ? '0' : String(this.MaoriExpectCurrentMonthGP2),               //预计本月第二档GP/台（千）
                MaoriExpectCurrentMonthGP4: String(this.MaoriExpectCurrentMonthGP4) === 'NaN' ? '0' : String(this.MaoriExpectCurrentMonthGP4),               //预计本月第三档GP/台（千）
                MaoriExpectCurrentMonthGP4Rate: String(this.MaoriExpectCurrentMonthGP4Rate) === 'NaN' ? '0' : String(this.MaoriExpectCurrentMonthGP4Rate),   //预计本月第三档GP%
                MaoriFinancialPermeabilityLastMonth: String(this.MaoriFinancialPermeabilityLastMonth) === 'NaN' ? '0' : String(this.MaoriFinancialPermeabilityLastMonth), //金融渗透率(上月)
                MaoriAvgFinancialProfiLastMonth: String(this.MaoriAvgFinancialProfiLastMonth) === 'NaN' ? '0' : String(this.MaoriAvgFinancialProfiLastMonth), //金融毛利/台(上月)
                MaoriFinancialGPLastMonth: String(this.MaoriFinancialGPLastMonth) === 'NaN' ? '0' : String(this.MaoriFinancialGPLastMonth),                   //金融毛利(上月)
                MaoriFinancialGPTarget: String(this.MaoriFinancialGPTarget) === 'NaN' ? '0' : String(this.MaoriFinancialGPTarget),                            //金融毛利(目标)
                MaoriInsurancePermeabilityLastMonth: String(this.MaoriInsurancePermeabilityLastMonth) === 'NaN' ? '0' : String(this.MaoriInsurancePermeabilityLastMonth), //保险渗透率(上月)
                MaoriAvgInsuranceProfiLastMonth: String(this.MaoriAvgInsuranceProfiLastMonth) === 'NaN' ? '0' : String(this.MaoriAvgInsuranceProfiLastMonth), //保险毛利/台(上月)
                MaoriInsuranceGPLastMonth: String(this.MaoriInsuranceGPLastMonth) === 'NaN' ? '0' : String(this.MaoriInsuranceGPLastMonth),             //保险毛利(上月)
                MaoriInsuranceGPTarget: String(this.MaoriInsuranceGPTarget) === 'NaN' ? '0' : String(this.MaoriInsuranceGPTarget),                      //保险毛利(目标)
                MaoriSkuPermeabilityLastMonth: String(this.MaoriSkuPermeabilityLastMonth) === 'NaN' ? '0' : String(this.MaoriSkuPermeabilityLastMonth), //精品渗透率(上月)
                MaoriSkuGPLastMonth: String(this.MaoriSkuGPLastMonth) === 'NaN' ? '0' : String(this.MaoriSkuGPLastMonth),                //精品毛利/台(上月)
                MaoriSkuGPTotalLastMonth: String(this.MaoriSkuGPTotalLastMonth) === 'NaN' ? '0' : String(this.MaoriSkuGPTotalLastMonth), //精品毛利(上月)
                MaoriSkuGPTotalTarget: String(this.MaoriSkuGPTotalTarget) === 'NaN' ? '0' : String(this.MaoriSkuGPTotalTarget),          //精品毛利(目标)
                MaoriNewCarYBPermeabilityLastMonth: String(this.MaoriNewCarYBPermeabilityLastMonth) === 'NaN' ? '0' : String(this.MaoriNewCarYBPermeabilityLastMonth), //新车延保渗透率(上月)
                MaoriYBGPLastMonth: String(this.MaoriYBGPLastMonth) === 'NaN' ? '0' : String(this.MaoriYBGPLastMonth),                           //延保毛利/台(上月)
                MaoriNewCarYBGPLastMonth: String(this.MaoriNewCarYBGPLastMonth) === 'NaN' ? '0' : String(this.MaoriNewCarYBGPLastMonth),         //新车延保毛利(上月)
                MaoriNewCarYBGPTarget: String(this.MaoriNewCarYBGPTarget) === 'NaN' ? '0' : String(this.MaoriNewCarYBGPTarget),                  //新车延保毛利(目标)
                MaoriOtherBusinessPermeabilityLastMonth: String(this.MaoriOtherBusinessPermeabilityLastMonth) === 'NaN' ? '0' : String(this.MaoriOtherBusinessPermeabilityLastMonth),             //其他业务渗透率(上月)
                MaoriOtherGPLastMonth: String(this.MaoriOtherGPLastMonth) === 'NaN' ? '0' : String(this.MaoriOtherGPLastMonth),                         //其他毛利/台(上月)
                MaoriOtherGPTarget: String(this.MaoriOtherGPTarget) === 'NaN' ? '0' : String(this.MaoriOtherGPTarget),                                  //其他毛利/台(目标)
                MaoriOtherBusinessGPLastMonth : String(this.MaoriOtherBusinessGPLastMonth) === 'NaN' ? '0' : String(this.MaoriOtherBusinessGPLastMonth),                     //其他毛利(上月)
                MaoriDerivationBusinessGPLastMonth: String(this.MaoriDerivationBusinessGPLastMonth) === 'NaN' ? '0' : String(this.MaoriDerivationBusinessGPLastMonth),       //衍生业务毛利/台(上月)
                MaoriDerivationBusinessGPTarget: String(this.MaoriDerivationBusinessGPTarget) === 'NaN' ? '0' : String(this.MaoriDerivationBusinessGPTarget),                //衍生业务毛利/台(目标)
                MaoriDerivationBusinessTotalGPLastMonth: String(this.MaoriDerivationBusinessTotalGPLastMonth) === 'NaN' ? '0' : String(this.MaoriDerivationBusinessTotalGPLastMonth),       //衍生业务毛利(上月)
                MaoriDerivationBusinessTotalGPTarget: String(this.MaoriDerivationBusinessTotalGPTarget) === 'NaN' ? '0' : String(this.MaoriDerivationBusinessTotalGPTarget),                //衍生业务毛利(目标)
                MaoriCurrentMonthInStoreLeadsOrderRateTarget: String(this.MaoriCurrentMonthInStoreLeadsOrderRateTarget) === 'NaN' ? '0' : String(this.MaoriCurrentMonthInStoreLeadsOrderRateTarget),    //本月进店线索订单率目标
                MaoriCurrentMonthOrderRetailRateTarget: String(this.MaoriCurrentMonthOrderRetailRateTarget) === 'NaN' ? '0' : String(this.MaoriCurrentMonthOrderRetailRateTarget),                       //本月订单零售率目标
                MaoriFactorSiSalesTarget: String(this.MaoriFactorSiSalesTarget) === 'NaN' ? '0' : String(this.MaoriFactorSiSalesTarget),                                //厂家SI销售目标
                MaoriTargetRetailPrice: String(this.MaoriTargetRetailPrice) === 'NaN' ? '0' : String(this.MaoriTargetRetailPrice),                                      //目标零售限价金额/台
                MaoriTargetWholesalePrice: String(this.MaoriTargetWholesalePrice) === 'NaN' ? '0' : String(this.MaoriTargetWholesalePrice),                             //目标批售限价金额/台
                MaoriGiftTarget: String(this.MaoriGiftTarget) === 'NaN' ? '0' : String(this.MaoriGiftTarget),                                                           //赠品(目标)
                MaoriEstimateFactorySi: String(this.MaoriEstimateFactorySi) === 'NaN' ? '0' : String(this.MaoriEstimateFactorySi),                                      //预估厂家SI
                MaoriEstimateYearRebate: String(this.MaoriEstimateYearRebate) === 'NaN' ? '0' : String(this.MaoriEstimateYearRebate),                                   //预估年度返利
                MaoriFinancialPermeabilityTarget: String(this.MaoriFinancialPermeabilityTarget) === 'NaN' ? '0' : String(this.MaoriFinancialPermeabilityTarget),        //金融渗透率目标
                MaoriAvgFinancialProfiTarget: String(this.MaoriAvgFinancialProfiTarget) === 'NaN' ? '0' : String(this.MaoriAvgFinancialProfiTarget),                    //金融毛利/台(目标)
                MaoriInsurancePermeabilityTarget: String(this.MaoriInsurancePermeabilityTarget) === 'NaN' ? '0' : String(this.MaoriInsurancePermeabilityTarget),        //保险渗透率目标
                MaoriAvgInsuranceProfiTarget: String(this.MaoriAvgInsuranceProfiTarget) === 'NaN' ? '0' : String(this.MaoriAvgInsuranceProfiTarget),                    //保险毛利/台目标
                MaoriSkuPermeabilityTarget: String(this.MaoriSkuPermeabilityTarget) === 'NaN' ? '0' : String(this.MaoriSkuPermeabilityTarget),                          //精品渗透率目标
                MaoriSkuGPTarget: String(this.MaoriSkuGPTarget) === 'NaN' ? '0' : String(this.MaoriSkuGPTarget),                                                        //精品毛利/台目标
                MaoriNewCarYBPermeabilityTarget: String(this.MaoriNewCarYBPermeabilityTarget) === 'NaN' ? '0' : String(this.MaoriNewCarYBPermeabilityTarget),           //新车延保渗透率
                MaoriYBGPTarget: String(this.MaoriYBGPTarget) === 'NaN' ? '0' : String(this.MaoriYBGPTarget),                                                           //新车延保毛利/台
                MaoriOtherBusinessPermeabilityTarget: String(this.MaoriOtherBusinessPermeabilityTarget) === 'NaN' ? '0' : String(this.MaoriOtherBusinessPermeabilityTarget), //其它毛利渗透率目标
                MaoriOtherBusinessGPTarget: String(this.MaoriOtherBusinessGPTarget) === 'NaN' ? '0' : String(this.MaoriOtherBusinessGPTarget),
                MaoriTGPTotalTarget: String(this.MaoriTGPTotalTarget) === 'NaN' ? '0' : String(this.MaoriTGPTotalTarget),
              }
            }]
          }
          if(this.grossSetList.length >= 2) {
            // 选择多条车系的入参
            param = [{
              dateVersion: this.monthValues,                                  //日期月份
              storeCode: this.query.storeCode,                                //门店编码
              isBatchUpdate: 1,
              maoRiRate: this.maoRiRate,                                      //毛利预测总计的比例
              targetGpForecast: String(this.MaoriReportData.targetGpValue) === 'NaN' ? '0' : String(this.MaoriReportData.targetGpValue),   //月T.GP目标总值
              targetGpCompleteRate: String(this.monthTgpRate) === 'NaN' ? '0' : String(this.monthTgpRate),                //T.GP目标预计达成率
              addMap: {
                MaoriLastMonthAvailableSaleInStock: String(this.MaoriLastMonthAvailableSaleInStock) === 'NaN' ? '0' : String(this.MaoriLastMonthAvailableSaleInStock), //上月在库可售库存
                MaoriLastMonthOnTheWayStock: String(this.MaoriLastMonthOnTheWayStock) === 'NaN' ? '0' : String(this.MaoriLastMonthOnTheWayStock), //上月计划到库的在途库存
                MaoriLastMonthSalesNumber: String(this.MaoriLastMonthSalesNumber) === 'NaN' ? '0' : String(this.MaoriLastMonthSalesNumber), //上月销售台数
                MaoriLastMonthBatchSalesNumber: String(this.MaoriLastMonthBatchSalesNumber) === 'NaN' ? '0' : String(this.MaoriLastMonthBatchSalesNumber), //上月批售台数
                MaoriExpectEndMonthAvailableSaleNumber: String(this.MaoriExpectEndMonthAvailableSaleNumber) === 'NaN' ? '0' : String(this.MaoriExpectEndMonthAvailableSaleNumber),//预计月底库存台数
                MaoriExpectCurrentMonthAvailableSaleStockCycle: String(this.MaoriExpectCurrentMonthAvailableSaleStockCycle) === 'NaN' ? '0' : String(this.MaoriExpectCurrentMonthAvailableSaleStockCycle), //预计本月可售库存周转天数
                MaoriTargetCurrentMonthAvailableSaleStockCycle: String(this.MaoriTargetCurrentMonthAvailableSaleStockCycle) === 'NaN' ? '0' : String(this.MaoriTargetCurrentMonthAvailableSaleStockCycle), //目标本月可售库存周转天数
                MaoriCurrentMonthStockSecuritySalesTarget: String(this.MaoriCurrentMonthStockSecuritySalesTarget) === 'NaN' ? '0' : String(this.MaoriCurrentMonthStockSecuritySalesTarget), //本月库存安全销售目标
                MaoriLastMonthInStoreLeadsNumber: String(this.MaoriLastMonthInStoreLeadsNumber) === 'NaN' ? '0' : String(this.MaoriLastMonthInStoreLeadsNumber), //上月进店线索数
                MaoriCurrentMonthInStoreLeadsNumTarget: String(this.MaoriCurrentMonthInStoreLeadsNumTarget) === 'NaN' ? '0' : String(this.MaoriCurrentMonthInStoreLeadsNumTarget), //本月进店线索数目标
                MaoriLastMonthInStoreLeadsOrderRate: String(this.MaoriLastMonthInStoreLeadsOrderRate) === 'NaN' ? '0' : String(this.MaoriLastMonthInStoreLeadsOrderRate), //上月进店线索订单率
                MaoriLastMonthLeftOverOrderNum: String(this.MaoriLastMonthLeftOverOrderNum) === 'NaN' ? '0' : String(this.MaoriLastMonthLeftOverOrderNum),             //上月留存订单数
                MaoriCurrentMonthAddOrderNumTarget: String(this.MaoriCurrentMonthAddOrderNumTarget) === 'NaN' ? '0' : String(this.MaoriCurrentMonthAddOrderNumTarget), //本月新增订单数目标
                MaoriLastMonthOrderRetailRate: String(this.MaoriLastMonthOrderRetailRate) === 'NaN' ? '0' : String(this.MaoriLastMonthOrderRetailRate),              //上月订单零售率
                MaoriExhibitionHallRetailTarget: String(this.MaoriExhibitionHallRetailTarget) === 'NaN' ? '0' : String(this.MaoriExhibitionHallRetailTarget),        //展厅零售目标
                MaoriCurrentMonthSalesTarget: String(this.MaoriCurrentMonthSalesTarget) === 'NaN' ? '0' : String(this.MaoriCurrentMonthSalesTarget),                 //本月销售目标
                MaoriTwoLevelSales: String(this.MaoriTwoLevelSales) === 'NaN' ? '0' : String(this.MaoriTwoLevelSales),                     //二级批售配额
                MaoriAveragePurchaseCost: String(this.MaoriAveragePurchaseCost) === 'NaN' ? '0' : String(this.MaoriAveragePurchaseCost),   //平均进货成本（千）
                MaoriLastMonthAverageSaleAmount: String(this.MaoriLastMonthAverageSaleAmount) === 'NaN' ? '0' : String(this.MaoriLastMonthAverageSaleAmount), //上月平均销售金额 (千）
                MaoriTargetRetailPrice: String(this.MaoriTargetRetailPrice) === 'NaN' ? '0' : String(this.MaoriTargetRetailPrice),              //目标零售限价金额 / 台 (千）
                MaoriExpectRetailGP1: String(this.MaoriExpectRetailGP1) === 'NaN' ? '0' : String(this.MaoriExpectRetailGP1),                    //预计本月第一档零售GP（千）
                MaoriExpectWholesaleGP1: String(this.MaoriExpectWholesaleGP1) === 'NaN' ? '0' : String(this.MaoriExpectWholesaleGP1),           //预计本月第一档批售GP（千）
                MaoriExpectCurrentMonthGP1: String(this.MaoriExpectCurrentMonthGP1) === 'NaN' ? '0' : String(this.MaoriExpectCurrentMonthGP1),  //预计本月第一档GP/台（千）
                MaoriGiftLastMonth: String(this.MaoriGiftLastMonth) === 'NaN' ? '0' : String(this.MaoriGiftLastMonth),  //赠品(上月)
                MaoriExpectCurrentMonthGP2: String(this.MaoriExpectCurrentMonthGP2) === 'NaN' ? '0' : String(this.MaoriExpectCurrentMonthGP2),               //预计本月第二档GP/台（千）
                MaoriExpectCurrentMonthGP4: String(this.MaoriExpectCurrentMonthGP4) === 'NaN' ? '0' : String(this.MaoriExpectCurrentMonthGP4),               //预计本月第三档GP/台（千）
                MaoriExpectCurrentMonthGP4Rate: String(this.MaoriExpectCurrentMonthGP4Rate) === 'NaN' ? '0' : String(this.MaoriExpectCurrentMonthGP4Rate),   //预计本月第三档GP%
                MaoriFinancialPermeabilityLastMonth: String(this.MaoriFinancialPermeabilityLastMonth) === 'NaN' ? '0' : String(this.MaoriFinancialPermeabilityLastMonth), //金融渗透率(上月)
                MaoriAvgFinancialProfiLastMonth: String(this.MaoriAvgFinancialProfiLastMonth) === 'NaN' ? '0' : String(this.MaoriAvgFinancialProfiLastMonth), //金融毛利/台(上月)
                MaoriFinancialGPLastMonth: String(this.MaoriFinancialGPLastMonth) === 'NaN' ? '0' : String(this.MaoriFinancialGPLastMonth),                   //金融毛利(上月)
                MaoriFinancialGPTarget: String(this.MaoriFinancialGPTarget) === 'NaN' ? '0' : String(this.MaoriFinancialGPTarget),                            //金融毛利(目标)
                MaoriInsurancePermeabilityLastMonth: String(this.MaoriInsurancePermeabilityLastMonth) === 'NaN' ? '0' : String(this.MaoriInsurancePermeabilityLastMonth), //保险渗透率(上月)
                MaoriAvgInsuranceProfiLastMonth: String(this.MaoriAvgInsuranceProfiLastMonth) === 'NaN' ? '0' : String(this.MaoriAvgInsuranceProfiLastMonth), //保险毛利/台(上月)
                MaoriInsuranceGPLastMonth: String(this.MaoriInsuranceGPLastMonth) === 'NaN' ? '0' : String(this.MaoriInsuranceGPLastMonth),             //保险毛利(上月)
                MaoriInsuranceGPTarget: String(this.MaoriInsuranceGPTarget) === 'NaN' ? '0' : String(this.MaoriInsuranceGPTarget),                      //保险毛利(目标)
                MaoriSkuPermeabilityLastMonth: String(this.MaoriSkuPermeabilityLastMonth) === 'NaN' ? '0' : String(this.MaoriSkuPermeabilityLastMonth), //精品渗透率(上月)
                MaoriSkuGPLastMonth: String(this.MaoriSkuGPLastMonth) === 'NaN' ? '0' : String(this.MaoriSkuGPLastMonth),                //精品毛利/台(上月)
                MaoriSkuGPTotalLastMonth: String(this.MaoriSkuGPTotalLastMonth) === 'NaN' ? '0' : String(this.MaoriSkuGPTotalLastMonth), //精品毛利(上月)
                MaoriSkuGPTotalTarget: String(this.MaoriSkuGPTotalTarget) === 'NaN' ? '0' : String(this.MaoriSkuGPTotalTarget),          //精品毛利(目标)
                MaoriNewCarYBPermeabilityLastMonth: String(this.MaoriNewCarYBPermeabilityLastMonth) === 'NaN' ? '0' : String(this.MaoriNewCarYBPermeabilityLastMonth), //新车延保渗透率(上月)
                MaoriYBGPLastMonth: String(this.MaoriYBGPLastMonth) === 'NaN' ? '0' : String(this.MaoriYBGPLastMonth),                           //延保毛利/台(上月)
                MaoriNewCarYBGPLastMonth: String(this.MaoriNewCarYBGPLastMonth) === 'NaN' ? '0' : String(this.MaoriNewCarYBGPLastMonth),         //新车延保毛利(上月)
                MaoriNewCarYBGPTarget: String(this.MaoriNewCarYBGPTarget) === 'NaN' ? '0' : String(this.MaoriNewCarYBGPTarget),                  //新车延保毛利(目标)
                MaoriOtherBusinessPermeabilityLastMonth: String(this.MaoriOtherBusinessPermeabilityLastMonth) === 'NaN' ? '0' : String(this.MaoriOtherBusinessPermeabilityLastMonth),             //其他业务渗透率(上月)
                MaoriOtherGPLastMonth: String(this.MaoriOtherGPLastMonth) === 'NaN' ? '0' : String(this.MaoriOtherGPLastMonth),                         //其他毛利/台(上月)
                MaoriOtherGPTarget: String(this.MaoriOtherGPTarget) === 'NaN' ? '0' : String(this.MaoriOtherGPTarget),                                  //其他毛利/台(目标)
                MaoriOtherBusinessGPLastMonth : String(this.MaoriOtherBusinessGPLastMonth) === 'NaN' ? '0' : String(this.MaoriOtherBusinessGPLastMonth),                     //其他毛利(上月)
                MaoriDerivationBusinessGPLastMonth: String(this.MaoriDerivationBusinessGPLastMonth) === 'NaN' ? '0' : String(this.MaoriDerivationBusinessGPLastMonth),       //衍生业务毛利/台(上月)
                MaoriDerivationBusinessGPTarget: String(this.MaoriDerivationBusinessGPTarget) === 'NaN' ? '0' : String(this.MaoriDerivationBusinessGPTarget),                //衍生业务毛利/台(目标)
                MaoriDerivationBusinessTotalGPLastMonth: String(this.MaoriDerivationBusinessTotalGPLastMonth) === 'NaN' ? '0' : String(this.MaoriDerivationBusinessTotalGPLastMonth),       //衍生业务毛利(上月)
                MaoriDerivationBusinessTotalGPTarget: String(this.MaoriDerivationBusinessTotalGPTarget) === 'NaN' ? '0' : String(this.MaoriDerivationBusinessTotalGPTarget),                //衍生业务毛利(目标)
                MaoriCurrentMonthInStoreLeadsOrderRateTarget: String(this.MaoriCurrentMonthInStoreLeadsOrderRateTarget) === 'NaN' ? '0' : String(this.MaoriCurrentMonthInStoreLeadsOrderRateTarget),    //本月进店线索订单率目标
                MaoriCurrentMonthOrderRetailRateTarget: String(this.MaoriCurrentMonthOrderRetailRateTarget) === 'NaN' ? '0' : String(this.MaoriCurrentMonthOrderRetailRateTarget),                       //本月订单零售率目标
                MaoriFactorSiSalesTarget: String(this.MaoriFactorSiSalesTarget) === 'NaN' ? '0' : String(this.MaoriFactorSiSalesTarget),                                //厂家SI销售目标
                MaoriTargetRetailPrice: String(this.MaoriTargetRetailPrice) === 'NaN' ? '0' : String(this.MaoriTargetRetailPrice),                                      //目标零售限价金额/台
                MaoriTargetWholesalePrice: String(this.MaoriTargetWholesalePrice) === 'NaN' ? '0' : String(this.MaoriTargetWholesalePrice),                             //目标批售限价金额/台
                MaoriGiftTarget: String(this.MaoriGiftTarget) === 'NaN' ? '0' : String(this.MaoriGiftTarget),                                                           //赠品(目标)
                MaoriEstimateFactorySi: String(this.MaoriEstimateFactorySi) === 'NaN' ? '0' : String(this.MaoriEstimateFactorySi),                                      //预估厂家SI
                MaoriEstimateYearRebate: String(this.MaoriEstimateYearRebate) === 'NaN' ? '0' : String(this.MaoriEstimateYearRebate),                                   //预估年度返利
                MaoriFinancialPermeabilityTarget: String(this.MaoriFinancialPermeabilityTarget) === 'NaN' ? '0' : String(this.MaoriFinancialPermeabilityTarget),        //金融渗透率目标
                MaoriAvgFinancialProfiTarget: String(this.MaoriAvgFinancialProfiTarget) === 'NaN' ? '0' : String(this.MaoriAvgFinancialProfiTarget),                    //金融毛利/台(目标)
                MaoriInsurancePermeabilityTarget: String(this.MaoriInsurancePermeabilityTarget) === 'NaN' ? '0' : String(this.MaoriInsurancePermeabilityTarget),        //保险渗透率目标
                MaoriAvgInsuranceProfiTarget: String(this.MaoriAvgInsuranceProfiTarget) === 'NaN' ? '0' : String(this.MaoriAvgInsuranceProfiTarget),                    //保险毛利/台目标
                MaoriSkuPermeabilityTarget: String(this.MaoriSkuPermeabilityTarget) === 'NaN' ? '0' : String(this.MaoriSkuPermeabilityTarget),                          //精品渗透率目标
                MaoriSkuGPTarget: String(this.MaoriSkuGPTarget) === 'NaN' ? '0' : String(this.MaoriSkuGPTarget),                                                        //精品毛利/台目标
                MaoriNewCarYBPermeabilityTarget: String(this.MaoriNewCarYBPermeabilityTarget) === 'NaN' ? '0' : String(this.MaoriNewCarYBPermeabilityTarget),           //新车延保渗透率
                MaoriYBGPTarget: String(this.MaoriYBGPTarget) === 'NaN' ? '0' : String(this.MaoriYBGPTarget),                                                           //新车延保毛利/台
                MaoriOtherBusinessPermeabilityTarget: String(this.MaoriOtherBusinessPermeabilityTarget) === 'NaN' ? '0' : String(this.MaoriOtherBusinessPermeabilityTarget), //其它毛利渗透率目标
                MaoriOtherBusinessGPTarget: String(this.MaoriOtherBusinessGPTarget) === 'NaN' ? '0' : String(this.MaoriOtherBusinessGPTarget),
                MaoriTGPTotalTarget: String(this.MaoriTGPTotalTarget) === 'NaN' ? '0' : String(this.MaoriTGPTotalTarget),                                                      //其它毛利目标
              }
            }]
          }
          api.MaoriForecast.updateMaoriReportBatch(param, (res) => {
              if (res.data.code === 'success') {
                  this.queryData();
                  if(res.data.obj) {
                    // 此部分不做任何的处理，仅仅把入参传给后端
                  }
              }
          })
        },
        //编辑(批量更新毛利预测报表信息)
        editTable() {
          const that = this;
          if(that.grossSetList.length == 0) {
            Message({
                type: 'info',
                message: '请选择编辑项'
            })
            return
          }
          this.grossShow = true;     //允许显示弹层
          // 获取当前可视区域的高度
          let grossHeight = document.body.clientHeight;
          document.querySelector('.modal-dialog').style.height = grossHeight;
          // 取页面的T.GP达成率
          // if(this.instrumentID.target == 0) {
          //   this.$data.monthTgpRate = NaN;
          // } else {
          //   this.$data.monthTgpRate = ((this.instrumentID.percent / this.instrumentID.target) * 100).toFixed(1);
          // }
          // 单车系
          if(that.grossSetList.length == 1) {
            that.maoriCode = that.grossSetList[0].maoriCode;
            that.dateVersion = that.grossSetList[0].dateVersion;
            that.storeCode = that.grossSetList[0].storeCode;
            let detailMap = that.grossSetList[0].detailMap;
            this.MaoriLastMonthAvailableSaleInStock = Number(detailMap.MaoriLastMonthAvailableSaleInStock);
            this.MaoriLastMonthOnTheWayStock = Number(detailMap.MaoriLastMonthOnTheWayStock);    //上月计划到库的在途库存
            this.MaoriLastMonthSalesNumber = Number(detailMap.MaoriLastMonthSalesNumber);        //上月销售台数
            this.MaoriLastMonthBatchSalesNumber = Number(detailMap.MaoriLastMonthBatchSalesNumber);  //上月批售台数
            this.MaoriExpectEndMonthAvailableSaleNumber = Number(detailMap.MaoriExpectEndMonthAvailableSaleNumber); //月底库存台数
            this.MaoriExpectCurrentMonthAvailableSaleStockCycle = Number(detailMap.MaoriExpectCurrentMonthAvailableSaleStockCycle);  //本月可售库存周转天数
            this.MaoriTargetCurrentMonthAvailableSaleStockCycle = Number(detailMap.MaoriTargetCurrentMonthAvailableSaleStockCycle);  //目标本月可售库存周转天数
            this.MaoriCurrentMonthStockSecuritySalesTarget = Number(detailMap.MaoriCurrentMonthStockSecuritySalesTarget);
            this.MaoriLastMonthInStoreLeadsNumber = Number(detailMap.MaoriLastMonthInStoreLeadsNumber).toFixed(0);              // 上月进店线索数
            this.MaoriCurrentMonthInStoreLeadsNumTarget = Number(detailMap.MaoriCurrentMonthInStoreLeadsNumTarget).toFixed(0);  // 本月进店线索数
            this.MaoriLastMonthInStoreLeadsOrderRate = Number(detailMap.MaoriLastMonthInStoreLeadsOrderRate) * 100;      //上月进店线索订单率
            this.MaoriCurrentMonthInStoreLeadsOrderRateTarget = (Number(detailMap.MaoriCurrentMonthInStoreLeadsOrderRateTarget) * 100).toFixed(1); //目标进店线索订单率
            this.MaoriLastMonthLeftOverOrderNum = Number(detailMap.MaoriLastMonthLeftOverOrderNum);
            this.MaoriCurrentMonthAddOrderNumTarget = Number(detailMap.MaoriCurrentMonthAddOrderNumTarget);
            this.MaoriLastMonthOrderRetailRate = Number(detailMap.MaoriLastMonthOrderRetailRate) * 100;    //上月订单零售绿
            this.MaoriCurrentMonthOrderRetailRateTarget = (Number(detailMap.MaoriCurrentMonthOrderRetailRateTarget) * 100).toFixed(1);   //本月订单零售率
            this.MaoriExhibitionHallRetailTarget = Number(detailMap.MaoriExhibitionHallRetailTarget);
            this.MaoriFactorSiSalesTarget = Number(detailMap.MaoriFactorSiSalesTarget).toFixed(0);
            this.MaoriCurrentMonthSalesTarget = Number(detailMap.MaoriCurrentMonthSalesTarget);
            this.MaoriTwoLevelSales = Number(detailMap.MaoriTwoLevelSales);
            this.MaoriAveragePurchaseCost = Number(detailMap.MaoriAveragePurchaseCost) / 1000;  //平均进货成本
            this.MaoriLastMonthAverageSaleAmount = Number(detailMap.MaoriLastMonthAverageSaleAmount) / 1000;   //平均销售金额
            this.MaoriTargetRetailPrice = (Number(detailMap.MaoriTargetRetailPrice) / 1000).toFixed(1);
            this.MaoriTargetWholesalePrice = (Number(detailMap.MaoriTargetWholesalePrice) / 1000).toFixed(1);
            this.MaoriExpectRetailGP1 = Number(detailMap.MaoriExpectRetailGP1) / 1000;
            this.MaoriExpectWholesaleGP1 = Number(detailMap.MaoriExpectWholesaleGP1) / 1000;
            this.MaoriExpectCurrentMonthGP1 = Number(detailMap.MaoriExpectCurrentMonthGP1) / 1000;
            this.MaoriGiftLastMonth = Number(detailMap.MaoriGiftLastMonth);
            this.MaoriGiftTarget = Number(detailMap.MaoriGiftTarget).toFixed(1);
            this.MaoriExpectCurrentMonthGP2 = Number(detailMap.MaoriExpectCurrentMonthGP2) / 1000;
            this.MaoriEstimateFactorySi = (Number(detailMap.MaoriEstimateFactorySi) / 1000).toFixed(1);
            this.MaoriEstimateYearRebate = (Number(detailMap.MaoriEstimateYearRebate) / 1000).toFixed(1);
            this.MaoriExpectCurrentMonthGP4 = (Number(detailMap.MaoriExpectCurrentMonthGP4) / 1000).toFixed(1);
            this.MaoriExpectCurrentMonthGP4Rate = (Number(detailMap.MaoriExpectCurrentMonthGP4Rate) * 100).toFixed(1);
            this.MaoriFinancialPermeabilityLastMonth = Number(detailMap.MaoriFinancialPermeabilityLastMonth) * 100;
            this.MaoriFinancialPermeabilityTarget = (Number(detailMap.MaoriFinancialPermeabilityTarget) * 100).toFixed(1);
            this.MaoriAvgFinancialProfiLastMonth = Number(detailMap.MaoriAvgFinancialProfiLastMonth);
            this.MaoriAvgFinancialProfiTarget = Number(detailMap.MaoriAvgFinancialProfiTarget).toFixed(1);
            this.MaoriFinancialGPLastMonth = Number(detailMap.MaoriFinancialGPLastMonth);
            this.MaoriFinancialGPTarget = Number(detailMap.MaoriFinancialGPTarge);
            this.MaoriInsurancePermeabilityLastMonth = Number(detailMap.MaoriInsurancePermeabilityLastMonth) * 100;
            this.MaoriInsurancePermeabilityTarget = (Number(detailMap.MaoriInsurancePermeabilityTarget) * 100).toFixed(1);
            this.MaoriAvgInsuranceProfiLastMonth = Number(detailMap.MaoriAvgInsuranceProfiLastMonth);
            this.MaoriAvgInsuranceProfiTarget = Number(detailMap.MaoriAvgInsuranceProfiTarget).toFixed(1);
            this.MaoriInsuranceGPLastMonth = Number(detailMap.MaoriInsuranceGPLastMonth);
            this.MaoriInsuranceGPTarget = Number(detailMap.MaoriInsuranceGPTarget);
            this.MaoriSkuPermeabilityLastMonth = Number(detailMap.MaoriSkuPermeabilityLastMont) * 100;
            this.MaoriSkuPermeabilityTarget = (Number(detailMap.MaoriSkuPermeabilityTarget) * 100).toFixed(1);
            this.MaoriSkuGPLastMonth = Number(detailMap.MaoriSkuGPLastMonth);
            this.MaoriSkuGPTarget = Number(detailMap.MaoriSkuGPTarget).toFixed(1);
            this.MaoriSkuGPTotalLastMonth = Number(detailMap.MaoriSkuGPTotalLastMonth);
            this.MaoriSkuGPTotalTarget = Number(detailMap.MaoriSkuGPTotalTarget);
            this.MaoriNewCarYBPermeabilityLastMonth = Number(detailMap.MaoriNewCarYBPermeabilityLastMonth) * 100;
            this.MaoriNewCarYBPermeabilityTarget = (Number(detailMap.MaoriNewCarYBPermeabilityTarget) * 100).toFixed(1);
            this.MaoriYBGPLastMonth = Number(detailMap.MaoriYBGPLastMonth);
            this.MaoriYBGPTarget = Number(detailMap.MaoriYBGPTarget).toFixed(1);
            this.MaoriNewCarYBGPLastMonth = Number(detailMap.MaoriNewCarYBGPLastMonth);
            this.MaoriNewCarYBGPTarget = Number(detailMap.MaoriNewCarYBGPTarget);
            this.MaoriOtherBusinessPermeabilityLastMonth = Number(detailMap.MaoriOtherBusinessPermeabilityLastMonth) * 100;
            this.MaoriOtherBusinessPermeabilityTarget = (Number(detailMap.MaoriOtherBusinessPermeabilityTarget) * 100).toFixed(1);
            this.MaoriOtherGPLastMonth = Number(detailMap.MaoriOtherGPLastMonth);
            this.MaoriOtherGPTarget = Number(detailMap.MaoriOtherGPTarget).toFixed(1);
            this.MaoriOtherBusinessGPLastMonth = Number(detailMap.MaoriOtherBusinessGPLastMonth);
            this.MaoriOtherBusinessGPTarget = Number(detailMap.MaoriOtherBusinessGPTarget);
            this.MaoriDerivationBusinessGPLastMonth = Number(detailMap.MaoriDerivationBusinessGPLastMonth) / 1000;
            this.MaoriDerivationBusinessGPTarget = Number(detailMap.MaoriDerivationBusinessGPTarget) / 1000;
            this.MaoriDerivationBusinessTotalGPLastMonth = Number(detailMap.MaoriDerivationBusinessTotalGPLastMonth) / 1000;
            this.MaoriDerivationBusinessTotalGPTarget = Number(detailMap.MaoriDerivationBusinessTotalGPTarget) / 1000;
            this.MaoriTGPTotalTarget = Number(detailMap.MaoriTGPTotalTarget) / 1000;
            this.oldMaoriTGPTotalTarget = this.MaoriTGPTotalTarget;
          }
          // 选择多车系的时候,相应的字段的数据是多个车系相应字段数据的和
          if(that.grossSetList.length > 1) {
            that.MaoriLastMonthAvailableSaleInStock = 0;                  //上月在库可售库存
            that.MaoriLastMonthOnTheWayStock = 0;                         //上月计划到库的在途库存
            that.MaoriLastMonthSalesNumber = 0;                           //上月销售台数
            that.MaoriLastMonthBatchSalesNumber = 0;                      //上月批售台数
            that.MaoriExpectEndMonthAvailableSaleNumber = 0;              //预计月底库存台数
            that.MaoriExpectCurrentMonthAvailableSaleStockCycle = 0;      //预计本月可售库存周转天数
            that.MaoriTargetCurrentMonthAvailableSaleStockCycle = 0;      //目标本月可售库存周转天数
            that.MaoriCurrentMonthStockSecuritySalesTarget = 0;           //本月库存安全销售目标
            that.MaoriLastMonthInStoreLeadsNumber = 0;                    //上月进店线索数
            that.MaoriCurrentMonthInStoreLeadsNumTarget = 0;              //本月进店线索数目标
            that.MaoriLastMonthInStoreLeadsOrderRate = 0;                 //上月进店线索订单率
            that.MaoriCurrentMonthInStoreLeadsOrderRateTarget = 0;        //本月进店线索订单率目标
            that.MaoriLastMonthLeftOverOrderNum = 0;                      //上月留存订单数
            that.MaoriCurrentMonthAddOrderNumTarget = 0;                  //本月新增订单数目标
            that.MaoriLastMonthOrderRetailRate = 0;                       //上月订单零售率
            that.MaoriCurrentMonthOrderRetailRateTarget = 0;              //本月订单零售率目标
            that.MaoriExhibitionHallRetailTarget = 0;                     //展厅零售目标
            that.MaoriFactorSiSalesTarget = 0;                            //厂家SI销售目标
            that.MaoriCurrentMonthSalesTarget = 0;                        //本月销售目标
            that.MaoriTwoLevelSales = 0;                                  //二级批售配额
            that.MaoriAveragePurchaseCost = 0;                            //平均进货成本（千）
            that.MaoriLastMonthAverageSaleAmount = 0;                     //上月平均销售金额 (千）
            that.MaoriTargetRetailPrice = 0;                              //目标零售限价金额 / 台 (千）
            that.MaoriTargetWholesalePrice = 0;                           //目标批售限价金额 / 台 (千）
            that.MaoriExpectRetailGP1 = 0;                                //预计本月第一档零售GP（千）
            that.MaoriExpectWholesaleGP1 = 0;                             //预计本月第一档批售GP（千）
            that.MaoriExpectCurrentMonthGP1 = 0;                          //预计本月第一档GP/台（千）
            that.MaoriGiftLastMonth = 0;                                  //赠品(上月)
            that.MaoriGiftTarget = 0;                                     //赠品(目标)
            that.MaoriExpectCurrentMonthGP2 = 0;                          //预计本月第二档GP/台（千）
            that.MaoriEstimateFactorySi = 0;                              //预估厂家SI（千）
            that.MaoriEstimateYearRebate = 0;                             //预估年度返利（千）
            that.MaoriExpectCurrentMonthGP4 = 0;                          //预计本月第三档GP/台（千）
            that.MaoriExpectCurrentMonthGP4Rate = 0;                      //预计本月第三档GP%
            that.MaoriFinancialPermeabilityLastMonth = 0;                 //金融渗透率(上月)
            that.MaoriFinancialPermeabilityTarget = 0;                    //金融渗透率(目标)
            that.MaoriAvgFinancialProfiLastMonth = 0;                     //金融毛利/台(上月)
            that.MaoriAvgFinancialProfiTarget = 0;                        //金融毛利/台(目标)
            that.MaoriFinancialGPLastMonth = 0;                           //金融毛利(上月)
            that.MaoriFinancialGPTarget = 0;                              //金融毛利(目标)
            that.MaoriInsurancePermeabilityLastMonth = 0;                 //保险渗透率(上月)
            that.MaoriInsurancePermeabilityTarget = 0;                    //保险渗透率(目标)
            that.MaoriAvgInsuranceProfiLastMonth = 0;                     //保险毛利/台(上月)
            that.MaoriAvgInsuranceProfiTarget = 0;                        //保险毛利/台(目标)
            that.MaoriInsuranceGPLastMonth = 0;                           //保险毛利(上月)
            that.MaoriInsuranceGPTarget = 0;                              //保险毛利(目标)
            that.MaoriSkuPermeabilityLastMonth = 0;                       //精品渗透率(上月)
            that.MaoriSkuPermeabilityTarget = 0;                          //精品渗透率(目标)
            that.MaoriSkuGPLastMonth = 0;                                 //精品毛利/台(上月)
            that.MaoriSkuGPTarget = 0;                                    //精品毛利/台(目标)
            that.MaoriSkuGPTotalLastMonth = 0;                            //精品毛利(上月)
            that.MaoriSkuGPTotalTarget = 0;                               //精品毛利(目标)
            that.MaoriNewCarYBPermeabilityLastMonth = 0;                  //新车延保渗透率(上月)
            that.MaoriNewCarYBPermeabilityTarget = 0;                     //新车延保渗透率(目标)
            that.MaoriYBGPLastMonth = 0;                                  //延保毛利/台(上月)
            that.MaoriYBGPTarget = 0;                                     //延保毛利/台(目标)
            that.MaoriNewCarYBGPLastMonth = 0;                            //新车延保毛利(上月)
            that.MaoriNewCarYBGPTarget = 0;                               //新车延保毛利(目标)
            that.MaoriOtherBusinessPermeabilityLastMonth = 0;             //其他业务渗透率(上月)
            that.MaoriOtherBusinessPermeabilityTarget = 0;                //其他业务渗透率(目标)
            that.MaoriOtherGPLastMonth = 0;                               //其他毛利/台(上月)
            that.MaoriOtherGPTarget = 0;                                  //其他毛利/台(目标)
            that.MaoriOtherBusinessGPLastMonth = 0;                       //其他毛利(上月)
            that.MaoriOtherBusinessGPTarget = 0;                          //其他毛利(目标)
            that.MaoriDerivationBusinessGPLastMonth = 0;                  //衍生业务毛利/台(上月)
            that.MaoriDerivationBusinessGPTarget = 0;                     //衍生业务毛利/台(目标)
            that.MaoriDerivationBusinessTotalGPLastMonth = 0;             //衍生业务毛利(上月)
            that.MaoriDerivationBusinessTotalGPTarget = 0;                //衍生业务毛利(目标)
            that.grossSetList.forEach(item => {
              that.MaoriLastMonthAvailableSaleInStock = that.MaoriLastMonthAvailableSaleInStock + Number(item.detailMap.MaoriLastMonthAvailableSaleInStock);               //上月在库可售库存
              that.MaoriLastMonthOnTheWayStock = that.MaoriLastMonthOnTheWayStock + Number(item.detailMap.MaoriLastMonthOnTheWayStock);                                    //上月计划到库的在途库存
              that.MaoriLastMonthSalesNumber = that.MaoriLastMonthSalesNumber + Number(item.detailMap.MaoriLastMonthSalesNumber);                                          //上月销售台数
              that.MaoriLastMonthBatchSalesNumber = that.MaoriLastMonthBatchSalesNumber + Number(item.detailMap.MaoriLastMonthBatchSalesNumber);                           //上月批售台数
              that.MaoriExpectEndMonthAvailableSaleNumber = that.MaoriExpectEndMonthAvailableSaleNumber + Number(item.detailMap.MaoriExpectEndMonthAvailableSaleNumber);   //预计月底库存台数
              that.MaoriExpectCurrentMonthAvailableSaleStockCycle = that.MaoriExpectCurrentMonthAvailableSaleStockCycle + Number(item.detailMap.MaoriExpectCurrentMonthAvailableSaleStockCycle);     // 预测本月可售库存周转天数
              that.MaoriTargetCurrentMonthAvailableSaleStockCycle = that.MaoriTargetCurrentMonthAvailableSaleStockCycle + Number(item.detailMap.MaoriTargetCurrentMonthAvailableSaleStockCycle);     // 目标本月可售库存周转天数
              that.MaoriCurrentMonthStockSecuritySalesTarget = that.MaoriCurrentMonthStockSecuritySalesTarget + Number(item.detailMap.MaoriCurrentMonthStockSecuritySalesTarget);          // 本月库存安全销售目标
              that.MaoriLastMonthInStoreLeadsNumber = parseInt(that.MaoriLastMonthInStoreLeadsNumber + Number(item.detailMap.MaoriLastMonthInStoreLeadsNumber));  //上月进店线索数
              that.MaoriCurrentMonthInStoreLeadsNumTarget = parseInt(that.MaoriCurrentMonthInStoreLeadsNumTarget + Number(item.detailMap.MaoriCurrentMonthInStoreLeadsNumTarget));       // 本月进店线索数目标
              // 上月进店线索订单率
              that.MaoriLastMonthInStoreLeadsOrderRate = that.MaoriLastMonthInStoreLeadsOrderRate + Number(item.detailMap.MaoriLastMonthInStoreLeadsOrderRate) * 100;
              that.MaoriCurrentMonthInStoreLeadsOrderRateTarget = that.MaoriCurrentMonthInStoreLeadsOrderRateTarget + Number(item.detailMap.MaoriCurrentMonthInStoreLeadsOrderRateTarget) * 100; // 本月进店线索订单率目标
              that.MaoriCurrentMonthInStoreLeadsOrderRateTarget = Number(that.MaoriCurrentMonthInStoreLeadsOrderRateTarget).toFixed(1);
              that.MaoriCurrentMonthAddOrderNumTarget = that.MaoriCurrentMonthAddOrderNumTarget + Number(item.detailMap.MaoriCurrentMonthAddOrderNumTarget);           // 本月新增订单数目标
              that.MaoriLastMonthLeftOverOrderNum = that.MaoriLastMonthLeftOverOrderNum + Number(item.detailMap.MaoriLastMonthLeftOverOrderNum); // 上月留存订单数
              // 上月订单零售率
              that.MaoriLastMonthOrderRetailRate = that.MaoriLastMonthOrderRetailRate + Number(item.detailMap.MaoriLastMonthOrderRetailRate) * 100;
              that.MaoriCurrentMonthOrderRetailRateTarget = Number(that.MaoriCurrentMonthOrderRetailRateTarget + Number(item.detailMap.MaoriCurrentMonthOrderRetailRateTarget) * 100).toFixed(1);       // 本月订单零售率目标
              that.MaoriExhibitionHallRetailTarget = that.MaoriExhibitionHallRetailTarget + Number(item.detailMap.MaoriExhibitionHallRetailTarget);              // 展厅零售目标
              that.MaoriFactorSiSalesTarget = Number(that.MaoriFactorSiSalesTarget + Number(item.detailMap.MaoriFactorSiSalesTarget)).toFixed(0);                     // 厂家SI销售目标
              that.MaoriCurrentMonthSalesTarget = that.MaoriCurrentMonthSalesTarget + Number(item.detailMap.MaoriCurrentMonthSalesTarget);                 // 本月销售目标
              that.MaoriTwoLevelSales = that.MaoriTwoLevelSales + Number(item.detailMap.MaoriTwoLevelSales);                           // 二级批售配额
              that.MaoriAveragePurchaseCost = that.MaoriAveragePurchaseCost + Number(item.detailMap.MaoriAveragePurchaseCost) / 1000;                     // 平均进货成本
              that.MaoriLastMonthAverageSaleAmount = that.MaoriLastMonthAverageSaleAmount + Number(item.detailMap.MaoriLastMonthAverageSaleAmount) / 1000;              // 上月平均销售金额
              that.MaoriTargetRetailPrice = Number(that.MaoriTargetRetailPrice + Number(item.detailMap.MaoriTargetRetailPrice) / 1000).toFixed(1);                       // 目标零售限价金额
              that.MaoriTargetWholesalePrice = Number(that.MaoriTargetWholesalePrice + Number(item.detailMap.MaoriTargetWholesalePrice) / 1000).toFixed(1);                    // 目标批售限价金额
              that.MaoriExpectRetailGP1 = that.MaoriExpectRetailGP1 + Number(item.detailMap.MaoriExpectRetailGP1) / 1000;           // 预计本月第一档零售GP
              that.MaoriExpectWholesaleGP1 = that.MaoriExpectWholesaleGP1 + Number(item.detailMap.MaoriExpectWholesaleGP1) / 1000;  // 预计本月第一档批售GP
              that.MaoriExpectCurrentMonthGP1 = that.MaoriExpectCurrentMonthGP1 + Number(item.detailMap.MaoriExpectCurrentMonthGP1) / 1000;             // 预计本月第一档GP/台
              that.MaoriGiftLastMonth = that.MaoriGiftLastMonth + Number(item.detailMap.MaoriGiftLastMonth);                     // 赠品/台(上月)
              that.MaoriGiftTarget = Number(that.MaoriGiftTarget +Number(item.detailMap.MaoriGiftTarget)).toFixed(1);                        // 赠品/台(目标)
              that.MaoriExpectCurrentMonthGP2 = that.MaoriExpectCurrentMonthGP2 + Number(item.detailMap.MaoriExpectCurrentMonthGP2) / 1000;             // 预计本月第二档GP/台
              that.MaoriEstimateFactorySi = Number(that.MaoriEstimateFactorySi + Number(item.detailMap.MaoriEstimateFactorySi) / 1000).toFixed(1);                 // 预估厂家SI
              that.MaoriEstimateYearRebate = Number(that.MaoriEstimateYearRebate + Number(item.detailMap.MaoriEstimateYearRebate) / 1000).toFixed(1);                // 预估年度返利
              that.MaoriExpectCurrentMonthGP4 = Number(that.MaoriExpectCurrentMonthGP4 + Number(item.detailMap.MaoriExpectCurrentMonthGP4) / 1000).toFixed(1);             // 预计本月第三档GP/台
              that.MaoriExpectCurrentMonthGP4Rate = Number(that.MaoriExpectCurrentMonthGP4Rate + Number(item.detailMap.MaoriExpectCurrentMonthGP4Rate) * 100).toFixed(1);         // 预计本月第三档GP%
              that.MaoriFinancialPermeabilityLastMonth = that.MaoriFinancialPermeabilityLastMonth + Number(item.detailMap.MaoriFinancialPermeabilityLastMonth) * 100;    // 金融渗透率(上月)
              that.MaoriFinancialPermeabilityTarget = Number(that.MaoriFinancialPermeabilityTarget + Number(item.detailMap.MaoriFinancialPermeabilityTarget) * 100).toFixed(1);       // 金融渗透率(目标)
              // 金融毛利/台(上月)
              that.MaoriAvgFinancialProfiLastMonth = that.MaoriAvgFinancialProfiLastMonth + Number(item.detailMap.MaoriAvgFinancialProfiLastMonth);
              that.MaoriAvgFinancialProfiTarget = Number(that.MaoriAvgFinancialProfiTarget + Number(item.detailMap.MaoriAvgFinancialProfiTarget)).toFixed(1);           // 金融毛利/台(目标)
              that.MaoriFinancialGPLastMonth = that.MaoriFinancialGPLastMonth + Number(item.detailMap.MaoriFinancialGPLastMonth);   // 金融毛利(上月)
              that.MaoriFinancialGPTarget = that.MaoriFinancialGPTarget + Number(item.detailMap.MaoriFinancialGPTarget);            // 金融毛利(目标)
              // 保险渗透率(上月)
              that.MaoriInsurancePermeabilityLastMonth = that.MaoriInsurancePermeabilityLastMonth + Number(item.detailMap.MaoriInsurancePermeabilityLastMonth) * 100;
              that.MaoriInsurancePermeabilityTarget = Number(that.MaoriInsurancePermeabilityTarget + Number(item.detailMap.MaoriInsurancePermeabilityTarget) * 100).toFixed(1);       // 保险渗透率(目标)
              that.MaoriAvgInsuranceProfiLastMonth = that.MaoriAvgInsuranceProfiLastMonth + Number(item.detailMap.MaoriAvgInsuranceProfiLastMonth);        // 保险毛利/台(上月)
              that.MaoriAvgInsuranceProfiTarget = Number(that.MaoriAvgInsuranceProfiTarget + Number(item.detailMap.MaoriAvgInsuranceProfiTarget)).toFixed(1);           // 保险毛利/台(目标)
              that.MaoriInsuranceGPLastMonth = that.MaoriInsuranceGPLastMonth + Number(item.detailMap.MaoriInsuranceGPLastMonth)   // 保险毛利(上月)
              that.MaoriInsuranceGPTarget = that.MaoriInsuranceGPTarget + Number(item.detailMap.MaoriInsuranceGPTarget);           // 保险毛利目标
              // 精品渗透率(上月)
              that.MaoriSkuPermeabilityLastMonth = that.MaoriSkuPermeabilityLastMonth + Number(item.detailMap.MaoriSkuPermeabilityLastMonth) * 100;
              that.MaoriSkuPermeabilityTarget = Number(that.MaoriSkuPermeabilityTarget + Number(item.detailMap.MaoriSkuPermeabilityTarget) * 100).toFixed(1);             // 精品渗透率(目标)
              that.MaoriSkuGPLastMonth = that.MaoriSkuGPLastMonth + Number(item.detailMap.MaoriSkuGPLastMonth);                    // 精品毛利/台(上月)
              that.MaoriSkuGPTarget = Number(that.MaoriSkuGPTarget + Number(item.detailMap.MaoriSkuGPTarget)).toFixed(1);                       // 精品毛利/台(目标)
              that.MaoriSkuGPTotalLastMonth = that.MaoriSkuGPTotalLastMonth + Number(item.detailMap.MaoriSkuGPTotalLastMonth);   // 精品毛利(上月)
              that.MaoriSkuGPTotalTarget = that.MaoriSkuGPTotalTarget + Number(item.detailMap.MaoriSkuGPTotalTarget);            // 精品毛利(目标)
              // 新车延保渗透率(上月)
              that.MaoriNewCarYBPermeabilityLastMonth = that.MaoriNewCarYBPermeabilityLastMonth + Number(item.detailMap.MaoriNewCarYBPermeabilityLastMonth) * 100;
              that.MaoriNewCarYBPermeabilityTarget = Number(that.MaoriNewCarYBPermeabilityTarget + Number(item.detailMap.MaoriNewCarYBPermeabilityTarget) * 100).toFixed(1);        // 新车延保渗透率(目标)
              that.MaoriYBGPLastMonth = that.MaoriYBGPLastMonth + Number(item.detailMap.MaoriYBGPLastMonth);                     // 延保毛利/台(上月)
              that.MaoriYBGPTarget = Number(that.MaoriYBGPTarget + Number(item.detailMap.MaoriYBGPTarget)).toFixed(1);                        // 延保毛利/台(目标)
              that.MaoriNewCarYBGPLastMonth = that.MaoriNewCarYBGPLastMonth + Number(item.detailMap.MaoriNewCarYBGPLastMonth);   // 新车延保毛利总额(上月)
              that.MaoriNewCarYBGPTarget = that.MaoriNewCarYBGPTarget + Number(item.detailMap.MaoriNewCarYBGPTarget);            // 新车延保毛利总额(目标)
              // 其它业务渗透率(上月)
              that.MaoriOtherBusinessPermeabilityLastMonth = that.MaoriOtherBusinessPermeabilityLastMonth + Number(item.detailMap.MaoriOtherBusinessPermeabilityLastMonth) * 100;
              that.MaoriOtherBusinessPermeabilityTarget = Number(that.MaoriOtherBusinessPermeabilityTarget + Number(item.detailMap.MaoriOtherBusinessPermeabilityTarget) * 100).toFixed(1);    // 其它业务渗透率(目标)
              that.MaoriOtherGPLastMonth = that.MaoriOtherGPLastMonth + Number(item.detailMap.MaoriOtherGPLastMonth);                   // 其它毛利/台(上月)
              that.MaoriOtherGPTarget = Number(that.MaoriOtherGPTarget + Number(item.detailMap.MaoriOtherGPTarget)).toFixed(1);                      // 其它毛利/台(目标)
              that.MaoriOtherBusinessGPLastMonth = that.MaoriOtherBusinessGPLastMonth + Number(item.detailMap.MaoriOtherBusinessGPLastMonth);  // 其它毛利(上月)
              that.MaoriOtherBusinessGPTarget = that.MaoriOtherBusinessGPTarget + Number(item.detailMap.MaoriOtherBusinessGPTarget);           // 其它毛利(目标)
              that.MaoriDerivationBusinessGPLastMonth = that.MaoriDerivationBusinessGPLastMonth + Number(item.detailMap.MaoriDerivationBusinessGPLastMonth) / 1000;      // 衍生业务毛利/台(上月)
              that.MaoriDerivationBusinessGPTarget = that.MaoriDerivationBusinessGPTarget + Number(item.detailMap.MaoriDerivationBusinessGPTarget) / 1000;         // 衍生业务毛利/台(本月)
              that.MaoriDerivationBusinessTotalGPLastMonth = that.MaoriDerivationBusinessTotalGPLastMonth + Number(item.detailMap.MaoriDerivationBusinessTotalGPLastMonth) / 1000;  // 衍生业务毛利(上月)
              that.MaoriDerivationBusinessTotalGPTarget = that.MaoriDerivationBusinessTotalGPTarget + Number(item.detailMap.MaoriDerivationBusinessTotalGPTarget) / 1000;   // 衍生业务毛利(目标)
              that.MaoriTGPLastMonth = that.MaoriTGPLastMonth + Number(item.detailMap.MaoriTGPLastMonth) / 1000;         // T.GP/台(上月)
              that.MaoriTGPTarget = that.MaoriTGPTarget + Number(item.detailMap.MaoriTGPTarget) / 1000;            // T.GP/台(目标)
              that.MaoriTGPTotalLastMonth = that.MaoriTGPTotalLastMonth + Number(item.detailMap.MaoriTGPTotalLastMonth) / 1000;    // T.GP合计(上月)
              that.MaoriTGPTotalTarget = that.MaoriTGPTotalTarget + Number(item.detailMap.MaoriTGPTotalTarget) / 1000;       // T.GP合计(目标)
            })
            // 上月进店线索订单率  求平均值
            that.MaoriLastMonthInStoreLeadsOrderRate = that.MaoriLastMonthInStoreLeadsOrderRate / that.grossSetList.length;
            // 上月订单零售率 求平均值
            that.MaoriLastMonthOrderRetailRate = that.MaoriLastMonthOrderRetailRate / that.grossSetList.length;
            // 预计本月第一档零售GP 求平均值
            that.MaoriExpectRetailGP1 = that.MaoriExpectRetailGP1 / that.grossSetList.length;
            // 预计本月第一档批售GP 求平均值
            that.MaoriExpectWholesaleGP1 = that.MaoriExpectWholesaleGP1 / that.grossSetList.length;
            // 金融毛利/台(上月) 求平均值
            that.MaoriAvgFinancialProfiLastMonth = that.MaoriAvgFinancialProfiLastMonth / that.grossSetList.length;
            // 保险渗透率(上月) 求平均值
            that.MaoriInsurancePermeabilityLastMonth = that.MaoriInsurancePermeabilityLastMonth / that.grossSetList.length;
            // 精品渗透率(上月) 求平均值
            that.MaoriSkuPermeabilityLastMonth = that.MaoriSkuPermeabilityLastMonth / that.grossSetList.length;
            // 新车延保渗透率(上月) 求平均值
            that.MaoriNewCarYBPermeabilityLastMonth = that.MaoriNewCarYBPermeabilityLastMonth / that.grossSetList.length;
            // 其它业务渗透率(上月) 求平均值
            that.MaoriOtherBusinessPermeabilityLastMonth = that.MaoriOtherBusinessPermeabilityLastMonth / that.grossSetList.length;
            // 刚打开弹层界面就计算公式
            // 预计月底库存台数 = 上月底在售库存+在途库存- 上月零售数量-批售数量，若为负数则取零
            this.MaoriExpectEndMonthAvailableSaleNumber = Number(this.MaoriLastMonthAvailableSaleInStock) + Number(this.MaoriLastMonthOnTheWayStock) - Number(this.MaoriLastMonthSalesNumber) - Number(this.MaoriLastMonthBatchSalesNumber);
            // 预计月底库存台数如果小于零，则默认为零
            if(this.MaoriExpectEndMonthAvailableSaleNumbe < 0) {
              this.this.MaoriExpectEndMonthAvailableSaleNumbe = 0;
            }
            // 预计本月可售库存周转天数 = 30*库存台数（上月底在售+上月底在途）/本月预计销量（过去三个月平均开票数）;历史数据不满三个月时，按实际取，没有用45天
            this.MaoriExpectCurrentMonthAvailableSaleStockCycle = 30 * (Number(this.MaoriLastMonthAvailableSaleInStock) + Number(this.MaoriLastMonthOnTheWayStock)) / 45;
            // 本月库存安全销售目标 = 公式计算,30*本月底预计库存台数/周转天数
            this.MaoriCurrentMonthStockSecuritySalesTarget = 30 * Number(this.MaoriExpectEndMonthAvailableSaleNumber) / Number(this.MaoriTargetCurrentMonthAvailableSaleStockCycle);
            // 本月新增订单数目标 = 公式计算，进店线索数目标*进店线索订单率目标
            this.MaoriCurrentMonthAddOrderNumTarget = (Number(this.MaoriCurrentMonthInStoreLeadsNumTarget) * Number(this.MaoriCurrentMonthInStoreLeadsOrderRateTarget) / 100).toFixed(0);
            // 展厅零售目标 = 公式计算，（留存订单+新增订单）*订单零售率
            this.MaoriExhibitionHallRetailTarget = (Number(this.MaoriLastMonthLeftOverOrderNum) + Number(this.MaoriCurrentMonthAddOrderNumTarget)) * Number(this.MaoriCurrentMonthOrderRetailRateTarget) / 100;
            // 本月销售目标 = 公式计算，展厅零售目标和厂家SI销售目标两个的较大值
            if(Number(this.MaoriExhibitionHallRetailTarget) < Number(this.MaoriFactorSiSalesTarget)) {
              this.MaoriCurrentMonthSalesTarget = Number(this.MaoriFactorSiSalesTarget);
            }

            if(Number(this.MaoriExhibitionHallRetailTarget) >= Number(this.MaoriFactorSiSalesTarget)) {
              this.MaoriCurrentMonthSalesTarget = Number(this.MaoriExhibitionHallRetailTarget);
            }
            //二级批售配额 = 本月销售目标 - 展厅零售目标
            this.MaoriTwoLevelSales = Number(this.MaoriCurrentMonthSalesTarget) - Number(this.MaoriExhibitionHallRetailTarget);
            // 预计本月第一档零售GP = 目标零售限价金额-平均成本
            this.MaoriExpectRetailGP1 = Number(this.MaoriTargetRetailPrice) - Number(this.MaoriAveragePurchaseCost);
            // 预计本月第一档批售GP = 目标批售限价金额-平均成本）
            this.MaoriExpectWholesaleGP1 = Number(this.MaoriTargetWholesalePrice) - Number(this.MaoriAveragePurchaseCost);
            // 预计本月第一档GP/台 = （批售GP*批售配额+零售GP*（销售目标-批售配额））/台数
            this.MaoriExpectCurrentMonthGP1 = (this.MaoriExpectRetailGP1 * (this.MaoriCurrentMonthSalesTarget - Number(this.MaoriTwoLevelSales)) + this.MaoriExpectWholesaleGP1 * Number(this.MaoriTwoLevelSales)) / Number(this.MaoriCurrentMonthSalesTarget);
            // 预计本月第二档GP/台 = 预计本月第一档GP/台 + 赠品/台(目标)
            this.MaoriExpectCurrentMonthGP2 = this.MaoriExpectCurrentMonthGP1 + Number(this.MaoriGiftTarget) / 1000;
            // 预计本月第三档GP/台 = 预计本月第二档GP/台 + 赠品/台(目标)
            this.MaoriExpectCurrentMonthGP4 =  this.MaoriExpectCurrentMonthGP2 + Number(this.MaoriEstimateFactorySi);
            // 预计本月第三档GP% = 预计本月第三档GP/台 / 目标零售限价金额/台
            this.MaoriExpectCurrentMonthGP4Rate = (this.MaoriExpectCurrentMonthGP4 / Number(this.MaoriTargetRetailPrice))*100;
            // 金融毛利 = 展厅销售台数目标*渗透率*金融毛利/台，初始化为上月
            this.MaoriFinancialGPTarget = Number(this.MaoriExhibitionHallRetailTarget) * Number(this.MaoriFinancialPermeabilityTarget) / 100 * Number(this.MaoriAvgFinancialProfiTarget)
            // 保险毛利 = 展厅销售台数目标*渗透率*保毛利/台，初始化为上月
            this.MaoriInsuranceGPTarget = Number(this.MaoriExhibitionHallRetailTarget) * Number(this.MaoriInsurancePermeabilityTarget) / 100 * Number(this.MaoriAvgInsuranceProfiTarget);
            // 精品毛利 = 展厅销售台数目标*精品渗透率*精品毛利/台，初始化为上月
            this.MaoriSkuGPTotalTarget = Number(this.MaoriExhibitionHallRetailTarget) * Number(this.MaoriSkuPermeabilityTarget) / 100 * Number(this.MaoriSkuGPTarget);
            // 新车延保毛利 = 展厅销售台数目标*新车延保渗透率*延保毛利/台，初始化为上月
            this.MaoriNewCarYBGPTarget = Number(this.MaoriExhibitionHallRetailTarget) * Number(this.MaoriNewCarYBPermeabilityTarget) / 100 * Number(this.MaoriYBGPTarget);
            // 其他业务毛利 = 展厅销售台数目标*其他业务渗透率*其他毛利/，初始化为上月台
            this.MaoriOtherBusinessGPTarget = Number(this.MaoriExhibitionHallRetailTarget) * Number(this.MaoriOtherBusinessPermeabilityTarget) / 100 * Number(this.MaoriOtherGPTarget);
            //衍生业务毛利/台 = 金融毛利/台(目标) + 保险毛利/台(目标) + 精品毛利/台(目标) + 新车延保毛利/台(目标) + 其他毛利/台(目标)
            this.MaoriDerivationBusinessGPTarget = (Number(this.MaoriAvgFinancialProfiTarget) + Number(this.MaoriAvgInsuranceProfiTarget) + Number(this.MaoriSkuGPTarget) + Number(this.MaoriYBGPTarget) + Number(this.MaoriOtherGPTarget)) / 1000;
            // 衍生业务毛利 = 金融毛利(目标) + 保险毛利(目标) + 精品毛利(目标) + 新车延保毛利(目标) + 其他毛利(目标)
            this.MaoriDerivationBusinessTotalGPTarget = (Number(this.MaoriFinancialGPTarget) + Number(this.MaoriInsuranceGPTarget) + Number(this.MaoriSkuGPTotalTarget) + Number(this.MaoriNewCarYBGPTarget) + Number(this.MaoriOtherBusinessGPTarget)) / 1000;
            // T.GP合计 = 本月第三档GP% * 本月销售目标 + 衍生业务毛利(目标) + 预估年度返利 / 12
            this.MaoriTGPTotalTarget = Number(this.MaoriExpectCurrentMonthGP4Rate) * Number(this.MaoriCurrentMonthSalesTarget) + Number(this.MaoriDerivationBusinessTotalGPTarget) + Number(this.MaoriEstimateYearRebate) / 12;
            // 月T.GP目标达成率 = (预计T.GP + 所选车系车型T.GP合计差值) / 月T.GP目标总值
            if(Number(this.MaoriReportData.targetGpValue) == 0 || !this.MaoriReportData.targetGpValue){
              this.monthTgpRate = NaN;
            }else{
              this.monthTgpRate = ((Number(this.MaoriReportData.targetGpForecast) / (Number(this.MaoriReportData.targetGpValue))) * 100).toFixed(1);
            }
          }
        },
        // 确定
        comfirm() {
          this.updateMaoriReportBatch();    //批量更新毛利预测报表信息
          this.grossShow = false;
          this.index = '';                  //清除默认选中的选项
          this.grossSetList = [];
        },
        // 取消
        cancle() {
          this.grossShow = false;
          this.index = '';                  //清除默认选中的选项
        },
        // 设置标识
        setIndex(item, index){
          let currentId = item.id;
          this.index = index;
        },
        // 门店区域选择
        selectStores(sales, stores) {
          this.query.storeCode = stores.value;
          if(this.query.storeCode) {
            this.queryData();   //调取查询接口
          }
        },
        // 查询数据
        queryData() {
          // 每次查询数据之前先清空原先的数据
          this.maoriForecastList = [];
          this.maoriForecastCarList = [];
          this.MaoriReportAddTotal = {};
          this.grossSetList = [];
          this.maoriForecastInfoList = [];
          // 门店编码为空的情况下禁止往下执行
          if(!this.query.storeCode) {
             Message({
                type: 'warning',
                message: '请选择门店'
            })
            return
          }
          let monthValue = formatDate(this.monthValue);   // 日期时间格式化
          this.monthValues = monthValue.substring(0,7);   // 截取日期时间字符串
          let params = {
            dateVersion: this.monthValues,                // 日期时间
            storeCode: this.query.storeCode,              // 门店编码
            factoryCode: this.query.carFactoryCode,       // 厂家
            brandCode: this.query.carBrandCode,           // 品牌
            seriesCode: this.query.carSeriesCode          // 车系
          }
          api.MaoriForecast.queryMaoriReportAdd(params, (res) => {
              if (res.data.code === 'success') {
                  if(res.data.obj) {
                    let data = res.data.obj[0];
                    this.copyMaoriReportData = JSON.parse(JSON.stringify(data))
                    this.instrumentID.target = this.MaoriReportData.targetGpValue = data.targetGpValue               //T.GP目标
                    this.MaoriReportData.operatingCosts = data.operatingCosts                                        //运营成本
                    this.MaoriReportData.incomeTax = data.incomeTax                                                  //所得税
                    this.MaoriReportData.interest = data.interest                                                    //利息
                    this.instrumentID.percent = this.MaoriReportData.targetGpForecast = data.targetGpForecast        //预计T.GP
                    this.MaoriReportData.profitAfterInterest = data.profitAfterInterest                              //预计息税后利润
                    this.MaoriReportData.maoriAddCode = data.maoriAddCode                 //标记
                    this.queryMaoriForecastInfo();    //调取查询毛利预测报表数据信息
                    this.queryMaoriReportAddTotal();  //调取查询毛利预测报表门店总计信息
                  }
              }
          })
        },
        // 查询毛利预测报表数据明细
        queryMaoriForecastInfo() {
          let params = {
            dateVersion: this.monthValues,        //日期时间
            storeCode: this.query.storeCode,      //门店编码
            selectFlag: 0,                        //查询标识
            carConditionFlag: 2,                  //维度标识
            factoryCode: this.query.carFactoryCode,       // 厂家
            brandCode: this.query.carBrandCode,           // 品牌
            seriesCode: this.query.carSeriesCode          // 车系
          }
          let that = this;
          api.MaoriForecast.queryMaoriForecastInfo(params, (res) => {
            if (res.data.code === 'success') {
              if(res.data.obj) {
                let maoriForecastList = res.data.obj;
                maoriForecastList.forEach(item => {
                  item.updateTimeStr = item.updateTimeStr.slice(0,10)
                  if(item.detailMap) {
                    item.isShowIcon = 0;
                    item.detailSeries = []
                    that.maoriForecastCarList.push(item);
                  }
                })
              }
            }
          })
        },
        // 查询毛利预测报表门店总计信息
        queryMaoriReportAddTotal() {
          let params = {
            version: this.monthValues,              //日期时间
            maoriStoreCode: this.query.storeCode,   //门店编码
          }
          let that = this;
          api.MaoriForecast.queryMaoriReportAddTotal(params, res => {
            if(res.data.code === 'success') {
              if(res.data.obj) {
                that.MaoriReportAddTotal = res.data.obj;
              }
            }
          })
        },
        // 车系下拉
        carSeriesDrop(item, index) {
          if(this.maoriForecastCarList[index].isShowIcon == 0){
            this.$set(item, 'isShowIcon', 1)
          }else if(this.index != index && this.maoriForecastCarList[this.index].isShowIcon == 1){
            this.$set( this.maoriForecastCarList[this.index], 'isShowIcon', 0)
          }else{
            this.$set(item, 'isShowIcon', 0)
          }
          this.index = index;
          if(this.maoriForecastCarList[this.index].detailSeries.length != 0) {
            return
          }
          let params = {
            dateVersion: this.monthValues,       //日期时间
            storeCode: this.query.storeCode,     //门店编码
            selectFlag: 0,                       //查询标识
            carConditionFlag: 3,                 //维度标识
            seriesCode: this.maoriForecastCarList[index].seriesCode  //车系
          }
          api.MaoriForecast.queryMaoriForecastInfo(params, (res) => {
            if (res.data.code === 'success' && res.data.obj) {

                let maoriForecastList = res.data.obj;
                maoriForecastList.forEach(item => {
                  if(item.detailMap) {
                    this.maoriForecastCarList[this.index].detailSeries.push(item);
                  }
                })

            }
          })
        },
        toPercentage(val){
          if(Number(val) < 10000 && Number(val) > -10000 ){
            return val
          }else{
            return (Number(val) / 1000).toFixed(2)
          }
        }
    },
    computed: {
      // 预计月底库存台数 = 上月底在售库存 + 在途库存 - 上月零售数量 - 批售数量，若为负数则取零
      MaoriExpectEndMonthAvailableSaleNumber: {
        get() {
          var MaoriExpectEndMonthAvailableSaleNumber = Number(this.MaoriLastMonthAvailableSaleInStock) + Number(this.MaoriLastMonthOnTheWayStock) - Number(this.MaoriLastMonthSalesNumber) - Number(this.MaoriLastMonthBatchSalesNumber);
          // 理论上预计月底库存台数不可能小于零，如果小于0，则默认设置为0
          if(MaoriExpectEndMonthAvailableSaleNumber > 0) {
            return MaoriExpectEndMonthAvailableSaleNumber;
          } else {
            return 0;
          }
        },
        set() {}
      },
      // 预计本月可售库存周转天数 = 30 * 库存台数（上月底在售 + 上月底在途）/ 本月预计销量（过去三个月平均开票数）;历史数据不满三个月时，按实际取，没有用45天
      MaoriExpectCurrentMonthAvailableSaleStockCycle: {
        get() {
          return 30 * (Number(this.MaoriLastMonthAvailableSaleInStock) + Number(this.MaoriLastMonthOnTheWayStock)) / 45;
        },
        set(val) {}
      },
      // 本月库存安全销售目标 = 30 * 本月底预计库存台数 / 目标本月可售库存周转天数
      MaoriCurrentMonthStockSecuritySalesTarget: {
        get() {
          return 30 * Number(this.MaoriExpectEndMonthAvailableSaleNumber) / Number(this.MaoriTargetCurrentMonthAvailableSaleStockCycle);
        },
        set() {}
      },
      // 本月新增订单数目标 = 进店线索数目标 * 进店线索订单率目标
      MaoriCurrentMonthAddOrderNumTarget: {
        get() {
          return Number(this.MaoriCurrentMonthInStoreLeadsNumTarget) * Number(this.MaoriCurrentMonthInStoreLeadsOrderRateTarget) / 100;
        },
        set(val) {}
      },
      // 展厅零售目标 = （留存订单+新增订单）* 订单零售率
      MaoriExhibitionHallRetailTarget: {
        get() {
          return (Number(this.MaoriLastMonthLeftOverOrderNum) + Number(this.MaoriCurrentMonthAddOrderNumTarget)) * Number(this.MaoriCurrentMonthOrderRetailRateTarget) / 100;
        },
        set() {}
      },
      // 本月销售目标 = 展厅零售目标和厂家SI销售目标两个的较大值
      MaoriCurrentMonthSalesTarget: {
        get() {
          // 返回两者之中较大的数字
          return Math.max(Number(this.MaoriExhibitionHallRetailTarget),Number(this.MaoriFactorSiSalesTarget))
        },
        set(val) {}
      },
      // 二级批售配额 = 本月销售目标 - 展厅零售目标
      MaoriTwoLevelSales: {
        get() {
          return Number(this.MaoriCurrentMonthSalesTarget) - Number(this.MaoriExhibitionHallRetailTarget);
        },
        set(val) {}
      },
      // 预计本月第一档零售GP = 目标零售限价金额-平均成本
      MaoriExpectRetailGP1: {
        get() {
          return Number(this.MaoriTargetRetailPrice) - Number(this.MaoriAveragePurchaseCost);
        },
        set(val) {}
      },
      // 预计本月第一档批售GP = 目标批售限价金额-平均成本）
      MaoriExpectWholesaleGP1: {
        get() {
          return Number(this.MaoriTargetWholesalePrice) - Number(this.MaoriAveragePurchaseCost);
        },
        set(val) {}
      },
      // 预计本月第一档GP/台 = （批售GP * 批售配额 + 零售GP *（销售目标 - 批售配额））/台数
      MaoriExpectCurrentMonthGP1: {
        get() {
          return (this.MaoriExpectRetailGP1 * (this.MaoriCurrentMonthSalesTarget - Number(this.MaoriTwoLevelSales)) + this.MaoriExpectWholesaleGP1 * Number(this.MaoriTwoLevelSales)) / Number(this.MaoriCurrentMonthSalesTarget);
        },
        set() {}
      },
      // 预计本月第二档GP/台 = 预计本月第一档GP/台 + 赠品/台(目标)
      MaoriExpectCurrentMonthGP2: {
        get() {
          return this.MaoriExpectCurrentMonthGP1 + Number(this.MaoriGiftTarget) / 1000;
        },
        set() {}
      },
      // 预计本月第三档GP/台 = 预计本月第二档GP/台 + 赠品/台(目标)
      MaoriExpectCurrentMonthGP4: {
        get() {
          return this.MaoriExpectCurrentMonthGP2 + Number(this.MaoriEstimateFactorySi);
        },
        set() {}
      },
      // 预计本月第三档GP% = 预计本月第三档GP/台 / 目标零售限价金额/台
      MaoriExpectCurrentMonthGP4Rate: {
        get() {
          return (this.MaoriExpectCurrentMonthGP4 / Number(this.MaoriTargetRetailPrice))*100;
        },
        set() {}
      },
      // 金融毛利 = 展厅销售台数目标*渗透率*金融毛利/台，初始化为上月
      MaoriFinancialGPTarget: {
        get() {
          return Number(this.MaoriExhibitionHallRetailTarget) * Number(this.MaoriFinancialPermeabilityTarget) / 100 * Number(this.MaoriAvgFinancialProfiTarget);
        },
        set() {}
      },
      // 保险毛利 = 展厅销售台数目标*渗透率*保毛利/台，初始化为上月
      MaoriInsuranceGPTarget: {
        get() {
          return Number(this.MaoriExhibitionHallRetailTarget) * Number(this.MaoriInsurancePermeabilityTarget) / 100 * Number(this.MaoriAvgInsuranceProfiTarget);
        },
        set() {}
      },
      // 精品毛利 = 展厅销售台数目标*精品渗透率*精品毛利/台，初始化为上月
      MaoriSkuGPTotalTarget: {
        get() {
          return Number(this.MaoriExhibitionHallRetailTarget) * Number(this.MaoriSkuPermeabilityTarget) / 100 * Number(this.MaoriSkuGPTarget);
        },
        set() {}
      },
      // 新车延保毛利 = 展厅销售台数目标*新车延保渗透率*延保毛利/台，初始化为上月
      MaoriNewCarYBGPTarget: {
        get() {
          return Number(this.MaoriExhibitionHallRetailTarget) * Number(this.MaoriNewCarYBPermeabilityTarget) / 100 * Number(this.MaoriYBGPTarget);
        },
        set() {}
      },
      // 其他业务毛利 = 展厅销售台数目标*其他业务渗透率*其他毛利/，初始化为上月台
      MaoriOtherBusinessGPTarget: {
        get() {
          return Number(this.MaoriExhibitionHallRetailTarget) * Number(this.MaoriOtherBusinessPermeabilityTarget) / 100 * Number(this.MaoriOtherGPTarget);
        },
        set() {}
      },
      //衍生业务毛利/台 = 金融毛利/台(目标) + 保险毛利/台(目标) + 精品毛利/台(目标) + 新车延保毛利/台(目标) + 其他毛利/台(目标)
      MaoriDerivationBusinessGPTarget: {
        get() {
          return (Number(this.MaoriAvgFinancialProfiTarget) + Number(this.MaoriAvgInsuranceProfiTarget) + Number(this.MaoriSkuGPTarget) + Number(this.MaoriYBGPTarget) + Number(this.MaoriOtherGPTarget)) / 1000;
        },
        set() {}
      },
      // 衍生业务毛利 = 金融毛利(目标) + 保险毛利(目标) + 精品毛利(目标) + 新车延保毛利(目标) + 其他毛利(目标)
      MaoriDerivationBusinessTotalGPTarget: {
        get() {
          return (Number(this.MaoriFinancialGPTarget) + Number(this.MaoriInsuranceGPTarget) + Number(this.MaoriSkuGPTotalTarget) + Number(this.MaoriNewCarYBGPTarget) + Number(this.MaoriOtherBusinessGPTarget)) / 1000;
        },
        set() {}
      },
      // T.GP合计 = 本月第三档GP% * 本月销售目标 + 衍生业务毛利(目标) + 预估年度返利 / 12
      MaoriTGPTotalTarget: {
        get() {
          return Number(this.MaoriExpectCurrentMonthGP4Rate) * Number(this.MaoriCurrentMonthSalesTarget) + Number(this.MaoriDerivationBusinessTotalGPTarget) + Number(this.MaoriEstimateYearRebate) / 12;
        },
        set() {}
      },
      // 月T.GP目标达成率 = (预计T.GP + 所选车系车型T.GP合计差值) / 月T.GP目标总值
      monthTgpRate: {
        get() {
          var MaoriTGPTotalTarget;
          const that = this;
          if(this.grossSetList.length != 0) {
            MaoriTGPTotalTarget = this.grossSetList[0].detailMap.MaoriTGPTotalTarget;
            if(Number(MaoriTGPTotalTarget) != Number(that.MaoriTGPTotalTarget)) {
              // 如果数据有变化，则按照前端的公式进行公式计算
              return (((Number(this.instrumentID.percent)  + (Number(this.grossSetList[0].detailMap.MaoriTGPTotalTarget) - Number(this.MaoriTGPTotalTarget) * 1000)) / (Number(this.MaoriReportData.targetGpValue))) * 100).toFixed(1);
            } else {
              // 否则按照之前页面的公式计算月T.GP目标达成率
              return ((this.instrumentID.percent / this.instrumentID.target) * 100).toFixed(1);
            }
          }
        },
        set() {}
      }
    },
    watch: {
      // 时间校验设置
      monthValue: {
        handler(newVal, oldVal) {
          let monthsDate = new Date();
          const that = this;
          // 年份相同的情况下，比较月份,月份小于当前月的时候,禁止编辑
          if(newVal.getFullYear() == monthsDate.getFullYear()) {
            if((newVal.getMonth() + 1) < (monthsDate.getMonth() + 1)) {
              that.showEditTable = true;
              that.editStoretarget = false;
            } else if ((newVal.getMonth() + 1) > (monthsDate.getMonth() + 2)) {
              that.showEditTable = true;
              that.editStoretarget = false;
            } else {
              that.showEditTable = false;
              that.editStoretarget = true;
            }
          }
          // 年份不相同的情况下,比较月份,比较是否需要禁止编辑
          if(newVal.getFullYear() < monthsDate.getFullYear()) {
            that.showEditTable = true;
            that.editStoretarget = false;
          } else if (newVal.getFullYear() > monthsDate.getFullYear()) {
            if((monthsDate.getMonth() + 1) == 12) {
              if((newVal.getMonth() + 1) != 1) {
                that.showEditTable = true;
                that.editStoretarget = false;
              } else {
                that.showEditTable = false;
                that.editStoretarget = true;
              }
            }
          }
        }
      },
      // 目标本月可售库存周转天数
      MaoriTargetCurrentMonthAvailableSaleStockCycle: {
        handler(newVal,oldVal) {
          const that = this;
          // 多车系的情况下
          if(this.grossSetList.length >= 2) {
            var divisor = that.grossSetList.length;
            var integer = parseInt(Number(newVal) / divisor);
            var remainder = Number(newVal) % divisor;
            for(var i = 0; i < that.grossSetList.length; i ++) {
              that.maoRiRate[that.grossSetList[i].maoriCode] = integer / Number(newVal);
              that.maoRiRate[that.grossSetList[that.grossSetList.length - 1].maoriCode] = (Number(newVal) - integer * (that.grossSetList.length - 1)) / Number(newVal);
            }
          }
        },
        deep: true
      },
      // 本月进店线索数目标
      MaoriCurrentMonthInStoreLeadsNumTarget: {
        handler(newVal, oldVal) {
          const that = this;
          // 判断是单车系还是多车系
          // 单车系的情况下
          if(this.grossSetList.length == 1) {
            that.MaoriCurrentMonthInStoreLeadsNumTarget = newVal;
          }
          // 多车系的情况下
          if(this.grossSetList.length >= 2) {
            var divisor = that.grossSetList.length;
            var integer = parseInt(Number(newVal) / divisor);
            var remainder = Number(newVal) % divisor;
            for(var i = 0; i < that.grossSetList.length; i ++) {
              that.maoRiRate[that.grossSetList[i].maoriCode] = integer / Number(newVal);
              that.maoRiRate[that.grossSetList[that.grossSetList.length - 1].maoriCode] = (Number(newVal) - integer * (that.grossSetList.length - 1)) / Number(newVal);
            }
          }
        },
        deep: true
      },
      // 本月进店线索订单率目标
      MaoriCurrentMonthInStoreLeadsOrderRateTarget: {
        handler(newVal, oldVal) {
          const that = this;
          that.MaoriCurrentMonthInStoreLeadsOrderRateTarget = newVal;
          // 判断是单车系还是多车系
          // 单车系的情况下
          if(this.grossSetList.length == 1) {
            that.MaoriCurrentMonthInStoreLeadsOrderRateTarget = newVal;
          }
          // 多车系的情况下
          if(this.grossSetList.length >= 2) {
            var divisor = that.grossSetList.length;
            var integer = parseInt(Number(newVal) / divisor);
            var remainder = Number(newVal) % divisor;
            for(var i = 0; i < that.grossSetList.length; i ++) {
              that.maoRiRate[that.grossSetList[i].maoriCode] = integer / Number(newVal);
              that.maoRiRate[that.grossSetList[that.grossSetList.length - 1].maoriCode] = (Number(newVal) - integer * (that.grossSetList.length - 1)) / Number(newVal);
            }
          }
        },
        deep: true
      },
      // 本月订单零售率目标
      MaoriCurrentMonthOrderRetailRateTarget: {
        handler(newVal, oldVal) {
          const that = this;
          that.MaoriCurrentMonthOrderRetailRateTarget = newVal;
          // 判断是单车系还是多车系
          // 单车系的情况下
          if(this.grossSetList.length == 1) {
            that.MaoriCurrentMonthOrderRetailRateTarget = newVal;
          }
          // 多车系的情况下
          if(this.grossSetList.length >= 2) {
            var divisor = that.grossSetList.length;
            var integer = parseInt(Number(newVal) / divisor);
            var remainder = Number(newVal) % divisor;
            for(var i = 0; i < that.grossSetList.length; i ++) {
              that.maoRiRate[that.grossSetList[i].maoriCode] = integer / Number(newVal);
              that.maoRiRate[that.grossSetList[that.grossSetList.length - 1].maoriCode] = (Number(newVal) - integer * (that.grossSetList.length - 1)) / Number(newVal);
            }
          }
        },
        deep: true
      },
      // 厂家SI销售目标
      MaoriFactorSiSalesTarget: {
        handler(newVal, oldVal) {
          const that = this;
          that.MaoriFactorSiSalesTarget = newVal;
          // 判断是单车系还是多车系
          // 单车系的情况下
          if(this.grossSetList.length == 1) {
            that.MaoriFactorSiSalesTarget = newVal;
          }
          // 多车系的情况下
          if(this.grossSetList.length >= 2) {
            var divisor = that.grossSetList.length;
            var integer = parseInt(Number(newVal) / divisor);
            var remainder = Number(newVal) % divisor;
            for(var i = 0; i < that.grossSetList.length; i ++) {
              that.maoRiRate[that.grossSetList[i].maoriCode] = integer / Number(newVal);
              that.maoRiRate[that.grossSetList[that.grossSetList.length - 1].maoriCode] = (Number(newVal) - integer * (that.grossSetList.length - 1)) / Number(newVal);
            }
          }
        },
        deep: true
      },
      // 目标零售限价进额
      MaoriTargetRetailPrice: {
        handler(newVal, oldVal) {
          const that = this;
          that.MaoriTargetRetailPrice = newVal;
          // 判断是单车系还是多车系
          // 单车系的情况下
          if(this.grossSetList.length == 1) {
            that.MaoriTargetRetailPrice = newVal;
          }
          // 多车系的情况下
          if(this.grossSetList.length >= 2) {
            var divisor = that.grossSetList.length;
            var integer = parseInt(Number(newVal) / divisor);
            var remainder = Number(newVal) % divisor;
            for(var i = 0; i < that.grossSetList.length; i ++) {
              that.maoRiRate[that.grossSetList[i].maoriCode] = integer / Number(newVal);
              that.maoRiRate[that.grossSetList[that.grossSetList.length - 1].maoriCode] = (Number(newVal) - integer * (that.grossSetList.length - 1)) / Number(newVal);
            }
          }
        },
        deep: true
      },
      // 目标批售限价金额
      MaoriTargetWholesalePrice: {
        handler(newVal, oldVal) {
          const that = this;
          that.MaoriTargetWholesalePrice = newVal;
          // 判断是单车系还是多车系
          // 单车系的情况下
          if(this.grossSetList.length == 1) {
            that.MaoriTargetWholesalePrice = newVal;
          }
          // 多车系的情况下
          if(this.grossSetList.length >= 2) {
            var divisor = that.grossSetList.length;
            var integer = parseInt(Number(newVal) / divisor);
            var remainder = Number(newVal) % divisor;
            for(var i = 0; i < that.grossSetList.length; i ++) {
              that.maoRiRate[that.grossSetList[i].maoriCode] = integer / Number(newVal);
              that.maoRiRate[that.grossSetList[that.grossSetList.length - 1].maoriCode] = (Number(newVal) - integer * (that.grossSetList.length - 1)) / Number(newVal);
            }
          }
        },
        deep: true
      },
      // 上月赠品/台
      MaoriGiftTarget: {
        handler(newVal, oldVal) {
          const that = this;
          that.MaoriGiftTarget = newVal;
          // 判断是单车系还是多车系
          // 单车系的情况下
          if(this.grossSetList.length == 1) {
            that.MaoriGiftTarget = newVal;
          }
          // 多车系的情况下
          if(this.grossSetList.length >= 2) {
            var divisor = that.grossSetList.length;
            var integer = parseInt(Number(newVal) / divisor);
            var remainder = Number(newVal) % divisor;
            for(var i = 0; i < that.grossSetList.length; i ++) {
              that.maoRiRate[that.grossSetList[i].maoriCode] = integer / Number(newVal);
              that.maoRiRate[that.grossSetList[that.grossSetList.length - 1].maoriCode] = (Number(newVal) - integer * (that.grossSetList.length - 1)) / Number(newVal);
            }
          }
        },
        deep: true
      },
      // 预估厂家SI
      MaoriEstimateFactorySi: {
        handler(newVal, oldVal) {
          const that = this;
          that.MaoriEstimateFactorySi = newVal;
          // 判断是单车系还是多车系
          // 单车系的情况下
          if(this.grossSetList.length == 1) {
            that.MaoriEstimateFactorySi = newVal;
          }
          // 多车系的情况下
          if(this.grossSetList.length >= 2) {
            var divisor = that.grossSetList.length;
            var integer = parseInt(newVal / divisor);
            var remainder = newVal % divisor;
            for(var i = 0; i < that.grossSetList.length; i ++) {
              that.maoRiRate[that.grossSetList[i].maoriCode] = integer / newVal;
              that.maoRiRate[that.grossSetList[that.grossSetList.length - 1].maoriCode] = (newVal - integer * (that.grossSetList.length - 1)) / newVal;
            }
          }
        },
        deep: true
      },
      // 预估年度返利
      MaoriEstimateYearRebate: {
        handler(newVal, oldVal) {
          const that = this;
          that.MaoriEstimateYearRebate = newVal;
          // 判断是单车系还是多车系
          // 单车系的情况下
          if(this.grossSetList.length == 1) {
            that.MaoriEstimateYearRebate = newVal;
          }
          // 多车系的情况下
          if(this.grossSetList.length >= 2) {
            var divisor = that.grossSetList.length;
            var integer = parseInt(Number(newVal) / divisor);
            var remainder = Number(newVal) % divisor;
            for(var i = 0; i < that.grossSetList.length; i ++) {
              that.maoRiRate[that.grossSetList[i].maoriCode] = integer / Number(newVal);
              that.maoRiRate[that.grossSetList[that.grossSetList.length - 1].maoriCode] = (Number(newVal) - integer * (that.grossSetList.length - 1)) / Number(newVal);
            }
          }
        },
        deep: true
      },
      // 金融渗透率
      MaoriFinancialPermeabilityTarget: {
        handler(newVal, oldVal) {
          const that = this;
          that.MaoriFinancialPermeabilityTarget = newVal;
          // 判断是单车系还是多车系
          // 单车系的情况下
          if(this.grossSetList.length == 1) {
            that.MaoriFinancialPermeabilityTarget = newVal;
          }
          // 多车系的情况下
          if(this.grossSetList.length >= 2) {
            var divisor = that.grossSetList.length;
            var integer = parseInt(Number(newVal) / divisor);
            var remainder = Number(newVal) % divisor;
            for(var i = 0; i < that.grossSetList.length; i ++) {
              that.maoRiRate[that.grossSetList[i].maoriCode] = integer / Number(newVal);
              that.maoRiRate[that.grossSetList[that.grossSetList.length - 1].maoriCode] = (Number(newVal) - integer * (that.grossSetList.length - 1)) / Number(newVal);
            }
          }
        },
        deep: true
      },
      // 金融毛利/台
      MaoriAvgFinancialProfiTarget: {
        handler(newVal, oldVal) {
          const that = this;
          that.MaoriAvgFinancialProfiTarget = newVal;
          // 判断是单车系还是多车系
          // 单车系的情况下
          if(this.grossSetList.length == 1) {
            that.MaoriAvgFinancialProfiTarget = newVal;
          }
          // 多车系的情况下
          if(this.grossSetList.length >= 2) {
            var divisor = that.grossSetList.length;
            var integer = parseInt(Number(newVal) / divisor);
            var remainder = Number(newVal) % divisor;
            for(var i = 0; i < that.grossSetList.length; i ++) {
              that.maoRiRate[that.grossSetList[i].maoriCode] = integer / Number(newVal);
              that.maoRiRate[that.grossSetList[that.grossSetList.length - 1].maoriCode] = (Number(newVal) - integer * (that.grossSetList.length - 1)) / Number(newVal);
            }
          }
        },
          deep: true
      },
      // 保险渗透率
      MaoriInsurancePermeabilityTarget: {
        handler(newVal, oldVal) {
          const that = this;
          that.MaoriInsurancePermeabilityTarget = newVal;
          // 判断是单车系还是多车系
          // 单车系的情况下
          if(this.grossSetList.length == 1) {
            that.MaoriInsurancePermeabilityTarget = newVal;
          }
          // 多车系的情况下
          if(this.grossSetList.length >= 2) {
            var divisor = that.grossSetList.length;
            var integer = parseInt(Number(newVal) / divisor);
            var remainder = Number(newVal) % divisor;
            for(var i = 0; i < that.grossSetList.length; i ++) {
              that.maoRiRate[that.grossSetList[i].maoriCode] = integer / Number(newVal);
              that.maoRiRate[that.grossSetList[that.grossSetList.length - 1].maoriCode] = (Number(newVal) - integer * (that.grossSetList.length - 1)) / Number(newVal);
            }
          }
        },
        deep: true
      },
      // 保险毛利/台
      MaoriAvgInsuranceProfiTarget: {
        handler(newVal, oldVal) {
          const that = this;
          that.MaoriAvgInsuranceProfiTarget = newVal;
          // 判断是单车系还是多车系
          // 单车系的情况下
          if(this.grossSetList.length == 1) {
            that.MaoriAvgInsuranceProfiTarget = newVal;
          }
          // 多车系的情况下
          if(this.grossSetList.length >= 2) {
            var divisor = that.grossSetList.length;
            var integer = parseInt(Number(newVal) / divisor);
            var remainder = Number(newVal) % divisor;
            for(var i = 0; i < that.grossSetList.length; i ++) {
              that.maoRiRate[that.grossSetList[i].maoriCode] = integer / Number(newVal);
              that.maoRiRate[that.grossSetList[that.grossSetList.length - 1].maoriCode] = (Number(newVal) - integer * (that.grossSetList.length - 1)) / Number(newVal);
            }
          }
        },
        deep: true
      },
      // 精品渗透率
      MaoriSkuPermeabilityTarget: {
        handler(newVal, oldVal) {
          const that = this;
          that.MaoriSkuPermeabilityTarget = newVal;
          // 判断是单车系还是多车系
          // 单车系的情况下
          if(this.grossSetList.length == 1) {
            that.MaoriSkuPermeabilityTarget = newVal;
          }
          // 多车系的情况下
          if(this.grossSetList.length >= 2) {
            var divisor = that.grossSetList.length;
            var integer = parseInt(Number(newVal) / divisor);
            var remainder = Number(newVal) % divisor;
            for(var i = 0; i < that.grossSetList.length; i ++) {
              that.maoRiRate[that.grossSetList[i].maoriCode] = integer / Number(newVal);
              that.maoRiRate[that.grossSetList[that.grossSetList.length - 1].maoriCode] = (Number(newVal) - integer * (that.grossSetList.length - 1)) / Number(newVal);
            }
          }
        },
        deep: true
      },
      // 精品毛利/台
      MaoriSkuGPTarget: {
        handler(newVal, oldVal) {
          const that = this;
          that.MaoriSkuGPTarget = newVal;
          // 判断是单车系还是多车系
          // 单车系的情况下
          if(this.grossSetList.length == 1) {
            that.MaoriSkuGPTarget = newVal;
          }
          // 多车系的情况下
          if(this.grossSetList.length >= 2) {
            var divisor = that.grossSetList.length;
            var integer = parseInt(Number(newVal) / divisor);
            var remainder = Number(newVal) % divisor;
            for(var i = 0; i < that.grossSetList.length; i ++) {
              that.maoRiRate[that.grossSetList[i].maoriCode] = integer / Number(newVal);
              that.maoRiRate[that.grossSetList[that.grossSetList.length - 1].maoriCode] = (Number(newVal) - integer * (that.grossSetList.length - 1)) / Number(newVal);
            }
          }
        },
        deep: true
      },
      // 新车延保渗透率
      MaoriNewCarYBPermeabilityTarget: {
        handler(newVal, oldVal) {
          const that = this;
          that.MaoriNewCarYBPermeabilityTarget = newVal;
          // 判断是单车系还是多车系
          // 单车系的情况下
          if(this.grossSetList.length == 1) {
            that.MaoriNewCarYBPermeabilityTarget = newVal;
          }
          // 多车系的情况下
          if(this.grossSetList.length >= 2) {
            var divisor = that.grossSetList.length;
            var integer = parseInt(Number(newVal) / divisor);
            var remainder = Number(newVal) % divisor;
            for(var i = 0; i < that.grossSetList.length; i ++) {
              that.maoRiRate[that.grossSetList[i].maoriCode] = integer / Number(newVal);
              that.maoRiRate[that.grossSetList[that.grossSetList.length - 1].maoriCode] = (Number(newVal) - integer * (that.grossSetList.length - 1)) / Number(newVal);
            }
          }
        },
        deep: true
      },
      // 延保毛利
      MaoriYBGPTarget: {
        handler(newVal, oldVal) {
          const that = this;
          that.MaoriNewCarYBGPTarget = newVal;
          // 判断是单车系还是多车系
          // 单车系的情况下
          if(this.grossSetList.length == 1) {
            that.MaoriNewCarYBGPTarget = newVal;
          }
          // 多车系的情况下
          if(this.grossSetList.length >= 2) {
            var divisor = that.grossSetList.length;
            var integer = parseInt(Number(newVal) / divisor);
            var remainder = Number(newVal) % divisor;
            for(var i = 0; i < that.grossSetList.length; i ++) {
              that.maoRiRate[that.grossSetList[i].maoriCode] = integer / Number(newVal);
              that.maoRiRate[that.grossSetList[that.grossSetList.length - 1].maoriCode] = (Number(newVal) - integer * (that.grossSetList.length - 1)) / Number(newVal);
            }
          }
        },
        deep: true
      },
      // 其他毛利渗透率
      MaoriOtherBusinessPermeabilityTarget: {
        handler(newVal, oldVal) {
          const that = this;
          that.MaoriOtherBusinessPermeabilityTarget = newVal;
          // 判断是单车系还是多车系
          // 单车系的情况下
          if(this.grossSetList.length == 1) {
            that.MaoriOtherBusinessPermeabilityTarget = newVal;
          }
          // 多车系的情况下
          if(this.grossSetList.length >= 2) {
            var divisor = that.grossSetList.length;
            var integer = parseInt(Number(newVal) / divisor);
            var remainder = Number(newVal) % divisor;
            for(var i = 0; i < that.grossSetList.length; i ++) {
              that.maoRiRate[that.grossSetList[i].maoriCode] = integer / Number(newVal);
              that.maoRiRate[that.grossSetList[that.grossSetList.length - 1].maoriCode] = (Number(newVal) - integer * (that.grossSetList.length - 1)) / Number(newVal);
            }
          }
        },
        deep: true
      },
      // 其他毛利/台
      MaoriOtherGPTarget: {
        handler(newVal, oldVal) {
          const that = this;
          that.MaoriOtherGPTarget = newVal;
          // 判断是单车系还是多车系
          // 单车系的情况下
          if(this.grossSetList.length == 1) {
            that.MaoriOtherGPTarget = newVal;
          }
          // 多车系的情况下
          if(this.grossSetList.length >= 2) {
            var divisor = that.grossSetList.length;
            var integer = parseInt(Number(newVal) / divisor);
            var remainder = Number(newVal) % divisor;
            for(var i = 0; i < that.grossSetList.length; i ++) {
              that.maoRiRate[that.grossSetList[i].maoriCode] = integer / Number(newVal);
              that.maoRiRate[that.grossSetList[that.grossSetList.length - 1].maoriCode] = (Number(newVal) - integer * (that.grossSetList.length - 1)) / Number(newVal);
            }
          }
        },
        deep: true
      }
    },
    components: {
        Areaqueryshop,
        IrisCar,
        Pagination,
        instrumentPanel
    },
    filters: {
      upwardCeil(val) {
        return Math.ceil(val);
      }
    }
}
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 576px){
#gross{
   & /deep/ .modal-dialog{
        max-width: 100% !important;
        max-height: 100% !important;
        margin: 6px !important;
        margin-bottom: 24px !important;
    }
}
#gross {
  & /deep/ .modal-header {
        padding: 0 !important;
        padding-right: 4px;
        border: 0 !important;
        margin: 0 !important;
    }
}
#gross {
  & /deep/ .modal-footer {
        padding: 6px !important;
        border: 0 !important;

    }
}
#gross {
    & /deep/ .modal-body {
          padding: 0 !important;
          margin: 0 !important;
          margin: 0 !important;
      }
}
#gross {
  & /deep/ .modal {
          padding: 0 !important;
      }
}
}
.tgp {
  padding-top: 15px;
  border: 1px solid #B7CFD6;
  text-align: center;
  width: 100%;
  height: 100%;
}
.tapVal {
  font-size: 24px;
  font-weight: 600;
}
.tapDetail {
  border: 1px solid #B7CFD6;
  padding-left: 40px;
  padding-top: 20px;
  padding-right: 30px;
  padding-bottom: 20px;
}
.whiteTGP.tgpTitle{
    position: relative;
    background: #fff;
    .modBtn {
    width: 80%;
    padding-top: 10px;
    padding-bottom: 10px;
    background: #567EB8;
    border-radius: 5px;
    color: white;
    text-align: center;
    position: absolute;
    cursor: pointer;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #b7cfd6;
  }

}
.tgpTitle {
  display: inline-block;
  width: 100%;
  background-color: #f6f9ff;
  margin-right: 10px;
  margin-left: 10px;
  padding: 10px;
  padding-bottom: 30px;
  color: #244b7e;
  span{
      display: inline-block;
  }
  .unit{
      text-align: right;
      width: 20%;
      font-weight: 600;
  }
  .editShow{
      width: 100%;
      span:nth-child(1){
        display: inline-block;
        text-align: center;
        font-size: 25px;
        width: 70%;
      }
      span:nth-child(2){
        display: inline-block;
        width: 25%;
      }
    }
    input {
      width: 100%;
      font-size: 25px;
      text-align: center;
      height: 38px;
    }

  .gpVal{
      width: 70%;
      font-weight: 600;
      font-size: 25px;
      text-align: center;
      color: #1B5DE5;
      input{
          width: 100%;
          font-weight: 600;
          font-size: 25px;
          text-align: center;
      }
  }
}
.tgpbottom {
  margin-top: 20px;
}
.edit {
  margin-top: 4px;
}
.editInfo {
  text-align: center;
}
.tableList {
  margin-left: 5px;
  margin-right: 5px;
  tbody {
    border-top: 1px solid #c2cfd6;
  }
}
.left-table {
  width: 28%;
}
.right-table {
  width: 72%;
  overflow-x: scroll;
}
.right-table table th {
  white-space: nowrap;
  padding: 0.3rem 0.75rem !important;
}
.right-table table td {
  white-space: nowrap;
  padding: 0.3rem 0.75rem !important;
}
.tableList table th {
  text-align: center;
  height: 38px;
  font-size: 12px;
  padding: 0.3rem 0.75rem !important;
}
.tableList table td {
  text-align: center;
  height: 38px;
  font-size: 12px;
  padding: 0.3rem 0.75rem !important;
  border: 1px solid #BDCFD6;
}
.tableList .carSeries th {
  line-height: 66px !important;
  font-size: 14px;
}
.tableList table .profitTitle {
  font-size: 14px;
  padding-bottom: 8px !important;
}
.tableList table .grossProfitTitle th {
  font-size: 14px;
  padding-bottom: 8px !important;
}
.carTitle {
  height: 62px;
  padding-top: 20px;
}
.carTitles {
  height: 30px;
}
.myChart {
  width: 100%;
  height: 100px;
}
.importList {
  margin-bottom: 10px;
  margin-left: 4px;
}
.editModel {
  margin-left: 16px;
}
.exportData {
  margin-left: 5px;
}
.modal-left-table {
  width: 49%;
  margin-left: 16px;
  font-size: 12px;
  margin-top: 0;
  margin-bottom: 0;
  padding-bottom: 4px;
}
.modal-left-table table {
  margin-bottom: 6px;
  th {
    text-align: left;
  }
}
.modal-right-table {
  margin-left: 7px;
  width: 48%;
  font-size: 12px;
  margin-top: 0;
  margin-bottom: 0;
  padding-bottom: 4px;
}
.modal-right-table table {
  margin-bottom: 4px;
  th {
    text-align: left;
  }
}
.modal-table {
  padding: 0 15px;
  margin-top: 2px;
  table {
    border-top: 0 !important;
  }
}
.modal-table th,td {
  line-height: 0;
  text-align: center;
}
.modal-table-title {
  background-color: #ECF2F8;
  td {
    background-color: #ECF2F8;
  }
  th {
    background-color: #ECF2F8;
  }
}
.editableTitle {
  background-color: #4D6CEA;
}
.modal-title {
  width: 48%;
  margin-left: 24px;
  height: 50px;
}
.modal-head {
  text-align: center;
  font-size: 16px;
}
.carTotal {
  margin-left: 15px;
  padding: 0;
}
.carTitle {
  margin-top: 5px;
}
.keep {
  margin-left: 22px;
}
.tips {
  margin-bottom: 10px;
  color: red;
  margin-top: 4px;
}
.percent {
  color: red;
}
.modal-table-numTitle td {
  height: 30px;
  input {
    text-align: center;
    margin: 0;
    margin: 0;
  }
  .editableNum {
    width: 60px;
    margin: 0;
    margin-right: 3px;
    padding: 0;
    text-align: center;
  }
}
.dropDownCar {
  cursor: pointer;
  height: 38px !important;
  font-size: 12px;
  overflow: hidden;
  .modelName {
    display: inline-block;
    width: 100%;
    height: 27px;
    line-height: 27px;
    overflow: hidden;
  }
}
.reportInfo {
  margin-top: 10px;
}
.confirm {
  margin: 10px 0;
  padding-right: 8px;
}
.table-bordered thead th, .table-bordered thead td {
  border-bottom-width: 1px;
}
.custom-control {
  margin: 0;
  padding-left: 0.8rem;
}
.carIcon {
  width: 20px;
  height: 15px;
  margin: 0;
  padding: 0;
  margin-right: 4px;
}
.profit {
  margin-bottom: 0 !important;
}
.grossProfit td {
  color: #797373;
  font-weight: 600;
}
.grossTitle {
  text-align: center;
  font-size: 20px;
  .grossLeftTitle {
    width: 30%;
    padding-bottom: 20px;
    padding-top: 10px;
    .monthTgpRate {
      color: #F04134;
      font-weight: 600;
      font-size: 24px;
    }
  }
  .grossCenterTitle {
    width: 30%;
    padding-top: 10px;
    .monthTgpNum {
      color: black;
      font-size: 24px;
      font-weight: 600;
    }
  }
  .grossRightTitle {
    width: 40%;
  }
}
.carInfoTitle {
  margin-left: 0;
  font-size: 18px;
  width: 100%;
  color: #9F9FA1;
  background-color: #F3F4F9;
  .carLeftTitle {
    font-size: 16px;
    width: 70%;
    border-right: 1px solid #BDCFD6;
    border-bottom: 1px solid #BDCFD6;
    border-top: 1px solid #BDCFD6;
    height: 59px;
    padding: 5px;
    padding-left: 18px;
    .carSeries {
      color: #1B77F0;
      font-size: 14px;
    }
  }
  .carRightTitle {
    width: 30%;
    height: 59px;
    border-bottom: 1px solid #BDCFD6;
    border-top: 1px solid #BDCFD6;
    padding: 5px;
    font-size: 16px;
    color: #9F9FA1;
    .tgpTotalTitle {
      margin-left: 100px;
    }
    .tgpTotal {
      font-size: 20px;
      margin-left: 100px;
      color: #797373;
      font-weight: 600;
    }
  }
}
.modal-table {
  padding: 0 !important;
  margin: 0 !important;
  .modal-table-numTitle td {
    padding: 0.20rem 0;
  }
  .monthStock td {
    height: 24px;
  }
}
.noData {
  text-align: left !important;
}
.leftCarTitle  {
  margin-top: 6px;
}
.carSeriesDrop td {
  width: 20px;
  .carIndex {
    margin-right: 3px;
  }
}
</style>
