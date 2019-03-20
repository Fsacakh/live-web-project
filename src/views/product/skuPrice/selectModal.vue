<template>
    <b-modal title="选择商品" v-model="showModal" no-close-on-backdrop no-close-on-esc size="lg" button-size="sm" @hidden="hideModal" @ok="commitSkuPriceList" ok-title="确定" cancel-title="取消">
        <div class="row">
            <!-- <div class="col-md-6 col-lg-6"> -->
            <!-- <b-form-fieldset horizontal label="商品编号:" label-text-align="right" :label-cols="4">
                                      <b-form-input v-model.trim="skuInfo.skuCode"></b-form-input>
                                  </b-form-fieldset> -->
            <!-- <b-form-fieldset horizontal label="备件代码:" label-text-align="right" :label-cols="4">
                            <b-form-input v-model.trim="skuInfo.originalCode"></b-form-input>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6 col-lg-6">
                        <b-form-fieldset horizontal label="商品名称:" label-text-align="right" :label-cols="4">
                            <b-form-input v-model.trim="skuInfo.skuName"></b-form-input>
                        </b-form-fieldset> -->
            <!-- </div> -->
            <div class="col-md-6">
                <b-form-fieldset horizontal label="商品编码/备件代码/商品名称" :label-cols="4" class="text-right">
                    <div class="text-left">
                        <searchSku ref="codeSearch" :hasCheck='skuCheck' :dataList="codeDatalist" option="originalCode" @dataChange="codeQuerySelect" @itemValue="codeItemClick" @clickShowBack="codeFirstLoad" @clearValue="codeClearValue" @comScroll="codeScrollBottom">
                        </searchSku>
                    </div>
                </b-form-fieldset>
            </div>
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="69码:" label-text-align="right" :label-cols="4">
                    <b-form-input v-model.trim="skuInfo.barCode"></b-form-input>
                </b-form-fieldset>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="商品品牌:" label-text-align="right" :label-cols="4">
                    <search v-model="skuInfo.brandCode" :searchValue="brandName" :dataList="skuBrands" :valueName="'brandName'" :keyName="'brandCode'" @dataChange="getBrandsListByName" @comScroll="getBrandsList" @clickShowBack="getBrandsList">
                    </search>
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
                            <input type="checkbox" name="selectRows" v-model="selectRows[data.index].selected" @change="checkSku(data.item.skuCode, data.index)">
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
                          <div class="card m-0 float-left ml-2" v-for="(skuPrice, index) in addSkuPriceInfoList" :key="index">
                             <div class="card-body p-0 clearfix ml-1">
                                 {{ skuPrice.skuName }}
                                 <i @click="checkSku(skuPrice.skuCode, skuPrice.index)" class="fa fa-remove bg-danger p-1  ml-3 float-right white"></i>
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
    import search from '../../../components/search/search'
    import api from 'common/api'
    import pagination from '../../../components/pagination/pagination'
    import searchSku from '../../../components/iris-search/searchSku'
    export default {
        data: function() {
            return {
                showModal: false,
                selectRows: [],
                brandName: '',
                fields: {
                    selectRows: {
                        label: '选择'
                    },
                    skuCode: {
                        label: '商品编码'
                    },
                    originalCode: {
                        label: '备件代码'
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
                    originalCode: '',
                    skuName: '',
                    brandCode: '',
                    barCode: '',
                    skuType: config.product.archives.boutuqueType,
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                skuCheck: false,
                codeDatalist: [],
                codeSelectParams: {
                    skuType: "goodsTypeGood",
                    pageNums: config.pageNums,
                    pageStart: 1
                },
            }
        },
        computed: {
            ...mapState('skuPrice', [
                'showSelectModal',
                'skuBrands',
                'skuInfoList',
                'addSkuPriceInfoList',
                'skuPager',
            ]),
            ...mapGetters('skuPrice', [
                'getBrandsPageStart'
            ])
        },
        methods: {
            ...mapActions('skuPrice', [
                'resetSkuBrands',
                'getSkuBrands',
                'hideSelectModal',
                'getSkuInfoList',
                'addSkuPriceList',
                'commitSkuPriceList',
                'removeSkuPriceList'
            ]),
            search: function() {
                this.getSkuInfoList(this.$data.skuInfo)
            },
            checkSku: function(skuCode, num) {
                let index = -1
                index = this.addSkuPriceInfoList.findIndex((item) => {
                    return item.skuCode == skuCode
                })
                if (index == -1) {
                    let skuInfo = this.skuInfoList[num]
                    skuInfo.index = num
                    this.addSkuPriceList(skuInfo)
                } else {
                    this.selectRows[num].selected = false
                    this.removeSkuPriceList(index)
                }
            },
            hideModal: function() {
                this.$data.selectRows = []
                this.hideSelectModal()
            },
            pageChange: function(num) {
                this.$data.skuInfo.pageStart = num
                this.search()
            },
            getBrandsList: function() {
                let _this = this
                _this.getSkuBrands({
                    brandName: _this.$data.brandName,
                    pageNums: config.pageNums,
                    pageStart: _this.getBrandsPageStart
                })
            },
            getBrandsListByName: function(brandName) {
                let _this = this
                _this.$data.brandName = brandName
                _this.resetSkuBrands()
                _this.getSkuBrands({
                    brandName: brandName,
                    pageNums: config.pageNums,
                    pageStart: _this.getBrandsPageStart
                })
            },
            codeQuerySelect(data) {
                this.codeSelectParams.pageStart = 1;
                this.codeSelectParams.skuCodeOrName = data;
                let params = this.codeSelectParams;
                this.querySerInfo(params, obj => {
                    this.codeIsLastPage = obj.isLastPage;
                    this.codeDatalist = obj.list;
                });
            },
            codeItemClick(item) {
                console.log(item)
                // this.skuPrice.skuName = item.skuName
                this.skuInfo.skuCode = item.skuCode
                // this.skuPrice.originalCode = item.originalCode
            },
            codeFirstLoad() {
                if (this.codeSelectParams.skuCode) {
                    delete this.codeSelectParams.skuCode;
                } else if (this.codeDatalist.length !== 0) {
                    return;
                }
                let params = this.codeSelectParams;
                this.querySerInfo(params, obj => {
                    this.codeDatalist = obj.list;
                });
            },
            codeClearValue() {
                this.skuInfo.skuCode = ''
                this.$refs.codeSearch.clearValue()
            },
            codeScrollBottom(isEnd) {
                if (isEnd && !this.isLastPage) {
                    this.codeSelectParams.pageStart++
                        let params = this.codeSelectParams;
                    this.querySerInfo(params, obj => {
                        this.codeIsLastPage = obj.isLastPage;
                        this.codeDatalist = this.codeDatalist.concat(obj.list);
                    });
                }
            },
            querySerInfo(params, callback) {
                api.product.skuPrice.skuInfo(params, res => {
                    if (res.data.code === "success") {
                        let obj = res.data.obj;
                        callback(obj);
                    }
                })
            },
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
                        let index = this.addSkuPriceInfoList.findIndex((skuPriceInfo) => {
                            return skuPriceInfo.skuCode == item.skuCode
                        })
                        if (index == -1) {
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
            search,
            pagination,
            searchSku
        }
    }
</script>
