<template>
   <b-modal title="选择商品"
            v-model="showModal"
            no-close-on-backdrop
            no-close-on-esc
            size="lg"
            button-size="sm"
            @hidden="hideModal"
            @ok="commitPoSkuDetailList"
            ok-title="确定"
            cancel-title="取消">
      <div class="row">
          <div class="col-md-6 col-lg-6">
              <b-form-fieldset horizontal label="商品编号:" label-text-align="right" :label-cols="4">
                  <b-form-input v-model.trim="skuInfo.skuCode"></b-form-input>
              </b-form-fieldset>
          </div>
          <div class="col-md-6 col-lg-6">
              <b-form-fieldset horizontal label="商品名称:" label-text-align="right" :label-cols="4">
                  <b-form-input v-model.trim="skuInfo.skuName"></b-form-input>
              </b-form-fieldset>
          </div>
      </div>
      <div class="row">
          <div class="col-md-6 col-lg-6">
              <b-form-fieldset horizontal label="69码:" label-text-align="right" :label-cols="4">
                  <b-form-input v-model.trim="skuInfo.barCode"></b-form-input>
              </b-form-fieldset>
          </div>
          <div class="col-md-6 col-lg-6">
              <b-form-fieldset horizontal label="商品品牌:" label-text-align="right" :label-cols="4">
                  <b-form-input v-model.trim="skuInfo.brandCode"></b-form-input>
              </b-form-fieldset>
          </div>
      </div>
      <div class="row">
          <div class="col-md-12 col-lg-12">
              <div class="pull-right">
                  <b-button size="sm" variant="primary" @click="search">查询</b-button>
              </div>
          </div>
      </div>
      <div class="row">
          <div class="col-md-12 com-lg-12">
               <div class="table-scrollable">
                   <b-table striped hover bordered show-empty :fields="fields" :items="skuInfoList">
                       <template slot="selectRows" slot-scope="data">
                           <input type="checkbox" name="selectRows" v-model="selectRows[data.index].selected" @change="checkSku(data.item.skuCode, data.index)"></input>
                       </template>
                       <template slot="empty">
                           暂无数据...
                       </template>
                   </b-table>
               </div>
          </div>
      </div>
      <div class="row">
           <div class="col-md-12">
                <pagination class="pull-right" @page-change="pageChange" :page-no="skuPager.pageNo" :page-size="skuPager.pageSize" :total-result="skuPager.total" :total-pages="skuPager.totalPages">
                </pagination>
           </div>
      </div>
      <div class="row">
          <div class="col-md-12 com-lg-12">
               <b-form-fieldset horizontal label="已选商品:" label-text-align="right" :label-cols="2">
                   <div class="card">
                       <div class="card-block">
                          <div class="card m-0 float-left ml-2" v-for="poSkuDetailInfo in addPoSkuDetailInfoList">
                             <div class="card-body p-0 clearfix ml-1">
                                 {{ poSkuDetailInfo.skuName }}
                                 <i @click="checkSku(poSkuDetailInfo.skuCode, poSkuDetailInfo.index)" class="fa fa-remove bg-danger p-1  ml-3 float-right white"></i>
                             </div>
                          </div>
                       </div>
                   </div>
               </b-form-fieldset>
          </div>
      </div>
   </b-modal>
</template>

<script>

   import {
       mapState,
       mapGetters,
       mapActions
   } from 'vuex'

   import config from '../../../common/config'
   import pagination from '../../../components/pagination/pagination'

   export default {

       data: function() {
           return {
               showModal: false,
               selectRows: [],
               fields: {
                   selectRows: {
                       label: '选择'
                   },
                   skuCode: {
                       label: '商品编码'
                   },
                   skuName: {
                       label: '商品名称'
                   },
                   skuModel: {
                       label: '型号'
                   },
                   categoryName: {
                       label: '分类'
                   },
                   brandName: {
                       label: '品牌'
                   }
               },
               items: [],
               skuInfo: {
                   skuCode: '',
                   skuName: '',
                   brandCode: '',
                   barCode: '',
                   skuType: config.product.archives.boutuqueType,
                   pageNums: config.pageNums,
                   pageStart: 1
               }
           }
       },
       computed: {
          ...mapState('purchaseOrder', [
              'showSelectModal',
              'skuInfoList',
              'addPoSkuDetailInfoList',
              'skuPager'
          ])
       },
       methods: {
          ...mapActions('purchaseOrder', [
               'hideSelectModal',
               'getSkuInfoList',
               'addPoSkuDetailList',
               'removePoSkuDetailList',
               'commitPoSkuDetailList'
          ]),
          search: function() {
              this.getSkuInfoList(this.$data.skuInfo)
          },
          checkSku: function(skuCode, num) {
              let index = this.addPoSkuDetailInfoList.findIndex((item) => {
                  return item.skuCode == skuCode
              })
              if(index == -1) {
                  let skuInfo = this.skuInfoList[num]
                  skuInfo.index = num
                  this.addPoSkuDetailList(skuInfo)
              } else {
                  this.selectRows[num].selected = false
                  this.removePoSkuDetailList(index)
              }
          },
          hideModal: function() {
              this.$data.selectRows = []
              this.hideSelectModal()
          },
          pageChange: function(num) {
              this.$data.skuInfo.pageStart = num
              this.search()
          }
       },
       watch: {
           showSelectModal: {
               handler() {
                   this.showModal = this.showSelectModal
               }
           },
           skuInfoList: {
               handler() {
                   this.selectRows = []
                   this.skuInfoList.forEach((item) => {
                        let index = this.addPoSkuDetailInfoList.findIndex((poSkuDetailInfo) => {
                            return poSkuDetailInfo.skuCode == item.skuCode
                        })
                        if(index == -1) {
                           this.selectRows.push({
                               selected: false
                           })
                        } else {
                           this.selectRows.push({
                               selected: true
                           })
                        }
                   })
               }
           }
       },
       components: {
           pagination
       }
   }
</script>
