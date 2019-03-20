<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="组合编码" label-text-align="right" :label-cols="4">
                        <b-form-input v-model.trim="skuComb.combinationCode" placeholder=""></b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="组合名称" label-text-align="right" :label-cols="4">
                        <b-form-input v-model.trim="skuComb.combinationName" placeholder=""></b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="商品分类" label-text-align="right" :label-cols="4">
                        <b-form-input v-model.trim="skuComb.categoryCode" placeholder=""></b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="是否上架" label-text-align="right" :label-cols="4">
                        <b-form-select v-model.trim="skuComb.onOffFlag" :options="onOffFlags">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
               <div class="col-md-12">
                   <div class="pull-right">
                       <b-button size="sm" @click="reset">重置</b-button>
                       <b-button size="sm" variant="primary" @click="searchAllSkuComb">查询</b-button>
                  </div>
               </div>
           </div>
        </b-card>
        <b-card class="mb-4">
            <div class="mb-2">
                  <div class="pull-left distance">
                    <b-button size="sm" variant="success" v-if="addBtn" @click="addSkuComb">新增</b-button>
                    <b-button size="sm" variant="info" v-if="editBtn" @click="editSkuComb">编辑</b-button>
                    <b-button size="sm" variant="danger">删除</b-button>
                  </div>
                  <b-button class="pull-right" size="sm" variant="warning" @click="synData">同步数据</b-button>
            </div>
            <div class="table-scrollable mb-2">
                <b-table striped hover bordered show-empty :items="skuCombList" :fields="fields">
                    <template slot="selectRow" slot-scope="data">
                        <input type="radio" :value="data.index" v-model="selectRow" name="selectRow"></input>
                    </template>
                    <template slot="startTime" slot-scope="data">
                        {{ data.item.startTime | switchDate }}
                    </template>
                    <template slot="endTime" slot-scope="data">
                        {{ data.item.endTime | switchDate }}
                    </template>
                    <template slot="createTime" slot-scope="data">
                        {{ data.item.createTime | switchDate }}
                    </template>
                    <template slot="operate" slot-scope="data">
                        <b-button v-if="data.item.onOffFlag === '0'&&addBtn" size="sm" variant="success" @click="editSkuCombOnOffFlag(data.index)">上架</b-button>
                        <b-button v-if="data.item.onOffFlag === '1'&&addBtn" size="sm" variant="danger" @click="editSkuCombOnOffFlag(data.index)">下架</b-button>
                    </template>
                    <template slot="empty">暂无数据</template>
                </b-table>
            </div>
            <div class="row">
                <div class="col-md-12">
                     <pagination class="pull-right" @page-change="pageChange" :page-no="pager.pageNo" :page-size="pager.pageSize" :total-result="pager.total" :total-pages="pager.totalPages">
                     </pagination>
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
    import config from '../../../common/config'
    import pagination from '../../../components/pagination/pagination'
    import { MessageBox, Message } from 'element-ui'
    import { hasBtn } from 'common/com-api'
    import apiUrls from 'common/api-url'
    import api from 'common/api'
    export default {
        data: function() {
            return {
               selectRow: -1,
               skuComb: {
                   combinationCode: '',
                   combinationName: '',
                   categoryCode: '',
                   onOffFlag: 1,
                   pageNums: config.pageNums,
                   pageStart: 1
               },
               fields: {
                   selectRow: {
                       label: '选择'
                   },
                   combinationCode: {
                       label: '组合编码'
                   },
                   combinationName: {
                       label: '组合名称'
                   },
                   startTime: {
                       label: '生效时间'
                   },
                   endTime: {
                       label: '失效时间'
                   },
                   createTime: {
                       label: '创建日期'
                   },
                   operate: {
                       label: '操作'
                   }
               },
               onOffFlags: [
                   {
                      value: 0,
                      text:  '下架'
                   },
                   {
                      value: 1,
                      text:  '上架'
                   }
               ]
            }
        },
        computed: {
            addBtn() {
                return hasBtn(apiUrls.product.skuComb.editCombinationInfos)
            },
            editBtn() {
                return hasBtn(apiUrls.product.skuComb.editCombinationInfos)
            },
            ...mapState('skuComb', [
                'pager',
                'skuCombList'
            ])
        },
        methods: {
            // 同步数据
            synData:function() {
              api.product.skuComb.initCombinationInfoToRedisCache({}, (res) => {
                    if (res.data.code == "success") {
                        Message({
                            type: 'info',
                            message: config.messInfo.success
                        });
                    }
                })
            },
            reset: function() {
                this.$data.skuComb = {
                    combinationCode: '',
                    combinationName: '',
                    categoryCode: '',
                    onOffFlag: 1,
                    pageNums: config.pageNums,
                    pageStart: 1
                }
            },
            searchAllSkuComb: function() {
                let _this = this
                _this.$data.skuComb.pageStart = 1
                _this.getSkuCombList(_this.$data.skuComb)
            },
            search: function() {
                let _this = this
                _this.getSkuCombList(_this.$data.skuComb)
            },
            pageChange: function(num) {
                this.skuComb.pageStart = num
                this.search()
            },
            addSkuComb: function() {
                this.$router.push('/skuComb/add')
            },
            editSkuComb: function() {
                let _this = this
                if(parseInt(this.selectRow) != -1) {
                    let combinationCode = this.skuCombList[this.selectRow].combinationCode
                    this.$router.push('/skuComb/edit/' + combinationCode)
                 } else {
                    Message.closeAll()
                    Message({
                       type: 'error',
                       message: config.messInfo.selectOneRow
                    })
                 }
            },
            editSkuCombOnOffFlag: function(index) {
                let _this = this
                let h = _this.$createElement
                MessageBox({
                       title: '提示',
                       message: h('h6','确定修改组合商品上架下架状态!'),
                       showCancelButton: true,
                       confirmButtonText: '确定',
                       cancelButtonText: '取消',
                       type: 'warning',
                       callback: (action, instance) => {
                           if(action === 'confirm') {
                              _this.updateSkuCombInfoFlag({
                                  index: index,
                                  callback: () => {
                                      _this.search()
                                  }
                              })
                           }
                       }
                    })
            },
            ...mapActions('skuComb', [
                'getSkuCombList',
                'updateSkuCombInfoFlag'
            ])
        },
        components: {
            pagination
        }
    }
</script>
<style>
.distance {
  margin-bottom: 10px;
}
</style>

