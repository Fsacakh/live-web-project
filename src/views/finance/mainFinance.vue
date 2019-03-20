<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <b-card header="查询">
          <div class="my-1 row">
            <div class="col-md-6">
              <b-form-fieldset horizontal label="金融机构" :label-cols="4" class="text-right">
                <b-form-input v-model="queryParams.financeOrgName" />
              </b-form-fieldset>
            </div>
            <div class="col-md-6">
              <b-form-fieldset horizontal label="金融机构类型" :label-cols="4" class="text-right">
                <b-form-select v-model="queryParams.financeOrgType" :options="typeOptions">
                </b-form-select>
              </b-form-fieldset>
            </div>
            <div class="col-md-6">
              <b-form-fieldset horizontal label="销售区域" :label-cols="4" class="text-right">
                <area-tree ref="area" @sales-data="getSales" @select-change="selectChange" :storeAll='true'></area-tree>
              </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="状态" :label-cols="4" class="text-right">
                    <b-form-select v-model="queryParams.onOffFlag" :options="status">
                    </b-form-select>
                </b-form-fieldset>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 text-right">
              <b-button type="reset" size="sm" @click="resetClick">重置</b-button>
              <b-button size="sm" variant="primary" @click="getQuery">查询</b-button>
            </div>
          </div>
        </b-card>
        <b-card>
          <div class="row">
            <div class="col-md-12">
              <router-link to="/finance/insert">
                <b-button size="sm" variant="success">新增金融机构</b-button>
              </router-link>
            </div>
          </div>
          <div class="table-scrollable mb-2">
            <b-table striped hover bordered show-empty :items="obj.list" :fields="fields" :filter="filter">
              <template slot="index" slot-scope="data">
                {{data.index + 1 + ((obj.pageNum - 1) * obj.pageSize)}}
              </template>
              <template slot="financeOrgName" slot-scope="data">
                <a href="javascript:;" @click.prevent="_showUpdata(data.item)">{{data.item.financeOrgName}}</a>
              </template>
              <template slot="leaseFlag" slot-scope="row">{{row.value ? '是' : '否'}}</template>
              <template slot="interestSubsidyFlag" slot-scope="row">{{row.value ? '是' : '否'}}</template>
              <template slot="serviceChargeFlag" slot-scope="row">{{row.value ? '是' : '否'}}</template>
              <template slot="onOffFlag" slot-scope="row">{{row.value ? '停用' : '启用'}}</template>
              <template slot="operation" slot-scope="data">
                  <b-button type="text" :variant="data.item.onOffFlag ? 'success' : 'danger'" size="sm" @click="changeFalg(data.item)">
                      {{ data.item.onOffFlag ? '启用' : '停用' }}
                  </b-button>
              </template>
              <template slot="empty">暂无数据</template>
            </b-table>
          </div>

          <div class="row mt-2">
            <div class="col-md-12">
                <pagination class="pull-right"
                    @page-change="changePage"
                    :page-no="obj.pageNum"
                    :page-size="obj.pageSize"
                    :total-pages="obj.pages"
                    :total-result="obj.total">
                </pagination>
            </div>
        </div>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>

import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import Api from 'common/api'
import config from 'common/config'
import { MessageBox, Message } from 'element-ui'
import Pagination from 'components/pagination/pagination'
Vue.component(MessageBox.name, MessageBox)
import {getType} from 'common/com-api'
import AreaTree from 'components/iris-areaqueryshop/index'

export default {
  name: 'mainFinance',
  components: {
    AreaTree,
    Pagination
  },
  data() {
    return {
      queryParams: {
        financeOrgName: '',
        areaCodes: [],
        storeCodes: [],
        financeOrgType: '',
        onOffFlag: '',
        pageStart: 1,
        pageNums: config.pageNums
      },
      typeOptions: [],
      // 区域和经销商店联动效果数据
      status: [{
          value: '0',
          text: '启用'
          },
          {
          value: '1',
          text: '停用'
          }
      ],

      items: [],
      filter: null,
      fields: {
        index: {
          label: '序号'
        },
        financeOrgName: {
          label: '金融机构'
        },
        financeOrgTypeName: {
          label: '金融机构类型'
        },
        leaseFlag: {
          label: '租赁'
        },
        interestSubsidyFlag: {
          label: '贴息'
        },
        serviceChargeFlag: {
          label: '手续费'
        },
        onOffFlag: {
          label: '状态'
        },
        operation: {
          label: '操作'
        }
      },
      modalDetails: {},
    }
  },
  created() {
    getType(config.financeType.refCode, (items) => {
      items.forEach((item) => {
        let data = {
          text: item.refDetailName,
          value: item.refDetailCode
        }
        this.typeOptions.push(data)
      })
    })
  },
  computed: {
      ...mapGetters('finance', [
          'obj'
      ])
  },
  methods: {
    getSales(data) {
      data.forEach(item => {
          this.queryParams.areaCodes.push(item.code)
      })
    },
    selectChange(sales, stores) {
      if(Array.isArray(stores) === true) {
        this.queryParams.storeCodes = []
        stores.forEach(item => {
          this.queryParams.storeCodes.push(item.value)
        })
      }
      if(stores.value === 0) {
        this.queryParams.storeCodes = []
      }else if(stores.hasOwnProperty('value')) {
        this.queryParams.storeCodes = []
        this.queryParams.storeCodes[0] = stores.value
      }
    },
    changeFalg(item) {
        this.modalDetails = item;
        this.modalDetails.orgInfo = `${item.financeOrgCode};${item.financeChannel};${item.leaseFlag};${item.interestSubsidyFlag}`;
        const createElement = this.$createElement;
        MessageBox({
            title: '提示',
            message: createElement('p', null, [
                    createElement('span', null, '是否确定'),
                    createElement('span', null, item.onOffFlag ? '启用' : '停用'),
                    createElement('span', null, item.financeOrgName)
                ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                    instance.confirmButtonLoading = true;
                    if(item.onOffFlag == 0) {
                        this._updata('1', () => {
                            done();
                            instance.confirmButtonLoading = false;
                            this._queryInfo(this.queryParams)
                        })
                    }else if(item.onOffFlag == 1) {
                        this._updata('0', () => {
                            done();
                            instance.confirmButtonLoading = false;
                            this._queryInfo(this.queryParams)
                        })
                    }else {
                        done();
                        instance.confirmButtonLoading = false;
                    }

                } else {
                    done();
                    return
                }
            }
        }).then( action => {
            Message({
                type: 'success',
                message: config.messInfo.success
            });
        }).catch(() => {})
    },
    _showUpdata(item) {
      this.$router.push({
        path: `/finance/updata/${item.id+"&" +item.financeOrgCode}`
      })
    },
    ...mapActions({
      setParams: 'finance/setParams',
      getObj: 'finance/getObj'
    }),
    // 修改方法封装
    _updata(flag, callBack) {
        this.modalDetails.onOffFlag = flag;
        let params = this.modalDetails;
        Api.finance.insertOrUpdata(params, res => {
            // if(res.data.code === 'success') {
                callBack()
            // }
        });
    },
    getQuery() {
      this.queryParams.pageStart = 1;
      let params = this.queryParams;
      this.getObj(params)
    },
    resetClick() {
      this.queryParams.financeOrgName = ''
      this.queryParams.financeOrgType = ''
      this.queryParams.onOffFlag = ''
    },
    changePage(pageStart) {
      this.queryParams.pageStart = pageStart;
      let params = this.queryParams;
      this.getObj(params)
    },
  }
}
</script>
<style>
  .icon-style {
    color: red;
    font-size: 36px;
  }
  .father {
    position: relative;
  }
  .son {
    position: absolute;
    z-index: 1000;
    padding-right: 20px;
  }
  .tree {
    position: relative;
  }
  .tree-box {
    position: absolute;
    width: 100%;
    z-index: 100;
    margin-top: 6px;
  }
</style>
